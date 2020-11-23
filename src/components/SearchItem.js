import React, { useState } from "react"
import styles from '../css/search_bar_styles.module.css'
import bil from "./bill.gif"

function SearchItem(props) {


    return (

        <div className={styles.searchBox}>
            <h1 className={styles.teamName}>{props.team ? props.team.name : 'loading'}</h1>
            <img className={styles.teamLogo} src={"/NFLLogos/" + props.team.name + ".gif"}></img>
            <button className={styles.btn}>Subscribe</button>


        </div>


    )






} export default SearchItem