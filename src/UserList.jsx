import React, { useEffect, useState } from "react";
import axios from 'axios'

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = "https://jsonplaceholder.typicode.com/users?_limit=10";
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Fetching API Data...");
                const response = await axios.get(API_URL);
                console.log(response, "this is the response  we are  getting ")
                setUsers(response.data);
                setLoading(false)
            } catch (error) {
                console.log("Fetching failed, trying cache...");
                if ("caches" in window) {
                    const cache = await caches.open("api-cache-v1");
                    const cachedResponse = await cache.match(API_URL);
                    if (cachedResponse) {
                        console.log("Using cached API response.");
                        const cachedData = await cachedResponse.json();
                        setUsers(cachedData);
                        setLoading(false)
                    } else {
                        console.log("No cache found.");
                        setLoading(false)
                    }
                }
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "20px" }}>
            {users.map((user) => (
                <div key={user.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
                    <h3>{user.name}</h3>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Website: <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                </div>
            ))}
        </div>
    );
};

export default UsersList;
