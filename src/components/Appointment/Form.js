import React, { useState } from 'react';

import Button from '../Button';

import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [ name, setName ] = useState(props.student || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [ error, setError ] = useState('');

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    props.onCancel();
    reset();
  }

  function save() {
    //show error if blank name submitted
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }
    // clear error
    setError('');
    props.onSave(name, interviewer);
  }

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleOnSubmit}>
          <input
            value={name}
            onChange={handleNameInput}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewer={interviewer} interviewers={props.interviewers} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={() => save()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
