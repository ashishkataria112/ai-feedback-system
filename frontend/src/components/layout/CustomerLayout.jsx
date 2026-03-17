import { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiMessageSquare, FiX } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 md:hidden"
            aria-label="Open menu"
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Customer Portal</p>
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Submit and track your feedback</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4 text-amber-400" /> : <FiMoon className="h-4 w-4 text-indigo-500" />}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="relative flex min-h-[calc(100vh-65px)]">
        {/* Mobile overlay */}
        {open && (
          <div
            className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          className={`absolute inset-y-0 left-0 z-20 w-64 border-r border-slate-200 bg-white px-4 py-6 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 md:relative md:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => { navigate('/app'); setOpen(false); }}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <FiMessageSquare className="h-4 w-4" />
              Submit Feedback
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
