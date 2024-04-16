import React, { useState, useEffect } from 'react';
import './util.css';

function ViewShows() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://cmsc508.com/~24SP_elliottr2/shows');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                const data = await response.json();
                if (data) {
                    setShows(data);
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
        <div className="allShows">
            <h1>Shows</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title </th>
                        <th> Description </th>
                        <th>Season </th>
                        <th>Episode </th>
                        <th>Genre </th>
                        <th>Image </th>
                    </tr>
                </thead>
                <tbody>
                    {shows.map((show, index) => (
                        <tr key={index}>
                            <td>{show.title}</td>
                            <td>{show.Description}</td>
                            <td>{show.season}</td>
                            <td>{show.episode}</td> 
                            <td>{show.genre}</td>
                            <td>{show.image}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewShows;