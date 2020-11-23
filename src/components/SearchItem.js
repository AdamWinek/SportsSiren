import React, { useState } from "react"
import styles from '../css/search_bar_styles.module.css'
import bil from "./bill.gif"
import NewSubForm from "./NewSubForm"
import axios from "axios"

function SearchItem(props) {




    const [toggle, setToggle] = useState(false)

    function handleToggle() {
        setToggle(!toggle)
    }

    async function handleDelete() {

        // delete results
        let methodUrl = "https://sports-siren.herokuapp.com/api/"
        console.log(process.env.REACT_APP_DEV_ENV)
        if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/"
        }

        let result = await axios.post(methodUrl + `delete/subscriptions`, {

            subs: props.subArray

        })
        props.reloadCards()



    };



    if (toggle) {
        return (<NewSubForm type="team" identifier={props.team.name} subArray={props.subArray} hasSubbed={props.hasSubbed} handleToggle={() => handleToggle()} reloadCards={() => props.reloadCards()}></NewSubForm>)
    } else {
        return (
            <>
                <div className={styles.searchBox}>
                    <h1 className={styles.teamName}>{props.team ? props.team.name : 'loading'}</h1>
                    <img className={styles.teamLogo} src={"/NFLLogos/" + props.team.name + ".gif"}></img>

                    {
                        !props.hasSubbed ? (
                            <button className={styles.btn} onClick={() => setToggle(!toggle)}>Subscribe</button>
                        ) : (
                                <button className={styles.btnun} onClick={() => handleDelete()}>
                                    Unsubscribe
                                </button>
                            )
                    }
                </div>
            </>
        )

    }







} export default SearchItem