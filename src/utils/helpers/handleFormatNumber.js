export const handleFormatNumber = (e) => {
  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
  if (onlyNums.length < 10) {
    return { target: { name: e.target.name, value: onlyNums } };
  } else if (onlyNums.length === 10) {
    const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    return { target: { name: e.target.name, value: number } };
  }
};
