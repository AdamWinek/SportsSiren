import React, { useState } from "react";
import styles from "../../css/signup_con.module.css";
import axios from "axios";

import { Redirect } from "react-router-dom";

const SignUpCon = (props) => {
    let [data, setData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        telephone: "",
    });
    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value });


    };
    let signUpRequest = async (fname, lname, email, password, telephone) => {
        try {
            let methodUrl = "https://sports-siren.herokuapp.com/api/";
            if (process.env.REACT_APP_DEV_ENV == "development") {
                methodUrl = "http://localhost:3000/api/";
            }
            let data =   {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                telephone: telephone,
            }

            let response = await axios({
                method: "POST",
                url: methodUrl + "create/registerUser",
                data: {
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: password,
                    telephone: telephone,
                },
            });
        } catch (err) {
            return err.toString();
        }
    };


    if (props.loggedIn) {
        return (<Redirect to="/home" />)
    }
    let handleSubmit = async function (e) {
        e.preventDefault()
        await signUpRequest(data.fname, data.lname, data.email, data.password, data.telephone)
        await props.login(data.email, data.password)

    }


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
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.question}>
                        <div className={styles.twoline}>
                            <div className={styles.subquestion}>
                                <label className={styles.label} htmlFor="fname">First Name</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    placeholder="Enter your first name"
                                    onChange={(e) => onChange(e)}
                                    className={styles.input}
                                    required
                                />
                                <span className={styles.focus_border}></span>
                            </div>
                            <div className={styles.subquestion}>
                                <label className={styles.label} htmlFor="lname">Last Name</label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="Enter your last name"
                                    onChange={(e) => onChange(e)}
                                    className={styles.input}
                                    required
                                />
                                <span className={styles.focus_border}></span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.question}>
                        <label className={styles.label} htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your e-mail"
                            onChange={(e) => onChange(e)}
                            required
                            className={styles.input}

                        />
                        <span className={styles.focus_border}></span>
                    </div>
                    <div className={styles.question}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => onChange(e)}
                            required
                            className={styles.input}

                        />
                        <span className={styles.focus_border}></span>
                    </div>
                    <div className={styles.question}>
                        <label className={styles.label} htmlFor="telephone">Phone number</label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            placeholder="E.g 919-748-2139"
                            onChange={(e) => onChange(e)}
                            required
                            className={styles.input}

                        />
                        <span className={styles.focus_border}></span>
                    </div>
                    <button className={styles.submit} onSubmit={(e) => handleSubmit(e)}>Sign Up!</button>
                </form>
            </div>
        </div>
    );
};


export default SignUpCon;
