import React from "react"
import SubCon from "../components/containers/SubCon"
import HomeNav from "../components/HomeNav"

const SubscribePage = (props) => {
    return(
        <div>
            <HomeNav active={"subscription"}></HomeNav>
            <SubCon></SubCon>

        </div>
       

    )
    

}
export default SubscribePage