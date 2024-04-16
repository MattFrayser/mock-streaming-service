import React, { useState, useEffect } from 'react';
import Featured from '../components/Featured';
import Row from '../components/Row';
import './Homepage.css';

function Homepage() {
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://cmsc508.com/~24SP_elliottr2/shows');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.featured && Array.isArray(data.categories)) {
          setFeatured(data.featured);
          setCategories(data.categories);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage">
      {featured && <Featured featured={featured} />}
      <div className="movie-categories">
        {categories.map(category => (
          <Row key={category.categoryName} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;