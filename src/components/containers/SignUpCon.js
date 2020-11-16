import React from "react";
import styles from "../../css/signup_con.module.css";
import axiox from "axios";

const SignUpCon = (props) => {
  let signUpRequest = async (fname, lname, email, password, telephone) => {
    try {
      let methodUrl = "https://sports-siren.herokuapp.com/api/";
      if (process.env.REACT_APP_DEV_ENV == "development") {
        methodUrl = "http://localhost:3000/api/";
      }
      let response = await axios({
        method: "POST",
        url: methodUrl + "registerUser",
        data: {
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          telephone: telephone
        },
      });


     
    } catch (err) {
      return err.toString();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.title}>
          <h1 className="">
            Sign up |{" "}
            <span className={styles.login} onClick={() => props.toggleLogin()}>
              Login
            </span>
          </h1>
        </div>
        <form>
          <div className={styles.question}>
            <div className={styles.twoline}>
              <div className={styles.subquestion}>
                <label htmlFor="email">First Name</label>
                <input
                  type="text"
                  id="email"
                  name="useremail"
                  placeholder="Enter your e-mail"
                  required
                />
                <span className={styles.focus_border}></span>
              </div>
              <div className={styles.subquestion}>
                <label htmlFor="email">Last Name</label>
                <input
                  type="text"
                  id="email"
                  name="useremail"
                  placeholder="Enter your e-mail"
                  required
                />
                <span className={styles.focus_border}></span>
              </div>
            </div>
          </div>
          <div className={styles.question}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              name="useremail"
              placeholder="Enter your e-mail"
              required
            />
            <span className={styles.focus_border}></span>
          </div>
          <div className={styles.question}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="userpassword"
              placeholder="Enter your password"
              required
            />
            <span className={styles.focus_border}></span>
          </div>
          <button className={styles.submit}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpCon;
