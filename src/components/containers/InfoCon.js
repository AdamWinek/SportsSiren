import React from "react";
import '../../css/global_styles.css';
import styles from '../../css/info_con.module.css'
import logo from "../../logo.svg";


const InfoPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.basic_info}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h1>
            Sports <br />
            Siren
          </h1>
        </div>
        <div className={styles.text}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </p>
          <h2 className={styles.subtitle}>Sports Siren lets you</h2>
          <div className={styles.infocards}>
            <p>Lorem ipsum dolor sit amet, consectet and finish</p>
            <p>Lorem ipsum dolor sit amet, consectet and finish</p>
            <p>Lorem ipsum dolor sit amet, consectet and finish</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPage;
