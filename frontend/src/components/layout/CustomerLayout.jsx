import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';
import { useContext } from 'react';

const CustomerLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/60 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/15 md:hidden"
            aria-label="Open menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-sm font-semibold">Customer Portal</p>
            <p className="text-xs text-slate-400">Submit and track your feedback</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="relative flex min-h-[calc(100vh-80px)]">
        <aside
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-72 transform bg-slate-950/70 px-4 py-6 backdrop-blur-xl transition-all duration-300 md:relative md:pointer-events-auto md:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                navigate('/app');
                setOpen(false);
              }}
              className="rounded-xl bg-white/10 px-4 py-3 text-left font-semibold text-white hover:bg-white/15"
            >
              Submit Feedback
            </button>
            <button
              onClick={() => {
                navigate('/app/dashboard');
                setOpen(false);
              }}
              className="rounded-xl bg-white/10 px-4 py-3 text-left font-semibold text-white hover:bg-white/15"
            >
              Dashboard
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
