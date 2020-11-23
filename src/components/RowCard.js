import React, { useState } from "react";
import styles from "../css/row_card.module.css";
import bill from "./bill.gif";

const RowCard = (props) => {
  const [Subscribed, SetSubscribed] = useState(false);
  const [displayForm, SetForm] = useState(false);

  const onSubscribe = (e) => {
    if (!Subscribed) {
      SetForm(!displayForm);
    } else {
    }
    SetSubscribed(!Subscribed);
  };

  /*
    
    if (props.type == "") {
        return();

    } else if () {
        return();

    } else {
        return();

    }
    */
  return (
    <div className={styles.container}>
      {!displayForm && (
        <div className={styles.card}>
          <h2>Buffalo Bills</h2>
          <img src={bill} className="" alt=""></img>
          {Subscribed ? (
            <button className={styles.btn} onClick={(e) => onSubscribe(e)}>
              Subscribe
            </button>
          ) : (
            <button className={styles.btnun} onClick={(e) => onSubscribe(e)}>
              Unsubscribe
            </button>
          )}
        </div>
      )}
      {displayForm && (
        <div className={styles.form}>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <button onClick={() => SetForm(!displayForm)}>click em</button>
          <h1>hey</h1>
        </div>
      )}
    </div>
  );
};
export default RowCard;
