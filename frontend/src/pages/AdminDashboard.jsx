import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { FiTrendingUp } from 'react-icons/fi';

const statCards = [
  { key: 'total', label: 'Total Feedback', icon: FiTrendingUp, gradient: 'from-indigo-500 to-cyan-500' },
  { key: 'positive', label: 'Positive', icon: FiTrendingUp, gradient: 'from-emerald-500 to-emerald-400' },
  { key: 'negative', label: 'Negative', icon: FiTrendingUp, gradient: 'from-rose-500 to-rose-400' },
  { key: 'neutral', label: 'Neutral', icon: FiTrendingUp, gradient: 'from-slate-500 to-slate-400' },
];

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState({ total: 0, positive: 0, negative: 0, neutral: 0 });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/feedback', { headers: { Authorization: `Bearer ${token}` } });
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedbacks');
      }
    };

    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } });
        setAnalytics(res.data);
      } catch (err) {
        console.error('Failed to fetch analytics');
      }
    };

    fetchFeedback();
    fetchAnalytics();
  }, []);

  const recent = useMemo(() => {
    return [...feedbacks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  }, [feedbacks]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.key} className="relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-200">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{analytics[card.key] ?? 0}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} bg-opacity-80 shadow-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Feedback</h2>
              <p className="text-sm text-slate-300">Latest entries from customers</p>
            </div>
            <Link to="/app/feedbacks" className="text-sm font-semibold text-indigo-200 hover:text-white">
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {recent.length === 0 ? (
              <p className="text-sm text-slate-300">No feedback found yet.</p>
            ) : (
              recent.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.email}</p>
                    </div>
                    <Badge sentiment={item.sentiment} />
                  </div>
                  <p className="mt-2 text-sm text-slate-200 line-clamp-2">{item.feedback_text}</p>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/app/analytics"
              className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              View analytics charts
            </Link>
            <Link
              to="/app/feedbacks"
              className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Manage all feedback
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
