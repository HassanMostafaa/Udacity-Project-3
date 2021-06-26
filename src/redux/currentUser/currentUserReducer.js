import { LOG_IN } from "./currentUserActionTypes";

const initailState = {
  // currentUser: [],
  currentUser: {},
};

const currentUserReducer = (state = initailState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        // currentUser: state.currentUser.concat(action.payload),
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
