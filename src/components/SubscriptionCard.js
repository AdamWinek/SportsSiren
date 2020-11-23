import React, { useEffect, useState, useContext } from "react";
import styles from "../css/subscription_card.module.css";
import email from "../email.svg"
import sms from "../sms.svg"
import bill from "../components/bill.gif"
import axios from "axios"
import userContext from "./userContext"

import SubEditForm from "./SubEditForm";

function SubscriptionCard(props) {

  const [game, setGame] = useState(null)
  const [editToggle, setEditToggle] = useState(false)
  let userCon = useContext(userContext)

  useEffect(() => {

    async function getGameObj() {

      let methodUrl = "https://sports-siren.herokuapp.com/api/"
      console.log(process.env.REACT_APP_DEV_ENV)
      if (process.env.REACT_APP_DEV_ENV == "development") {
        methodUrl = "http://localhost:3000/api/"
      }

      let result = await axios.get(methodUrl + `get/gameById/${props.subArray[0].identifier}`, {})
      setGame(result.data.game)

    }

    if (props.subArray != undefined && props.subArray[0].type == 'game') {
      getGameObj()

    }
  }, [props.subArray])


  function handleToggle() {

    setEditToggle(!editToggle)


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



  function handleSubscriptionWhen(sub) {
    if (sub.onEnd) {
      return "At the end of the Game"
    } else if (sub.onStart) {
      return "At the start of the Game"
    } else {
      return `With ${sub.timeCriteria} minutes left. Game is within ${sub.scoreCriteria}. `
    }
  }
  let when = null;
  if (props.subArray != undefined) {
    console.log(props.subArray)
    when = props.subArray.map((sub) => {
      return (<li>{handleSubscriptionWhen(sub)}</li>)
    })
  }


  //figure out which logo to use
  let logo = null;

  if (props.subArray != undefined) {
    if (props.subArray[0].type == "league") {
      logo = (<div>
        <h3 className={styles.title}>{props.subArray[0].identifier}</h3>

        <img src={"/LeagueLogos/" + props.subArray[0].identifier + ".gif"} alt="team logo" className={styles.logo}></img>
      </div>)

    } else if (props.subArray[0].type == "team") {
      //make call to get logo from backend by Abbr
      logo = (<div>
        <h3 className={styles.title}>{props.subArray[0].identifier}</h3>

        <img src={"/NFLLogos/" + props.subArray[0].identifier + ".gif"} alt="team logo" className={styles.logo}></img>
      </div>)


    } else if (props.subArray[0].type == "game" && game != null) {
      //get game by id
      console.log(game)
      logo = (<div>
        <h1 className={styles.gameTitle}>{game.homeTeam}</h1>
        <h4 className={styles.vs}>vs.</h4>
        <h1 className={styles.gameTitle}>{game.awayTeam}</h1>
      </div>);

    }
  }
  let editForm = null;
  if (editToggle) {
    editForm = (<SubEditForm subArray={props.subArray} handleToggle={() => handleToggle()} />)

  }




  return (
    <>

      <div className={styles.container}>
        {logo}
        <div className={styles.notification}>
          <img src={email} alt="sms logo" className={props.subArray[0].viaEmail ? styles.none : styles.greyIcon}></img>
          <img src={sms} alt="email logo" className={props.subArray[0].viaText ? styles.none : styles.greyIcon}></img>
        </div>
        <div className={styles.text}>
          <h3>Notify me when</h3>
          <ul className={styles.when}>
            {when}
          </ul>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={() => setEditToggle(!editToggle)}>Edit</button>
            <button className={styles.button} onClick={() => handleDelete()}>Delete</button>
          </div>
        </div>
      </div>
      {editForm}
    </>
  )

} export default SubscriptionCard
