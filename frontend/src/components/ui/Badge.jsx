import clsx from 'clsx';

const styles = {
  positive: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
  negative: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30',
  neutral: 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-500/15 dark:text-slate-400 dark:border-slate-500/30',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
  error: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-400/15 dark:text-amber-400 dark:border-amber-400/30',
  default: 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
};

const Badge = ({ sentiment = 'default', className, ...props }) => {
  const variant = styles[sentiment] || styles.default;
  return (
    <span
      className={clsx('inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide', variant, className)}
      {...props}
    />
  );
};

export default Badge;
