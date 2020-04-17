import React, { useState } from 'react';

export default function useVisualMode(FIRST) {
  const [ mode, setMode ] = useState(FIRST);

  const [ history, setHistory ] = useState([ FIRST ]);

  function transition(SECOND, replace = false) {
    if (replace === true) {
      setMode(SECOND);
    } else {
      setMode(SECOND);
      history.push(SECOND);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
