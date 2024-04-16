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

        if (data) {
          // Assume the first show as featured for the sake of example
          setFeatured(data[0]);
          const genreGroups = data.reduce((acc, show) => {
            acc[show.genre] = acc[show.genre] || [];
            acc[show.genre].push(show);
            return acc;
          }, {});

          const sortedCategories = Object.keys(genreGroups).sort().map(genre => ({
            categoryName: genre,
            shows: genreGroups[genre]
          }));

          setCategories(sortedCategories);
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