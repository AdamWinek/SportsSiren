import React, { props, useEffect, useState } from "react";
import axios from "axios";

function Scoreboard(props) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    let getGame = async function () {
     //console.log("here");
      let methodUrl = "https://sports-siren.herokuapp.com/api/";
     //console.log(process.env.REACT_APP_DEV_ENV);
      if (process.env.REACT_APP_DEV_ENV == "development") {
        methodUrl = "http://localhost:3000/api/";
      }

      try {
        let result = await axios.get(
          methodUrl + "get/gameInDBNBA/b4afe94b-65de-4826-ba4c-8a112b1367f1",
          {}
        );
       //console.log(result);
        setGame(result.data);
      } catch (err) {
       //console.log(err.toString());
      }
    };
    getGame();
  }, []);

  if (game == null) {
    return null;
  } else {
    return (
      <div
        style={{
          width: "800px",
          height: "400px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{game ? game.homeTeam : "loading"}</h1>
          <h3>{game ? game.homePoints : "loading"}</h3>
          <img
            style={{ width: "200px", height: "200px" }}
            src={game ? game.homeLogoUrl : "none"}
          ></img>
        </div>
        <div>
          <h1>{game ? game.awayTeam : "loading"}</h1>
          <h3>{game ? game.awayPoints : "loading"}</h3>
          <img
            style={{ width: "200px", height: "200px" }}
            src={game ? game.awayLogoUrl : "none"}
          ></img>
        </div>
      </div>
    );
  }
}
export default Scoreboard;
