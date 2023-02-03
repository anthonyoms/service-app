import { useState } from "react";
/**
 * It returns an array with three elements: the current state of the form, a function to handle input
 * changes, and a function to reset the form.
 * @returns An array with 3 elements.
 */
const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

export default useForm;
