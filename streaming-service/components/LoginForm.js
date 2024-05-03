"use client";
import { useState } from 'react';
import styles from "@/styles/components.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      };

      // Make sure the URL is correct
      const response = await fetch('/api/login', requestOptions);
      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        alert('Login successful!');
      } else {
        setErrorMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Network error');
    }
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
      <div className={styles['form-group']}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles['form-group']}>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className={styles['login-button']} disabled={isLoading}>
        {isLoading ? 'Logging In...' : 'Log In'}
      </button>
      <a href="#" className={styles['forgot-password']}>Forgot Your Password?</a>
    </form>
  );
};

export default LoginForm;

