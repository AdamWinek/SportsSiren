import React from 'react';
import Circles from '../Circles.svg'
import styles from '../css/front_countdown.module.css'

const FrontCountDown = () => {

    return (
        <div className={styles.container}>
            <img src={Circles} alt="Background img for countdown" />
        </div>
    )

}
export default FrontCountDown;
 