import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiAtSign, FiLock, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import AuthLayout from '../components/layout/AuthLayout';
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
      toast('Welcome back!', 'success');
      navigate(res.data.user.role === 'admin' ? '/app/dashboard' : '/app');
    } catch (err) {
      toast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to your SentimentAI account"
      panelTitle="Understand your customers in real time."
      panelSub="Sign in and get back to the insights that matter most to your team."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          icon={FiAtSign}
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Input
          type="password"
          icon={FiLock}
          value={formData.password}
          onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs text-slate-400 dark:text-slate-500">or</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Switch to Register */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Don't have an account?</p>
        <Link
          to="/register"
          className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Create a free account
          <FiArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
