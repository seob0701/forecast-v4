import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../scss/write.scss";

import { withRouter } from "react-router-dom";

const Write = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const _login = () => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.user) {
        setName(response.data.user[0].name);
        setEmail(response.data.user[0].email);
      }
      // console.log(response.data.user);
    });
  };

  const _save = () => {
    if (title !== "" && desc !== "") {
      Axios.post("http://localhost:3001/write", {
        name: name,
        email: email,
        title: title,
        desc: desc,
        date: date,
      }).then((response) => {
        console.log(response);
      });
      alert("It has been saved.");
      props.history.push("/board");
    } else {
      alert("Fill in all the blanks, please.");
    }
  };

  function getFormatDate(date) {
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장

    return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  }

  useEffect(() => {
    _login();
    let currentDate = new Date();
    currentDate = getFormatDate(currentDate);
    setDate(currentDate); //날짜저장

    // console.log(userInfo);
  }, []);

  const _handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setDesc(value);
    }
  };

  return (
    <div className="board">
      <div className="board-box">
        <h1>Board</h1>
      </div>
      <form action="">
        <label htmlFor="">Title</label>
        <input name="title" type="text" onChange={_handleChange} />
        <label htmlFor="">Description</label>
      </form>

      <textarea
        className="text-box"
        name="desc"
        id=""
        onChange={_handleChange}
      ></textarea>
      <div className="write-btn">
        <button>
          <a onClick={_save}>Save</a>
        </button>
      </div>
    </div>
  );
};

export default withRouter(Write);
