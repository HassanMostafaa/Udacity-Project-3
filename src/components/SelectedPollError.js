import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { deleteAllQuestions } from "../redux/rootActions";
import { _getQuestions } from "../_DATA";

const SelectedPollError = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  localStorage.setItem("URL", "selected poll page");

  useEffect(() => {
    dispatch(deleteAllQuestions());
    _getQuestions().then((res) => {});
  }, [dispatch]);

  const backToHome = () => {
    history.push("/home");
  };

  return (
    <div>
      <button className="homeBtn" onClick={backToHome}>
        &#8592; Home{" "}
      </button>
      <br />
      <br />
      <br />
      <br />
      <h1>ERROR - 404 Poll Not Found</h1>
    </div>
  );
};

export default SelectedPollError;
