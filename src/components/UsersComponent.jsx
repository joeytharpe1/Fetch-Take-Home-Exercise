import React, { useState, useEffect } from "react";
import { getUsersData, baseUrl } from "../api/userData";
import Axios from "axios";

function UsersComponent() {
  //STATE MANAGEMENT
  const [userState, setUserState] = useState("");
  const [userOccupation, setUserOccupation] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);

  //CHECKING STATES DATA IN CONSOLE
  console.log(userState);
  console.log(userOccupation);
  console.log(userName);
  console.log(userEmail);
  console.log(userPassword);

  //EVENT HANDLING FOR INPUT AND SELECT TAGS
  const handleName = (e) => setUserName(e.target.value);
  const handleEmail = (e) => setUserEmail(e.target.value);
  const handlePassword = (e) => setUserPassword(e.target.value);
  const handleState = (e) => setUserState(e.target.value);
  const handleOccupation = (e) => setUserOccupation(e.target.value);

  //POSTING DATA TO FETCH URL FOR CREATION
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(baseUrl, {
      name: userName,
      email: userEmail,
      password: userPassword,
      occupation: userOccupation,
      state: userState,
    }).then((response) => {
      if (!response) {
        setMessage("error not created");
      } else {
        setMessage("Hi " + userName + " 👋🏾, Submitted");
      }
    });
  };

  //GETTING THE DATA FROM GET REQUEST
  useEffect(() => {
    (async () => {
      const { occupations, states } = await getUsersData();
      setOccupations(occupations);
      setStates(states);
    })();
  }, [getUsersData]);

  return (
    <div className="userForm">
      <div className="form-class">
        <form
          action={baseUrl}
          onSubmit={handleSubmit}
          autoComplete="on"
          method="POST"
        >
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={userName}
            required
            onChange={handleName}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userEmail}
            required
            onChange={handleEmail}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userPassword}
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            onChange={handlePassword}
          />

          <div>
            <label>Occupation</label>
            <select name="Occupation" onChange={handleOccupation}>
              {" "}
              <option value="">Occupation</option>
              {occupations.map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>

          <br />

          <div>
            <label>State</label>
            <select name="state" onChange={handleState}>
              <option value="">State</option>
              {states.map((state, index) => (
                <option key={index} value={state.abbreviation}>
                  {state.abbreviation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  );
}

export default UsersComponent;
