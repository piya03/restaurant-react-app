import React, { useState, useEffect } from "react";
import "./App.css";
import CommonTable from "./CommonComponent/Table/CommonTable";
import CommonBtn from "./CommonComponent/Button/CommonBtn";
import CommonTopCard from "./CommonComponent/Card/CommonTopCard";
import axios from "axios";
function TableContainer() {
  const [tableData, setTableData] = useState([]);
  console.log("TableContainer -> tableData", tableData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes/?page=${page}`
      )
      .then((res) => {
        setTableData(res?.data?.results);
        console.log("TableContainer -> res", res);
      })
      .catch((err) => {
        console.log("TableContainer -> err", err);
      });
  }, []);
  return (
    <div className="container">
      <div className="common_cards">
        <CommonTopCard />
        <CommonTopCard />
        <CommonTopCard />
      </div>

      <div className="btn_container">
        <CommonBtn value="ALL RECIPIE(S)" />
        <CommonBtn value="INCORRECT" />
        <CommonBtn value="UNTAGGED" />
        <CommonBtn value="DISABLED" />
      </div>
      <div className="table_container">
        <CommonTable tableData={tableData} />
      </div>
    </div>
  );
}

export default TableContainer;
