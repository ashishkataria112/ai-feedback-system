import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiTrendingUp, FiShield } from 'react-icons/fi';

const features = [
  {
    icon: FiCheckCircle,
    title: 'Instant Sentiment Insights',
    description: 'Get immediate sentiment classification for every feedback entry.',
  },
  {
    icon: FiTrendingUp,
    title: 'Actionable Analytics',
    description: 'Dashboard with charts and trends so you can act where it matters most.',
  },
  {
    icon: FiShield,
    title: 'Secure & Private',
    description: 'JWT authentication and secure data storage with role-based access.',
  },
];

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-slate-950 to-cyan-800 opacity-90" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 text-white md:px-12">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold leading-tight md:text-5xl"
            >
              AI-powered feedback with "sentiment smarts"
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl text-lg text-slate-200"
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
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-8 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/30 transition hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Create Account
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl md:max-w-md"
          >
            <div className="absolute -left-8 -top-12 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -right-12 top-20 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Live demo</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Feedback snapshot</h3>
              <p className="mt-3 text-sm text-slate-200">
                Submit feedback, see sentiment instantly, and review all feedback in a responsive dashboard.
              </p>
              <div className="mt-6 space-y-3">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="mt-1 h-9 w-9 rounded-2xl bg-white/10 p-2 text-indigo-200">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{feature.title}</p>
                      <p className="text-xs text-slate-200">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="glass rounded-3xl border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-white">Why it works</h3>
            <p className="mt-3 text-sm text-slate-200">
              A smooth feedback workflow keeps customers heard, builds trust, and helps teams move faster with sentiment-first decisions.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-white">Ready for teams</h3>
            <p className="mt-3 text-sm text-slate-200">
              Invite admins to monitor overall sentiment while customers submit feedback within seconds.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-white">Flexible analytics</h3>
            <p className="mt-3 text-sm text-slate-200">
              View all feedback, filter sentiment types, and explore trends that impact your product roadmap.
            </p>
          </div>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-10 text-center text-xs text-slate-400">
          Built with React, Tailwind, and sentiment analysis. Designed for modern SaaS dashboards.
        </footer>
      </div>
    </div>
  );
};

export default Home;
