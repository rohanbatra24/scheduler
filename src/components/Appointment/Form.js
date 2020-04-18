import React, { useState } from 'react';

import Button from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/Button';

import InterviewerList from '/Users/rohanbatra/hostLighthouse/scheduler/src/components/InterviewerList';
/// Form({ interviewer: 2, name: 'Mike', interviewers: [], onSave: () => console.log('onSave'), onCancel: () => null})
export default function Form(props) {
  console.log('====form props', props);

  const [ name, setName ] = useState(props.name || '');
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    props.onCancel();
    reset();
  }

  function save() {
    props.onSave(name, interviewer); // save fn in appointment
  }

  function handleNameInput(evt) {
    // debugger
    // console.log(evt.target.value);
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
          />
        </form>
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
