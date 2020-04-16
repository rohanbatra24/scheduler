import React from 'react';
import 'components/Appointment/styles.scss';

import Header from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Header';

import Show from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Show';

import Empty from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Empty';

export default function Appointment(props) {
  console.log('appt props=====', props);

  if (props.interview) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />
      </article>
    );
  } else {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Empty />
      </article>
    );
  }
}
