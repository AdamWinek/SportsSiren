import React, { useEffect, useState } from "react"
import axios from 'axios'
import Countdown from "./Countdown"
import styles from "../css/scoreboard_styles.module.css"
import { useSpring, animated, useTransition } from 'react-spring'


function NFLScoreboard(props) {
    const [games, setGames] = useState(null)
    const [currentlyShown, setCurrentlyShown] = useState([]);
    const [index, setIndex] = useState({ num: 2, from: "none" })
    console.log(games)


    // const rightTransition = useSpring({
    //     from: { transform: 'translateX(-400px)', opacity: 0 },
    //     to: { transform: 'translateX(0px)', opacity: 1 },
    //     config: { mass: 5, tension: 500, friction: 80 }
    // })
    // const leftTransition = useSpring({
    //     from: { transform: 'translateX(400px)' },
    //     to: { transform: 'translateX(0px)' },
    //     config: { mass: 5, tension: 500, friction: 80 }
    // })

    // const transitions = useTransition(currentlyShown, item => Math.random(), {
    //     from: { transform: 'translate3d(0,-40px,0)' },
    //     enter: { transform: 'translate3d(0,0px,0)' },
    //     leave: { transform: 'translate3d(0,-40px,0)' },
    // })



    useEffect(() => {
        let getGame = async function () {
            console.log('here')
            let methodUrl = "https://sports-siren.herokuapp.com/api/"
            console.log(process.env.REACT_APP_DEV_ENV)
            if (process.env.REACT_APP_DEV_ENV == "development") {
                methodUrl = "http://localhost:3000/api/"
            }
            if (games == null) {
                try {
                    let result = await axios.get(methodUrl + 'getWeeklyNFLGames/11', {
                    })
                    console.log(result)
                    let gamesArr = result.data.games.map((game) => {
                        return (
                            < div className={styles.scoreboard}>
                                <h5 className={styles.timeRemaining}>3:20</h5>
                                <div className={styles.teams}>
                                    <div className={styles.eachTeam}>
                                        <div className={styles.teamNameDiv}>
                                            <h1 className={styles.teamName}>{game ? game.homeTeam : 'loading'}</h1>
                                            <h3 className={styles.teamRecord}>{game ? `${game.homeWins}-${game.homeLosses}-${game.homeTies}` : 'loading'}</h3>
                                        </div>
                                        <img className={styles.teamLogo} src={"/NFLLogos/" + game.homeTeam + ".gif"}></img>
                                    </div>
                                    <div className={styles.eachTeam}>
                                        <div className={styles.teamNameDiv}>
                                            <h1 className={styles.teamName}>{game ? game.awayTeam : 'loading'}</h1>
                                            <h3 className={styles.teamRecord}>{game ? `${game.awayWins}-${game.awayLosses}-${game.awayTies}` : 'loading'}</h3>

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
    }, [index])

    function mod(n, m) {
        return ((n % m) + m) % m;
    }




    // let handleAnimations0 = currentlyShown[0]
    // let handleAnimations1 = currentlyShown[1]
    // let handleAnimations2 = currentlyShown[2]


    // if (index.from == 'left') {
    //     handleAnimations0 = <animated.div style={leftTransition}>{currentlyShown[0]}</animated.div>
    //     handleAnimations1 = <animated.div style={leftTransition}>{currentlyShown[1]}</animated.div>
    //     handleAnimations2 = <animated.div style={leftTransition}>{currentlyShown[2]}</animated.div>

    // } else if (index.from == 'right') {
    //     handleAnimations0 = <animated.div style={rightTransition}>{currentlyShown[0]}</animated.div>
    //     handleAnimations1 = <animated.div style={rightTransition}>{currentlyShown[1]}</animated.div>
    //     handleAnimations2 = <animated.div style={rightTransition}>{currentlyShown[2]}</animated.div>
    // }




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

            {/* <div className={styles.scoreBoardContainer}>
                {handleAnimations0}
                {handleAnimations1}
                {handleAnimations2}

            </div> */}
            {/* <div className={styles.scoreBoardContainer}>
                {transitions.map(({ item, props, key }) => (<animated.div key={key} style={props}>{item}</animated.div>))}

            </div> */}
            <div className={styles.controls}>
                <div className={styles.arrow} onClick={() => setIndex({ num: mod(index.num - 1, games.length), from: "left" })} > {"←"} </div>
                <div className={styles.centerControls}>
                    <div className={styles.control}>+</div><div className={styles.control}>-</div>
                </div>
                <div className={styles.arrow} onClick={() => setIndex({ num: mod(index.num + 1, games.length), from: "right" })}>{"→"}</div>
            </div>
        </div >
    )






} export default NFLScoreboard