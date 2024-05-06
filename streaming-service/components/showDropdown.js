import React, { useState, useEffect } from 'react';

const ShowDropdown = ({ onCategorySelected }) => {
  // State to keep track of the selected option
  const [selected, setSelected] = useState('');
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/getShows');
        const data = await response.json();
        setShows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    fetchShows();
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue);
    if (onCategorySelected) {
      onCategorySelected(newValue);
    }
  };

  return (
    <select value={selected} onChange={handleChange}>
      {shows.map((show, index) => (
        <option key={index} value={show.title}>
          {show.title}
        </option>
      ))}
    </select>
  );
};

export default ShowDropdown;
