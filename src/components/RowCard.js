import React, { useState } from "react";
import NFLScorecard from "../components/NFLScorecard";
import styles from "../css/row_card.module.css";
import bill from "./bill.gif";
import NewSubForm from "./NewSubForm";
import axios from "axios"

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


  async function handleDelete() {

    // delete results
    let methodUrl = "https://sports-siren.herokuapp.com/api/"
    console.log(process.env.REACT_APP_DEV_ENV)
    if (process.env.REACT_APP_DEV_ENV == "development") {
      methodUrl = "http://localhost:3000/api/"
    }

    let result = await axios.post(methodUrl + `delete/subscriptions`, {

      subs: props.subArray

    })
    props.reloadCards()



  };








  if (props.type == "league") {
    console.log(!props.hasSubbed)
    return (
      <div className={styles.container}>
        {!displayForm && (
          <div className={styles.card}>
            <h2>NFL</h2>
            <img src={"/LeagueLogos/NFL.gif"} className="" alt=""></img>
            {!props.hasSubbed ? (
              <button className={styles.btn} onClick={(e) => onSubscribe(e)}>
                Subscribe
              </button>
            ) : (
                <button className={styles.btnun} onClick={() => handleDelete()}>
                  Unsubscribe
                </button>
              )}
          </div>
        )}
        {displayForm && <NewSubForm type={props.type} reloadCards={() => props.reloadCards()} identifier="NFL" handleToggle={() => handleToggle()} />}
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
            {!props.hasSubbed ? (
              <button className={styles.btn} onClick={(e) => onSubscribe(e)}>
                Subscribe
              </button>
            ) : (
                <button className={styles.btnun} onClick={() => handleDelete()}>
                  Unsubscribe
                </button>
              )}
          </div>
        )}
        {displayForm && <NewSubForm type={props.type} identifier={props.team} reloadCards={() => props.reloadCards()} handleToggle={() => handleToggle()} />}
      </div>
    );
  } else if (props.type == "game") {
    return (
      <div className={styles.container}>
        {!displayForm ? (
          <>
            <NFLScorecard game={props.game}></NFLScorecard>
            {!props.hasSubbed ? (
              <button className={styles.btn} onClick={(e) => onSubscribe(e)}>
                Subscribe
              </button>
            ) : (
                <button className={styles.btnun} onClick={() => handleDelete()}>
                  Unsubscribe
                </button>
              )}
          </>
        ) : <NewSubForm type={props.type} identifier={props.game.gameId} reloadCards={() => props.reloadCards()} handleToggle={() => handleToggle()} />}
      </div>
    );
  }
};
export default RowCard;
