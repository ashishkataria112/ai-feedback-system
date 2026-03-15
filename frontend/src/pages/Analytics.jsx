import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ total: 0, positive: 0, negative: 0, neutral: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnalytics(res.data);
      } catch (err) {
        console.error('Failed to fetch analytics');
      }
    };
    fetchAnalytics();
  }, []);

  const pieData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      data: [analytics.positive, analytics.negative, analytics.neutral],
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
    }],
  };

  const barData = {
    labels: ['Total', 'Positive', 'Negative', 'Neutral'],
    datasets: [{
      label: 'Feedback Count',
      data: [analytics.total, analytics.positive, analytics.negative, analytics.neutral],
      backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B'],
    }],
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div>
          <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Back to Dashboard</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <div className="space-y-2">
            <p>Total Feedback: {analytics.total}</p>
            <p>Positive: {analytics.positive}</p>
            <p>Negative: {analytics.negative}</p>
            <p>Neutral: {analytics.neutral}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Sentiment Distribution</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded shadow-md md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Feedback Statistics</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;