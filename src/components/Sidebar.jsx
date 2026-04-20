import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  GitBranch, 
  Ticket, 
  User, 
  ChevronRight
} from 'lucide-react';
import OrangeLink from './OrangeLink';

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
          fixed top-0 left-0 h-full w-64 bg-bg-surface text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:flex-shrink-0
          z-50 border-r border-border-subtle
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo - Altitude Wordmark */}
        <div className="p-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            {/* 8x8px square accent in primary color */}
            <div className="w-2 h-2 bg-accent-primary rounded-sm"></div>
            <h1 className="text-xl font-medium tracking-tight" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              Altitude
            </h1>
          </div>
        </div>

        {/* Hierarchy Breadcrumb */}
        <div className="px-4 py-3 border-b border-border-subtle">
          <nav className="flex items-center text-sm text-text-secondary">
            {hierarchyBreadcrumb.map((item, index) => (
              <span key={item} className="flex items-center">
                {index > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
                {index === hierarchyBreadcrumb.length - 1 ? (
                  <OrangeLink className="text-text-primary hover:text-accent-primary !no-underline">{item}</OrangeLink>
                ) : index === 1 ? (
                  <OrangeLink className="hover:text-accent-primary !no-underline">{item}</OrangeLink>
                ) : (
                  <span className={index === hierarchyBreadcrumb.length - 1 ? 'text-text-primary' : ''}>
                    {item}
                  </span>
                )}
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
                  sidebar-link
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'active text-text-primary' 
                    : 'text-text-secondary hover:text-text-primary'
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
