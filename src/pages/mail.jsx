import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../scss/write.scss";
import { withRouter } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { BiCalendarEdit } from "react-icons/bi";

const Mail = (props) => {
  const [curDate, setCurDate] = useState("");
  const [titleAndDesc, setTitleAndDesc] = useState({
    title: "",
    desc: "",
    email: "",
  });

  const [userInfo, setUserInfo] = useState([{ name: "", email: "" }]);

  const sendMail = () => {
    if (
      titleAndDesc.title === "" ||
      titleAndDesc.desc === "" ||
      titleAndDesc.email === ""
    ) {
      alert("이메일 주소, 제목, 내용을 모두 작성해주세요.");
    } else {
      Axios.post("http://localhost:3001/emailAuth", {
        title: titleAndDesc.title,
        msg: titleAndDesc.desc,
        to: titleAndDesc.email,
        email: userInfo[0].email,
      }).then((response) => console.log(response));
    }
    alert("메일이 전송되었습니다.");
    window.location.href = `/`;
  };

  const _handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitleAndDesc({ ...titleAndDesc, title: value });
    } else if (name === "desc") {
      setTitleAndDesc({ ...titleAndDesc, desc: value });
    } else {
      setTitleAndDesc({ ...titleAndDesc, email: value });
    }
  };

  const _login = () => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.user) {
        setUserInfo(response.data.user);
        // console.log(response.data.user);
      }
      // console.log(response.data.user);
      // setLoggedStatus(response.data.loggedIn);
    });
  };

  const _getEmail = () => {
    // console.log(window.location.pathname.split("/")[2]);

    if (window.location.pathname.split("/")[2]) {
      setTitleAndDesc({
        ...titleAndDesc,
        email: window.location.pathname.split("/")[2],
      });
    }

    // setLists(data);
    //데이터 뿌려주려면 배열에 저장 해줘야 함.
  };

  const _getDate = () => {
    const date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    setCurDate(`${date.getFullYear()}-${date.getMonth() + 1}-${day}`);
  };

  useEffect(() => {
    _login();
    _getEmail();
    _getDate();
  }, []);

  return (
    <div className="board">
      <div className="board-box">
        <h1>Email</h1>
      </div>

      <form action="">
        <label htmlFor="">메일 보내기</label>
        <div className="writerInfo">
          <div>
            <HiUserCircle />
            <p>{userInfo[0].name}</p>
          </div>
          <div>
            From :<p>{userInfo[0].email}</p>
          </div>
          <div>
            <label htmlFor="">To : </label>
            <input
              name="email"
              type="text"
              value={titleAndDesc.email}
              onChange={_handleChange}
            />
          </div>

          <div>
            <BiCalendarEdit />
            <p>{curDate}</p>
          </div>
        </div>
        <label htmlFor="">제목</label>
        <input
          name="title"
          type="text"
          onChange={_handleChange}
          value={titleAndDesc.title}
          style={{ fontWeight: "bold" }}
        />
        <label htmlFor="">내용</label>
      </form>
      <textarea
        className="text-box"
        name="desc"
        value={titleAndDesc.desc}
        onChange={_handleChange}
        style={{ fontWeight: "bold" }}
      ></textarea>
      <div className="write-btn">
        <button onClick={sendMail}>
          <b>전송</b>
        </button>
      </div>
    </div>
  );
};

export default withRouter(Mail);
