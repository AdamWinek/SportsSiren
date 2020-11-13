import React, { useState } from 'react';
import LoginPage from './pages/loginPage'
import userContext from "./components/userContext"
import SampleContextPage from "./pages/SampleContextPage"
import axios from "axios"


function App() {

  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");

  let login = async function (email, password) {
    if (email == undefined || password == undefined) {
      throw new Error("Missing email or password")
    }
    try {

      let methodUrl = "https://sports-siren.herokuapp.com/api/"

      if (process.env.production != "true") {
        methodUrl = "http://localhost:3000/api/"
      }
      let response = await axios({
        method: "POST",
        url: methodUrl + "login",
        data: {
          email: email,
          password: password
        }
      })
      console.log(response)
      setUser({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone
      });
      setAuthToken(response.data.token)
      setLoggedIn(true)


    } catch (err) {
      return err.toString()
    }

  }


  return (

    <userContext.Provider value={{
      authToken: authToken,
      loggedIn: loggedIn,
      user: user
    }}>
      <LoginPage login={(email, password) => login(email, password)} />
      <SampleContextPage />
    </userContext.Provider>

  );
} export default App;
