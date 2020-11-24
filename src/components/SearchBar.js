import React, { useState, useContext, useEffect } from "react"
import styles from '../css/search_bar_styles.module.css'
import bil from "./bill.gif"
import axios from "axios"
import SearchItem from "./SearchItem"
import userContext from "./userContext";
import { set } from "mongoose"

function SearchBar(props) {


    const [search, setSearch] = useState("")
    const [searchItems, setSearchItems] = useState(null)
    let userCon = useContext(userContext)
    //time out
    const [timeOut, setTime] = useState(0)

    //my react implementation of debouncing
    useEffect(() => {
        let timeId = 0
        if (search == "" || search == " ") {
            setSearchItems(null)
        } else {
            timeId = setTimeout(() => makeRequest(), timeOut)
        }
        return () => {
            clearTimeout(timeId)
        }


    }, [search])

    async function makeRequest() {
        let methodUrl = "https://sports-siren.herokuapp.com/api/"
        if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/"
        }
        let response = await axios({
            method: "GET",
            url: methodUrl + "get/searchTeams/" + search,

        })
        if (response.data.teams == undefined || response.data.teams.length == 0) {
            setSearchItems(null)
        } else {
            methodUrl = "https://sports-siren.herokuapp.com/api/"
           //console.log(process.env.REACT_APP_DEV_ENV)
            if (process.env.REACT_APP_DEV_ENV == "development") {
                methodUrl = "http://localhost:3000/api/"
            }
            let subs = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
            })
            let temp = response.data.teams.map((team) => {
                let hasSubbed = false;
                let teamSubs = []
                if (subs.data.subscriptions.team[team.name] != undefined) {
                    hasSubbed = true
                    teamSubs = subs.data.subscriptions.team[team.name]
                }
                return (<SearchItem team={team} hasSubbed={hasSubbed} subArray={teamSubs} reloadCards={() => reloadCards()} />)
            })
            setSearchItems(temp)
        }
    }

    function reloadCards() {
        makeRequest()
        props.reloadPage()
    }

    async function handleInputChange(e, ms) {


        if (timeOut != ms) {
            setTime(ms)
        }
        setSearch(e.target.value)


    }



    return (
        <div>
            <input
                type="text"
                className={styles.input}
                //second param is timeout
                onChange={(e) => handleInputChange(e, 250)}
                placeholder="Search for Teams to Follow"
            >

            </input>
            {searchItems}
        </div >
    )


} export default SearchBar