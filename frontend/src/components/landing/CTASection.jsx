import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import FadeIn from './FadeIn';

const CTASection = () => {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 px-8 py-16 text-center shadow-2xl shadow-indigo-500/20 sm:px-16">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to understand your customers?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-indigo-100">
                Join hundreds of product teams using SentimentAI to turn raw feedback into clear, actionable insights. Start free — no credit card needed.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50"
                >
                  Get started for free
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Sign in to your account
                </Link>
              </div>
              <p className="mt-5 text-xs text-indigo-200">
                Free plan includes 100 feedback entries/month · No credit card required
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTASection;
