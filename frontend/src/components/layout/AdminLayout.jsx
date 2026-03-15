import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden text-white">
      <Sidebar onLogout={handleLogout} collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Admin Dashboard" />
        <main className="flex-1 overflow-y-auto px-4 pb-8 pt-2 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
