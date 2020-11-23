import React, { useEffect, useState } from "react";
import HomeNav from "../components/HomeNav";
import RowCon from "../components/containers/RowCon";
import styles from "../css/explore_page.module.css";

const ExplorePage = (props) => {
  return (
    <>
      <HomeNav active={"Explore"} />
      <div className={styles.body}>
        <h1>Explore </h1>
        <RowCon></RowCon>
      </div>
    </>
  );
};
export default ExplorePage;
