import React, { useEffect, useState } from "react"
import Circles from '../Circles.svg'
import styles from '../css/front_countdown.module.css'

function Countdown(props) {
    const [timeUntil, setTimeUntil] = useState(null)



    useEffect(() => setInterval(updateTimeRemaining, 1000), [])

    function updateTimeRemaining() {
        let scheduledTime = new Date(props.scheduledTime)
        let current = Date.now()
        let elapsed = scheduledTime.getTime() - current

        let seconds = Math.floor(elapsed / 1000) % 60
        let minutes = Math.floor(elapsed / 1000 / 60) % 60
        let hours = Math.floor(elapsed / 1000 / 60 / 60) % 24
        let days = Math.floor(elapsed / 1000 / 60 / 60 / 24)

        setTimeUntil({
            seconds: seconds,
            days: days,
            hours: hours,
            minutes: minutes
        }, console.log(timeUntil))
    }

    console.log(props.scheduledTime)


    if (timeUntil == null) {
        return null
    } else {
        return (
            <div className={styles.container}>
                <img src={Circles} alt="Background img for countdown" />
                <h3 className={styles.countdown}>{timeUntil.days} : {timeUntil.hours} : {timeUntil.minutes} : {timeUntil.seconds}</h3>
            </div>)

    }







} export default Countdown