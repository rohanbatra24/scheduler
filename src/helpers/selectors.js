export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter((d) => d.name === day);

  const aptsForDay = [];

  if (state.days.length === 0) {
    return [];
  }

  if (!filteredAppointments[0]) {
    return [];
  }

  for (const appointmentID of filteredAppointments[0].appointments) {
    if (state.appointments[appointmentID].id === appointmentID) {
      aptsForDay.push(state.appointments[appointmentID]);
    }
  }

  return aptsForDay;
}
