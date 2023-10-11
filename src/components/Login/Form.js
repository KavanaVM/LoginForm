import React from "react";
import "./Form.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [goToDashboard, setGoToDashboard] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
  };

  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email or phone number is required";
    } else {
        setGoToDashboard(true);
    }
    if (!password) {
      error.password = "Password cannot be empty";
    } else {
        setGoToDashboard(true);
    }
    return error;
  };
  if (goToDashboard){
    return <Navigate to='/dashboard' />;
  }
  return (
    <div className="container">
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="email"
              placeholder="Email address or phone number"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="inputs">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit">
            Log in
          </button>
          <div className="forgotten-password">
            <a href="#">Forgotten password?</a>
          </div>
          <div className="createnew">Create new account</div>
        </form>
      </div>
    </div>
  );
}

export default Form;
