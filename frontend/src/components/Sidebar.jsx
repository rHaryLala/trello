  import { Bell, User } from 'lucide-react';
  import { Button } from "flowbite-react";
  import { Link } from 'react-router-dom';

  export function CustomNavbar() {
    return (
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Project Manager</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">  
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  const Sidebar = () => {
    return (
      <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mes Projets</h1>
        </div>
      </aside>
    );
  };

  export default Sidebar;