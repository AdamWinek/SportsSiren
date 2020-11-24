import React, { useEffect, useState } from "react";
import styles from "../css/front_countdown.module.css";
import axios from "axios"

function Countdown(props) {
  const [timeUntil, setTimeUntil] = useState(null);
  const [game, setGame] = useState(null)
  const [interval, setInt] = useState(null)

  useEffect(() => {

    let getGame = async function () {
      console.log('here')
      let methodUrl = "https://sports-siren.herokuapp.com/api/"
      console.log(process.env.REACT_APP_DEV_ENV)
      if (process.env.REACT_APP_DEV_ENV == "development") {
        methodUrl = "http://localhost:3000/api/"
      }

      let result = await axios.get(methodUrl + 'get/nextUpcomingGame', {
      })
      setGame(result.data.game[0])
    }
    if (game == null) {
      getGame()
    }


  }, [game, timeUntil]);

  useEffect(() => {
    if (game != null && timeUntil == null) {
      setInt(setInterval(() => updateTimeRemaining(), 1000))
    }
    return (() => {
      if (interval != null) {
        clearInterval(interval)

      }

    })

  }, [game])

  function updateTimeRemaining() {
    let scheduledTime = new Date(game.scheduled);
    let current = Date.now();
    let elapsed = scheduledTime.getTime() - current;

    let seconds = Math.floor(elapsed / 1000) % 60;
    let minutes = Math.floor(elapsed / 1000 / 60) % 60;
    let hours = Math.floor(elapsed / 1000 / 60 / 60) % 24;
    let days = Math.floor(elapsed / 1000 / 60 / 60 / 24);

    setTimeUntil(
      {
        seconds: seconds,
        days: days,
        hours: hours,
        minutes: minutes,
      },
    );
  }

  if (game == null || timeUntil == null) {
    return null;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.circleContainer}>
          <div className={styles.circle}>
            <div className={styles.date}>
              <div>
                <h2>{timeUntil.days}</h2>
              </div>
              <div>D</div>
            </div>
          </div>
          <div className={styles.circle}>
            <div className={styles.date}>
              <div>
                <h2>{timeUntil.hours}</h2>
              </div>
              <div>H</div>
            </div>
          </div>
          <div className={styles.circle}>
            <div className={styles.date}>
              <div>
                <h2>{timeUntil.minutes}</h2>
              </div>
              <div>M</div>
            </div>
          </div>
          <div className={styles.circle}>
            <div className={styles.date}>
              <div>
                <h2>{timeUntil.seconds}</h2>
              </div>
              <div>S</div>
            </div>
          </div>
        </div>
        <div className={styles.textbox}>
          <div className={styles.team}>
            <img className={styles.logo} src={"/NFLLogos/" + game.homeTeam + ".gif"}></img>
            <h2>{game.homeTeam}</h2>
          </div>
          <div className={styles.vs}><h3>vs.</h3></div>
          <div className={styles.team}>
            <img className={styles.logo} src={"/NFLLogos/" + game.awayTeam + ".gif"}></img>
            <h2>{game.awayTeam}</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default Countdown;
