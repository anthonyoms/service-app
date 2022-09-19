const textFieldValidation = (e, regex) => {
  // if value is not blank, then test the regex

  if (e.target.value === "" || regex.test(e.target.value)) {
    return e;
  }

  return "";
};

module.exports = {
  textFieldValidation,
};
