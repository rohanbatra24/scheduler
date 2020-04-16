import React, { useState, Fragment, useEffect } from 'react';

import axios from 'axios';

import 'components/Application.scss';

import 'components/Application';

import DayList from './DayList';

import Appointment from 'components/Appointment/index';

const appointments = [
  {
    id: 1,
    time: '12pm'
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png'
      }
    }
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Mike',
      interviewer: {
        id: 3,
        name: 'James',
        avatar: 'https://i.imgur.com/LpaY82x.png'
      }
    }
  },
  {
    id: 4,
    time: '3pm'
  },
  {
    id: 5,
    time: '4pm',
    interview: {
      student: 'Miller',
      interviewer: {
        id: 5,
        name: 'Tom',
        avatar: 'https://i.imgur.com/LpaY82x.png'
      }
    }
  }
];

export default function Application(props) {
  const [ day, setDay ] = useState('Monday');

  const [ days, setDays ] = useState([]);

  useEffect(() => {
    axios.get(`/api/days`).then((response) => {
      setDays(response.data);
    });
  }, []);

  const appointmentList = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
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
