import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllQuestions } from "../redux/rootActions";
import { _getQuestions, _saveQuestionAnswer } from "../_DATA";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const SelectedPollError = () => {
  const [allUsersFromData, setAllUsersFromData] = useState({});
  const dispatch = useDispatch();
  const pollIdd = useParams();
  const currentUser = pollIdd.currentUser;
  const history = useHistory();
  const allUsers = useSelector((state) => state.userReducer.users);
  const currentUserObj = allUsers.filter((user) => user.id === currentUser);
  const thisPoll = allUsersFromData[pollIdd.pollId];
  const [qidd, setqid] = useState("");
  const [answer, setanswer] = useState("");
  const [emptyAns, setemptyAns] = useState(false);
  const [redirect, setredirect] = useState(false);

  localStorage.setItem("URL", "selected poll page");

  const handleSubmit = async (e, qid) => {
    setanswer(e.target.value);
    setqid(qid);
  };

  const saveYourAnswer = useCallback(() => {
    if (answer) {
      _saveQuestionAnswer({
        qid: qidd,
        authedUser: currentUserObj[0].id,
        answer: answer,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Answer has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/home");
      }, 1500);
    } else {
      setemptyAns(true);
    }
  }, [answer, currentUserObj, qidd, history]);

  useEffect(() => {
    dispatch(deleteAllQuestions());
    _getQuestions().then((res) => {
      setAllUsersFromData(res);
    });
  }, [dispatch]);

  if (thisPoll) {
    var time = new Date(thisPoll.timestamp).toLocaleDateString("en-US");
    var allVotes =
      thisPoll.optionOne.votes.length + thisPoll.optionTwo.votes.length;
  }

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
      <h1>ERROR PAGE</h1>
    </div>
  );
};

export default SelectedPollError;
