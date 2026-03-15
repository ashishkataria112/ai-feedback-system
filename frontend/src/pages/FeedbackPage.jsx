import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useContext } from 'react';
import ToastContext from '../context/ToastContext';

const sentimentLabel = {
  positive: { label: 'Positive', color: 'positive' },
  negative: { label: 'Negative', color: 'negative' },
  neutral: { label: 'Neutral', color: 'neutral' },
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
        '/api/feedback',
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
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-2xl font-semibold">Share your feedback</h2>
        <p className="text-sm text-slate-300">
          Write about your experience, and we’ll analyze the sentiment instantly. Admins will review each entry.
        </p>
      </motion.div>

      <Card className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              placeholder="Tell us what you think..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button type="submit" disabled={loading} className="min-w-[180px]">
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
            {sentiment && (
              <div className="flex items-center gap-3">
                <Badge sentiment={sentiment} className="text-sm" />
                <span className="text-sm text-slate-300">Sentiment: {sentimentLabel[sentiment]?.label || sentiment}</span>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FeedbackPage;
