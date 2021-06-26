import { GET_ALL_USERS, DELETE_ALL_USERS } from "./userActionTypes";

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: state.users.concat(action.payload) };
    case DELETE_ALL_USERS:
      const emptyUsersArr = [];
      return {
        users: emptyUsersArr,
      };
    default:
      return state;
  }
};

export default userReducer;
