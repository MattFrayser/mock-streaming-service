import React from 'react';
import styles from "@/styles/components.module.css";


const Featured = ({ featured }) => (
  <div className={styles['featured']} style={{ backgroundImage: `url(${featured.image})` }}>
    <div className={styles['featured-details']}>
      <p className={styles['head']}>{featured.title}</p>
        <span>{featured.genre}</span>
        <span> | </span>
        <span>{featured.season} Seasons</span>

      <p className ={styles['desc']}>{featured.Description}</p>
    </div>
  </div>
);

export default Featured;