import React, {useState} from "react";
import CountDowncard from "../CountDowncard"
import RowCard from "../RowCard";
import axios from "axios"
import { useParams } from "react-router-dom";
import styles from "../../css/game_con.module.css"

const GameCon = (props) => {
  let { gameId } = useParams();
  console.log(gameId);
  const [game, SetGame] = useState();
  let exampleId = "ad737947-20e3-439a-908a-a0b65eefbc2e";
  // request Scorecard
  let getGame = async () => {
    console.log("here");
    let methodUrl = "https://sports-siren.herokuapp.com/api/";
    console.log(process.env.REACT_APP_DEV_ENV);
    if (process.env.REACT_APP_DEV_ENV == "development") {
      methodUrl = "http://localhost:3000/api/";
    }

    try {
      let result = await axios.get(methodUrl + "get/gameById/" + gameId, {});
      const gameObj = result.data.game;
      SetGame(gameObj);
    } catch (err) {
      console.log(err.toString());
    }
  };
  getGame();
  return (
    <div className={styles.container}>
      <CountDowncard className={styles.countdown}></CountDowncard>
      {game && <RowCard type="game" game={game}></RowCard>}
      
    </div>
  );
};
export default GameCon;
