import React, { useState } from "react";
import styles from "./style.module.css";

function Checkbox(props) {
  const { name, value, checked, onChange } = props;
  const { container, checkmark } = styles;
  return (
    <div>
      <label className={`${container}`}>
        <input
          type="checkbox"
          checked={checked}
          name={name}
          onChange={onChange}
          value={value}
        />
        <span className={`${checkmark}`}></span>
      </label>
    </div>
  );
}

export default Checkbox;
