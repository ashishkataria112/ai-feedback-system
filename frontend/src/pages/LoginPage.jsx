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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-10">
        <h2 className="text-center text-2xl font-semibold text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-slate-300">
          Enter your credentials to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
            placeholder="********"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-200 hover:text-white">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
