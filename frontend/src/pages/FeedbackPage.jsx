import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Badge from '../components/ui/Badge';

const API = import.meta.env.VITE_API_URL;
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ToastContext from '../context/ToastContext';

const sentimentLabel = {
  positive: 'Positive',
  negative: 'Negative',
  neutral: 'Neutral',
};

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!feedback.trim()) {
      toast('Please share your feedback before submitting.', 'warning');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API}/api/feedback`,
        { feedback_text: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSentiment(res.data.sentiment);
      setFeedback('');
      toast('Feedback submitted successfully!', 'success');
    } catch (err) {
      toast(err.response?.data?.message || 'Could not submit feedback', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Share your feedback</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Write about your experience and we'll analyze the sentiment instantly.
        </p>
      </motion.div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              placeholder="Tell us what you think..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={loading} className="min-w-[160px]">
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            {sentiment && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Sentiment:</span>
                <Badge sentiment={sentiment}>{sentimentLabel[sentiment] || sentiment}</Badge>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FeedbackPage;
