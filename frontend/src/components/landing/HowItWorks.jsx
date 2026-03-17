import { FiEdit3, FiCpu, FiTrendingUp } from 'react-icons/fi';
import FadeIn from './FadeIn';

const steps = [
  {
    step: '01',
    icon: FiEdit3,
    title: 'Collect Feedback',
    description:
      'Customers submit feedback through a clean, simple form. No friction, no lengthy surveys — just a text box and a submit button.',
    color: 'from-indigo-500 to-indigo-400',
    light: 'bg-indigo-50 dark:bg-indigo-500/10',
    text: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    step: '02',
    icon: FiCpu,
    title: 'AI Analyzes Sentiment',
    description:
      'Our AI engine instantly classifies each submission as positive, negative, or neutral — no manual tagging required.',
    color: 'from-cyan-500 to-cyan-400',
    light: 'bg-cyan-50 dark:bg-cyan-500/10',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    step: '03',
    icon: FiTrendingUp,
    title: 'Act on Insights',
    description:
      'Admins review trends in the analytics dashboard, spot issues early, and make data-driven product decisions.',
    color: 'from-emerald-500 to-emerald-400',
    light: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
            Three simple steps from feedback collection to actionable insights.
          </p>
        </FadeIn>

        <div className="relative mt-16">
          {/* Connector line — desktop only */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.step} delay={i * 0.12}>
                  <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                    {/* Icon circle */}
                    <div className={`relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-3xl bg-gradient-to-br ${step.color} shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-bold text-white dark:border-slate-950">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
