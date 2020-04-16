import React, { useState, Fragment, useEffect } from 'react';

import getAppointmentsForDay from '/Users/rohanbatra/hostLighthouse/scheduler/src/helpers/selectors.js';

import axios from 'axios';

import 'components/Application.scss';

import 'components/Application';

import DayList from './DayList';

import Appointment from 'components/Appointment/index';

export default function Application(props) {
  const [ state, setState ] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState({ ...state, day });

  const setDays = (days) => setState({ ...state, days });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`))
    ]).then((all) => {
      setState((prev) => ({ days: all[0].data, appointments: all[1].data }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  console.log('Appoitments=====', appointments);

  const appointmentList = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
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
