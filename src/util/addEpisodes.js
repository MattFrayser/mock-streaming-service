"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/signUpPage.module.css';
import ShowDropdown from '../oldcomponents/showDropdown';

const AddEpisodes = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    episode_number: '',
    show_title: '',
    episode_title: '',
    episode_video: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleShowSelected = (showID) => {
    setFormData(prevState => ({
      ...prevState,
      show_title: showID
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", formData);

    if (!formData.episode_number || !formData.show_title || !formData.episode_title || !formData.episode_video) {
      alert(`Please fill in all fields correctly.`);
      return;
    }

    try {
      const response = await fetch(`/api/addEpisode`, {
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
            id="episode_number"
            name="episode_number"
            placeholder="Episode number"
            className={styles.input}
            value={formData.episode_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <ShowDropdown onSelected={handleShowSelected} />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            id="episode_title"
            name="episode_title"
            placeholder="Title"
            className={styles.input}
            value={formData.episode_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            id="episode_video"
            name="episode_video"
            placeholder="Video path"
            className={styles.input}
            value={formData.episode_video}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Add Episode</button>
      </form>
    </div>
  );
};

export default AddEpisodes;