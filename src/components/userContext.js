import { createContext } from "react"

const userContext = createContext({
    authToken: "",
    loggedIn: false,
    user: {
        email: "",
        fname: "",
        lname: "",
        phone: ""
    }
})
export default userContext;