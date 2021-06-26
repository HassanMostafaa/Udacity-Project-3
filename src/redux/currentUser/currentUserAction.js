import { LOG_IN } from "./currentUserActionTypes";

export const logIn = (currentUser) => {
  return {
    type: LOG_IN,
    payload: currentUser,
  };
};
