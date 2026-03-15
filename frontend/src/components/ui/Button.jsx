import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary: 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600',
  secondary: 'bg-white/10 text-white hover:bg-white/20',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  outline: 'border border-white/20 text-white hover:bg-white/10',
};

const Button = ({ children, className, variant = 'primary', ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
