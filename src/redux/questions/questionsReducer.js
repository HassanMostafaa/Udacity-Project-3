import {
  GET_ALL_QUESTIONS,
  GET_ANSWERED_QUESTIONS,
  DELETE_ALL_QUESTIONS,
  ADD_NEW_POLL,
} from "./questionsActionTypes";

const initialState = {
  allQuestions: [],
  unAnsweredQuestions: [],
  AnsweredQuestions: [],
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        allQuestions: state.allQuestions.concat(action.payload),
      };
    case GET_ANSWERED_QUESTIONS:
      return {
        ...state,
      };
    case DELETE_ALL_QUESTIONS:
      const emptyQuestionsArr = [];
      return {
        ...state,
        allQuestions: emptyQuestionsArr,
      };
    case ADD_NEW_POLL:
      return {
        ...state,
        allQuestions: state.allQuestions.concat(action.payload),
      };
    default:
      return state;
  }
};
export default questionsReducer;
