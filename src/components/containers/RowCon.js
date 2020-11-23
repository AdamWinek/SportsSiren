import React, { useState } from "react";
import RowCard from "../RowCard";
import axios from "axios";
import styles from "../../css/row_con.module.css";

const RowCon = (props) => {
  const [body, Setbody] = useState([]);

  if (props.type == "league") {
    body.push(<RowCard type="league"></RowCard>);
  } else if (props.type == "team") {
    //request to team
    //map values in render
    if (body.length == 0) {
        const teamRequest = async () => {
          let methodUrl = "https://sports-siren.herokuapp.com/api/";
          console.log(process.env.REACT_APP_DEV_ENV);
          if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/";
          }
          try {
            let tempArr = [];
            let result = await axios.get(methodUrl + "get/allTeams", {});
            console.log(result)
            result.data.teams.map((team) => {
                console.log(team)
              tempArr.push(<RowCard type="team" team={team.name} />);
            });
            Setbody(tempArr);
            console.log(body);
          } catch (err) {
            console.log(err.toString());
          }
        };
        teamRequest();
      }

  } else if (props.type == "game") {
    if (body.length == 0) {
      const gameRequest = async () => {
        let methodUrl = "https://sports-siren.herokuapp.com/api/";
        console.log(process.env.REACT_APP_DEV_ENV);
        if (process.env.REACT_APP_DEV_ENV == "development") {
          methodUrl = "http://localhost:3000/api/";
        }
        try {
          let tempArr = [];
          let result = await axios.get(methodUrl + "getWeeklyNFLGames/11", {});
          result.data.games.map((game) => {
            tempArr.push(<RowCard type="game" game={game} />);
          });
          Setbody(tempArr);
          console.log(body);
        } catch (err) {
          console.log(err.toString());
        }
      };
      gameRequest();
    }

    //request to game
    //map game array to render
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{props.type}</h1>
      <div className={styles.lineBreak}></div>
      <div className={styles.cardContainer}>
        {body.map((x) => {
          return x;
        })}
      </div>
    </div>
  );
};
export default RowCon;
