import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

function CommonTopCard({ heading1, order, doc, showCircular }) {
  const [cardData, setCardData] = useState([]);
  function cardDataFun() {
    axios
      .get(
        `https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/${doc}/?order=${order}`
      )
      .then((res) => {
        setCardData(res?.data?.results);
        console.log("cardDataFun -> res", res);
      })
      .catch((err) => {
        console.log("cardDataFun -> err", err);
      });
  }
  useEffect(() => {
    cardDataFun();
  }, []);
  const { card_container, heading, threeDiv, progressBar } = styles;
  return (
    <div className={`${card_container}`}>
      <div className={`${heading}`}>{heading1}</div>
      <div className={`${threeDiv}`}>
        {cardData.map((each, i) => {
          // console.log("CommonTopCard -> each", each);
          return (
            <div className={`${progressBar}`}>
              <div style={{ fontSize: "14px" }}>{each?.name}</div>
              {showCircular ? (
                <div style={{ width: "50px", marginTop: "10px" }}>
                  <CircularProgressbar
                    styles={{
                      root: {},
                      path: {
                        stroke:
                          each?.margin > 50 || each?.fluctuation > 50
                            ? "green"
                            : "red",
                      },
                      text: {
                        fill:
                          each?.margin > 50 || each?.fluctuation > 50
                            ? "green"
                            : "red",
                      },
                    }}
                    value={each?.margin || each?.fluctuation}
                    text={`${each?.margin || each?.fluctuation}%`}
                  />
                </div>
              ) : (
                <div
                  style={{
                    color: each?.fluctuation > 50 ? "green" : "red",

                    borderTop: "2px solid #cac5c5",
                    paddingTop: "10px",
                  }}
                >
                  {each?.fluctuation}%
                  <i
                    style={{
                      transform:
                        each?.fluctuation > 50
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                    }}
                    className="fa fa-arrow-up"
                  ></i>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommonTopCard;
