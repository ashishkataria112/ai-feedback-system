import { FiStar } from 'react-icons/fi';
import FadeIn from './FadeIn';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Product, Acme Corp',
    avatar: 'SC',
    avatarColor: 'from-indigo-400 to-indigo-600',
    rating: 5,
    quote:
      'SentimentAI completely changed how we handle customer feedback. We went from reading hundreds of emails to having a clear sentiment score every morning. Invaluable.',
  },
  {
    name: 'Marcus Webb',
    role: 'CTO, Globex Solutions',
    avatar: 'MW',
    avatarColor: 'from-cyan-400 to-cyan-600',
    rating: 5,
    quote:
      'The setup took less than 10 minutes and the insights were immediate. Our support team now proactively addresses issues before they become complaints.',
  },
  {
    name: 'Priya Nair',
    role: 'Customer Success, Initech',
    avatar: 'PN',
    avatarColor: 'from-emerald-400 to-emerald-600',
    rating: 5,
    quote:
      'I love how clean the dashboard is. The sentiment breakdown charts are exactly what I needed to present to leadership every week. Highly recommend.',
  },
  {
    name: 'James Okafor',
    role: 'Product Manager, Hooli',
    avatar: 'JO',
    avatarColor: 'from-violet-400 to-violet-600',
    rating: 5,
    quote:
      'We tried three other tools before this. Nothing came close to the accuracy and simplicity of SentimentAI. It just works.',
  },
  {
    name: 'Lena Fischer',
    role: 'UX Lead, Umbrella Inc',
    avatar: 'LF',
    avatarColor: 'from-rose-400 to-rose-600',
    rating: 5,
    quote:
      'The role-based access is a game changer. Our admins see everything while customers get a focused, distraction-free feedback form.',
  },
  {
    name: 'David Park',
    role: 'Founder, Pied Piper',
    avatar: 'DP',
    avatarColor: 'from-amber-400 to-amber-600',
    rating: 5,
    quote:
      'As a small team, we needed something that required zero maintenance. SentimentAI delivers insights automatically — it\'s like having an extra analyst.',
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <FiStar key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Loved by product teams
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
            See what teams are saying after switching to SentimentAI.
          </p>
        </FadeIn>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.06} className="mb-6 break-inside-avoid">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Stars count={t.rating} />
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarColor} text-xs font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
