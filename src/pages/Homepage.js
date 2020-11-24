import React, { useEffect, useState } from "react";
import HomeNav from "../components/HomeNav";
import NFLScoreboard from "../components/NFLScoreboard";
import styles from "../css/home_page_styles.module.css";
import ScoreGraph from "../components/ScoreGraph";
import Countdown from "../components/Countdown";
import SimulationFrom from "../components/SimulationForm";
function Homepage(props) {
    const [reRenderCount, setReRenderCount] = useState(0);

    //intervalId to kill on cleanup
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (reRenderCount == 0 && intervalId == null) {
            let temp;
            temp = setInterval(() => {
                setReRenderCount(reRenderCount + 1);
            }, 1000 * 10);
            setIntervalId(temp);
        }
        return () => clearInterval(intervalId);
    }, [reRenderCount]);

    return (
        <div>
            <HomeNav active={"Home"} />
            <div className={styles.body}>
                <Countdown />
                <h1 className={styles.sectionHeader}>Pinned</h1>
                <div className={styles.sectionBreak}></div>
                <NFLScoreboard />
                <h1 className={styles.sectionHeader}>Simulation</h1>
                <div className={styles.sectionBreak}></div>
                <SimulationFrom></SimulationFrom>
            </div>
        </div>
    );
}
export default Homepage;
