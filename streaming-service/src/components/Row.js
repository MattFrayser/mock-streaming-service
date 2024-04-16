import React from 'react';
import './components.css';

const Row = ({ category }) => (
  <div className="movie-row">
    <h2>{category.categoryName}</h2>
    <div className="movie-scroll-container">
      {category.shows.map(show => (
        <div key={show.id} className="movie-card">
          <img src={show.image} alt={show.title} />
        </div>
      ))}
    </div>
  </div>
);

export default Row;
