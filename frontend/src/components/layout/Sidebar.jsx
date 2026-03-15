import { NavLink } from 'react-router-dom';
import { FiHome, FiBarChart2, FiMessageCircle, FiUsers, FiLogOut } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', to: '/app/dashboard', icon: FiHome },
  { label: 'Analytics', to: '/app/analytics', icon: FiBarChart2 },
  { label: 'Feedback', to: '/app/feedbacks', icon: FiMessageCircle },
];

const Sidebar = ({ onLogout, collapsed, onToggle }) => {
  return (
    <aside
      className={`flex flex-col gap-6 bg-slate-950/60 text-slate-100 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-xl font-bold shadow-lg">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold">AI Feedback</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/15"
          aria-label="Toggle sidebar"
        >
          <span className="text-lg">≡</span>
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-indigo-500/20 text-white'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm text-white hover:bg-white/15"
        >
          <FiLogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
