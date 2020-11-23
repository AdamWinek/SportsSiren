import React, { useContext, useState } from "react";
import RowCard from "../RowCard";
import axios from "axios";
import styles from "../../css/row_con.module.css";
import userContext from "../userContext";

const RowCon = (props) => {
  const [body, Setbody] = useState([]);
  let userCon = useContext(userContext)

  if (props.type == "league") {
    body.push(<RowCard type="league"></RowCard>);
  } else if (props.type == "team") {
    //request to team
    //map values in render
    if (body.length == 0) {
      const teamRequest = async () => {

        try {

          let methodUrl = "https://sports-siren.herokuapp.com/api/";
          console.log(process.env.REACT_APP_DEV_ENV);
          if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/";
          }
          let tempArr = [];
          let result = await axios.get(methodUrl + "get/allTeams", {});
          console.log(result, "team")


          methodUrl = "https://sports-siren.herokuapp.com/api/"
          console.log(process.env.REACT_APP_DEV_ENV)
          if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000"
          }


          let subs = await axios.get(methodUrl + `/api/get/userSubscriptions/${userCon.user.email}`, {
          })

          //appends subscription object to a array of sub cards
          console.log(subs)
          console.log(Object.values(subs.data.subscriptions.team))
          let subArray = []
          if (subs.data.subscriptions.team != undefined) {
            console.log(subs.data.subscriptions.team)
            Object.values(subs.data.subscriptions.team).forEach((teamsubs) => {
              subArray.push(teamsubs)
            })
          }
          result.data.teams.map((team) => {

            tempArr.push(<RowCard type="team" team={team.name} />);
          });
          Setbody(tempArr);
          console.log(body);
        } catch (err) {
          console.log(err.toString());

        };
      }
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
