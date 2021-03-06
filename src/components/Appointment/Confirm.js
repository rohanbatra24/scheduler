import React from 'react';

import Button from '../Button';

export default function Header(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Are you sure you want to delete?</h1>
      <section className="appointment__actions">
        <Button onClick={props.cancelCancel} danger>
          Cancel
        </Button>
        <Button alt="Confirm" onClick={props.cancelInterview} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
