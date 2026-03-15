import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FiSearch } from 'react-icons/fi';

const PAGE_SIZE = 8;

const sentimentOptions = [
  { value: '', label: 'All' },
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
    const fetch = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/feedback', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedback(res.data);
      } catch (err) {
        console.error('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const filtered = useMemo(() => {
    return feedback
      .filter((item) => {
        const matchQuery = [item.name, item.email, item.feedback_text]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchSentiment = sentimentFilter ? item.sentiment === sentimentFilter : true;
        return matchQuery && matchSentiment;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [feedback, query, sentimentFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Feedback Management</h2>
          <p className="text-sm text-slate-300">Search, filter, and review feedback submissions.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search feedback..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-72"
            />
          </div>
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {sentimentOptions.map((item) => (
              <option key={item.value} value={item.value} className="bg-slate-900 text-white">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full min-w-max divide-y divide-white/10 text-left">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Sentiment</th>
                <th className="px-6 py-3">Submitted</th>
                <th className="px-6 py-3">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="h-4 w-3/4 rounded-full bg-white/10 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-2/3 rounded-full bg-white/10 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-2/5 rounded-full bg-white/10 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-1/2 rounded-full bg-white/10 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-full rounded-full bg-white/10 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No matching feedback found.
                  </td>
                </tr>
              ) : (
                paged.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                    <td className="px-6 py-4 text-slate-300">{item.email}</td>
                    <td className="px-6 py-4">
                      <Badge sentiment={item.sentiment} />
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-200">{item.feedback_text}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white">{paged.length}</span> of <span className="text-white">{filtered.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-200">
              Page <span className="font-semibold text-white">{page}</span> of <span className="font-semibold text-white">{totalPages}</span>
            </span>
            <Button
              variant="secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeedbackManagement;
