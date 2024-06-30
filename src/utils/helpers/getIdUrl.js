export const getIdUrl = (splitBy = 2) => {
  return window.location.pathname.split("/")[splitBy];
};
