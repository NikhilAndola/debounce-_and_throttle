import React from 'react';
import './style.css';

export default function App() {
  const debounceFunc = (fn, delay = 1000) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  let printFn = (event) => {
    console.log('print something after delay!');
  };

  function throttle(cb, delay = 2000) {
    let shouldWait = false;

    return (...args) => {
      if (shouldWait) return;

      cb(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  }

  let useDebounce = (value, delay) => {
    const [debaounceValue, setDebounceValue] = React.useState(value);

    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => clearTimeout(timeoutId);
    }, [value]);

    return debaounceValue;
  };

  return (
    <div>
      <h1>Debounce function</h1>
      <button onClick={debounceFunc(printFn)}>Debounce</button>
      <button onClick={throttle(printFn)}>Throttle</button>
    </div>
  );
}
