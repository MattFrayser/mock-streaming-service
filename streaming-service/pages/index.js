import React from 'react';
import styles from "@/styles/login.module.css";
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className={styles['login-page']} style={{ backgroundImage: 'url(/loginBackground.png)' }}>
      <div className={styles['login-container']}>
        <div className={styles['head']}> Anime Streaming </div>
        <div className={styles['sub']}> Don't have an account? <a href="/Register" className="create-account-link">Start watching now!</a>
         </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;