"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import styles from "@/styles/components.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/Homepage');
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      setIsLoading(false);

      if (!result || !result.ok) {
        setErrorMessage(result?.error || 'Login failed');
      } else {
        router.push('/Homepage');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Network error');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
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

