import React from 'react';
import styles from '../css/row_card.module.css'
import bill from './bill.gif'

const RowCard = (props) => {
    /*
    
    if (props.type == "") {
        return();

    } else if () {
        return();

    } else {
        return();

    }
    */
    return(
        <div className={styles.container}>
            <h2>Buffalo Bills</h2>
            <img src={bill} className="" alt=""></img>
            <button className={styles.btn}>Subscribe</button>
        </div>
    )
}
export default RowCard;
