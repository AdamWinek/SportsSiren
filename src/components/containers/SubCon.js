import React, { useContext, useState, useEffect } from "react"
import userContext from "../userContext"
import SubscriptionCard from "../SubscriptionCard"
import styles from "../../css/sub_con.module.css"
import axios from "axios"
const SubCon = (props) => {
    //{userCon.user.fname}

    const [subscriptions, setSubscriptions] = useState(null);
    let userCon = useContext(userContext)


    useEffect(() => {

        async function getSubscriptionsApi() {
            let methodUrl = "https://sports-siren.herokuapp.com/api/"
            console.log(process.env.REACT_APP_DEV_ENV)
            if (process.env.REACT_APP_DEV_ENV == "development") {
                methodUrl = "http://localhost:3000/api/"
            }

            try {
                let result = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
                })

                //appends subscription object to a array of sub cards
                let temp = []
                if (result.data.subscriptions.league != undefined) {
                    Object.values(result.data.subscriptions.league).forEach((subArray) => {
                        temp.push((<li><SubscriptionCard reloadCards={() => reloadCards()} subArray={subArray} /></li>))
                    })
                }
                if (result.data.subscriptions.game != undefined) {
                    Object.values(result.data.subscriptions.game).forEach((subArray) => {
                        temp.push((<li><SubscriptionCard reloadCards={() => reloadCards()} subArray={subArray} /></li>))
                    })
                }
                if (result.data.subscriptions.team != undefined) {
                    Object.values(result.data.subscriptions.team).forEach((subArray) => {
                        temp.push((<li><SubscriptionCard subArray={subArray} reloadCards={() => reloadCards()} /></li>))
                    })
                }
                setSubscriptions(temp)

            }

            catch (err) {
                console.log(err.toString())
            }

        }
        if (subscriptions == null) {
            getSubscriptionsApi()
        }
    }, [])


    async function reloadCards() {

        let methodUrl = "https://sports-siren.herokuapp.com/api/"
        console.log(process.env.REACT_APP_DEV_ENV)
        if (process.env.REACT_APP_DEV_ENV == "development") {
            methodUrl = "http://localhost:3000/api/"
        }

        let result = await axios.get(methodUrl + `get/userSubscriptions/${userCon.user.email}`, {
        })

        //appends subscription object to a array of sub cards
        let temp = []
        if (result.data.subscriptions.league != undefined) {
            Object.values(result.data.subscriptions.league).forEach((subArray) => {
                temp.push((<li><SubscriptionCard reloadCards={() => reloadCards()} subArray={subArray} /></li>))
            })
        }
        if (result.data.subscriptions.game != undefined) {
            Object.values(result.data.subscriptions.game).forEach((subArray) => {
                temp.push((<li><SubscriptionCard reloadCards={() => reloadCards()} subArray={subArray} /></li>))
            })
        }
        if (result.data.subscriptions.team != undefined) {
            Object.values(result.data.subscriptions.team).forEach((subArray) => {
                temp.push((<li><SubscriptionCard subArray={subArray} reloadCards={() => reloadCards()} /></li>))
            })
        }
        setSubscriptions(temp)



    }



    return (
        <div className={styles.body}>

            <h1 className={styles.title}>{userCon.user.fname}'s Subscriptions</h1>
            <ul className={styles.subscribedlist}>
                {subscriptions}
            </ul>



        </div>
    )
}
export default SubCon;