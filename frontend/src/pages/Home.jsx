import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiTrendingUp, FiShield } from 'react-icons/fi';

const features = [
  { icon: FiCheckCircle, title: 'Instant Sentiment Insights', description: 'Get immediate sentiment classification for every feedback entry.' },
  { icon: FiTrendingUp, title: 'Actionable Analytics', description: 'Dashboard with charts and trends so you can act where it matters most.' },
  { icon: FiShield, title: 'Secure & Private', description: 'JWT authentication and secure data storage with role-based access.' },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-slate-900 to-cyan-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:px-12">
          <header className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="space-y-6 md:max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold leading-tight text-white md:text-5xl"
              >
                AI-powered feedback with sentiment smarts
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-slate-200"
              >
                Collect customer feedback, automatically analyze sentiment, and unlock insights with a modern dashboard built for product teams.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition hover:bg-slate-100"
                >
                  Get Started
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Create Account
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-xl md:max-w-sm"
            >
              <div className="absolute -left-8 -top-12 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
              <div className="absolute -right-12 top-20 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Features</p>
                  <h3 className="mt-1 text-xl font-bold text-white">Everything you need</h3>
                </div>
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-indigo-200">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{feature.title}</p>
                      <p className="text-xs text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </header>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Why it works', body: 'A smooth feedback workflow keeps customers heard, builds trust, and helps teams move faster with sentiment-first decisions.' },
            { title: 'Ready for teams', body: 'Invite admins to monitor overall sentiment while customers submit feedback within seconds.' },
            { title: 'Flexible analytics', body: 'View all feedback, filter sentiment types, and explore trends that impact your product roadmap.' },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{card.title}</h3>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{card.body}</p>
            </div>
          ))}
        </div>

        <footer className="mt-16 border-t border-slate-200 pt-10 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
          Built with React, Tailwind, and sentiment analysis. Designed for modern SaaS dashboards.
        </footer>
      </div>
    </div>
  );
};

export default Home;
