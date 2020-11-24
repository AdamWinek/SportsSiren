import React, { useState } from "react";
import InfoCon from "../components/containers/InfoCon";
import LoginCon from "../components/containers/LoginCon";
import SignUpCon from "../components/containers/SignUpCon";
import styles from "../css/login_page.module.css";
import { Link } from "react-router-dom"




const LoginPage = (props) => {
  const [onLogin, setonLogin] = useState(true);
  function toggleLogin() {
    setonLogin(!onLogin);
  }

  return (
    
    <div className={styles.container}>
      <InfoCon></InfoCon>
      {onLogin ? (
        <LoginCon
          toggleLogin={() => toggleLogin()}
          login={(email, password) => props.login(email, password)}
          loggedIn={props.loggedIn}
        ></LoginCon>
      ) : (
        <SignUpCon
          login={(email, password) => props.login(email, password)}
          loggedIn={props.loggedIn}
          toggleLogin={() => toggleLogin()}
        ></SignUpCon>
      )}
    </div>
  );
};

export default LoginPage;
