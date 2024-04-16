import React from 'react';
import './components.css';


const Featured = ({ featured }) => (
  <div className="featured" style={{ backgroundImage: `url(${featured.image})` }}>
    <div className="featured-details">
      <h1>{featured.title}</h1>
      <p>{featured.description}</p>
      <div className="additional-info">
        <span>{featured.genre}</span>
        <span> | </span>
        <span>{featured.seasons} Seasons</span>
      </div>
    </div>
  </div>
);

export default Featured;