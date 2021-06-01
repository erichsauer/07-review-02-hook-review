import React, { useState } from 'react';

const useRecord = (init) => {
  const [history, setHistory] = useState([init]);
  const [current, setCurrent] = useState(init);
  const record = (color) => {
    setCurrent(color);
    setHistory((prevHistory) => [...prevHistory, color]);
  };

  const undo = () => {
    const i = history.indexOf(current);
    setCurrent(history[i - 1]);
  };

  const redo = () => {
    const i = history.indexOf(current);
    setCurrent(history[i + 1]);
  };

  return { current, history, undo, redo, record };
};

function App() {
  const { current, history, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button onClick={undo} disabled={current === history[0]}>
        undo
      </button>
      <button onClick={redo} disabled={current === history[history.length - 1]}>
        redo
      </button>
      <input
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}

export default App;
