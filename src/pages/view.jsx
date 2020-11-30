import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../scss/write.scss";
import { withRouter } from "react-router-dom";

const View = (props) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    title: "",
    description: "",
    date: "",
  });

  const [userInfo, setUserInfo] = useState([{ email: "" }]);

  const _handleChange = (e) => {
    if (data.email === userInfo[0].email) {
      const { name, value } = e.target;

      if (name === "title") {
        setData({ ...data, title: value });
      } else if (name === "desc") {
        setData({ ...data, description: value });
      }
    }
  };

  const _login = () => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.user) {
        setUserInfo(response.data.user);
      }
      // console.log(response.data.user);
      // setLoggedStatus(response.data.loggedIn);
    });
  };

  const _lists = () => {
    // console.log(window.location.pathname.split("/")[2]);
    Axios.post("http://localhost:3001/lists").then((response) => {
      // console.log(response.data);

      response.data.map((ele) => {
        if (ele.id === parseInt(window.location.pathname.split("/")[2])) {
          setData(ele);
        }
      });
      // setLists(data);
      //데이터 뿌려주려면 배열에 저장 해줘야 함.
    });

    // console.log(lists);
  };

  useEffect(() => {
    // console.log(window.location.pathname.split("/")[2]);
    // setArray();

    _login();
    _lists();
    console.log("useEffect");
  }, []);

  // console.log(array);
  console.log(data.title);
  console.log(userInfo[0].email);

  const _delete = () => {
    if (data.email === userInfo[0].email) {
      if (window.confirm("Are you sure you want to delete the post?")) {
        Axios.post("http://localhost:3001/delete", {
          id: data.id,
        }).then((response) => {
          console.log(response);
        });
        window.alert("The post has been deleted.");
        props.history.push("/board");
      } else {
        window.alert("Cancel the deletion.");
      }
    }
  }; //db에서 삭제

  const _edit = () => {
    if (data.email === userInfo[0].email) {
      Axios.post("http://localhost:3001/modify", {
        id: data.id,
        title: data.title,
        description: data.description,
      }).then((response) => {
        console.log(response);
      });
      alert("The post has been modified.");
      props.history.push("/board");
    }
  }; //db에서 삭제

  return (
    <div className="board">
      <div className="board-box">
        <h1>View</h1>
      </div>

      <form action="">
        <label htmlFor="">Information</label>
        <input
          name="title"
          type="text"
          value={`Writer: ${data.name}   Email: ${data.email}   Date: ${data.date}`}
          style={{ fontWeight: "bold" }}
          readOnly
        />
        <label htmlFor="">Title</label>
        <input
          name="title"
          type="text"
          onChange={_handleChange}
          value={data.title}
          style={{ fontWeight: "bold" }}
        />
        <label htmlFor="">Description</label>
      </form>
      <textarea
        className="text-box"
        name="desc"
        value={data.description}
        onChange={_handleChange}
        style={{ fontWeight: "bold" }}
      ></textarea>

      {data.email === userInfo[0].email ? (
        <div className="write-btn">
          <button style={{ backgroundColor: "#276CF5", margin: "0px 10px" }}>
            <a onClick={_edit}>Edit</a>
          </button>
          <button style={{ backgroundColor: "red", margin: "0px 10px" }}>
            <a onClick={_delete}>Delete</a>
          </button>
        </div>
      ) : (
        <div className="write-btn"></div>
      )}
    </div>
  );
};

export default withRouter(View);
