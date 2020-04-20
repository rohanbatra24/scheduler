import React from 'react';
import 'components/Appointment/styles.scss';

import Header from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Header';

import Show from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Show';

import Empty from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Empty';

import Form from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Form';

import Status from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Status';

import Confirm from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Confirm';

import Error from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Appointment/Error';

import useVisualMode from '/Users/rohanbatra/hostLighthouse/scheduler/src/hooks/useVisualMode.js';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY); // mode not updating to empty on deleting appointment

  // console.log('props.interview===', props.interview);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function cancelErrorSave() {
    back();
  }

  function cancelDeleteError() {
    back();
  }

  function confirmCancel() {
    transition(CONFIRM);
  }

  function cancelCancel() {
    back();
  }

  function edit() {
    transition(EDIT);
  }

  function cancelInterview() {
    transition(DELETING, true);

    props.cancelInterview(props.id).then(() => transition(EMPTY)).catch((error) => transition(ERROR_DELETE, true));
  }

  let interviewerName = '';

  console.log(props.interviewers);
  console.log(props.interview);

  if (mode === SHOW) {
    for (let k of props.interviewers) {
      if (props.interview.interviewer === k.id) {
        interviewerName = k.name;
      }
    }
    console.log('intname', interviewerName);

    return (
      <article className="appointment">
        <Header time={props.time} />
        <Show
          student={props.interview.student}
          interviewer={interviewerName}
          confirmCancel={confirmCancel}
          edit={edit}
        />
      </article>
    );
  }

  if (mode === EMPTY) {
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
        <Status message={'Saving..'} />
      </article>
    );
  }

  if (mode === DELETING) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Status message={'Deleting..'} />
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

  if (mode === EDIT) {
    return (
      <article className="appointment">
        <Form
          onSave={save}
          onCancel={back}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          student={props.interview.student}
        />
      </article>
    );
  }

  if (mode === ERROR_SAVE) {
    // console.log('in saveerror');
    return (
      <article className="appointment">
        <Error message={'Error saving appointment'} cancelError={cancelErrorSave} />
      </article>
    );
  }

  if (mode === ERROR_DELETE) {
    // console.log('in delete error');
    return (
      <article className="appointment">
        <Error message={'Error deleting appointment'} cancelError={cancelDeleteError} />
      </article>
    );
  }
}
