import React, { useEffect, useState, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { _getQuestions } from "../_DATA";
import { deleteAllQuestions, getAllQuestions } from "../redux/rootActions";

const Home = ({ currentUser }) => {
  const dispatch = useDispatch();
  const allQuestions = useSelector(
    (state) => state.questionsReducer.allQuestions
  );

  const cardsList = useRef();
  const [showUserAns, setShowUserAns] = useState(false);
  const [loading, setloading] = useState(true);
  const [cardListHook, setcardListHook] = useState("");

  localStorage.setItem("URL", "home page");

  useEffect(() => {
    dispatch(deleteAllQuestions());
    _getQuestions()
      .then(async (res) => {
        var i;
        for (i = 0; i < Object.keys(res).length; i++) {
          dispatch(getAllQuestions([res[Object.keys(res)[i]]]));
        }
        setloading(false);
      })
      .catch((err) => console.log("_getQuestions Error : ", err));

    let timer = setTimeout(() => {
      cardsList.current && setcardListHook(cardsList.current.children.length);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  window.location.href.includes("leaderboard") &&
    localStorage.setItem("URL", "leaderboard page");

  window.location.href.includes("add") || window.location.href.includes("/add") ?
    localStorage.setItem("URL", "addPoll page") : console.log("add or /add");

  const Chandler = "/Chandler.png";
  const Monika = "/Monika.jpg";
  const Ross = "/Ross.jpg";
  return (
    <div>
      {currentUser.name !== undefined ? (
        //HOME PAGE CONTENT
        <div>
          <div className="nav">
            <div className="userDet">
              <img src={currentUser.avatarURL} height="50px" alt="pic" />
              <h4 className="userName">{currentUser.name}</h4>
            </div>
            <div className="userDet">
              <Link to={`/${currentUser.id}/add`}>Add New Poll</Link>
              <Link to={`/${currentUser.id}/leaderboard`}>Leaderboard</Link>

              <button
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="content">
            <button
              className="toggleHomeContent"
              onClick={() => setShowUserAns(!showUserAns)}
            >
              {showUserAns
                ? "Show Unanswered Questions"
                : "Show Answered Questions"}
            </button>
            {/* ans & unAns */}
            {showUserAns && (
              <div className="useAns">
                <br />

                {!loading ? (
                  <div className="loadingTest">
                    <b></b>
                    <h1>{currentUser.id}'s Answered Questions</h1>
                    <div className="optionOneObject">
                      {/* user id exists in question optionOne votes array */}
                      {allQuestions
                        .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
                        .map((question, ix) =>
                          question.optionOne.votes.includes(currentUser.id) ? (
                            <div className="question" key={ix}>
                              <Link
                                to={`/${currentUser.id}/questions/${question.id}`}
                              >
                                <h6
                                  style={{
                                    fontWeight: "400",
                                    marginBottom: "10px",
                                    color: "grey",
                                  }}
                                  className="time"
                                >
                                  id : {question.id}
                                </h6>{" "}
                                <img
                                  src={
                                    question.author === "Chandler"
                                      ? Chandler
                                      : question.author === "Monika"
                                      ? Monika
                                      : question.author === "Ross" && Ross
                                  }
                                  width="50px"
                                  alt="AuthPic"
                                  style={{ borderRadius: "4px" }}
                                />
                                <p>Uploaded by : {question.author}</p>
                                <div className="options">
                                  <h4 className="option">
                                    ✅ You Voted Option One :{" "}
                                    {question.optionOne.text}
                                    <span
                                      style={{
                                        fontWeight: "400",
                                        display: "block",
                                      }}
                                    >
                                      Voted : {question.optionOne.votes.length}
                                    </span>
                                  </h4>
                                  <h4 className="option">
                                    Option Two : {question.optionTwo.text}
                                    <span
                                      style={{
                                        fontWeight: "400",
                                        display: "block",
                                      }}
                                    >
                                      Voted : {question.optionTwo.votes.length}
                                    </span>
                                  </h4>
                                </div>
                                <button className="seePoll">
                                  See Poll &#8594;{" "}
                                </button>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                    </div>
                    <div className="optionTwoObj">
                      {/* user id exists in question optionTwo votes array */}
                      {allQuestions
                        .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
                        .map((question, ix) =>
                          question.optionTwo.votes.includes(currentUser.id) ? (
                            <div className="question" key={ix}>
                              <Link
                                to={`/${currentUser.id}/questions/${question.id}`}
                              >
                                <h6
                                  style={{
                                    fontWeight: "400",
                                    marginBottom: "10px",
                                    color: "grey",
                                  }}
                                  className="time"
                                >
                                  id : {question.id}
                                </h6>{" "}
                                <img
                                  src={
                                    question.author === "Chandler"
                                      ? Chandler
                                      : question.author === "Monika"
                                      ? Monika
                                      : question.author === "Ross" && Ross
                                  }
                                  width="50px"
                                  alt="AuthPic"
                                  style={{ borderRadius: "4px" }}
                                />
                                <p>Uploaded by : {question.author}</p>
                                <div className="options">
                                  <h4 className="option">
                                    Option One : {question.optionOne.text}
                                    <span
                                      style={{
                                        fontWeight: "400",
                                        display: "block",
                                      }}
                                    >
                                      Voted : {question.optionOne.votes.length}
                                    </span>
                                  </h4>
                                  <h4 className="option">
                                    ✅ You Voted Option Two :{" "}
                                    {question.optionTwo.text}
                                    <span
                                      style={{
                                        fontWeight: "400",
                                        display: "block",
                                      }}
                                    >
                                      Voted : {question.optionTwo.votes.length}
                                    </span>
                                  </h4>
                                </div>
                                <button className="seePoll">
                                  See Poll &#8594;{" "}
                                </button>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )
                        )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <br />
                    <h2>LOADING ...</h2>
                  </div>
                )}
              </div>
            )}

            {!showUserAns && (
              <div className="unAnswered-questions">
                {!loading ? (
                  <div className="loadingTest">
                    <br />
                    <br />
                    <h1>{currentUser.id}'s Unaswered Questions</h1>
                    {/* allQuestions test */}
                    <div ref={cardsList}>
                      {allQuestions.map((ques, ix) =>
                        !ques.optionOne.votes.includes(currentUser.id) &&
                        !ques.optionTwo.votes.includes(currentUser.id) ? (
                          <div key={ix}>
                            <div hidden>{ix}</div>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                      {cardListHook === 0
                        ? "No Unanswered Questions"
                        : `${cardListHook} Unanswered Questions`}
                    </div>

                    {allQuestions
                      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
                      .map((question, ix) =>
                        !question.optionOne.votes.includes(currentUser.id) &&
                        !question.optionTwo.votes.includes(currentUser.id) ? (
                          <div className="question" key={ix}>
                            <Link
                              to={`/${currentUser.id}/questions/${question.id}`}
                            >
                              <h6
                                style={{
                                  fontWeight: "400",
                                  marginBottom: "10px",
                                  color: "grey",
                                }}
                                className="time"
                              >
                                id : {question.id}
                              </h6>{" "}
                              <img
                                src={
                                  question.author === "Chandler"
                                    ? Chandler
                                    : question.author === "Monika"
                                    ? Monika
                                    : question.author === "Ross" && Ross
                                }
                                width="50px"
                                alt="AuthPic"
                                style={{ borderRadius: "4px" }}
                              />
                              <p>Uploaded by : {question.author}</p>
                              <div className="options">
                                <h4 className="option">
                                  Option One : {question.optionOne.text}
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      display: "block",
                                    }}
                                  >
                                    {/* Voted : {question.optionOne.votes.length} */}
                                  </span>
                                </h4>
                                <h4 className="option">
                                  Option Two : {question.optionTwo.text}
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      display: "block",
                                    }}
                                  >
                                    {/* Voted : {question.optionTwo.votes.length} */}
                                  </span>
                                </h4>
                              </div>
                              <button className="seePoll">
                                See Poll &#8594;{" "}
                              </button>
                            </Link>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                  </div>
                ) : (
                  <div>
                    <br />
                    <h2>LOADING ...</h2>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </div>
  );
};

export default Home;
