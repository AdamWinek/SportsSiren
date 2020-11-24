import React, {useState} from "react";
import Countdown from "../Countdown";
import CountDowncard from "../CountDowncard"
import ScoreGraph from "../ScoreGraph";
import RowCard from "../RowCard";
import axios from "axios"
import { useParams } from "react-router-dom";

const GameCon = (props) => {
  let { gameId } = useParams();
  console.log(gameId);
  const [game, SetGame] = useState();
  let exampleId = "24734cde-bf1b-46e5-ad50-d61e47aeca26";
  // request Scorecard
  let getGame = async () => {
    console.log("here");
    let methodUrl = "https://sports-siren.herokuapp.com/api/";
    console.log(process.env.REACT_APP_DEV_ENV);
    if (process.env.REACT_APP_DEV_ENV == "development") {
      methodUrl = "http://localhost:3000/api/";
    }

    try {
      let result = await axios.get(methodUrl + "get/gameById/" + exampleId, {});
      const gameObj = result.data.game;
      SetGame(gameObj);
    } catch (err) {
      console.log(err.toString());
    }
  };
  getGame();
  return (
    <div>
      <CountDowncard></CountDowncard>
      <ScoreGraph></ScoreGraph>
      {game && <RowCard type="game" game={game}></RowCard>}
      
    </div>
  );
};
export default GameCon;
