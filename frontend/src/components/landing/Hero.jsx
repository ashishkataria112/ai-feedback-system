import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSmile, FiFrown, FiMinus } from 'react-icons/fi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const mockFeedback = [
  { name: 'Sarah K.', text: 'Absolutely love the new dashboard!', sentiment: 'positive', icon: FiSmile, color: 'text-emerald-500' },
  { name: 'James R.', text: 'Onboarding could be smoother.', sentiment: 'neutral', icon: FiMinus, color: 'text-amber-500' },
  { name: 'Priya M.', text: 'The analytics are incredibly useful.', sentiment: 'positive', icon: FiSmile, color: 'text-emerald-500' },
  { name: 'Tom B.', text: 'Had issues with the export feature.', sentiment: 'negative', icon: FiFrown, color: 'text-rose-500' },
];

const sentimentBadge = {
  positive: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  neutral: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  negative: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 dark:bg-slate-950 lg:pt-36 lg:pb-28">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-100 opacity-60 blur-3xl dark:bg-indigo-900/30" />
      <div className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-cyan-100 opacity-50 blur-3xl dark:bg-cyan-900/20" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:border-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                AI-Powered Sentiment Analysis
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Turn customer feedback{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                into insights
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-slate-400 lg:mx-0 mx-auto"
            >
              Collect feedback, automatically classify sentiment with AI, and surface actionable trends — all in one clean dashboard built for modern product teams.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
              >
                Start for free
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Sign in
              </Link>
            </motion.div>

            <motion.p {...fadeUp(0.4)} className="mt-5 text-xs text-slate-400 dark:text-slate-500">
              No credit card required · Free forever plan available
            </motion.p>
          </div>

          {/* Right — mock dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md flex-shrink-0 lg:max-w-lg"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-900/60">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-800/60">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-400">Feedback Dashboard</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px border-b border-slate-100 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
                {[
                  { label: 'Total', value: '1,284', color: 'text-indigo-600 dark:text-indigo-400' },
                  { label: 'Positive', value: '847', color: 'text-emerald-600 dark:text-emerald-400' },
                  { label: 'Negative', value: '156', color: 'text-rose-600 dark:text-rose-400' },
                ].map((s) => (
                  <div key={s.label} className="bg-white px-4 py-4 dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                    <p className={`mt-1 text-xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Feedback list */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockFeedback.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-start gap-3 px-5 py-3.5">
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${item.color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">{item.name}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.text}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${sentimentBadge[item.sentiment]}`}>
                        {item.sentiment}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full w-[66%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>
                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">66% positive sentiment this month</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social proof logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Trusted by teams at
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-8">
            {['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Hooli'].map((name) => (
              <span key={name} className="text-sm font-bold text-slate-300 dark:text-slate-700">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
