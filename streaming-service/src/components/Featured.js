import React from 'react';
import './components.css';


const Featured = ({ featured }) => (
  <div className="featured" style={{ backgroundImage: `url(${featured.image})` }}>
    <div className="featured-details">
      <p className="head">{featured.title}</p>
        <span>{featured.genre}</span>
        <span> | </span>
        <span>{featured.season} Seasons</span>

      <p className ="desc">{featured.Description}</p>
    </div>
  </div>
);

export default Featured;