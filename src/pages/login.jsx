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
          alert("로그인에 실패하였습니다.");
        } else {
          // console.log(response.data);
          //id, name , email, password 존재
          alert("로그인에 성공하였습니다.");
          props.history.push("/");
          window.location.reload();
        }
      });
    } else {
      alert("입력사항을 모두 작성해주세요.");
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
          <h1>로그인</h1>
          <form>
            <label htmlFor="">이메일</label>
            <div>
              <MdEmail />
              <input name="email" type="text" onChange={_handleChange} />
            </div>
            <label htmlFor="">비밀번호</label>
            <div>
              <MdLock />
              <input name="password" type="password" onChange={_handleChange} />
            </div>
            <input
              className="login-btn"
              type="button"
              value="로그인"
              onClick={_login}
            />
          </form>

          <p>
            <a href="/register">회원가입</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default withRouter(Login);
