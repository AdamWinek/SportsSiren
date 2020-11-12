import React from 'react';
import InfoCon from '../components/containers/InfoCon';
import LoginCon from '../components/containers/LoginCon';
import styles from '../css/login_page.module.css'


const loginPage = () => {
  return (
    <div className={styles.container}>
        <InfoCon></InfoCon>
        <LoginCon></LoginCon>
    </div>
  );
}

export default loginPage;
