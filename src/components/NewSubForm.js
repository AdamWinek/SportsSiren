import React, { useEffect, useState, useContext } from "react";

import styles from "../css/sub_edit_form_styles.module.css";
import axios from "axios";
import userContext from "./userContext";

function NewSubForm(props) {
    let userCon = useContext(userContext);

    const [data, setData] = useState({
        sms: null,
        email: null,
        startofgame: null,
        endofgame: null,
        within: null,
        time: null,
        threshold: null,
    });
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.checked });
    };
    const onSlide = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleEditSubmit() {
        // update subscriptions
        let methodUrl = "https://sports-siren.herokuapp.com/api/";
       //console.log(process.env.REACT_APP_DEV_ENV);
        if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/";
        }
        let result = await axios.post(methodUrl + `create/newSubscriptionForm`, {
            newSub: data,
            user: userCon.user,
            type: props.type,
            identifier: props.identifier

        })
        props.handleToggle()
        props.reloadCards()

    }



    let sliders = null;
    if (data.within) {
        sliders = (
            <>
                <br></br>
                <label className={styles.rangelabel}>
                    <h2 className={styles.questionTitle}>
                        Game is ending in {data.time} minutes
          </h2>
                </label>
                <br></br>
                <div className={styles.slideContainer}>
                    <input
                        className={styles.slider}
                        type="range"
                        min="1"
                        max="59"
                        name="time"
                        onChange={(e) => onSlide(e)}
                    ></input>
                    <span className={styles.indicator}>{data.time} minutes</span>
                </div>
                <br></br>
                <label className={styles.rangelabel}>
                    <h2 className={styles.questionTitle}>
                        Game is within {data.threshold} points
          </h2>
                </label>
                <br></br>
                <div className={styles.slideContainer}>
                    <input
                        className={styles.slider}
                        type="range"
                        min="0"
                        max="21"
                        name="threshold"
                        onChange={(e) => onSlide(e)}
                    ></input>
                    <span className={styles.indicator}>{data.threshold} points</span>
                </div>{" "}
            </>
        );
    }

    return (
        <div>
            <div className={styles.bodyContent}>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <h2 className={styles.questionTitle}>Notify me via:</h2>
                        <input
                            type="checkbox"
                            id="email"
                            name="email"
                            checked={data.email}
                            className={styles.checkbox}
                            onClick={(e) => onChange(e)}
                        ></input>
                        <label htmlFor="email" className={styles.label}>
                            Email
            </label>
                        <br></br>
                        <input
                            type="checkbox"
                            id="sms"
                            name="sms"
                            checked={data.sms}
                            className={styles.checkbox}
                            onClick={(e) => onChange(e)}
                        ></input>
                        <label htmlFor="sms" className={styles.label}>
                            Text
            </label>
                    </div>
                    <div>
                        <h2 className={styles.questionTitle}>Notify me when:</h2>
                        <input
                            type="checkbox"
                            id="startofgame"
                            name="startofgame"
                            value="Apple"
                            checked={data.startofgame}
                            className={styles.checkbox}
                            onClick={(e) => onChange(e)}
                        ></input>
                        <label htmlFor="startofgame" className={styles.label}>
                            Game starts
            </label>
                        <br></br>
                        <input
                            type="checkbox"
                            id="endofgame"
                            name="endofgame"
                            value="Apple"
                            checked={data.endofgame}
                            className={styles.checkbox}
                            onClick={(e) => onChange(e)}
                        ></input>
                        <label htmlFor="endofgame" className={styles.label}>
                            Game ends
            </label>
                        <br></br>
                        <input
                            type="checkbox"
                            id="within"
                            name="within"
                            checked={data.within}
                            className={styles.checkbox}
                            onClick={(e) => onChange(e)}
                        ></input>
                        <label htmlFor="score/time" className={styles.label}>
                            Score and Time Threshold
            </label>
                        {sliders}

                        <br></br>
                        <button className={styles.btn} onClick={() => handleEditSubmit()}>
                            Submit
            </button>
                        <button
                            className={styles.cancelBtn}
                            onClick={() => props.handleToggle()}
                        >
                            Cancel
            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default NewSubForm;
