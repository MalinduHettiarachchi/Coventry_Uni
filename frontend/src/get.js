import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LecturerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the lecturer requests from the server
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lecturerreq"); // Adjust the URL as needed
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lecturer requests", error);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Lecturer Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <p><strong>Name:</strong> {request.name}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Contact Number:</strong> {request.contactNumber}</p>
            <p><strong>Resume:</strong> <a href={`/${request.resume}`} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
            <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LecturerRequests;
