import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { _saveQuestion } from "../_DATA";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddPoll = () => {
  const currentUserParam = useParams().currentUser;
  const [optionOneVal, setoptionOneVal] = useState("");
  const [optionTwoVal, setoptionTwoVal] = useState("");
  const history = useHistory();
  const allUsers = useSelector((state) => state.userReducer.users);
  const currentUserObj = allUsers.filter(
    (user) => user.id === currentUserParam
  );
  const [emptyInputs, setemptyInputs] = useState(false);

  localStorage.setItem("URL", "addPoll page");

  const addPoll = () => {
    if (optionTwoVal !== "" && optionOneVal !== "") {
      _saveQuestion({
        optionOneText: optionOneVal,
        optionTwoText: optionTwoVal,
        author: currentUserParam,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "New Poll has been Created",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/home");
      }, 1500);
    } else {
      setemptyInputs(true);
    }
  };

  const backToHome = () => {
    history.push("/home");
  };

  return (
    <div className="newPoll">
      <button className="homeBtn" onClick={backToHome}>
        &#8592; Home{" "}
      </button>
      <h2>
        Create New Poll As : {currentUserObj[0] && currentUserObj[0].name}
      </h2>
      <br />

      <div className="form">
        {emptyInputs ? (
          <div
            style={{
              marginTop: "10px",
              color: "rgb(255, 58, 58)",
              padding: "5px 10px",
              background: "rgba(255, 58, 58, 0.212)",
              textAlign: "left",
            }}
          >
            Please, Fill In All the form
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          className={emptyInputs ? "emptyInputs" : ""}
          value={optionOneVal}
          onChange={(e) => setoptionOneVal(e.target.value)}
          placeholder="Option One ..."
        />

        <input
          type="text"
          className={emptyInputs ? "emptyInputs" : ""}
          value={optionTwoVal}
          onChange={(e) => setoptionTwoVal(e.target.value)}
          placeholder="Option Two ..."
        />
        <button onClick={addPoll}> Add a New Poll </button>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
};

export default AddPoll;
