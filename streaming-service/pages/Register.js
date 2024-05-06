import React, { useState } from 'react';
import PricingPage from '../components/PricingPage';
import styles from '@/styles/register.module.css';

const Register = () => {


  return (
      <>
      <div className={styles.background} style={{ backgroundImage: 'url(/register.png)' }}></div>
        <div>
        <PricingPage />
        </div>
      </>
  );
};

export default Register;