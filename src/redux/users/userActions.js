import { GET_ALL_USERS, DELETE_ALL_USERS } from "./userActionTypes";

export const getAllUsers = (allUsers) => {
  return {
    type: GET_ALL_USERS,
    payload: allUsers,
  };
};
export const deleteAllUsers = () => {
  return {
    type: DELETE_ALL_USERS,
  };
};
