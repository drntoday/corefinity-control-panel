import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  GitBranch, 
  Ticket, 
  User, 
  ChevronRight
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/environments', icon: Server, label: 'Environments' },
  { path: '/deployments', icon: GitBranch, label: 'Deployments' },
  { path: '/tickets', icon: Ticket, label: 'Tickets' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const hierarchyBreadcrumb = ['Agency', 'Company', 'Website'];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-corefinity-blue text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:flex-shrink-0
          z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight">
            Core<span className="text-corefinity-orange">finity</span>
          </h1>
        </div>

        {/* Hierarchy Breadcrumb */}
        <div className="px-4 py-3 border-b border-white/10">
          <nav className="flex items-center text-sm text-gray-400">
            {hierarchyBreadcrumb.map((item, index) => (
              <span key={item} className="flex items-center">
                {index > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
                <span className={index === hierarchyBreadcrumb.length - 1 ? 'text-white' : ''}>
                  {item}
                </span>
              </span>
            ))}
          </nav>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-corefinity-orange text-white' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
