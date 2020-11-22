import React, { useState } from "react"

import styles from "../css/simulation_styles.module.css"

function SimulationForm(props) {

    const [toggle, setToggle] = useState(false)

    //Tampa Bay vs New England
    if (toggle) {
        return (
            <div >
                <div className={styles.headerBox}>
                    <h1 className={styles.header}>Tamba Bay VS New England</h1>
                    <div className={styles.btnWrapper}>
                        <button className={styles.btn} onClick={() => setToggle(true)}>Simulate Game</button>
                    </div>
                </div>
                <div className={styles.bodyConent}>
                    <form>
                        <h1>Notify me via:</h1>
                        <input type="checkbox" id="text"> </input>
                        <label>Email</label>
                        <input type="checkbox" id="text"> </input>
                        <label>Text</label>




                    </form>




                </div>

            </div>






        )

    } else {
        return (
            <div >
                <div className={styles.headerBox}>
                    <h1 className={styles.header}>Tamba Bay VS New England</h1>
                    <div className={styles.btnWrapper}>
                        <button className={styles.btn} onClick={() => setToggle(true)}>Simulate Game</button>
                    </div>

                </div>

            </div>
        )
    }



} export SimulationForm