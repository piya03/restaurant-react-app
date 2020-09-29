import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./table.module.css";
import Checkbox from "../../CommonComponent/CheckBox/Checkbox";
import { CircularProgress } from "@material-ui/core";
function getFormattedDate(str) {
  return moment(str).format("MMM DD, YYYY");
}
const CommonTable = (props) => {
  const {
    tableData,

    isFetching,

    changeTableData,

    sortInfo,
    setSortInfo,
  } = props;
  const { tableStyle, angleup, tag_action, tag_action2, noData } = styles;

  function onHeaderCheckboxChange(e) {
    const isChecked = e.target.checked;

    const newTableData = tableData.map((each) => {
      return {
        ...each,
        checked: isChecked,
      };
    });
    changeTableData(newTableData);
  }

  function arrowStyles(key) {
    return sortInfo.key == key && sortInfo.order === "DESC"
      ? {
          transform: "rotateZ(180deg)",
          transformOrigin: "center",
        }
      : { transform: "rotateZ(0deg)" };
  }
  return (
    <div>
      <table className={`${tableStyle}`}>
        <thead>
          <tr>
            <th>
              <Checkbox onChange={onHeaderCheckboxChange} />
            </th>
            <th
              onClick={() => {
                setSortInfo({
                  key: "name",
                  order: sortInfo.order === "ASC" ? "DESC" : "ASC",
                });
              }}
            >
              <span>NAME </span>
              <i
                style={{
                  ...arrowStyles("name"),
                }}
                className={`fa fa-angle-up ${angleup}`}
              ></i>
            </th>
            <th
              onClick={() => {
                setSortInfo({
                  key: "last_updated",
                  order: sortInfo.order === "ASC" ? "DESC" : "ASC",
                });
              }}
            >
              <span> LAST UPDATED</span>
              <i
                className={`fa fa-angle-up ${angleup}`}
                style={{
                  ...arrowStyles("last_updated"),
                }}
              ></i>
            </th>
            <th
              onClick={() => {
                setSortInfo({
                  key: "cogs",
                  order: sortInfo.order === "ASC" ? "DESC" : "ASC",
                });
              }}
            >
              <span>COGS %</span>
              <i
                className={`fa fa-angle-up ${angleup}`}
                style={{
                  ...arrowStyles("cogs"),
                }}
              ></i>
            </th>
            <th
              onClick={() => {
                setSortInfo({
                  key: "cost_price",
                  order: sortInfo.order === "ASC" ? "DESC" : "ASC",
                });
              }}
            >
              <span> COST PRICE ($)</span>
              <i
                className={`fa fa-angle-up ${angleup}`}
                style={{
                  ...arrowStyles("cost_price"),
                }}
              ></i>
            </th>
            <th
              onClick={() => {
                setSortInfo({
                  key: "sale_price",
                  order: sortInfo.order === "ASC" ? "DESC" : "ASC",
                });
              }}
            >
              <span>SALE PRICE</span>
              <i
                className={`fa fa-angle-up ${angleup}`}
                style={{
                  ...arrowStyles("sale_price"),
                }}
              ></i>
            </th>
            <th
              onClick={() => {
                setSortInfo({
                  key: "gross_margin",
                  order: sortInfo.order === "ASC" ? "DESC" : "ASC",
                });
              }}
            >
              <span>GROSS MARGIN</span>
              <i
                className={`fa fa-angle-up ${angleup}`}
                style={{
                  ...arrowStyles("gross_margin"),
                }}
              ></i>
            </th>
            <th>TAG/ ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((each) => {
            return (
              <tr key={each?.id}>
                <td>
                  <Checkbox
                    name={each.name || false}
                    value={each?.id}
                    checked={each?.checked}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const newTableData = tableData.map((item) => {
                        return {
                          ...item,
                          checked:
                            item?.id === each?.id ? isChecked : item.checked,
                        };
                      });
                      changeTableData(newTableData);
                    }}
                  />
                </td>
                <td>{each?.name}</td>
                <td>{getFormattedDate(each?.last_updated.date)}</td>
                <td>{each?.cogs}%</td>
                <td>{each?.cost_price.toFixed(2)}</td>
                <td>{each?.sale_price.toFixed(2)}</td>
                <td>{each?.gross_margin.toFixed(3)}</td>
                <td>
                  <span className={`${tag_action}`}>Indian Maa</span>
                  <span className={`${tag_action2}`}> Indian Maa</span>
                </td>
              </tr>
            );
          })}
          {tableData.length == 0 && !isFetching && (
            <div className={`${noData}`}>There is no data to display</div>
          )}
          {isFetching && (
            <div className={`${noData}`}>
              <CircularProgress />
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
