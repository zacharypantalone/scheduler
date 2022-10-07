import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(appointments) {
    const currentDay = state.days.find(day => day.name === state.day)
    const currentDayIndex = state.days.findIndex(day => day.name === state.day)
    let spots = 0;
    
    for (let appointmentId of currentDay.appointments) {
      if (appointments[appointmentId].interview === null) {
        spots += 1
      }
    }

    const updatedDay = { ...currentDay, spots};
    const updatedDays = [ ...state.days ] ;
    updatedDays[currentDayIndex] = updatedDay

    return updatedDays
  }


  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments);
   return axios.put(`/api/appointments/${id}`, {interview})
    .then( () => setState({ ...state, appointments, days}))
   
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

      const days = updateSpots(appointments);
    return axios.delete(`/api/appointments/${id}`)
    .then( () => setState({ ...state, appointments, days}))
    
  }

  return { state, setDay, bookInterview, cancelInterview }
}