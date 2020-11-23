import React from "react"
import styles from "../css/scoreboard_styles.module.css"



function NFLScorecard(props) {


    function formatDate(gameDate) {
        return `${gameDate.getMonth() + 1}-${gameDate.getDate()}-${gameDate.getFullYear()} 
        ${gameDate.getHours() > 12 ? gameDate.getHours() % 12 : gameDate.getHours()}:${gameDate.getMinutes() < 10 ? "0" : ""}${gameDate.getMinutes()}${gameDate.getHours() > 12 ? "PM" : "AM"}`

    }

    let gameDate = new Date(props.game.scheduled)
    return (

        < div className={styles.scoreboard}>
            <h5 className={styles.timeRemaining}>{formatDate(gameDate)}</h5>
            <div className={styles.teams}>
                <div className={styles.eachTeam}>
                    <div className={styles.teamNameDiv}>
                        <h1 className={styles.teamName}>{props.game ? props.game.homeTeam : 'loading'}</h1>
                    </div>
                    <h3 className={styles.teamRecord}>{props.game ? `${props.game.homeWins}-${props.game.homeLosses}-${props.game.homeTies}` : 'loading'}</h3>

                    <img className={styles.teamLogo} src={"/NFLLogos/" + props.game.homeTeam + ".gif"}></img>
                </div>
                <div className={styles.eachTeam}>
                    <div className={styles.teamNameDiv}>
                        <h1 className={styles.teamName}>{props.game ? props.game.awayTeam : 'loading'}</h1>

                    </div>
                    <h3 className={styles.teamRecord}>{props.game ? `${props.game.awayWins}-${props.game.awayLosses}-${props.game.awayTies}` : 'loading'}</h3>

                    <img className={styles.teamLogo} src={"/NFLLogos/" + props.game.awayTeam + ".gif"}></img>
                </div>
            </div>
            <div className={styles.scoreDiv}>
                <h1 className={styles.scoreH1}>{props.game ? props.game.homeTotalScore : 'loading'} - {props.game ? props.game.awayTotalScore : 'loading'}</h1>
                <h3 className={styles.time}>Quarter: {props.game ? props.game.qtr : 'loading'} | {props.game ? props.game.clock : 'loading'}</h3>
            </div>
        </div>
    )




} export default NFLScorecard