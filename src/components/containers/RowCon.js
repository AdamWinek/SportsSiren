import React, { useContext, useEffect, useState } from "react";
import RowCard from "../RowCard";
import axios from "axios";
import styles from "../../css/row_con.module.css";
import userContext from "../userContext";

const RowCon = (props) => {
  const [body, Setbody] = useState([]);
  let userCon = useContext(userContext)

  useEffect(() => {
    Setbody([])


  }, [props.reloadCount])


  async function reloadCards() {
    Setbody([])

  }




  if (props.type == "league") {
    if (body.length == 0) {



      async function setLeagueCards() {
        let methodUrl = "https://sports-siren.herokuapp.com/api/"
        console.log(process.env.REACT_APP_DEV_ENV)
        if (process.env.REACT_APP_DEV_ENV == "development") {
          methodUrl = "http://localhost:3000/api/"
        }
        let subs = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
        })

        let hasSubbed = false;
        let leagueSubs = []
        console.log(subs, "league")
        if (subs.data.subscriptions.league.NFL != undefined) {
          hasSubbed = true
          leagueSubs = subs.data.subscriptions.league.NFL
        }
        console.log(leagueSubs)
        Setbody((<RowCard type="league" subArray={leagueSubs} reloadCards={() => reloadCards()} hasSubbed={hasSubbed}   ></RowCard>));
      }
      setLeagueCards()


    }

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


          methodUrl = "https://sports-siren.herokuapp.com/api/"
          console.log(process.env.REACT_APP_DEV_ENV)
          if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/"
          }


          let subs = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
          })

          //appends subscription object to a array of sub cards
          let subArray = []
          if (subs.data.subscriptions.team != undefined) {
            Object.values(subs.data.subscriptions.team).forEach((teamsubs) => {
              subArray.push(teamsubs)
            })
          }
          result.data.teams.map((team) => {
            let hasSubbed = false;
            let teamSubs = []
            if (subs.data.subscriptions.team[team.name] != undefined) {
              hasSubbed = true
              teamSubs = subs.data.subscriptions.team[team.name]
            }
            tempArr.push(<RowCard type="team" team={team.name} subArray={teamSubs} reloadCards={() => reloadCards()} hasSubbed={hasSubbed} />);
          });
          Setbody(tempArr);
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


          methodUrl = "https://sports-siren.herokuapp.com/api/"
          console.log(process.env.REACT_APP_DEV_ENV)
          if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/"
          }


          let subs = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
          })

          let tempArr = [];
          let result = await axios.get(methodUrl + "getWeeklyNFLGames/11", {});
          result.data.games.map((game) => {
            let hasSubbed = false;
            let teamSubs = []
            if (subs.data.subscriptions.game[game.gameId] != undefined) {
              hasSubbed = true
              teamSubs = subs.data.subscriptions.game[game.gameId]
            }
            tempArr.push(<RowCard type="game" game={game} subArray={teamSubs} reloadCards={() => reloadCards()} hasSubbed={hasSubbed} />);
          });
          Setbody(tempArr);
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
        {body}
      </div>
    </div>
  );
};
export default RowCon;
