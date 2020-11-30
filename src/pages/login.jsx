import React, { useState } from "react";
import Axios from "axios";
import "../scss/login.scss";
import { MdEmail, MdLock } from "react-icons/md";

import { withRouter } from "react-router-dom";
import door from "../images/door.jfif";

Axios.defaults.withCredentials = true;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _login = () => {
    if (email !== "" && password !== "") {
      Axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      }).then((response) => {
        if (response.data.loginSuccess === false) {
          // console.log(response.data);
          alert("Login failed.");
        } else {
          // console.log(response.data);
          //id, name , email, password 존재
          alert("You have successfully logged in.");
          props.history.push("/");
          window.location.reload();
        }
      });
    } else {
      alert("Fill in all the blanks, please.");
    }
  };

  const _handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <img src={door} alt="" />
        <section className="login-form">
          <h1>login</h1>
          <form>
            <label htmlFor="">Email</label>
            <div>
              <MdEmail />
              <input name="email" type="text" onChange={_handleChange} />
            </div>
            <label htmlFor="">Password</label>
            <div>
              <MdLock />
              <input name="password" type="password" onChange={_handleChange} />
            </div>
            <input
              className="login-btn"
              type="button"
              value="login"
              onClick={_login}
            />
          </form>

          <p>Have not acccount yet?</p>
          <a href="/register">SIGN UP</a>
        </section>
      </div>
    </div>
  );
};

export default withRouter(Login);
