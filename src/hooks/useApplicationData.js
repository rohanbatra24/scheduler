import { useState, useEffect } from 'react';

import axios from 'axios';

export default function useApplicationData() {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ]).then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days;

    // update spots remaining
    for (let day in state.days) {
      if (!state.appointments[id].interview && state.days[day].name === state.day) {
        state.days[day].spots--;
      }
    }

    const data = { interview };

    // update state
    return axios.put(`/api/appointments/${id}`, data).then((response) => {
      setState({
        ...state,
        days,
        appointments
      });
    });
  }

  function cancelInterview(id) {
    const interview = null;

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update spots remaining
    for (let day in state.days) {
      if (state.days[day].name === state.day) {
        state.days[day].spots++;
      }
    }

    const data = { interview };

    return axios.delete(`/api/appointments/${id}`, data).then((response) => {
      setState({
        ...state,
        appointments
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
