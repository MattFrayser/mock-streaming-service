import React from 'react';
import styles from "@/styles/login.module.css";
import PlanSelection from '../components/PlanSelection';

const LoginPage = () => {
  return (
    <div className={styles['login-page']} style={{ backgroundImage: 'url(/loginBackground.png)' }}>
      <div className={styles['login-container']}>
        <div className={styles['head']}> Anime Streaming </div>
        <div className={styles['sub']}> Dont have an account? 
        <a href="/signup" className="create-account-link">Start watching now!</a>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;