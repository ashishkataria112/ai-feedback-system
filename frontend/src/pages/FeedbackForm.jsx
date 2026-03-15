import { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/feedback', { feedback_text: feedback }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSentiment(res.data.sentiment);
      setMessage('Feedback submitted successfully!');
      setFeedback('');
    } catch (err) {
      setMessage('Failed to submit feedback');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Feedback</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit Feedback</button>
        </form>
        {sentiment && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p>Sentiment: <span className="font-bold capitalize">{sentiment}</span></p>
          </div>
        )}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default FeedbackForm;