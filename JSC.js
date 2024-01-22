import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
const { useState } = React;

const Calculator = () => {
  const [input, setInput] = useState('0');

  const handleNumber = (number) => {
    setInput((prevInput) => {
      // Prevent multiple leading zeroes
      if (prevInput === '0' || prevInput === "Error") {
        return String(number);
      } else {
        // Add number to the current input string
        return prevInput + number;
      }
    });
  };

  const handleOperator = (operator) => {
  setInput((prevInput) => {
    if (/[+\-*/]$/.test(prevInput)) {
      // If there's already an operator at the end, replace it unless it's a minus following another operator
      if (prevInput.endsWith('-')) {
        // Allow for negative numbers after an operator
        return (operator === '-') ? prevInput : prevInput.slice(0, -2) + operator;
      } else {
        return (operator === '-') ? prevInput + operator : prevInput.slice(0, -1) + operator;
      }
    } else {
      // If no operator at the end, just add the new operator
      return prevInput + operator;
    }
  });
};

  const calculate = () => {
    try {
      setInput((eval(input)).toString());
    } catch (e) {
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('0');
  };

  const handleDecimal = () => {
    setInput((prevInput) => {
      // Add decimal only if the last entry doesn't have a decimal
      if (!prevInput.includes('.')) {
        return prevInput + '.';
      } else if (prevInput.split(/[\+\-*/]/).pop().indexOf('.') === -1) {
        return prevInput + '.';
      } else {
        return prevInput;
      }
    });
  };


  return (
    <div id="calculator">
      <div id="display">{input}</div>
      <button id="clear" onClick={handleClear}>AC</button>
      <button id="divide" onClick={() => handleOperator('/')}>/</button>
      <button id="multiply" onClick={() => handleOperator('*')}>*</button>
      {/* Number buttons */}
      <button id="seven" onClick={() => handleNumber('7')}>7</button>
      <button id="eight" onClick={() => handleNumber('8')}>8</button>
      <button id="nine" onClick={() => handleNumber('9')}>9</button>
      <button id="subtract" onClick={() => handleOperator('-')}>-</button>
      <button id="four" onClick={() => handleNumber('4')}>4</button>
      <button id="five" onClick={() => handleNumber('5')}>5</button>
      <button id="six" onClick={() => handleNumber('6')}>6</button>
      <button id="add" onClick={() => handleOperator('+')}>+</button>
      <button id="one" onClick={() => handleNumber('1')}>1</button>
      <button id="two" onClick={() => handleNumber('2')}>2</button>
      <button id="three" onClick={() => handleNumber('3')}>3</button>
      <button id="equals" onClick={calculate}>=</button>
      <button id="zero" onClick={() => handleNumber('0')}>0</button>
      <button id="decimal" onClick={handleDecimal}>.</button>
    </div>
  );
};
ReactDOM.render(<Calculator />, document.getElementById('root'));
