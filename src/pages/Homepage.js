import React from "react"
import HomeNav from "../components/HomeNav"
import NFLScoreboard from "../components/NFLScoreboard"
import styles from "../css/home_page_styles.module.css"
import ScoreGraph from "../components/ScoreGraph"
function Homepage(props) {

    return (
        <div>
            <HomeNav />
            <div className={styles.body}>
                <h1 className={styles.sectionHeader}>Pinned</h1>
                <div className={styles.sectionBreak}></div>
                <NFLScoreboard />
                <ScoreGraph /> 
                <h1 className={styles.sectionHeader}>Current</h1>
                <div className={styles.sectionBreak}></div>


            </div>
        </div>
    )

} export default Homepage