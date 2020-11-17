import React from "react"
import styles from "../css/nav_styles.module.css"
import logo from "../logosmall.svg"
import { Link } from "react-router-dom"

function HomeNav(props) {

    return (
        <div className={styles.navContainer}>
            <img src={logo} className={styles.navLogo} alt="logo" />
            <div className={styles.navItems}>
                <Link className={styles.navLinks}>Home</Link>
                <Link className={styles.navLinks}>Explore</Link>
                <Link className={styles.navLinks}>Games</Link>
                <Link className={styles.navLinks}>Settings</Link>
            </div>
        </div>



    )

} export default HomeNav