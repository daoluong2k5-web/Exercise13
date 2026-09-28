import React, { useState, useEffect } from 'react';

function ValidatedInput({ validationFunction, errorMessage, placeholder = 'Type here...', label }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (typeof validationFunction === 'function') {
      setIsValid(validationFunction(value));
    }
  }, [value, validationFunction]);

  return (
    <div className="validated-input-container">
      {label && <label className="validated-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={isValid ? '' : 'error'}
        placeholder={placeholder}
      />
      {!isValid && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ValidatedInput;
