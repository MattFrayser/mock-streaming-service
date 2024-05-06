import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/details.module.css';
import YouTubeEmbed from '../components/Video';

const ShowDetails = () => {
  const router = useRouter();
  const id = router.query.query;
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {

      try {
        const response = await fetch(`/api/getShowDetails?id=${id}`);
        if (!response.ok) {
          router.push('/Homepage');
        }
        const data = await response.json();
        if (data) {
          setShow(data);
        } else {
          setError('No details found for this show');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>No show details available.</p>;

  return (
    <div className={styles.showContainer}>
      <div className={styles.class}>
        <img src={show.image} alt={show.title} className={styles.image}/>
        <h1 className={styles.head}>{show.title}</h1>
        <div className={styles.subbox}>
          <span>{show.season} Seasons</span>
          <span className={styles.divider}> | </span>
          <span>{show.genre}</span>
          <span className={styles.divider}> | </span>
          <span>{show.episode} Episodes</span>
        </div>
        <h2 className={styles.desc}>{show.description}</h2>
      </div>

      <div className={styles.episodeColumn}>
        {show.episodes.map((episode, index) => (
          <div key={index} className={styles.episode}>
            <YouTubeEmbed videoId={episode.episode_video} /> 
            <h3>{episode.episode_title}</h3>
            <p>Episode {show.episode_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;
