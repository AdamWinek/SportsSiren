import React from "react";
import styles from "../css/subscription_card.module.css";
import bill from "./bill.gif";
import email from "../email.svg"
import sms from "../sms.svg"

const SubscriptionCard = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>Buffalo Bills</h3>
        <img src={bill} alt="team logo" className={styles.logo}></img>
      </div>
      <div className={styles.notification}>
        <img src={email} alt="sms logo" className={styles.icon}></img>
        <img src={sms} alt="email logo" className={styles.icon}></img>
      </div>
      <div className={styles.text}>
        <h3>Notify me when</h3>
        <ul>
          <li>The start of the game</li>
          <li>Three minutes till the end</li>
        </ul>
        <div className={styles.buttons}>
          <button className={styles.button}>Edit</button>
          <button className={styles.button}>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionCard;
