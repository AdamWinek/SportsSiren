import React from "react"
import HomeNav from "../components/HomeNav"
import NFLScoreboard from "../components/NFLScoreboard"
import styles from "../css/home_page_styles.module.css"
import ScoreGraph from "../components/ScoreGraph"
import Countdown from "../components/Countdown"
function Homepage(props) {
    const date1 = new Date('December 17, 2020 03:24:00');


    return (
        <div>

            <HomeNav active={"Home"} />
            <Countdown scheduledTime={date1}></Countdown>
            <div className={styles.body}>
                <h1 className={styles.sectionHeader}>Pinned</h1>
                <div className={styles.sectionBreak}></div>
                <NFLScoreboard />
                <h1 className={styles.sectionHeader}>Current</h1>
                <div className={styles.sectionBreak}></div>
                <div className={styles.sectionBreak}>
                    <ScoreGraph />
                </div>
                
        


            </div>

        </div>

    )

} export default Homepage