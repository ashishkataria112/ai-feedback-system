import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/feedback', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedbacks');
      }
    };
    fetchFeedbacks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div>
          <Link to="/analytics" className="bg-green-500 text-white px-4 py-2 rounded mr-2">View Analytics</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Feedback</h2>
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="border p-4 rounded">
              <p><strong>Name:</strong> {fb.name}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Feedback:</strong> {fb.feedback_text}</p>
              <p><strong>Sentiment:</strong> <span className="capitalize">{fb.sentiment}</span></p>
              <p><strong>Date:</strong> {new Date(fb.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;