import { createContext } from "react"

const userContext = createContext({
    authToken: "",
    loggedIn: false,
    user: {
        email: "",
        name: "",
        phone: ""
    }
})
export default userContext;