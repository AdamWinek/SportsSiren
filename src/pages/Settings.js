import React, { useState } from "react"
import HomeNav from "../components/HomeNav"
import styles from "../css/settings_page_styles.module.css"
function Settings(props) {


    const [passwords, setPasswords] = useState({
        old: "", new: ""
    })
    const [phone, setPhone] = useState("")

    function handleAccoutDelete() {



    }




    return (
        <div>
            <HomeNav active="Settings" />
            <div className={styles.body}>
                <h1 className={styles.sectionHeader}>Settings</h1>
                <div className={styles.sectionBreak}></div>
                <div >
                    <form className={styles.form}>
                        <div className={styles.question}>
                            <label htmlFor="Old Password"
                                className={styles.label}>Old Password</label>
                            <input type="text" id="OldPassword" name="useremail" placeholder="Enter your Old Password" value={passwords.old}
                                className={styles.input}
                                onChange={((e) => setPasswords({
                                    new: passwords.new,
                                    old: e.target.value
                                }))}
                                value={passwords.old}
                            />
                            <span className={styles.focus_border}></span>
                        </div>

                        <div className={styles.question}>

                            <label htmlFor="password" className={styles.label}>New Password</label>
                            <input type="text" id="password" name="userpassword" placeholder="Enter your new password"
                                value={passwords.new}
                                className={styles.input}
                                onChange={((e) => setPasswords({
                                    new: e.target.value,
                                    old: passwords.old
                                }))}
                                required />
                            <span className={styles.focus_border}></span>



                        </div>
                        <div className={styles.question}>
                            <label htmlFor="password" className={styles.label} >New Phone</label>
                            <input
                                className={styles.input} type="text" id="phone" name="userphone" placeholder="Enter your new phone E.g 919-748-2139"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required />
                            <span className={styles.focus_border}></span>
                        </div>
                        <button className={styles.submit}>Submit Changes</button>
                    </form></div>





                <h1 className={styles.sectionHeader}>Danger Zone</h1>
                <div className={styles.sectionBreak}></div>
                <button className={styles.deleteAccount}>Delete Account</button>






            </div>

        </div>

    )

} export default Settings