"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/styles/components.module.css";
import cookie from 'js-cookie';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      const result = await response.json();
      setIsLoading(false);

      if (result.success) {
        localStorage.setItem("user", email)
        router.push('/Homepage');
      } else {
        setErrorMessage(result.message || 'Login failed');
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

