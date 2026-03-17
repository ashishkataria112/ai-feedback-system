import { useContext } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';

const Header = ({ title }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 lg:px-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">{title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage feedback, monitor sentiment, and keep customers happy.</p>
      </div>

      <button
        onClick={toggleTheme}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        {theme === 'dark' ? <FiSun className="h-4 w-4 text-amber-400" /> : <FiMoon className="h-4 w-4 text-indigo-500" />}
        <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
};

export default Header;
