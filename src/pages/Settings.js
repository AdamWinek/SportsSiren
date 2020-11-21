import React, { useContext, useState } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import HomeNav from "../components/HomeNav"
import userContext from "../components/userContext"
import styles from "../css/settings_page_styles.module.css"
function Settings(props) {


    const [passwords, setPasswords] = useState({
        old: "", new: ""
    })
    const [phone, setPhone] = useState("")
    const [isDeleted, setIsDeleted] = useState(false)
    const [deleteSafety, setDeleteSafety] = useState(false)
    const [saveMessage, setSaveMessage] = useState("")
    const userCon = useContext(userContext)



    async function handleAccoutDelete() {
        if (deleteSafety) {
            //do delete endpoint

            try {
                let methodUrl = "https://sports-siren.herokuapp.com/api/";
                if (process.env.REACT_APP_DEV_ENV == "development") {
                    methodUrl = "http://localhost:3000/api/";
                }
                let response = await axios({
                    method: "DElETE",
                    url: methodUrl + "deleteAccount",
                    data: {
                        email: userCon.user.email,
                    },
                });
                userCon.loggedIn = false;
                setIsDeleted(true)

            } catch (err) {
                return err.toString();
            }


        } else {
            setDeleteSafety(true);
            //change variable back after 10 seconds
            setTimeout(() => {
                setDeleteSafety(false)
            }, 10000);

        }

    }

    async function handleAccountChange(e) {
        e.preventDefault()

        if (passwords.old != "" && passwords.new != "") {
            //update password
            try {
                let methodUrl = "https://sports-siren.herokuapp.com/api/";
                if (process.env.REACT_APP_DEV_ENV == "development") {
                    methodUrl = "http://localhost:3000/api/";
                }
                let response = await axios({
                    method: "PUT",
                    url: methodUrl + "updatePassword",
                    data: {
                        email: userCon.user.email,
                        oldPassword: passwords.old,
                        newPassword: passwords.new
                    },
                });
                setSaveMessage(saveMessage + " " + response.data.message)


            } catch (err) {
                return err.toString();
            }

        }
        if (phone != "") {
            // update phone
            try {
                let methodUrl = "https://sports-siren.herokuapp.com/api/";
                if (process.env.REACT_APP_DEV_ENV == "development") {
                    methodUrl = "http://localhost:3000/api/";
                }
                let response = await axios({
                    method: "PUT",
                    url: methodUrl + "updatePhone",
                    data: {
                        email: userCon.user.email,
                        phone: phone
                    },
                });


                setSaveMessage(saveMessage + " " + response.data.message)
            } catch (err) {
                return err.toString();
            }


        }
        setTimeout(() => {
            setSaveMessage("")
        }, 10000);

    }

    let saveMsg = null;
    if (saveMessage != "") {
        saveMsg = (<h1 className={styles.savedMsg}>{saveMessage}</h1>)
    }


    let deleteMsg = null
    if (deleteSafety) {
        deleteMsg = (<h1 className={styles.deleteMsg}> Clicking again will delete your account this is permanent.</h1>)

    }

    if (isDeleted) {
        return (<Redirect to="/" />)
    } else {
        return (
            <div>
                <HomeNav active="Settings" />
                <div className={styles.body}>
                    <h1 className={styles.sectionHeader}>Settings</h1>
                    <div className={styles.sectionBreak}></div>
                    <div >
                        {saveMsg}
                        <form onSubmit={(e) => handleAccountChange(e)} className={styles.form}>
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
                                />
                                <span className={styles.focus_border}></span>
                            </div>
                            <div className={styles.question}>
                                <label htmlFor="password" className={styles.label} >New Phone</label>
                                <input
                                    className={styles.input} type="text" id="phone" name="userphone" placeholder="Enter your new phone E.g 919-748-2139"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <span className={styles.focus_border}></span>
                            </div>
                            <button className={styles.submit} >Submit Changes</button>
                        </form></div>
                    <h1 className={styles.sectionHeader}>Danger Zone</h1>
                    <div className={styles.sectionBreak}></div>
                    {deleteMsg}
                    <button className={styles.deleteAccount} onClick={() => handleAccoutDelete()}>Delete Account</button>
                </div>

            </div>

        )

    }

} export default Settings