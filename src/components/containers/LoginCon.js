import React from 'react'
import '../../css/global_styles.css'
import styles from '../../css/login_con.module.css'

const LoginCon = () => {
    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <div className={styles.title}>
                    <h1 className="">Login | <span className={styles.sign}>Sign up</span></h1>
                </div>
                <form>
                    <div className={styles.question}>
                        <label htmlfor="email">E-mail</label>
                        <input type="text" id="email" name="useremail" placeholder="Enter your e-mail" required />
                        <span className={styles.focus_border}></span>
                    </div>
                    <div className={styles.question}>
                        <label htmlfor="password">Password</label>
                        <input type="text" id="password" name="userpassword" placeholder="Enter your password"
                            required />
                        <span className={styles.focus_border}></span>
                    </div>
                    <button className={styles.submit}>Login</button>
                </form>
            </div>
        </div>
    )


}
export default LoginCon;