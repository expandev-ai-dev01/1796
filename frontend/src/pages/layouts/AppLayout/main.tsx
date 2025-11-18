import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">GradeBox</h1>
        </nav>
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
