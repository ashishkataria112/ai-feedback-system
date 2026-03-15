import clsx from 'clsx';

const Input = ({ icon: Icon, className, ...props }) => {
  return (
    <div className={clsx('relative', className)}>
      {Icon && (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        className={clsx(
          'w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-200 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
          Icon && 'pl-12',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
