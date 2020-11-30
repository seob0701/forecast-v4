import React from "react";
import { BiError } from "react-icons/bi";

const Error = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "100px",
          color: "red",
        }}
      >
        <BiError />
        <p style={{ margin: "10px" }}>404</p>
      </div>
    </div>
  );
};

export default Error;
