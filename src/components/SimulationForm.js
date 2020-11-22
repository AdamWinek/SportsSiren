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
    e.preventDefault()
    console.log(data)
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
