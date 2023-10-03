export const AuthToken = () => {
  const authToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("authToken="))
    ?.split("=")[1];

  if (!authToken) {
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authToken}`,
    },
  };
  return config;
};
