import clsx from 'clsx';

const styles = {
  positive: 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30',
  negative: 'bg-rose-500/15 text-rose-200 border border-rose-500/30',
  neutral: 'bg-slate-500/15 text-slate-200 border border-slate-500/30',
  success: 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30',
  error: 'bg-rose-500/15 text-rose-200 border border-rose-500/30',
  warning: 'bg-amber-400/15 text-amber-200 border border-amber-400/30',
  default: 'bg-white/10 text-white border border-white/10',
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
