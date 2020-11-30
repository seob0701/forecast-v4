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
        alert("회원가입이 완료되었습니다.");
        props.history.push("/login");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("입력사항을 모두 작성해주세요.");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <img src={door} alt="" />
        <section className="login-form">
          <h1>회원가입</h1>
          <form>
            <label htmlFor="">이름</label>
            <div>
              <FaUserCircle />
              <input name="name" type="text" onChange={_handleChange} />
            </div>
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
            <label htmlFor="">비밀번호 확인</label>
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
              value="회원가입"
              onClick={_register}
            />
          </form>

          <p>
            <a href="/login">로그인</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default withRouter(Register);
