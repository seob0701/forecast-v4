import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../scss/board.scss";

import { withRouter } from "react-router-dom";

const Board = (props) => {
  const [lists, setLists] = useState([]);
  const [pages, setPages] = useState([]);

  // const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(5);

  const _lists = () => {
    Axios.post("http://localhost:3001/lists").then((response) => {
      setLists(response.data);
      //데이터 뿌려주려면 배열에 저장 해줘야 함.
    });
  };

  const _handleClick = (ele) => {
    window.location.href = `/view/${ele.id}`;
  };

  const _pageClick = (num) => {
    let page = num * 5;
    // console.log(page);
    // console.log(count);

    Axios.post("http://localhost:3001/page", {
      page: page,
      count: count,
    }).then((response) => {
      // console.log(response);
      setPages(response.data);
    });
    // setLimit(page);

    // console.log(limit);
  };

  useEffect(() => {
    _lists();

    Axios.post("http://localhost:3001/page", {
      page: 0,
      count: count,
    }).then((response) => {
      // console.log(response);
      let currentData = response.data;

      setPages(response.data);
    });
  }, []);

  // console.log(lists);
  console.log(pages);

  return (
    <div className="board">
      <div className="board-box">
        <h1>Board</h1>
        <table className="type10">
          <thead>
            <tr>
              <th scope="cols">#</th>
              <th scope="cols">Title</th>
              <th scope="cols">Name</th>
              <th scope="cols">Date</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((ele, index) => {
              return (
                <tr key={ele.id} onClick={() => _handleClick(ele)}>
                  <th scope="row">{index}</th>
                  <td>
                    <p>{ele.title}</p>
                  </td>
                  <th>{ele.name}</th>
                  <th>{ele.date}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="page-count">
        {lists.map((ele, key) => {
          if (key % 5 === 0) {
            return (
              <button key={key} onClick={() => _pageClick(key / 5)}>
                {key / 5}
              </button>
            );
          }
        })}
      </div>
      <div className="write-btn">
        <button>
          <a href="/write">Writing</a>
        </button>
      </div>
      <div className="shop_btn">
        <h3>쇼핑몰 바로가기</h3>
        <button style={{ background: "#e73302" }}>
          <a
            href="http://search.11st.co.kr/Search.tmall?kwd=%25EB%25B0%25B0%25EC%25B6%2594%25201%25ED%258F%25AC%25EA%25B8%25B0"
            target="_blank"
          >
            11번가
          </a>
        </button>
        <button style={{ background: "#28E702" }}>
          <a
            href="https://browse.gmarket.co.kr/search?keyword=%EB%B0%B0%EC%B6%941%ED%8F%AC%EA%B8%B0"
            target="_blank"
          >
            G마켓
          </a>
        </button>
        <button style={{ background: "#E77F02" }}>
          <a
            href="https://search.tmon.co.kr/search/?keyword=%EB%B0%B0%EC%B6%94%201%ED%8F%AC%EA%B8%B0"
            target="_blank"
          >
            티몬
          </a>
        </button>
      </div>
    </div>
  );
};

export default withRouter(Board);
