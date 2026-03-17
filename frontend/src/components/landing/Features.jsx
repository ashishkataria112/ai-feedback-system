import {
  FiZap, FiBarChart2, FiShield, FiBell, FiUsers, FiRefreshCw,
} from 'react-icons/fi';
import FadeIn from './FadeIn';

const features = [
  {
    icon: FiZap,
    title: 'Instant Sentiment Analysis',
    description: 'Every feedback entry is automatically classified as positive, negative, or neutral in real time using our AI engine.',
    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  },
  {
    icon: FiBarChart2,
    title: 'Rich Analytics Dashboard',
    description: 'Visualize trends with interactive charts. Drill down by sentiment, date range, or user segment.',
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400',
  },
  {
    icon: FiShield,
    title: 'Enterprise-grade Security',
    description: 'JWT authentication, bcrypt password hashing, and role-based access control keep your data safe.',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  {
    icon: FiBell,
    title: 'Smart Notifications',
    description: 'Get alerted when negative sentiment spikes so your team can respond before issues escalate.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  },
  {
    icon: FiUsers,
    title: 'Role-based Access',
    description: 'Separate admin and customer portals with fine-grained permissions for every team member.',
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
  },
  {
    icon: FiRefreshCw,
    title: 'Continuous Improvement',
    description: 'Track sentiment over time and measure the impact of product changes on customer happiness.',
    color: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:border-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything your team needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
            From real-time sentiment scoring to deep analytics, SentimentAI gives product teams the tools to truly understand their customers.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={i * 0.07} className="group">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
