import React, { useEffect, useState } from "react";
import styles from "../css/front_countdown.module.css";

function Countdown(props) {
  const [timeUntil, setTimeUntil] = useState(null);

  useEffect(() => setInterval(updateTimeRemaining, 1000), []);

  function updateTimeRemaining() {
    let scheduledTime = new Date(props.scheduledTime);
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
      console.log(timeUntil)
    );
  }

  console.log(props.scheduledTime);

  if (timeUntil == null) {
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
