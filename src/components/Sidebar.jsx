import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  GitBranch, 
  Ticket, 
  User, 
  ChevronRight,
  LogOut
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
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/logout');
    if (onClose) onClose();
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64
          transform transition-transform duration-300 ease-in-out
          lg:static lg:flex-shrink-0
          z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        style={{ 
          height: '100vh', 
          position: 'sticky', 
          top: '0',
          background: 'var(--sidebar-bg)',
          backdropFilter: 'blur(var(--sidebar-blur))',
          WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
          borderRight: '1px solid var(--sidebar-border)',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section with Rotating Icon */}
          <div className="logo-container flex items-center gap-3 px-5 py-5">
            <div className="logo-icon flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <path d="M16 4L4 10V22L16 28L28 22V10L16 4Z" stroke="url(#logoGradient)" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M16 12L10 15V21L16 24L22 21V15L16 12Z" fill="url(#logoGradientFill)" fillOpacity="0.3" stroke="url(#logoGradient)" strokeWidth="1.5"/>
                <circle cx="16" cy="15" r="2" fill="#00FFFF"/>
                <defs>
                  <linearGradient id="logoGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00FFFF"/>
                    <stop offset="0.5" stopColor="#0088FF"/>
                    <stop offset="1" stopColor="#FF00FF"/>
                  </linearGradient>
                  <linearGradient id="logoGradientFill" x1="10" y1="12" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00FFFF"/>
                    <stop offset="1" stopColor="#0088FF"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text text-xl font-bold">
              Corefinity
            </span>
          </div>

          {/* Hierarchy Breadcrumb */}
          <div className="px-5 py-3 border-b border-border-default bg-bg-elevated">
            <nav className="flex items-center text-xs font-medium text-text-tertiary" aria-label="Breadcrumb">
              {hierarchyBreadcrumb.map((item, index) => (
                <span key={item} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-text-tertiary" />}
                  {index === hierarchyBreadcrumb.length - 1 ? (
                    <button 
                      onClick={() => navigate('/environments')} 
                      className="text-text-secondary hover:text-neon-cyan transition-colors duration-150 font-semibold"
                    >
                      {item}
                    </button>
                  ) : index === 1 ? (
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className="hover:text-neon-cyan transition-colors duration-150"
                    >
                      {item}
                    </button>
                  ) : (
                    <span className="text-text-tertiary">{item}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    sidebar-link group flex items-center gap-3 px-3.5 py-3 rounded-lg
                    transition-all duration-200 ease-in-out
                    ${isActive ? 'active' : ''}
                  `}
                >
                  <div className={`
                    flex-shrink-0 p-1.5 rounded-md transition-all duration-200
                    ${isActive 
                      ? 'bg-neon-cyan/10 text-neon-cyan' 
                      : 'text-text-tertiary group-hover:text-text-secondary group-hover:bg-bg-highlight'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan" style={{ boxShadow: '0 0 10px #00FFFF' }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section - Logout */}
          <div className="px-3 py-4 border-t border-border-default">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-text-secondary hover:bg-error-subtle hover:text-error transition-all duration-200 group"
            >
              <div className="flex-shrink-0 p-1.5 rounded-md text-text-tertiary group-hover:text-error group-hover:bg-error-subtle transition-all duration-200">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
