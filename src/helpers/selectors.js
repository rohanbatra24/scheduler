function getAppointmentsForDay(state, day) {
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

// console.log(getAppointmentsForDay(state, 'Monday'));

function getInterview(state, interview) {
  for (let key in state.appointments) {
    if (state.appointments[key].interview === null || interview === null) {
      continue;
    } else {
      if (state.appointments[key].interview.interviewer === interview.interviewer) {
        const obj = {
          student: interview.student,
          interviewer: {
            id: state.appointments[key].interview.interviewer,
            name: state.interviewers[state.appointments[key].interview.interviewer].name,
            avatar: state.interviewers[state.appointments[key].interview.interviewer].avatar
          }
        };

        return obj;
      }
    }
  }
  return null;
}

function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days.filter((d) => d.name === day);

  // console.log('fitlererdInts', filteredInterviewers[0].interviewers);

  const interviewersForDay = [];

  if (state.days.length === 0) {
    return [];
  }

  if (!filteredInterviewers[0]) {
    return [];
  }

  for (const interviewerID of filteredInterviewers[0].interviewers) {
    if (state.interviewers[interviewerID].id === interviewerID) {
      interviewersForDay.push(state.interviewers[interviewerID]);
    }
  }

  return interviewersForDay;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
