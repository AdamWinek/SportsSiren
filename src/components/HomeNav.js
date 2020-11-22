import React from "react"
import styles from "../css/nav_styles.module.css"
import logo from "../logosmall.svg"
import { Link } from "react-router-dom"

function HomeNav(props) {

    return (
        <div className={styles.navContainer}>
            <Link to="/home"><img src={logo} className={styles.navLogo} alt="logo" /></Link>
            <div className={styles.navItems}>
                <Link to="/home" className={props.active == "Home" ? styles.activeLink : styles.navLinks}>Home</Link>
                <Link className={styles.navLinks}>Explore</Link>
                <Link to="/subscription" className={props.active == "subscription" ? styles.activeLink : styles.navLinks} className={styles.navLinks}>Subscription</Link>
                <Link to="/settings" className={props.active == "Settings" ? styles.activeLink : styles.navLinks}>Settings</Link>
            </div>
        </div>



    )

} export default HomeNav