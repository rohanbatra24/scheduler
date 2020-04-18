import React from 'react';
import 'components/Appointment/styles.scss';

import Header from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Header';

import Show from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Show';

import Empty from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Empty';

import Form from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Form';

import Status from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Status';

import Confirm from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Confirm';

import useVisualMode from '/Users/rohanbatra/hostLighthouse/scheduler/src/hooks/useVisualMode.js';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => transition(SHOW)); // getting id as prop from application
  }

  function confirmCancel() {
    transition(CONFIRM);
  }

  function cancelCancel() {
    back();
  }

  function cancelInterview() {
    transition(SAVING);

    props.cancelInterview(props.id).then(() => transition(EMPTY)); // getting id as prop from application
  }

  if (mode === SHOW) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Show student={props.interview.student} interviewer={props.interviewer.name} confirmCancel={confirmCancel} />
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
        <Form onSave={save} onCancel={back} interviewers={props.interviewers} appointmentID={props.id} />
      </article>
    );
  }

  if (mode === SAVING) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Status message={props.message} />
      </article>
    );
  }

  if (mode === CONFIRM) {
    return (
      <article className="appointment">
        <Confirm cancelInterview={cancelInterview} cancelCancel={cancelCancel} />
      </article>
    );
  }
}
