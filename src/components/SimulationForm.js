import React, { useContext, useState, useEffect } from "react"
import axios from "axios";
import userContext from "./userContext"

import styles from "../css/simulation_styles.module.css";

const  SimulationForm = (props) => {
  let userCon = useContext(userContext)

  const [data, setData] = useState({
    sms: null,
    email: null,
    startofgame: null,
    endofgame: null,
    time: null,
    threshold: null,
  });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };
  const onSlide = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  
  let sendMessageHandle = async function(message, notify_number, time) { 
    let methodUrl = "https://sports-siren.herokuapp.com/api/";
    if (process.env.REACT_APP_DEV_ENV == "development") {
        methodUrl = "http://localhost:3000/api/";
    }

      
    let response = await axios({
        method: "POST",
        url: methodUrl + "sendSimulationText",
        data: {
            phone: notify_number,
            message: message,
            scheduled_time: time,
        },
    });

    //console.log(response); 
    return response; 
  }
  let sendEmailHandle = async function(message, notify_email, time) { 
    let methodUrl = "https://sports-siren.herokuapp.com/api/";
    if (process.env.REACT_APP_DEV_ENV == "development") {
        methodUrl = "http://localhost:3000/api/";
    }

      
    let response = await axios({
        method: "POST",
        url: methodUrl + "sendSimulationEmail",
        data: {
            email: notify_email,
            message: message,
            scheduled_time: time,
        },
    });

    //console.log(response); 
    return response; 
  }

  const handleSubmit = async (e) => {
    try { 
    console.log("simulation_submit");
    let scoreDiff = {
      59: 0,
      58: 0,
      57: 0,
      56: 0,
      55: 0,
      54: 0,
      53: 0,
      52: 0,
      51: 7,
      50: 17,
      49: 7,
      48: 7,
      47: 10,
      46: 10,
      45: 10,
      46: 17,
      43: 17,
      42: 17,
      41: 10,
      40: 10,
      39: 10,
      38: 10,
      37: 10,
      36: 10,
      35: 10,
      34: 10,
      33: 7,
      32: 7,
      31: 7,
      30: 4,
      29: 4,
      28: 4,
      27: 4,
      26: 11,
      25: 11,
      24: 11,
      23: 11,
      22: 4,
      21: 4,
      20: 4,
      19: 4,
      18: 4,
      17: 4,
      16: 4,
      15: 4,
      14: 10,
      13: 10,
      12: 10,
      11: 10,
      10: 10,
      9: 10,
      8: 10,
      7: 10,
      6: 10,
      5: 10,
      4: 10,
      3: 17,
      2: 17,
      1: 17,
      0: 17,
    };
    e.preventDefault();
    setToggle(false);
    //console.log(data);
    //console.log(userCon)
    //console.log(userCon.user.phone)
    //console.log(userCon.user)
    let notify_number = userCon.user.phone;
    let notify_email = userCon.user.email;
    if(data.text) {
      if (data.startofgame) {
        // fire notification now
        //console.log("firing at start");

        let time = "now";
        let notify_message = "Hi! This is SportsSiren! This is what our notifications look like. You're simulating the New England Patriots versus the Baltimore Ravens. The game just started! Tune in!"; 
        sendMessageHandle(notify_message, notify_number, time); 
      } 
      if (data.endofgame) {
        // fire notification in 60s
        //console.log("firing at end");
        let time = "in 1 minute"
        let notify_message = "Hi! This is SportsSiren! This is what our notifications look like. You're simulating the New England Patriots versus the Baltimore Ravens. The game just ended! We hope you enjoyed! Check our site to see what game is up next."; 
        sendMessageHandle(notify_message, notify_number, time); 
        console.log("text sent")

      } 
      if (data.time) {
        // fire notification in 60- data.time seconds
        //console.log("firing at time");
        let time = "in " + (60-Number.parseInt(data.time)) + " seconds";
        // if theshold AND time
        if (scoreDiff[60 - data.time] <= data.threshold) {
          // fire notification
          let notify_message = "Hi! This is SportsSiren! This is what our notifications look like. You're simulating the New England Patriots versus the Baltimore Ravens. The game is at the __ mark and the score is __ " + " " + ". Within your threshold of " + data.threshold + " points. Tune in now!" ; 
          sendMessageHandle(notify_message, notify_number, time); 
    
        } else {
          // don't fire
        }
        // fire notification in 60- data.time seconds
      }
    }
    else if(data.email) { 
      if (data.startofgame) {
        console.log("sending email for start of game")
        console.log("notify email is " + notify_email)
        let time = "now";
        let notify_message = "Hi! This is SportsSiren! This is what our notifications look like. You're simulating the New England Patriots versus the Baltimore Ravens. The game just started! Tune in!"; 
        sendEmailHandle(notify_message, notify_email, time); 
      }
      if (data.endofgame) {
        console.log("sending email for end of game")

        let time = "in 1 minute"
        let notify_message = "Hi! This is SportsSiren! This is what our notifications look like. You're simulating the New England Patriots versus the Baltimore Ravens. The game just ended! We hope you enjoyed! Check our site to see what game is up next."; 
        sendEmailHandle(notify_message, notify_email, time); 
        console.log("text sent")
      }
      if (data.time) {
        if (scoreDiff[60 - data.time] <= data.threshold) {
          console.log("sending email for time theshold")
          let time = "in " + (60-Number.parseInt(data.time)) + " seconds";
          let notify_message = "Hi! This is SportsSiren! This is what our notifications look like. You're simulating the New England Patriots versus the Baltimore Ravens. The game is at the __ mark and the score is __ " + " " + ". Within your threshold of " + data.threshold + " points. Tune in now!" ; 
          sendEmailHandle(notify_message, notify_email, time); 
        }
      }
    }
    // start rendering simulation
  }
  catch(err) { 
    console.log(err); 
  }
  };

  const [toggle, setToggle] = useState(false);

  //Baltimore vs New England
  if (toggle) {
    return (
      <div>
        <div className={styles.headerBox}>
          <h3 className={styles.header}>Baltimore vs. New England </h3>
          <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={() => setToggle(true)}>
              Simulate Game
            </button>
          </div>
        </div>
        <div className={styles.bodyContent}>
          <form className={styles.form}>
            <div>
              <h2 className={styles.questionTitle}>Notify me via:</h2>
              <input
                type="checkbox"
                id="email"
                name="email"
                value="Apple"
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
                value="Apple"
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
                className={styles.checkbox}
                onClick={(e) => onChange(e)}
              ></input>
              <label htmlFor="startofgame" className={styles.label}>
                Game starts?
              </label>
              <br></br>
              <input
                type="checkbox"
                id="endofgame"
                name="endofgame"
                value="Apple"
                className={styles.checkbox}
                onClick={(e) => onChange(e)}
              ></input>
              <label htmlFor="endofgame" className={styles.label}>
                Game ends?
              </label>
              <br></br>
              <input
                type="checkbox"
                id="andscore"
                name="andscore"
                value="Apple"
                className={styles.checkbox}
                onClick={(e) => onChange(e)}
              ></input>
              <label htmlFor="andscore" className={styles.label}>
                Only within a certain time?
              </label>
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
              </div>
              <br></br>
              <button
                className={styles.btn}
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.headerBox}>
          <h3 className={styles.header}>Baltimore vs. New England</h3>
          <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={() => setToggle(true)}>
              Simulate Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SimulationForm;
