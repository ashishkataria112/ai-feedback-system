import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/ui/Card';

const API = import.meta.env.VITE_API_URL;
import Badge from '../components/ui/Badge';
import { FiMessageSquare, FiSmile, FiFrown, FiMinus, FiArrowRight } from 'react-icons/fi';

const statCards = [
  { key: 'total', label: 'Total Feedback', icon: FiMessageSquare, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { key: 'positive', label: 'Positive', icon: FiSmile, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { key: 'negative', label: 'Negative', icon: FiFrown, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  { key: 'neutral', label: 'Neutral', icon: FiMinus, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800' },
];

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState({ total: 0, positive: 0, negative: 0, neutral: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    axios.get(`${API}/api/feedback`, { headers }).then((res) => setFeedbacks(res.data)).catch(console.error);
    axios.get(`${API}/api/admin/analytics`, { headers }).then((res) => setAnalytics(res.data)).catch(console.error);
  }, []);

  const recent = useMemo(
    () => [...feedbacks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5),
    [feedbacks]
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.key} className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.bg}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{analytics[card.key] ?? 0}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Feedback</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest entries from customers</p>
            </div>
            <Link
              to="/app/feedbacks"
              className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              View all <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No feedback found yet.</p>
            ) : (
              recent.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                    </div>
                    <Badge sentiment={item.sentiment}>{item.sentiment}</Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{item.feedback_text}</p>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/app/analytics"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            >
              View analytics charts <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/app/feedbacks"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            >
              Manage all feedback <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
