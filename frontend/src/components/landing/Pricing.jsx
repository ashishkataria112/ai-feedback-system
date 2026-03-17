import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import FadeIn from './FadeIn';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals and small projects getting started.',
    cta: 'Get started free',
    ctaTo: '/register',
    highlight: false,
    features: [
      'Up to 100 feedback entries/mo',
      'Basic sentiment analysis',
      'Single user account',
      'CSV export',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need deeper insights and collaboration.',
    cta: 'Start Pro trial',
    ctaTo: '/register',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited feedback entries',
      'Advanced AI sentiment scoring',
      'Up to 10 team members',
      'Analytics dashboard & charts',
      'Email notifications',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations with custom requirements and SLAs.',
    cta: 'Contact sales',
    ctaTo: '/login',
    highlight: false,
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Custom AI model fine-tuning',
      'SSO & advanced security',
      'Dedicated account manager',
      'SLA & uptime guarantee',
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-block rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-600 dark:border-violet-800 dark:bg-violet-900/40 dark:text-violet-400">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
            No hidden fees. No surprises. Upgrade or downgrade at any time.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                  plan.highlight
                    ? 'border-indigo-500 bg-indigo-600 shadow-2xl shadow-indigo-500/25 dark:border-indigo-500 dark:bg-indigo-600'
                    : 'border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-indigo-600 shadow-md dark:bg-slate-900 dark:text-indigo-400">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <p className={`text-sm font-semibold ${plan.highlight ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.name}
                  </p>
                  <div className="mt-3 flex items-end gap-1">
                    <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    <span className={`mb-1 text-sm ${plan.highlight ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <p className={`mt-3 text-sm ${plan.highlight ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FiCheck className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-500 dark:text-indigo-400'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-300'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.ctaTo}
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition ${
                    plan.highlight
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
