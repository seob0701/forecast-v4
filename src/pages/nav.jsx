import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../scss/nav.scss";
import { useLocation } from "react-router-dom";
import { ImLeaf, ImMenu } from "react-icons/im";

Axios.defaults.withCredentials = true;

const Nav = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(true);
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const _logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      // console.log(response.data);
    });

    window.location.reload();
  };

  const _login = () => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.user) {
        setUserInfo(response.data.user);
      }
      // console.log(response.data.user);
      setLoggedStatus(response.data.loggedIn);
    });
  };

  useEffect(() => {
    _login();
    // console.log(userInfo);
  }, []);

  return (
    <div className="nav">
      <div className="nav-box">
        <div className="logo">
          <h2>
            <ImLeaf />
          </h2>
          <a href="/">Forecast</a>
        </div>
        <div>
          <ul className={toggle ? "nav-list" : "nav-list active"}>
            {userInfo.map((ele, key) => {
              return (
                <li style={{ backgroundColor: "white" }} key={ele.id}>
                  <a style={{ color: "#276CF5" }}>
                    {"반갑습니다, " + ele.name + " 님"}
                  </a>
                </li>
              );
            })}

            <li onClick={(location.href = "/http://localhost:3000/about")}>
              <a href="/about">소개</a>
            </li>
            <li onClick={(location.href = "/board")}>
              <a href="/board">게시판</a>
            </li>
            {loggedStatus && (
              <li onClick={(location.href = "/mail")}>
                <a href="/mail">메일</a>
              </li>
            )}
            <li onClick={_logout}>
              {loggedStatus ? (
                <a style={{ cursor: "pointer" }} onClick={_logout}>
                  로그아웃
                </a>
              ) : (
                <a href="/login">로그인</a>
              )}
            </li>

            {!loggedStatus && (
              <li onClick={(location.href = "/register")}>
                <a href="/register">회원가입</a>
              </li>
            )}
          </ul>
          <button onClick={() => setToggle(!toggle)}>
            <ImMenu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
