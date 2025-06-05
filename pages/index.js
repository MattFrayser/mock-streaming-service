import React from 'react';
import styles from "@/styles/login.module.css";
import LoginForm from '../oldcomponents/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className={styles['login-page']} style={{ backgroundImage: 'url(/loginBackground.png)' }}>
      <div className={styles['login-container']}>
        <div className={styles['head']}> Anime Streaming </div>
        <div className={styles['sub']}> Dont have an account? <Link href="/Register" className="create-account-link">Start watching now!</Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;