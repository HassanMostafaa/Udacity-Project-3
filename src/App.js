import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import { _getUsers } from "./_DATA";
import { getAllUsers, logIn, deleteAllUsers } from "./redux/rootActions";
import SelectedPoll from "./components/SelectedPoll";
import Leaderboard from "./components/Leaderboard";
import AddPoll from "./components/AddPoll";
import SelectedPollError from "./components/SelectedPollError";

function App() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userReducer.users);
  const currentUser = useSelector(
    (state) => state.currentUserReducer.currentUser
  );
  const [isLogged, setIsLogged] = useState(false);
  const [userSelected, setuserSelected] = useState(true);

  localStorage.setItem("URL", localStorage.getItem("URL"));
  const [storedURL, setstoredURL] = useState(localStorage.getItem("URL"));
  useEffect(() => {
    dispatch(deleteAllUsers());

    _getUsers().then((res) => {
      var i = 0;
      for (i = 0; i < Object.keys(res).length; i++) {
        dispatch(getAllUsers([res[Object.keys(res)[i]]]));
      }
    });
    console.log(storedURL);
  }, [dispatch, storedURL]);

  window.location.href.includes("leaderboard") &&
    localStorage.setItem("URL", "leaderboard page");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1
            className="nav"
            style={{ paddingBottom: "15px", paddingTop: "15px" }}
          >
            Would You Rather - Redux App
          </h1>
          <div className="login-card">
            <h3>Select a User</h3>
            <select
              style={{
                border: !userSelected ? "1px solid rgb(241, 142, 142)" : "",
              }}
              name="user"
              onChange={(e) => dispatch(logIn(JSON.parse(e.target.value)))}
            >
              <option value="Select User">Select User</option>
              {allUsers.map((user, ix) => (
                <option key={ix} value={JSON.stringify(user)}>
                  {user.name}
                </option>
              ))}
            </select>
            {allUsers.length > 3 && window.location.reload()}
            {!userSelected ? (
              <p
                style={{
                  marginTop: "10px",
                  color: "rgb(255, 58, 58)",
                  padding: "5px 10px",
                  background: "rgba(255, 58, 58, 0.212)",
                }}
              >
                Please , Select a user before Sigining In
              </p>
            ) : (
              ""
            )}
            <button
              onClick={() => {
                currentUser.name !== undefined
                  ? setIsLogged(true)
                  : setuserSelected(false);
              }}
            >
              Sign In
            </button>
            <br />
            <p>
              <strong>Would you rather</strong> is a conversation or party game
              that poses a dilemma in the form of a question beginning with
              "would you rather". The dilemma can be between two supposedly good
              options such as "Would you rather have the power of flight or the
              power of invisibility?", two attractive choices such as "Would you
              rather have money or have fame?", or two supposedly bad options
              such as "Would you rather sleep with your best friend's lover or
              your lover's best friend?" The players, sometimes including the
              questioner, then must choose their answers. Answering "neither" or
              "both" is against the rules. This leads the players to debate
              their rationales. <br />
              <br /> The game is played on the podcasts Comedy Bang! Bang! and
              Richard Herring's Leicester Square Theatre Podcast, the horror
              film Would You Rather, the Disney Channel TV series Coop & Cami
              Ask the World, and the BBC America game show Would You Rather...?
              with Graham Norton.
            </p>
          </div>

          {isLogged && localStorage.getItem("URL").includes("home page") && (
            <Redirect to="/home" />
          )}
          {isLogged && localStorage.getItem("URL").includes("null") && (
            <Redirect to="/home" />
          )}

          {isLogged &&
            localStorage.getItem("URL").includes("leaderboard page") && (
              <Redirect to={`/${currentUser.id}/leaderboard`} />
            )}

          {isLogged && localStorage.getItem("URL").includes("addPoll page") && (
            <Redirect to={`/${currentUser.id}/add`} />
          )}

          {isLogged &&
            localStorage.getItem("URL").includes("selected poll") && (
              <Redirect to={`/${currentUser.id}/questions/error`} />
            )}
        </Route>

        <Route exact path="/:currentUser/questions/error">
          <SelectedPollError />
        </Route>

        <Route exact path="/:currentUser/questions/:pollId">
          <SelectedPoll />
        </Route>

        <Route exact path="/:currentUser/add">
          <AddPoll />
        </Route>

        <Route exact path="/home">
          <Home currentUser={currentUser} setstoredURL={setstoredURL} />
        </Route>
        <Route exact path="/:currentUser/leaderboard">
          <Leaderboard />
        </Route>

        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
