import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiAtSign, FiLock } from 'react-icons/fi';
import axios from 'axios';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ToastContext from '../context/ToastContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate(res.data.user.role === 'admin' ? '/app/dashboard' : '/app');
      toast('Welcome back!', 'success');
    } catch (err) {
      toast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 dark:bg-slate-950">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-xl font-bold text-white shadow-lg">
          AI
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Sign in to your account</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter your credentials to access the dashboard.</p>
      </div>

      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            icon={FiAtSign}
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="you@example.com"
            required
          />
          <Input
            type="password"
            icon={FiLock}
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Your password"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
