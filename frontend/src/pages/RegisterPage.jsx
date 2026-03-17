import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiAtSign, FiLock } from 'react-icons/fi';
import axios from 'axios';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 dark:bg-slate-950">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-xl font-bold text-white shadow-lg">
          AI
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Create your account</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Start collecting feedback with sentiment insights.</p>
      </div>

      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            icon={FiUser}
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Your name"
            required
          />
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
            placeholder="Create a password"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
