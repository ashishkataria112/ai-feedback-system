import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import Card from '../components/ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({ total: 0, positive: 0, negative: 0, neutral: 0 });
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnalytics(res.data);

        // For demo purposes, create a simple trend dataset based on counts
        const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const lineData = labels.map((label, index) => Math.max(0, res.data.total - (3 - index) * 2));
        setTrend({ labels, data: lineData });
      } catch (err) {
        console.error('Failed to fetch analytics');
      }
    };
    fetchAnalytics();
  }, []);

  const pieData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [analytics.positive, analytics.negative, analytics.neutral],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
        hoverOffset: 8,
      },
    ],
  };

  const barData = {
    labels: ['Total', 'Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Feedback Count',
        data: [analytics.total, analytics.positive, analytics.negative, analytics.neutral],
        backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B'],
      },
    ],
  };

  const lineData = {
    labels: trend.labels || [],
    datasets: [
      {
        label: 'Feedback trend',
        data: trend.data || [],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        tension: 0.2,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Analytics</h2>
        <p className="text-sm text-slate-300">Visualize sentiment distribution and feedback trends.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-semibold">Sentiment Distribution</h3>
          <div className="mt-4">
            <Pie data={pieData} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold">Feedback Activity</h3>
          <div className="mt-4">
            <Bar data={barData} />
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <h3 className="text-lg font-semibold">Trend (last 4 weeks)</h3>
          <div className="mt-4">
            <Line data={lineData} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
