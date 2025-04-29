import React from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAppContext();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-20 flex items-center justify-between px-4 md:hidden">
        <div className="flex items-center">
          <Leaf className="h-6 w-6 text-green-600" />
          <h1 className="ml-2 text-xl font-bold text-gray-800">ClimateOS</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-10 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full bg-white w-64 pt-16 shadow-lg">
          <Sidebar />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-64 h-full bg-white shadow-md z-10">
        <div className="flex items-center p-4 border-b border-gray-200">
          <Leaf className="h-6 w-6 text-green-600" />
          <h1 className="ml-2 text-xl font-bold text-gray-800">ClimateOS</h1>
        </div>
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-hidden md:ml-0 relative pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;