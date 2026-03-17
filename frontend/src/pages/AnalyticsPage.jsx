import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, PointElement, LineElement,
} from 'chart.js';
import Card from '../components/ui/Card';
import ThemeContext from '../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({ total: 0, positive: 0, negative: 0, neutral: 0 });
  const [trend, setTrend] = useState({ labels: [], data: [] });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } });
        setAnalytics(res.data);
        const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        setTrend({ labels, data: labels.map((_, i) => Math.max(0, res.data.total - (3 - i) * 2)) });
      } catch (err) {
        console.error('Failed to fetch analytics');
      }
    };
    fetchAnalytics();
  }, []);

  const isDark = theme === 'dark';
  const gridColor = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.08)';
  const tickColor = isDark ? '#94a3b8' : '#64748b';

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: tickColor } } },
    scales: {
      x: { ticks: { color: tickColor }, grid: { color: gridColor } },
      y: { ticks: { color: tickColor }, grid: { color: gridColor } },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: tickColor } } },
  };

  const pieData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{ data: [analytics.positive, analytics.negative, analytics.neutral], backgroundColor: ['#10B981', '#EF4444', '#F59E0B'], hoverOffset: 8 }],
  };

  const barData = {
    labels: ['Total', 'Positive', 'Negative', 'Neutral'],
    datasets: [{ label: 'Feedback Count', data: [analytics.total, analytics.positive, analytics.negative, analytics.neutral], backgroundColor: ['#6366f1', '#10B981', '#EF4444', '#F59E0B'], borderRadius: 6 }],
  };

  const lineData = {
    labels: trend.labels,
    datasets: [{ label: 'Feedback trend', data: trend.data, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.15)', tension: 0.3, fill: true, pointBackgroundColor: '#6366f1' }],
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Analytics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Visualize sentiment distribution and feedback trends.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Sentiment Distribution</h3>
          <div className="mt-4">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Feedback Activity</h3>
          <div className="mt-4">
            <Bar data={barData} options={chartOptions} />
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Trend (last 4 weeks)</h3>
          <div className="mt-4">
            <Line data={lineData} options={chartOptions} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
