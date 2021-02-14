import React, { useState, useEffect } from 'react';
const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const hasError = Object.keys(errors).length === 0;
      if (!hasError) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    console.log([e.target.name], e.target.value);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitForm(true);
  };

  return {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
  };
};

export default useValidation;
