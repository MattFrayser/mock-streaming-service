import React from 'react';
import styles from "@/styles/components.module.css";

const Row = ({ category, onShowClick  }) => (
  <div className={styles['movie-row']}>
    <h2>{category.categoryName}</h2>
    <div className={styles['movie-scroll-container']}>
      {category.shows.map(show => (
        <div key={show.id} className={styles['movie-card']} onClick={() => onShowClick(show)}>
          <img src={show.image} alt={show.title} />
          <div className={styles.title}> {show.title} </div>
        </div>
      ))}
    </div>
  </div>
);

export default Row;
