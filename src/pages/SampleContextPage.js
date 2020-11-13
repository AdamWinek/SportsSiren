import React from "react"
import userContext from "../components/userContext"

function SampleContextPage(props) {

    console.log(userContext)
    return (
        <p>{userContext.authToken}</p>



    )

} export default SampleContextPage