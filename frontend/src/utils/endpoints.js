// export const host = "http://localhost:5000";
export const host = "";

export const endpoints = {
  registerEndpoint: `${host}/api/auth/register`,
  loginEndpoint: `${host}/api/auth/login`,
  setAvatarEndpoint: `${host}/api/auth/setAvatar`,
  allUsersEndpoint: `${host}/api/auth/allUsers`,
  addMessageEndpoint: `${host}/api/messages/addMessage`,
  getMessagesEndpoint: `${host}/api/messages/getMessages`,
};
