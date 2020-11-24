import React, { useContext } from "react";
import '../../css/global_styles.css';
import styles from '../../css/info_con.module.css'
import logo from "../../logo.svg";
import userContext from "../userContext"


const InfoPage = () => {
  const { user } = useContext(userContext)
 //console.log(user)



  return (
    <div className={styles.container}>
      <div className={styles.basic_info}>
        <div className={styles.header}>
          <img className={styles.img} src={logo} alt="logo" />
          <h1>
            Sports <br />
            Siren
          </h1>
        </div>
        <div className={styles.text}>
          <p>
            SportsSiren is a notification app that allows you to follow your favorite teams and games so you never 
            miss a second of the action. Configure custom time and score thresholds to receive a notification 
            so that you can tune in to the closest games you care about. Sign up today! 
          </p>
          <h2 className={styles.subtitle}>Sports Siren lets you:</h2>
          <div className={styles.infocards}>
            <p>Follow teams and games you're interested in.</p>
            <p>Receive notifications on your phone or email.</p>
            <p>View a overview of currently happening games along with a custom excitement-index score.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPage;
