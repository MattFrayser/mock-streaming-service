"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/signUpPage.module.css';
import { isMobile, isTablet } from 'react-device-detect';

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repeatPassword: '',
    credit_card: '',
    subscription_status: 2, // Default 3 (SuperFan Plan)
    device: 3, // Default Desktop
  });

  useEffect(() => {
    // Function to update the device type in formData
    const updateDeviceType = (deviceType) => {
      setFormData(prevState => ({
        ...prevState,
        device: deviceType
      }));
    };

    if (isMobile) {
      updateDeviceType(1);
    } else if (isTablet) {
      updateDeviceType(4);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", formData);

    if (!formData.first_name || !formData.last_name|| !formData.email || !formData.password || !formData.credit_card || !formData.subscription_status) {
      alert(`Please fill in all fields correctly. ${formData.name}`);
      return; 
    }

    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const responseData = await response.json();
      console.log('Sign up successful:', responseData);
      router.push(`/Homepage`);
      alert('Thank you for signing up!');
    } catch (error) {
      console.error('Error during sign up:', error);
      alert(`Error during sign up: ${error.message}`);
    }
  };

  return (
    <div className={styles.background} style={{ backgroundImage: 'url(/signup.png)' }}>
    <div className={styles.container}>
      <h1 className={styles.formTitle}><span className={styles.formWord}> Super Fan</span> Sign Up </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
  
        <div className={styles.formGroup}>
          <div className={styles.halfWidth}>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              className={styles.input}
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.halfWidth}>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className={styles.input}
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
  
        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Confirm Password"
            className={styles.input}
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel" 
            id="credit_card"
            name="credit_card"
            placeholder="Credit Card (not a real one please)"
            className={styles.input}
            value={formData.credit_card}
            onChange={handleChange}
            required
            pattern="\d*" 
            maxLength="16"
          />
        </div>
  
        <div className={styles.terms}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
          />
          <label htmlFor="terms" className={styles.label}>Accept Terms and Conditions</label>
        </div>
  
        <button type="submit" className={styles.submitButton}>Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUpPage;