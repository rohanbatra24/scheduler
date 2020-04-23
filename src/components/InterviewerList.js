import React from 'react';

import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';

import InterviewerListItem from '../components/InterviewerListItem';

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        selected={interviewer.id === props.interviewer}
        avatar={interviewer.avatar}
        key={interviewer.id}
        name={interviewer.name}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
