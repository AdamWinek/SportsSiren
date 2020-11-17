import React, { props, useEffect, useState } from "react"
import axios from 'axios'
import Countdown from "./Countdown"
import styles from "../css/scoreboard_styles.module.css"


function NFLScoreboard(props) {
    const [games, setGames] = useState(null)

    console.log(games)

    useEffect(() => {
        let getGame = async function () {
            console.log('here')
            let methodUrl = "https://sports-siren.herokuapp.com/api/"
            console.log(process.env.REACT_APP_DEV_ENV)
            if (process.env.REACT_APP_DEV_ENV == "development") {
                methodUrl = "http://localhost:3000/api/"
            }

            try {
                let result = await axios.get(methodUrl + 'getWeeklyNFLGames/11', {
                })
                console.log(result)
                setGames(result.data.games)

            } catch (err) {
                console.log(err.toString())
            }

        }
        getGame()


    }, [])

    if (games == null) {
        return null
    } else {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.scoreBoardContainer}>
                    {
                        games.map((game) => {
                            let countDown = null
                            console.log(game.status)
                            if (game.status == 'scheduled' || game.status == 'created') {
                                countDown = (<Countdown scheduledTime={game.scheduled} />)
                            }
                            return (
                                < div className={styles.scoreboard}>
                                    <h5 className={styles.timeRemaining}>3:20</h5>
                                    <div className={styles.teams}>
                                        <div className={styles.eachTeam}>
                                            <div className={styles.teamNameDiv}>
                                                <h1 className={styles.teamName}>{game ? game.homeTeam : 'loading'}</h1>
                                            </div>

                                            <img className={styles.teamLogo} src={"/NFLLogos/" + game.homeTeam + ".gif"}></img>
                                        </div>
                                        <div className={styles.eachTeam}>
                                            <div className={styles.teamNameDiv}>
                                                <h1 className={styles.teamName}>{game ? game.awayTeam : 'loading'}</h1>
                                            </div>

                                            <img className={styles.teamLogo} src={"/NFLLogos/" + game.awayTeam + ".gif"}></img>
                                        </div>


                                    </div>
                                    <div className={styles.scoreDiv}>
                                        <h1 className={styles.scoreH1}>{game ? game.homePoints : 'loading'} - {game ? game.awayPoints : 'loading'}</h1>
                                    </div>
                                </div>


                            )

                        })
                    })
                </div>
                <div className={styles.controls}>
                    <div className={styles.arrow}>{"<-"}</div>
                    <div className={styles.centerControls}>
                        <div className={styles.control}>+</div><div className={styles.control}>-</div>
                    </div>
                    <div className={styles.arrow}>{"->"}</div>
                </div>
            </div >
        )



    }


} export default NFLScoreboard