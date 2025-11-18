import { Outlet, NavLink } from 'react-router-dom';

export const AppLayout = () => {
  const linkStyle = 'text-gray-600 hover:text-gray-900 transition-colors';
  const activeLinkStyle = { color: '#1d4ed8', fontWeight: '500' };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">GradeBox</h1>
          <nav className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={linkStyle}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              Home
            </NavLink>
            <NavLink
              to="/grades/new"
              className={linkStyle}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              Register Grade
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-white mt-8 py-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} GradeBox. All rights reserved.</p>
      </footer>
    </div>
  );
};
