// issues to be resolved
// - not able to delete appointments - request to db going through.. everything is fine on refresh. Seems to be problem with transition
// - not defaulting to selected interviewer when editing appointment

import React, { Fragment } from 'react';

import 'components/Application.scss';

import 'components/Application';

import DayList from './DayList';

import Appointment from 'components/Appointment/index';

import useApplicationData from '../hooks/useApplicationData';

const { getAppointmentsForDay } = require('/Users/rohanbatra/hostLighthouse/scheduler/src/helpers/selectors');

const { getInterviewersForDay } = require('/Users/rohanbatra/hostLighthouse/scheduler/src/helpers/selectors');

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
