import React, { useState } from "react"
import styles from '../css/search_bar_styles.module.css'
import bil from "./bill.gif"
import NewSubForm from "./NewSubForm"

function SearchItem(props) {




    const [toggle, setToggle] = useState(false)

    function handleToggle() {

        setToggle(!toggle)


    }

    let form = null

    if (toggle) {
        return (<NewSubForm type="team" identifier={props.team.name} handleToggle={() => handleToggle()}></NewSubForm>)
    } else {
        return (

            <div className={styles.searchBox}>
                <h1 className={styles.teamName}>{props.team ? props.team.name : 'loading'}</h1>
                <img className={styles.teamLogo} src={"/NFLLogos/" + props.team.name + ".gif"}></img>
                <button className={styles.btn} onClick={() => setToggle(!toggle)}>Subscribe</button>
            </div>


        )

    }







} export default SearchItem