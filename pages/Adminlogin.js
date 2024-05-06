import React from 'react';
import styles from "@/styles/login.module.css";
import LoginFormAdmin from '../components/LoginFormAdmin';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className={styles['login-page']} style={{ backgroundImage: 'url(/loginBackground.png)' }}>
      <div className={styles['login-container']}>
        <div className={styles['head']}> Administrator </div>
        <div className={styles['sub']}>
         </div>
        <LoginFormAdmin />
      </div>
    </div>
  );
};

export default LoginPage;