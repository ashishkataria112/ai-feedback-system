import clsx from 'clsx';

const Input = ({ icon: Icon, className, ...props }) => {
  return (
    <div className={clsx('relative', className)}>
      {Icon && (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        className={clsx(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
          Icon && 'pl-12'
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
