import React, { useState, useContext } from 'react'
import '../../css/global_styles.css'
import styles from '../../css/login_con.module.css'
import { Redirect } from "react-router-dom";

const LoginCon = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    let handleSubmit = function (e) {
        e.preventDefault()
        console.log(email, password)
        props.login(email, password)
    }




    if (props.loggedIn) {
        return (
            <Redirect to="/home" />)

    } else {



        return (
            <div className={styles.container}>
                <div className={styles.block}>
                    <div className={styles.title}>
                        <h1 className="">Login | <span className={styles.sign} onClick={() => props.toggleLogin()}>Sign up</span></h1>
                    </div>
                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.question}>
                            <label className={styles.label} htmlFor="email">E-mail</label>
                            <input type="text" id="email" name="useremail" placeholder="Enter your e-mail" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}

                                required />
                            <span className={styles.focus_border}></span>
                        </div>
                        <div className={styles.question}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input type="password" id="password" name="userpassword"
                                className={styles.input}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <span className={styles.focus_border}></span>
                        </div>
                        <button className={styles.submit}>Login</button>
                    </form>
                </div>
            </div>
        )
    }

}
export default LoginCon;