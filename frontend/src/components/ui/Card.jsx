import clsx from 'clsx';

const Card = ({ children, className }) => (
  <div className={clsx('rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900', className)}>
    {children}
  </div>
);

export default Card;
