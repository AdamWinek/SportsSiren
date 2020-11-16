import React from 'react'
import styles from '../../css/signup_con.module.css'

const SignUpCon = (props) => {

    return (
    <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.title}>
            <h1 className="">Sign up | <span className={styles.login} onClick={() => props.toggleLogin()}>Login</span></h1>
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
      </div>);
}

export default SignUpCon;