import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../scss/nav.scss";
import { ImLeaf, ImMenu } from "react-icons/im";

Axios.defaults.withCredentials = true;

const Nav = () => {
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
                  <a style={{ color: "#276CF5" }}>{"Hello, " + ele.name}</a>
                </li>
              );
            })}

            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/board">Board</a>
            </li>
            <li>
              {loggedStatus ? (
                <a style={{ cursor: "pointer" }} onClick={_logout}>
                  Log out
                </a>
              ) : (
                <a href="/login">Log in</a>
              )}
            </li>
            {!loggedStatus && (
              <li>
                <a href="/register">Register</a>
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
