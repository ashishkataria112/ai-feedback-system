import { Link } from 'react-router-dom';
import { FiZap, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

const socials = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  const handleAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-md">
                <FiZap className="h-5 w-5 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                SentimentAI
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              AI-powered customer feedback analysis for modern product teams. Understand your customers, faster.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchor(e, link.href)}
                      className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} SentimentAI. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built with React, Tailwind CSS & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
