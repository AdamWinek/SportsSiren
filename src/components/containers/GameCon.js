import React from 'react'
import Countdown from '../Countdown'
import ScoreGraph from '../ScoreGraph'
import NFLScorecard from '../NFLScorecard'

const GameCon = (props) => {
    return (
        <div>
            <Countdown></Countdown>
            <ScoreGraph></ScoreGraph>
            <NFLScorecard></NFLScorecard>
        </div>
    )
}
export default GameCon