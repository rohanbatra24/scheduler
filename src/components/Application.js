// issues to be resolved

// interview spots reducing even for appt edit - going into negative

import React, { Fragment } from 'react';

import 'components/Application.scss';

import 'components/Application';

import DayList from './DayList';

import Appointment from 'components/Appointment/index';

import useApplicationData from '../hooks/useApplicationData';

const { getAppointmentsForDay } = require('../../src/helpers/selectors');

const { getInterviewersForDay } = require('../../src/helpers/selectors');

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewer={appointment.interview && appointment.interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // console.log('state===', state);
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList setDay={setDay} days={state.days} day={state.day} />
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
