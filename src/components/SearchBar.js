import React, { useState } from "react"
import styles from '../css/search_bar_styles.module.css'
import bil from "./bill.gif"
import axios from "axios"
import SearchItem from "./SearchItem"

function SearchBar(props) {


    const [search, setSearch] = useState("")
    const [searchItems, setSearchItems] = useState(null)



    let execTime = Date.now()
    let timeoutId = ""
    // debouncing function
    async function getRelevantTeams(timeout) {
        if (timeoutId != "") {
            clearInterval(timeoutId)

        }
        let now = Date.now()
        console.log(now - execTime)
        if (now - execTime > timeout) {
            makeRequest()
        } else {
            now = Date.now()
            timeoutId = setTimeout(makeRequest(), timeout - (now - execTime))

        }

        async function makeRequest() {
            execTime = Date.now()

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
                let temp = response.data.teams.map((team) => {
                    return (<SearchItem team={team} />)
                })
                setSearchItems(temp)



            }
        }


    }


    async function handleInputChange(e) {


        setSearch(e.target.value)



        getRelevantTeams(10000)

    }



    return (
        <div>
            <input
                type="text"
                className={styles.input}
                onChange={(e) => handleInputChange(e)}
                placeholder="Search for Teams to Follow"
            >

            </input>
            {searchItems}



        </div >



    )






} export default SearchBar