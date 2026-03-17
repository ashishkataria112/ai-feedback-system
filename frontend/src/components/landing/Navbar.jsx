import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun, FiZap } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeContext from '../../context/ThemeContext';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-md">
            <FiZap className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            SentimentAI
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4 text-amber-400" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4 text-amber-400" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get started free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
