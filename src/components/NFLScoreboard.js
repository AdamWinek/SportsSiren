import React, { useEffect, useState } from "react"
import axios from 'axios'
import Countdown from "./Countdown"
import styles from "../css/scoreboard_styles.module.css"
import { useSpring, animated, useTransition } from 'react-spring'
import NFLScorecard from "./NFLScorecard"


function NFLScoreboard(props) {
    const [games, setGames] = useState(null)
    const [currentlyShown, setCurrentlyShown] = useState([]);
    const [index, setIndex] = useState({ num: 2, from: "none" })
    console.log(games)

    useEffect(() => {
        let getGame = async function () {
            let methodUrl = "https://sports-siren.herokuapp.com/api/"
            console.log(process.env.REACT_APP_DEV_ENV)
            if (process.env.REACT_APP_DEV_ENV == "development") {
                methodUrl = "http://localhost:3000/api/"
            }
            if (games == null) {
                try {
                    let result = await axios.get(methodUrl + 'get/getWeeklyNFLGames/11', {
                    })
                    let gamesArr = result.data.games.map((game) => {
                        let gameDate = new Date(game.scheduled)

                        return (
                            <NFLScorecard game={game} />
                        )

                    })
                    setGames(gamesArr)
                    setCurrentlyShown([gamesArr[index.num - 1 % gamesArr.length], gamesArr[index.num % gamesArr.length], gamesArr[index.num + 1 % gamesArr.length]])

                } catch (err) {
                    console.log(err.toString())
                }
            } else {


                setCurrentlyShown([games[mod(index.num - 1, games.length)], games[mod(index.num, games.length)], games[mod(index.num + 1, games.length)]])

            }



        }
        getGame()
        // update game every minute


    }, [index])

    function formatDate(gameDate) {
        return `${gameDate.getMonth() + 1}-${gameDate.getDate()}-${gameDate.getFullYear()} 
        ${gameDate.getHours() > 12 ? gameDate.getHours() % 12 : gameDate.getHours()}:${gameDate.getMinutes() < 10 ? "0" : ""}${gameDate.getMinutes()}${gameDate.getHours() > 12 ? "PM" : "AM"}`

    }

    function mod(n, m) {
        return ((n % m) + m) % m;
    }


    return (
        <div className={styles.sectionContainer}>
            <div className={styles.scoreBoardContainer}>
                {currentlyShown.map((item, index) => {

                    if (index == 1) {
                        return (<div>{item}</div>)
                    } else {
                        return (<div className={styles.smallScore}>{item}</div>)
                    }

                })
                }
            </div>
            <div className={styles.controls}>
                <div className={styles.arrow} onClick={() => setIndex({ num: mod(index.num - 1, games.length), from: "left" })} > {"←"} </div>

                <div className={styles.arrow} onClick={() => setIndex({ num: mod(index.num + 1, games.length), from: "right" })}>{"→"}</div>
            </div>
        </div >
    )






} export default NFLScoreboard