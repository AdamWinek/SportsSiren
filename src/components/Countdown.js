import React, { useEffect, useState } from "react"

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

            <div>
                <h3>days: {timeUntil.days}</h3>
                <h3>hours: {timeUntil.hours}</h3>
                <h3>minutes: {timeUntil.minutes}</h3>
                <h3>seconds: {timeUntil.seconds}</h3>

            </div>)

    }







} export default Countdown