"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/signUpPage.module.css';

const AddShow = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    image: '',
  });

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

    if (!formData.title || !formData.description || !formData.genre || !formData.image) {
      alert(`Please fill in all fields correctly. ${formData.name}`);
      return; 
    }

    try {
      const response = await fetch(`/api/addShow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add show');
      }

      const responseData = await response.json();
      alert('Show Added!');

    } catch (error) {
      console.error('Error:', error);
      alert(`Error adding show, please try again`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of Show"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              required
            />
        </div>
        <div className={styles.formGroupL}>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description of show"
              className={styles.input}
              value={formData.description}
              onChange={handleChange}
              required
            />
        </div>
  
        <div className={styles.formGroup}>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre"
            className={styles.input}
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className={styles.formGroup}>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Path to image"
            className={styles.input}
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Add Show</button>
      </form>
    </div>
  );
};

export default AddShow;