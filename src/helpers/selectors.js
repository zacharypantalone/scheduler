import React from "react";

export function getAppointmentsForDay(state, dayName) {
  const actualDay = state.days.find((day) => day.name === dayName);
  if (actualDay) {
    return actualDay.appointments.map((id) => state.appointments[id]);
  } else {
    return [];
  }
}
export function getInterviewersForDay(state, dayName) {
  const actualDay = state.days.find((day) => day.name === dayName);

  if (!actualDay) {
    return [];
  }

  return actualDay.interviewers.map((id) => state.interviewers[id]);
}

export function getInterview(state, interview) {
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
