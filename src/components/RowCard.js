import React, { useState } from "react";
import NFLScorecard from "../components/NFLScorecard";
import styles from "../css/row_card.module.css";
import bill from "./bill.gif";
import NewSubForm from "./NewSubForm";

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

  function handleToggle() {

    SetForm(!displayForm)


  }

  if (props.type == "league") {
    return (
      <div className={styles.container}>
        {!displayForm && (
          <div className={styles.card}>
            <h2>NFL</h2>
            <img src={"/LeagueLogos/NFL.gif"} className="" alt=""></img>
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
        {displayForm && <NewSubForm type={props.type} identifier="NFL" handleToggle={() => handleToggle()} />}
      </div>
    );
  } else if (props.type == "team") {
    return (
      <div className={styles.container}>
        {!displayForm && (
          <div className={styles.card}>
            <h2>{props.team}</h2>
            <img
              src={"/NFLLogos/" + props.team + ".gif"}
              className=""
              alt=""
            ></img>
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
        {displayForm && <NewSubForm type={props.type} identifier={props.team} handleToggle={() => handleToggle()} />}
      </div>
    );
  } else if (props.type == "game") {
    return (
      <div className={styles.container}>
        <NFLScorecard game={props.game}></NFLScorecard>
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
    );
  }
};
export default RowCard;
