import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';

import Show from './Show';

import Empty from './Empty';

import Form from './Form';

import Status from './Status';

import Confirm from './Confirm';

import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';

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
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // creates new interview object
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // show loading screen
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // go back from error message
  function cancelErrorSave() {
    back();
  }

  // go back from error message
  function cancelDeleteError() {
    back();
  }

  // confirm deletion of an interview
  function confirmCancel() {
    transition(CONFIRM);
  }

  // go back from confrim message of cancel interview
  function cancelCancel() {
    back();
  }

  function edit() {
    transition(EDIT);
  }

  function cancelInterview() {
    // transition to deleting and replace mode in history
    transition(DELETING, true);

    props.cancelInterview(props.id).then(() => transition(EMPTY)).catch((error) => transition(ERROR_DELETE, true));
  }

  if (mode === SHOW) {
    let interviewerName;

    // getting interviewer name from interview object with id
    for (let k of props.interviewers) {
      if (props.interview.interviewer === k.id) {
        interviewerName = k.name;
      }
    }

    return (
      <article data-testid="appointment" className="appointment">
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
      <article data-testid="appointment" className="appointment">
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
