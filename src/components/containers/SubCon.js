import React, { useContext, useState } from "react"
import userContext from "../userContext"
import SubsciptionCard from "../SubscriptionCard"
import styles from "../../css/sub_con.module.css"
const SubCon = (props) => {
    const userCon = useContext(userContext)
//{userCon.user.fname}
    return(
        <div className={styles.body}>

            <h1 className={styles.title}>{userCon.user.fname}'s Subscriptions</h1>
            <ul className={styles.subscribedlist}>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                <li><SubsciptionCard></SubsciptionCard></li>
                
        
            </ul>



        </div>
    )
}
export default SubCon;