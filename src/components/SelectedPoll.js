import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllQuestions } from "../redux/rootActions";
import { _getQuestions, _saveQuestionAnswer } from "../_DATA";
import Swal from "sweetalert2";

const SelectedPoll = () => {
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
        history.push("/");
      }, 1500);
    } else {
      setemptyAns(true);
    }

    // return console.log("SAVE ur Aans clean up");
  }, [answer, currentUserObj, qidd, history]);

  useEffect(() => {
    dispatch(deleteAllQuestions());
    _getQuestions().then((res) => {
      setAllUsersFromData(res);
    });

    // return console.log("useEffect clearnUP");
    //}, [dispatch]);
  }, [dispatch]);

  if (thisPoll) {
    var time = new Date(thisPoll.timestamp).toLocaleDateString("en-US");
    var allVotes =
      thisPoll.optionOne.votes.length + thisPoll.optionTwo.votes.length;
  }

  const backToHome = () => {
    history.push("/");
  };

  return (
    <div>
      <button className="homeBtn" onClick={backToHome}>
        &#8592; Home{" "}
      </button>
      {thisPoll ? (
        <div className="selectedPoll">
          {/* if it's unAnswered Question !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          {!thisPoll.optionOne.votes.includes(currentUser) &&
          !thisPoll.optionTwo.votes.includes(currentUser) ? (
            <div
              className="ifUnAnswered"
              onChange={(e) => handleSubmit(e, thisPoll.id)}
            >
              <p className="pollId">Question ID : {thisPoll.id}</p>
              <img
                src={
                  thisPoll.author === "Chandler"
                    ? "/Chandler.png"
                    : thisPoll.author === "Monika"
                    ? "/Monika.jpg"
                    : thisPoll.author === "Ross" && "/Ross.jpg"
                }
                width="70px"
                alt="Author Pic"
              />
              <h4>Poll Author : {thisPoll.author}</h4>
              <p className="pollTime">Posted at {time}</p>
              <h1>
                <span>WOULD YOU RATHER</span>
              </h1>
              {/* total Votes{" "}
              {thisPoll.optionOne.votes.length +
                thisPoll.optionTwo.votes.length} */}

              <div className="option">
                <input type="radio" name="option" value="optionOne" /> &nbsp;
                <label htmlFor="optionOne">
                  Option one :{" "}
                  <span style={{ fontWeight: "700" }}>
                    {thisPoll.optionOne.text}
                  </span>
                  <br />
                </label>
              </div>
              <h3 className="or">
                <span>or</span>
              </h3>
              <div className="option">
                <input type="radio" name="option" value="optionTwo" /> &nbsp;
                <label htmlFor="optionTwo">
                  Option Two :{" "}
                  <span style={{ fontWeight: "700" }}>
                    {thisPoll.optionTwo.text}
                  </span>
                  <br />
                </label>
              </div>
              <button className="voteBtn" onClick={saveYourAnswer}>
                Vote
              </button>
              {emptyAns ? (
                <div>
                  <p
                    style={{
                      marginTop: "10px",
                      color: "rgb(255, 58, 58)",
                      padding: "5px 10px",
                      background: "rgba(255, 58, 58, 0.212)",
                    }}
                  >
                    You Must Pick an Option to be able to Vote
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div
              className="ifUnAnswered"
              onChange={(e) => handleSubmit(e, thisPoll.id)}
            >
              <p className="pollId">Question ID : {thisPoll.id}</p>
              <img
                src={
                  thisPoll.author === "Chandler"
                    ? "/Chandler.png"
                    : thisPoll.author === "Monika"
                    ? "/Monika.jpg"
                    : thisPoll.author === "Ross" && "/Ross.jpg"
                }
                width="70px"
                alt="Author Pic"
              />
              <h4>Poll Author : {thisPoll.author}</h4>
              <p className="pollTime">Posted at {time}</p>
              <h1>
                <span>WOULD YOU RATHER</span>
              </h1>
              Total Votes :{" "}
              {thisPoll.optionOne.votes.length +
                thisPoll.optionTwo.votes.length}
              <div className="option">
                <div>
                  {thisPoll.optionOne.votes.includes(currentUser)
                    ? " ✅ Your Vote "
                    : ""}{" "}
                </div>
                Option one :{" "}
                <span style={{ fontWeight: "700" }}>
                  {thisPoll.optionOne.text}{" "}
                </span>
                <br />
                <progress
                  style={{ width: "200px" }}
                  id="file"
                  value={thisPoll.optionOne.votes.length}
                  max={
                    thisPoll.optionOne.votes.length +
                    thisPoll.optionTwo.votes.length
                  }
                />
                <div>
                  <div>
                    {" "}
                    {Math.round(
                      (thisPoll.optionOne.votes.length / allVotes) * 100
                    )}
                    % ~ {thisPoll.optionOne.votes.length} out of {allVotes}{" "}
                    Voted Option One
                  </div>
                </div>
              </div>
              <h3 className="or">
                <span>or</span>
              </h3>
              <div className="option">
                <div>
                  {thisPoll.optionTwo.votes.includes(currentUser)
                    ? "✅ Your Vote"
                    : ""}{" "}
                </div>
                Option Two :{" "}
                <span style={{ fontWeight: "700" }}>
                  {thisPoll.optionTwo.text}{" "}
                </span>
                <br />
                <progress
                  id="file"
                  value={thisPoll.optionTwo.votes.length}
                  max={
                    thisPoll.optionOne.votes.length +
                    thisPoll.optionTwo.votes.length
                  }
                  style={{ width: "200px" }}
                />
                <div>
                  {" "}
                  {Math.round(
                    (thisPoll.optionTwo.votes.length / allVotes) * 100
                  )}
                  % ~ {thisPoll.optionTwo.votes.length} out of {allVotes} Voted
                  Option Two
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="selectedPoll"> LOADING ... </div>
      )}
    </div>
  );
};

export default SelectedPoll;
