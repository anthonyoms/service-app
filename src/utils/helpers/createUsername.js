export const createUsername = ({ target: { value } }) => {
  const arrayUsername = value.split("");
  if (arrayUsername.includes("@")) {
    const username = value.split("@")[0];
    return {
      target: {
        name: "usuario",
        value: `${username}${Math.floor(Math.random() * 1000)}`,
      },
    };
  }
};
