import React, { useState } from "react";
import styles from "./button.module.css";

function CommonBtn(props) {
  const { value, onClick, passStyle } = props;
  const { btn } = styles;
  return (
    <div>
      <button className={`${btn}`} style={passStyle} onClick={onClick}>
        {value}
      </button>
    </div>
  );
}

export default CommonBtn;
