import React, { useState, Fragment, useEffect } from 'react';

// import getAppointmentsForDay from '/Users/rohanbatra/hostLighthouse/scheduler/src/helpers/selectors.js';

import axios from 'axios';

import 'components/Application.scss';

import 'components/Application';

import DayList from './DayList';

import Appointment from 'components/Appointment/index';

import useVisualMode from '/Users/rohanbatra/hostLighthouse/scheduler/src/hooks/useVisualMode.js';

const { getAppointmentsForDay } = require('/Users/rohanbatra/hostLighthouse/scheduler/src/helpers/selectors');

const { getInterviewersForDay } = require('/Users/rohanbatra/hostLighthouse/scheduler/src/helpers/selectors');

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Application(props) {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ]).then((all) => {
      setState((prev) => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const data = { interview };

    return axios
      .put(`/api/appointments/${id}`, data)
      .then((response) => {
        console.log(response);
        setState({
          ...state,
          appointments
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cancelInterview(id) {
    console.log(id);

    const interview = null;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const data = { interview };

    return axios
      .delete(`/api/appointments/${id}`, data)
      .then((response) => {
        console.log(response);
        setState({
          ...state,
          appointments
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewer={appointment.interview && state.interviewers[appointment.interview.interviewer]}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        <Fragment>
          {appointmentList}
          <Appointment key="last" id="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
