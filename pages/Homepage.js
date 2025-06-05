import React, { useState, useEffect } from 'react';
import Featured from '../oldcomponents/Featured';
import Row from '../oldcomponents/Row';
import styles from "@/styles/homepage.module.css";
import { useRouter } from 'next/router';
import Header from '../oldcomponents/Header';
import { useSession } from 'next-auth/react';

function Homepage() {
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching from the local API endpoint
        const response = await fetch('/api/getShows');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();

        if (data.results) {
          setFeatured(data.results[0]);  // Assuming the first show is featured
          const genreGroups = data.results.reduce((acc, show) => {
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

  const handleShowClick = show => {
    const id = show.show_ID;
    router.push({
      pathname: '/ShowDetails',
      query: { query: id }
    });
  };

  return (
    <>
      <Header />
      <div className={styles['homepage']}>
        {featured && <Featured featured={featured} />}
        <div className={styles['categories']}>
          {categories.map(category => (
            <Row key={category.categoryName} category={category} onShowClick={handleShowClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;