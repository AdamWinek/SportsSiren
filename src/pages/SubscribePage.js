import React, { useContext, useEffect, useState } from "react"
import SubCon from "../components/containers/SubCon"
import HomeNav from "../components/HomeNav"
import axios from "axios"
import userContext from "../components/userContext"


const SubscribePage = (props) => {

    return (
        <div>
            <HomeNav active="Subscription"></HomeNav>
            <SubCon />
        </div>


    )


}
export default SubscribePage