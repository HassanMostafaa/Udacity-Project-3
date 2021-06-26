import {
  ADD_NEW_POLL,
  DELETE_ALL_QUESTIONS,
  GET_ALL_QUESTIONS,
  GET_ANSWERED_QUESTIONS,
  GET_UNANSWERED_QUESTIONS,
} from "./questionsActionTypes";

export const getAllQuestions = (allQuestions) => {
  return {
    type: GET_ALL_QUESTIONS,
    payload: allQuestions,
  };
};

export const getAnsweredQuestions = (currentUserAnswersID) => {
  return {
    type: GET_ANSWERED_QUESTIONS,
    currentUserAnswersID: currentUserAnswersID,
  };
};

export const getUnAnsweredQuestions = (currentUserAnswers) => {
  return {
    type: GET_UNANSWERED_QUESTIONS,
    currentUserAnswers: currentUserAnswers,
  };
};

export const deleteAllQuestions = () => {
  return {
    type: DELETE_ALL_QUESTIONS,
  };
};

export const addNewPoll = (poll) => {
  return {
    type: ADD_NEW_POLL,
    payload: poll,
  };
};
