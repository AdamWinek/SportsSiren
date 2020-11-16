import React, { props, useEffect, useState } from "react"
import axios from 'axios'
import Countdown from "./Countdown"

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
            <div>
                {
                    games.map((game) => {

                        let countDown = null
                        console.log(game.status)
                        if (game.status == 'scheduled' || game.status == 'created') {
                            countDown = (<Countdown scheduledTime={game.scheduled} />)
                        }
                        return (
                            < div style={{ width: '800px', height: '400px', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h1>{game ? game.homeTeam : 'loading'}</h1>
                                    <h3>{game ? game.homePoints : 'loading'}</h3>
                                    <img style={{ width: 'auto', height: '100px' }} src={"/NFLLogos/" + game.homeTeam + ".gif"}></img>
                                </div>
                                {countDown}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h1>{game ? game.awayTeam : 'loading'}</h1>
                                    <h3>{game ? game.awayPoints : 'loading'}</h3>
                                    <img style={{ width: 'auto', height: '100px' }} src={"/NFLLogos/" + game.awayTeam + ".gif"}></img>
                                </div>
                            </div>


                        )
                    }


                    )
                })

            </div >
        )



    }


} export default NFLScoreboard