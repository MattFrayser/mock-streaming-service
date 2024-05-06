import React, { useState, useEffect } from 'react';
import Featured from '../components/Featured';
import Row from '../components/Row';
import styles from "@/styles/homepage.module.css";
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { verify } from 'jsonwebtoken';
import cookie from 'js-cookie';

function Homepage() {
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = cookie.get('auth');
    if (token) {
      try {
        const decoded = verify(token, process.env.KEY);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        router.push('/');
      }
    } else {
      setAuthenticated(false);
      router.push('/');
    }
  }, []);


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
      query: {query: id}
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