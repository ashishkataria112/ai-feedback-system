import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiAtSign, FiLock, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import ToastContext from '../context/ToastContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [loading, setLoading] = useState(false);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/register', formData);
      toast('Account created! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      toast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Start collecting feedback with AI-powered insights"
      panelTitle="Turn every piece of feedback into a decision."
      panelSub="Join hundreds of product teams who use SentimentAI to stay close to their customers."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          icon={FiUser}
          value={formData.name}
          onChange={set('name')}
          placeholder="Your full name"
          autoComplete="name"
          required
        />
        <Input
          type="email"
          icon={FiAtSign}
          value={formData.email}
          onChange={set('email')}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Input
          type="password"
          icon={FiLock}
          value={formData.password}
          onChange={set('password')}
          placeholder="Create a strong password"
          autoComplete="new-password"
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
              Creating account…
            </>
          ) : (
            <>
              Create free account
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          By signing up you agree to our{' '}
          <span className="cursor-pointer text-indigo-500 hover:underline">Terms</span> and{' '}
          <span className="cursor-pointer text-indigo-500 hover:underline">Privacy Policy</span>.
        </p>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs text-slate-400 dark:text-slate-500">or</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Switch to Login */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Already have an account?</p>
        <Link
          to="/login"
          className="mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Sign in instead
          <FiArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
