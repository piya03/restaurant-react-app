import React, { useState } from "react";
import styles from "./card.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CommonTopCard(props) {
  const { card_container, heading, threeDiv, progressBar } = styles;
  return (
    <div className={`${card_container}`}>
      <div className={`${heading}`}>heading</div>
      <div className={`${threeDiv}`}>
        <div className={`${progressBar}`}>
          <div>Ambur Biryani</div>
          <div style={{ width: "50px", marginTop: "10px" }}>
            <CircularProgressbar
              value={10}
              maxValue={1}
              text={`${10 * 100}%`}
            />
          </div>{" "}
        </div>
        <div className={`${progressBar}`}>
          <div>Paneer Tikka Masala</div>
          <div style={{ width: "50px", marginTop: "10px" }}>
            <CircularProgressbar
              value={10}
              maxValue={1}
              text={`${10 * 100}%`}
            />
          </div>{" "}
        </div>
        <div className={`${progressBar}`}>
          <div>Palak paneer butter masala</div>
          <div style={{ width: "50px", marginTop: "10px" }}>
            <i class="fa fa-long-arrow-alt-up"></i>
            <i class="fa fa-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonTopCard;
