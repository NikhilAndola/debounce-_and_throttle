import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { CustomInput } from './CustomInput';

export default function App() {
  const [value, setValue] = React.useState(0);

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

  const debouValues = useDebounce(value, 500);
  // console.log(debouValues);

  const incDecHandle = () => {
    setValue(value + 1);
    inputRef.current.focus();
  };

  const [inputVal, setInputVal] = useState('');

  const inputRef = React.useRef();

  const handleChangeInput = (event) => {
    setInputVal(event.target.value);
  };

  // console.log('inputRef', inputRef, inputVal);

  return (
    <>
      <div>
        <h1>Debounce function</h1>
        <button onClick={debounceFunc(printFn)}>Debounce</button>
        <button onClick={throttle(printFn)}>Throttle</button>
        <button onClick={incDecHandle}>Inc/Dec</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Normal Value: {value}</span>
        <span>Debounce Value: {debouValues}</span>
      </div>
      <div>
        <CustomInput
          value={inputVal}
          ref={inputRef}
          onChange={handleChangeInput}
        />
      </div>
    </>
  );
}
