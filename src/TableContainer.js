import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CommonTable from "./CommonComponent/Table/CommonTable";
import CommonBtn from "./CommonComponent/Button/CommonBtn";
import CommonTopCard from "./CommonComponent/Card/CommonTopCard";
import axios from "axios";
function TableContainer() {
  const [activeBtn, setActiveBtn] = useState("");
  const [tableDatainState, setTableDataInState] = useState({
    isFetching: false,
    isFetched: false,
    isFailure: false,
    data: [],
  });

  function changeTableData(newTableData) {
    setTableDataInState({
      ...tableDatainState,
      data: newTableData,
    });
  }
  const { isFetching, isFetched, isFailure } = tableDatainState;
  const ref = useRef(activeBtn);
  const isLoadingRef = useRef(false);
  const tableDataRef = useRef(tableDatainState);

  tableDataRef.current = tableDatainState;
  ref.current = activeBtn;
  const tableData = tableDatainState.data;

  function setActiveAndResetData(value) {
    setActiveBtn(value);
    setTableDataInState({
      isFetching: false,
      isFetched: false,
      isFailure: false,
      data: [],
    });
    isLoadingRef.current = false;
  }
  function callTableApi() {
    // i. page: integer (mandatory)
    // ii. is_incorrect: true / false
    // iii. is_untagged: true / false
    // iv. id_disabled: true / false

    let query = "";

    if (activeBtn && activeBtn === "is_incorrect") {
      if (query) {
        query = `${query}&is_incorrect=true`;
      } else {
        query = `is_incorrect=true`;
      }
    }

    if (activeBtn && activeBtn === "is_untagged") {
      if (query) {
        query = `${query}&is_untagged=true`;
      } else {
        query = `is_untagged=true`;
      }
    }

    if (activeBtn && activeBtn === "is_disabled") {
      if (query) {
        query = `${query}&is_disabled=true`;
      } else {
        query = `is_disabled=true`;
      }
    }
    isLoadingRef.current = true;
    setTableDataInState((stateNow) => {
      return {
        ...stateNow,
        isFetching: true,
      };
    });

    // /api/v1/mock/organization/18/outlet/18/recipe/recipes/?&page=2

    let finalUrlPrefix = "";
    if (tableDataRef.current.next) {
      finalUrlPrefix = tableDataRef.current.next;
    } else {
      finalUrlPrefix = `/api/v1/mock/organization/18/outlet/18/recipe/recipes/?page=1`;
    }

    axios
      .get(
        `https://beta.eagleowl.in${finalUrlPrefix}${query ? `&${query}` : ""}`
      )
      .then((res) => {
        console.log("ref.current, activeBtn", ref.current, activeBtn);
        if (ref.current === activeBtn) {
          setTableDataInState((stateNow) => {
            return {
              ...stateNow,
              isFetched: true,
              isFailure: false,
              isFetching: false,
              ...(res?.data || {}),
              data: [...stateNow.data, ...res?.data?.results],
            };
          });
        }

        isLoadingRef.current = false;
        // setTableData([...tableData, ...res?.data?.results]);
      })
      .catch((err) => {
        setTableDataInState((stateNow) => {
          return {
            ...stateNow,
            isFailure: true,
            isFetching: false,
            isFetched: true,
          };
        });
        isLoadingRef.current = false;
      });
  }

  ///infinte scroll
  useEffect(() => {
    async function makeScroll() {
      const {
        clientHeight,
        scrollTop,
        scrollHeight,
      } = document.documentElement;

      if (clientHeight + scrollTop >= scrollHeight - 20) {
        console.log("to bottom");
        if (
          !isLoadingRef.current &&
          tableDataRef.current.next &&
          tableDataRef.current.isFetched
        ) {
          isLoadingRef.current = true;
          await callTableApi();
        }
      }
    }
    window.addEventListener("scroll", makeScroll);

    return () => {
      window.removeEventListener("scroll", makeScroll);
    };
  }, [activeBtn]);

  useEffect(() => {
    callTableApi();
  }, [activeBtn]);

  function sortByName(arr) {
    return arr.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  return (
    <div className="container">
      <div style={{ width: "100%" }}>
        <div className="common_cards">
          <CommonTopCard
            heading1="High Margin Recipes"
            order="top"
            doc="margin-group"
            showCircular={true}
          />
          <CommonTopCard
            heading1="Low Margin Recipes"
            order="bottom"
            doc="margin-group"
            showCircular={true}
          />
          <CommonTopCard
            heading1="Top Fluctuating Recipes"
            order="top"
            doc="fluctuation-group"
            showCircular={false}
          />
        </div>
      </div>

      <div className="btn_container">
        <CommonBtn
          value="ALL RECIPIE(S)"
          passStyle={{
            background: activeBtn === "" ? "#94b3f6" : "#f5f9fc",
            color: activeBtn === "" ? "white" : "black",
          }}
          onClick={() => setActiveAndResetData("")}
        />
        <CommonBtn
          value="INCORRECT"
          passStyle={{
            background: activeBtn === "is_incorrect" ? "#94b3f6" : "#f5f9fc",
            color: activeBtn === "is_incorrect" ? "white" : "black",
          }}
          onClick={() => setActiveAndResetData("is_incorrect")}
        />
        <CommonBtn
          value="UNTAGGED"
          passStyle={{
            background: activeBtn === "is_untagged" ? "#94b3f6" : "#f5f9fc",
            color: activeBtn === "is_untagged" ? "white" : "black",
          }}
          onClick={() => setActiveAndResetData("is_untagged")}
        />
        <CommonBtn
          value="DISABLED"
          passStyle={{
            background: activeBtn === "is_disabled" ? "#94b3f6" : "#f5f9fc",
            color: activeBtn === "is_disabled" ? "white" : "black",
          }}
          onClick={() => setActiveAndResetData("is_disabled")}
        />
      </div>
      <div className="table_container" style={{ width: "100%" }}>
        <CommonTable
          changeTableData={changeTableData}
          tableData={tableData}
          setTableDataInState={setTableDataInState}
          tableDatainState={tableDatainState}
          sortByName={sortByName}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}

export default TableContainer;
