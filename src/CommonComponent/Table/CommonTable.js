import React from "react";
import styles from "./table.module.css";
import Checkbox from "../../CommonComponent/CheckBox/Checkbox";
import CommonBtn from "../Button/CommonBtn";
const CommonTable = ({ tableData }) => {
  const { tableStyle, angleup, tag_action, tag_action2 } = styles;

  return (
    <div>
      <table className={`${tableStyle}`}>
        <thead>
          <tr>
            <th>
              <Checkbox />
            </th>
            <th>
              NAME <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              LAST UPDATED
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              COGS %<i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              COST PRICE (`)
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              SALE PRICE
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              GROSS MARGIN
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>TAG/ ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((each) => {
            console.log("CommonTable -> each", each);
            return (
              <tr key={each?.id}>
                <td>
                  <Checkbox />
                </td>
                <td style={{ width: "300px" }}>{each?.name}</td>
                <td>{each?.last_updated.date}</td>
                <td>{each?.cogs}</td>
                <td>{each?.cost_price}</td>
                <td>{each?.sale_price}</td>
                <td>{each?.gross_margin}</td>
                <td>
                  <span className={`${tag_action}`}>Indian Maa</span>
                  <span className={`${tag_action2}`}> Indian Maa</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
