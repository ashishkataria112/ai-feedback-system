import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FiSearch } from 'react-icons/fi';

const PAGE_SIZE = 8;

const sentimentOptions = [
  { value: '', label: 'All Sentiments' },
  { value: 'positive', label: 'Positive' },
  { value: 'negative', label: 'Negative' },
  { value: 'neutral', label: 'Neutral' },
];

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [query, setQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/feedback', { headers: { Authorization: `Bearer ${token}` } });
        setFeedback(res.data);
      } catch (err) {
        console.error('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return feedback
      .filter((item) => {
        const matchQuery = [item.name, item.email, item.feedback_text].join(' ').toLowerCase().includes(query.toLowerCase());
        const matchSentiment = sentimentFilter ? item.sentiment === sentimentFilter : true;
        return matchQuery && matchSentiment;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [feedback, query, sentimentFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Feedback Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Search, filter, and review feedback submissions.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search feedback..."
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 sm:w-64"
            />
          </div>
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {sentimentOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max divide-y divide-slate-100 text-left dark:divide-slate-800">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Sentiment</th>
                <th className="px-6 py-3">Submitted</th>
                <th className="px-6 py-3">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx}>
                    {Array.from({ length: 5 }).map((__, i) => (
                      <td key={i} className="px-6 py-4">
                        <div className="h-4 rounded-full bg-slate-100 animate-pulse dark:bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 dark:text-slate-500">
                    No matching feedback found.
                  </td>
                </tr>
              ) : (
                paged.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.email}</td>
                    <td className="px-6 py-4">
                      <Badge sentiment={item.sentiment}>{item.sentiment}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="max-w-xs px-6 py-4 text-slate-600 dark:text-slate-300">
                      <p className="line-clamp-2">{item.feedback_text}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-medium text-slate-900 dark:text-slate-100">{paged.length}</span> of{' '}
            <span className="font-medium text-slate-900 dark:text-slate-100">{filtered.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Previous
            </Button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page <span className="font-semibold text-slate-900 dark:text-slate-100">{page}</span> of{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-100">{totalPages}</span>
            </span>
            <Button variant="secondary" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeedbackManagement;
