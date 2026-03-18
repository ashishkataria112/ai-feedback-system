import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiZap, FiMoon, FiSun } from 'react-icons/fi';
import ThemeContext from '../../context/ThemeContext';

const features = [
  { emoji: '⚡', text: 'Instant AI sentiment analysis on every submission' },
  { emoji: '📊', text: 'Rich analytics dashboard with charts & trends' },
  { emoji: '🔒', text: 'Secure JWT auth with role-based access control' },
  { emoji: '🚀', text: 'Up and running in under 5 minutes' },
];

const AuthLayout = ({ children, heading, subheading, panelTitle, panelSub }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      {/* ── Left panel (form side) ── */}
      <div className="relative flex w-full flex-col lg:w-1/2">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <FiSun className="h-3.5 w-3.5 text-amber-400" />
                : <FiMoon className="h-3.5 w-3.5" />}
            </button>

            {/* Logo — always visible on mobile, hidden on desktop (shown in right panel) */}
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow">
                <FiZap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">SentimentAI</span>
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm"
          >
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {heading}
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subheading}</p>
            </div>

            {/* Injected form */}
            {children}
          </motion.div>
        </div>
      </div>

      {/* ── Right panel (brand side) — desktop only ── */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:p-16">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur">
              <FiZap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">SentimentAI</span>
          </Link>

          {/* Panel headline */}
          <h2 className="mt-10 text-3xl font-extrabold leading-snug text-white">
            {panelTitle}
          </h2>
          <p className="mt-3 text-base text-indigo-100">{panelSub}</p>

          {/* Feature list */}
          <ul className="mt-10 space-y-4">
            {features.map((f) => (
              <li key={f.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-base">
                  {f.emoji}
                </span>
                <span className="text-sm leading-relaxed text-indigo-100">{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
            <div className="flex -space-x-2">
              {['SC', 'MW', 'PN'].map((initials, i) => (
                <div
                  key={initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-gradient-to-br from-white/30 to-white/10 text-xs font-bold text-white"
                  style={{ zIndex: 3 - i }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-indigo-100">
              <span className="font-semibold text-white">500+ teams</span> already using SentimentAI
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthLayout;
