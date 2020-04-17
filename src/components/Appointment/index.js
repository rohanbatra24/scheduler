import React from 'react';
import 'components/Appointment/styles.scss';

import Header from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Header';

import Show from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Show';

import Empty from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Empty';

import Form from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Form';

import useVisualMode from '/Users/rohanbatra/hostLighthouse/scheduler/src/hooks/useVisualMode.js';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // console.log('===', history);

  // console.log(mode);

  if (mode === SHOW) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />
      </article>
    );
  } else if (mode === EMPTY) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Empty onAdd={() => transition(CREATE)} />
      </article>
    );
  }
  if (mode === CREATE) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Form onCancel={back} interviewers={props.interviewers} />
      </article>
    );
  }
}
