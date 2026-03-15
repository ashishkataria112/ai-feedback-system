import { useContext } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';

const Header = ({ title }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between gap-4 p-4 lg:p-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-100 md:text-2xl">{title}</h1>
        <p className="text-sm text-slate-400">Manage feedback, monitor sentiment, and keep customers happy.</p>
      </div>

      <button
        onClick={toggleTheme}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-white/15"
      >
        {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
        <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
};

export default Header;
