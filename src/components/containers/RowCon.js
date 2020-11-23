import React from "react";
import RowCard from "../RowCard";
import styles from "../../css/row_con.module.css";

const RowCon = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Team</h1>
      <div className={styles.lineBreak}></div>
      <div className={styles.cardContainer}>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
      </div>
    </div>
  );
};
export default RowCon;
