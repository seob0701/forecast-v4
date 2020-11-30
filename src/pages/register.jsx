import React, { useState } from "react";
import Axios from "axios";
import "../scss/login.scss";
import { MdEmail, MdLock } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import door from "../images/door.jfif";

import { withRouter } from "react-router-dom";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const _handleChange = (e) => {
    const { name } = e.target;

    if (name === "name") {
      setName(e.target.value);
    } else if (name === "email") {
      setEmail(e.target.value);
    } else if (name === "password") {
      setPassword(e.target.value);
    } else {
      setPasswordConfirm(e.target.value);
    }
  };

  const _register = () => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (password === passwordConfirm) {
        Axios.post("http://localhost:3001/register", {
          name: name,
          email: email,
          password: password,
        }).then((response) => {
          console.log(response);
        });
        alert("Your subscription has been completed successfully.");
        props.history.push("/login");
      } else {
        alert("Password does not match.");
      }
    } else {
      alert("Fill in all the blanks, please.");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <img src={door} alt="" />
        <section className="login-form">
          <h1>register</h1>
          <form>
            <label htmlFor="">Name</label>
            <div>
              <FaUserCircle />
              <input name="name" type="text" onChange={_handleChange} />
            </div>
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
            <label htmlFor="">Password Confirm</label>
            <div>
              <MdLock />
              <input
                name="passwordConfirm"
                type="password"
                onChange={_handleChange}
              />
            </div>
            <input
              className="login-btn"
              type="button"
              value="register"
              onClick={_register}
            />
          </form>

          <p>Do you have an acccount?</p>
          <a href="/login">SIGN IN</a>
        </section>
      </div>
    </div>
  );
};

export default withRouter(Register);
