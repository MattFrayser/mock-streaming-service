import React, { useState, useEffect } from 'react';
import './util.css';

function ViewUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://cmsc508.com/~24SP_elliottr2/users');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                const data = await response.json();
                if (data) {
                    setUsers(data);
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
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Subscription Status </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.subscription_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewUsers;