import React, { useContext, useState } from "react";
import CountDowncard from "../CountDowncard"
import RowCard from "../RowCard";
import axios from "axios"
import { useParams } from "react-router-dom";
import styles from "../../css/game_con.module.css"
import userContext from "../userContext";

function GameCon(props) {
  let { gameId } = useParams();
 //console.log(gameId);
  const [game, SetGame] = useState(null);

  let userCon = useContext(userContext)


  let exampleId = "ad737947-20e3-439a-908a-a0b65eefbc2e";
  let methodUrl = "https://sports-siren.herokuapp.com/api/"
 //console.log(process.env.REACT_APP_DEV_ENV)
  if (process.env.REACT_APP_DEV_ENV == "development") {
    methodUrl = "http://localhost:3000/api/"
  }


  // request Scorecard
  let getGame = async () => {
   //console.log("here");
    methodUrl = "https://sports-siren.herokuapp.com/api/";
   //console.log(process.env.REACT_APP_DEV_ENV);
    if (process.env.REACT_APP_DEV_ENV == "development") {
      methodUrl = "http://localhost:3000/api/";
    }

    try {
      let result = await axios.get(methodUrl + "get/gameById/" + gameId, {});
      const gameObj = result.data.game;
      SetGame(gameObj);
    } catch (err) {
     //console.log(err.toString());
    }
  };
  if (game == null) {
    getGame();

  }


  let teamSubs = []
  let hasSubbed = false
  const [RC, setRC] = useState(null)
  async function loadSubs() {
    let subs = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
    })
   //console.log(subs)
    if (subs.data.subscriptions.game[gameId] != undefined) {
      hasSubbed = true
      teamSubs = subs.data.subscriptions.game[gameId]
    }
   //console.log("here at the row card")
   //console.log(game)
   //console.log(teamSubs)
   //console.log(hasSubbed)
    setRC(<RowCard type="game" game={game} subArray={teamSubs} reloadCards={() => reloadCards()} hasSubbed={hasSubbed}></RowCard>)
  }
  if (RC == null && game != null) {
    loadSubs()

  }
 //console.log(game)

 //console.log(RC)

  function reloadCards() {
    setRC(null)
  }




  return (
    <div className={styles.container}>
      <CountDowncard className={styles.countdown}></CountDowncard>
      {RC}

    </div>
  );
};
export default GameCon;
