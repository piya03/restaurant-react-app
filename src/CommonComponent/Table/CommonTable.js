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
    sortByName,
    isFetching,
    setTableDataInState,
    tableDatainState,
    changeTableData,
  } = props;
  console.log("CommonTable -> tableData", tableData);
  const { tableStyle, angleup, tag_action, tag_action2, noData } = styles;

  // checked={checked}
  // name={name}
  // onChange={onChange}
  // value={value}

  // checked={data?.bankInt || false}
  // name="bankInt"
  // value={data.bankInt}
  // onChange={e => {
  //   // setchvalue(e.target.checked);
  //   setFieldValue('bankInt', e.target.checked, true);
  //   setFieldTouched('bankInt', true, false);
  // }}

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
  const [checkboxVal, setCheckBoxVal] = useState(false);
  console.log("checkboxVal", checkboxVal);
  return (
    <div>
      <table className={`${tableStyle}`}>
        <thead>
          <tr>
            <th>
              <Checkbox
                name={checkboxVal}
                // value={setCheckBoxVal}
                // checked={checkboxVal ? true : false}
                onChange={onHeaderCheckboxChange}
              />
            </th>
            <th>
              <span>NAME </span>
              <i
                onClick={() => {
                  sortByName(tableData);
                  setTableDataInState({
                    ...tableDatainState,
                    data: [...sortByName(tableData)],
                  });
                }}
                style={{ cursor: "pointer" }}
                className={`fa fa-angle-up ${angleup}`}
              ></i>
            </th>
            <th>
              <span> LAST UPDATED</span>
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              <span>COGS %</span>
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              <span> COST PRICE (`)</span>
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              <span>SALE PRICE</span>
              <i className={`fa fa-angle-up ${angleup}`}></i>
            </th>
            <th>
              <span>GROSS MARGIN</span>
              <i className={`fa fa-angle-up ${angleup}`}></i>
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
                <td style={{ width: "260px" }}>{each?.name}</td>
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
