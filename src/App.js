import React, { useState, useContext, useEffect } from 'react';
import LoginPage from './pages/LoginPage'
import SignUpCon from './components/containers/SignUpCon'
import userContext from "./components/userContext"
import SampleContextPage from "./pages/SampleContextPage"
import axios from "axios"
import Scoreboard from './components/Scoreboard';
import NFLScoreboard from './components/NFLScoreboard';
import SubscribePage from './pages/SubscribePage'
import ExplorePage from './pages/ExplorePage'
import GamePage from './pages/GamePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';



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
      if (process.env.REACT_APP_DEV_ENV == "development") {
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
      setUser({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        phone: response.data.phone
      });
      setAuthToken(response.data.token)

      setLoggedIn(true)

    } catch (err) {
      return err.toString()
    }

  }



  function logout() {
    setLoggedIn(false)
  }



  return (

    <userContext.Provider value={{
      authToken: authToken,
      loggedIn: loggedIn,
      user: user
    }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage login={(email, password) => login(email, password)} loggedIn={loggedIn} />
          </Route>
          <Route path="/home">
            {loggedIn ? <Homepage /> : <Redirect to="/" />}
          </Route>
          <Route path="/explore">
            {loggedIn ? <ExplorePage /> : <Redirect to="/" />}
          </Route>
          <Route path="/subscription">
            {loggedIn ? <SubscribePage /> : <Redirect to="/" />}
          </Route>
          <Route path="/settings">
            {loggedIn ? <Settings logout={() => logout()} /> : <Redirect to="/" />}
          </Route>
          <Route path="/games/:gameId">
            {loggedIn ? <GamePage /> : <GamePage />}
          </Route>
        </Switch>
      </Router>
    </userContext.Provider >

  );
} export default App;
