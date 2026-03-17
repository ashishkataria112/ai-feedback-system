import { AnimatePresence, motion } from 'framer-motion';

const typeStyles = {
  info: { icon: 'ℹ️', className: 'bg-white border border-slate-200 text-slate-800 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100' },
  success: { icon: '✅', className: 'bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:border-emerald-500/40 dark:text-emerald-100' },
  error: { icon: '❌', className: 'bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-900/60 dark:border-rose-500/40 dark:text-rose-100' },
  warning: { icon: '⚠️', className: 'bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/60 dark:border-amber-500/40 dark:text-amber-100' },
};

const ToastItem = ({ toast }) => {
  const type = typeStyles[toast.type] || typeStyles.info;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ type: 'spring', damping: 16, stiffness: 180 }}
      className={`w-full max-w-sm rounded-2xl p-4 text-sm shadow-lg ${type.className}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-base">{type.icon}</span>
        <p className="flex-1 font-medium">{toast.message}</p>
      </div>
    </motion.div>
  );
};

const ToastContainer = ({ toasts }) => (
  <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-3">
    <AnimatePresence initial={false}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </AnimatePresence>
  </div>
);

export default ToastContainer;
