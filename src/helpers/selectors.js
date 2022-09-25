import React from "react";


export function getAppointmentsForDay (state, dayName) {
  const actualDay = state.days.find(day => day.name === dayName);
  if (actualDay) {
  return actualDay.appointments.map((id) => state.appointments[id]);
  } else {return []}
}

export function getInterview(state, interview) {
  
}