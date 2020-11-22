import React, { useState } from "react";

import styles from "../css/simulation_styles.module.css";

function SimulationForm(props) {
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
  const handleSubmit = (e) => {
    let scoreDiff = {
      59: 0, 58: 0, 57: 0,  56: 0, 55: 0, 54: 0, 53: 0, 52: 0, 51: 7, 50: 17, 
      49: 7, 48: 7, 47: 10,  46: 10, 45: 10, 46: 17, 43: 17, 42: 17, 41: 10, 40: 10, 
      39: 10, 38: 10, 37: 10,  36: 10, 35: 10, 34: 10, 33: 7, 32: 7, 31: 7, 30: 4, 
      29: 4, 28: 4, 27: 4,  26: 11, 25: 11, 24: 11, 23: 11, 22: 4, 21: 4, 20: 4, 
      19: 4, 18: 4, 17: 4,  16: 4, 15: 4, 14: 10, 13: 10, 12: 10, 11: 10, 10: 10, 
      9: 10, 8: 10, 7: 10,  6: 10, 5: 10, 4: 10, 3: 17, 2: 17, 1: 17, 0: 17, 
    }
    e.preventDefault()
    console.log(data)
    if(data.startofgame) { 
      // fire notification now 
    }
    else if (data.endofgame) { 
      // fire notification in 60s 
    }
    else if(data.time) { 
      // fire notification in 60- data.time seconds 

      // if theshold AND time
        if(scoreDiff[60-data.time] <= data.threshold) { 
          // fire notification
        }
        else { 
          // don't fire
        }
      // fire notification in 60- data.time seconds 
      
    }
    // start rendering simulation 
  }

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
              <h2>Notify me via:</h2>
              <input
                type="checkbox"
                id="email"
                name="email"
                value="Apple"
                onClick={(e)=> onChange(e)}
              ></input>
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                type="checkbox"
                id="sms"
                name="sms"
                value="Apple"
                onClick={(e)=> onChange(e)}
              ></input>
              <label htmlFor="sms">Text</label>
            </div>
            <div>
              <h2>Notify me when:</h2>
              <input
                type="checkbox"
                id="startofgame"
                name="startofgame"
                value="Apple"
                onClick={(e)=> onChange(e)}
              ></input>
              <label htmlFor="startofgame">Game starts</label>
              <br></br>
              <input
                type="checkbox"
                id="endofgame"
                name="endofgame"
                value="Apple"
                onClick={(e)=> onChange(e)}
              ></input>
              <label htmlFor="endofgame">Game ends</label>
              <br></br>
              <label>Game is ending in {data.time} minutes</label>
              <input className="" type="range"  min="1" max="59" name="time" onChange={(e) => onSlide(e)}></input>
              <br></br>
              <label>Game is within {data.threshold} points</label>
              <input className="" type="range"  min="0" max="21" name="threshold" onChange={(e) => onSlide(e)}></input>
              <br></br>
              <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
            
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
