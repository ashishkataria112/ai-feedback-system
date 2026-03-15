import clsx from 'clsx';

const Card = ({ children, className }) => (
  <div className={clsx('glass rounded-2xl border border-white/10 p-6 shadow-soft backdrop-blur-md', className)}>
    {children}
  </div>
);

export default Card;
