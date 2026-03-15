import { AnimatePresence, motion } from 'framer-motion';
import Badge from './Badge';

const typeStyles = {
  info: { icon: 'ℹ️', className: 'bg-slate-900/70 border border-white/10' },
  success: { icon: '✅', className: 'bg-emerald-900/70 border border-emerald-500/40' },
  error: { icon: '❌', className: 'bg-rose-900/70 border border-rose-500/40' },
  warning: { icon: '⚠️', className: 'bg-amber-900/70 border border-amber-500/40' },
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
      className={`w-full max-w-sm rounded-2xl p-4 text-sm text-white shadow-xl backdrop-blur-xl ${type.className}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-base">{type.icon}</div>
        <div className="flex-1">
          <p className="font-semibold">{toast.message}</p>
        </div>
        <Badge sentiment={toast.type} className="text-xs" />
      </div>
    </motion.div>
  );
};

const ToastContainer = ({ toasts }) => {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
