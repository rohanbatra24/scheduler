/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React, { useState } from 'react';

import getAppointmentsForDay from '../../helpers/selectors';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from '@testing-library/react';

/*
  We import the component that we are testing
*/
import Appointment from 'components/Application';

/*
  A test that renders a React Component
*/

const state = {};

describe('Appointment', () => {
  it('renders without crashing', () => {
    const appointments = getAppointmentsForDay(state, state.day);
    // const interviewers = getInterviewersForDay(state, state.day);

    appointments.map((appointment) => {
      render(
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          interviewer={appointment.interview && appointment.interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    });
  });
});
