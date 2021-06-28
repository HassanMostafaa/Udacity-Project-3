import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { _getUsers } from "../_DATA";
import { getAllUsers, deleteAllUsers } from "../redux/rootActions";

const Leaderboard = () => {
  const allUsers = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  localStorage.setItem("URL", "leaderboard page");

  useEffect(() => {
    dispatch(deleteAllUsers());

    _getUsers().then((res) => {
      var i = 0;
      for (i = 0; i < Object.keys(res).length; i++) {
        dispatch(getAllUsers([res[Object.keys(res)[i]]]));
      }
      setloading(false);
    });
  }, [dispatch]);

  const currentUser = useParams().currentUser;
  const currentUserObj = allUsers.filter((user) => user.id === currentUser);

  return (
    <div>
      {!loading && (
        <div className="nav">
          <div className="userDet">
            {currentUserObj[0] ? (
              <img
                src={`${currentUserObj[0].avatarURL}`}
                height="50px"
                alt="pic"
              />
            ) : (
              ""
            )}
            <h4 className="userName">
              {currentUserObj[0] ? currentUserObj[0].name : ""}
            </h4>
          </div>
          <div className="userDet">
            <Link to={`/home`}>Home</Link>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {!loading ? (
        <div className="loadingTest">
          {allUsers.length === 3 ? (
            <div className="content">
              <h1 className="leaderboardLabel">Leaderboard</h1>
              {allUsers
                .sort((a, b) =>
                  a.questions.length + Object.keys(a.answers).length >
                  b.questions.length + Object.keys(b.answers).length
                    ? -1
                    : 1
                )
                .map((user, index) => (
                  <div
                    key={index}
                    className={
                      currentUser === user.id
                        ? "leaderboardCard currentUser"
                        : "leaderboardCard"
                    }
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "grey",
                        }}
                      >
                        USER ID : {user.id}
                      </p>
                      <br />
                      <img
                        style={{ borderRadius: "10px" }}
                        src={user.avatarURL}
                        width="100px"
                        alt="profilePic"
                      />
                      <div>
                        <span style={{ fontWeight: "600" }}>Full Name : </span>
                        {user.name}
                      </div>
                      <div>
                        <span style={{ fontWeight: "600" }}>Questions : </span>
                        {user.questions.length}
                      </div>
                      <div>
                        <span style={{ fontWeight: "600" }}> Answers : </span>

                        {Object.keys(user.answers).length}
                      </div>
                    </div>
                    <div className="leaderboardRightSide">
                      <h2 className="rank">Rank : {index + 1}</h2>
                      <h1 className="score">
                        Score :{" "}
                        {Object.keys(user.answers).length +
                          user.questions.length}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Redirect to="/"></Redirect>
          )}
        </div>
      ) : (
        <div>
          <br />
          <h2> &nbsp; &nbsp; LOADING ....</h2>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
