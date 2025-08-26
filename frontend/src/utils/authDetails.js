export const getAuthDetails = () => {
  const details = JSON.parse(localStorage.getItem("chat-app-user"));
  return details;
};
