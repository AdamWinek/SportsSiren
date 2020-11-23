import React, { useEffect, useState } from "react";
import HomeNav from "../components/HomeNav";
import RowCon from "../components/containers/RowCon";
import styles from "../css/explore_page.module.css";
import SearchBar from "../components/SearchBar";

const ExplorePage = (props) => {


  const [reloadCount, setReloadCount] = useState(0)


  function reloadPage() {
    setReloadCount(reloadCount + 1)
  }



  return (
    <>
      <HomeNav active={"Explore"} />
      <div className={styles.body}>
        <h1 className={styles.title}>Explore </h1>
        <SearchBar reloadPage={() => reloadPage()} />
        <RowCon type="league"></RowCon>
        <RowCon type="team" reloadCount={reloadCount}></RowCon>
        <RowCon type="game"></RowCon>
      </div>
    </>
  );
};
export default ExplorePage;
