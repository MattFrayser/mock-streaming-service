import React, { useState, useEffect } from 'react';
import './util.css';

function ViewEpisodes() {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://cmsc508.com/~24SP_elliottr2/episodes');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                const data = await response.json();
                if (data) {
                    setEpisodes(data);
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
        <div>
            <h1> Episodes </h1>
            <table>
                <thead>
                    <tr>
                        <th> Show </th>
                        <th> Episode </th>
                        <th> Title</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map((episode, index) => (
                        <tr key={index}>
                            <td>{episode.Show}</td>
                            <td>{episode.episode_ID}</td>
                            <td>{episode.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewEpisodes;