import { Link, useLocation, useNavigate } from 'react-router-dom';
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
          fixed top-0 left-0 h-full w-64 bg-bg-surface
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:flex-shrink-0
          z-50 border-r var(--border-default)
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo - Altitude Wordmark with Diamond SVG */}
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L4 10V22L16 28L28 22V10L16 4Z" stroke="url(#logoGradient)" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M16 12L10 15V21L16 24L22 21V15L16 12Z" fill="url(#logoGradientFill)" fillOpacity="0.3" stroke="url(#logoGradient)" strokeWidth="1.5"/>
              <circle cx="16" cy="15" r="2" fill="#1E4F8A"/>
              <defs>
                <linearGradient id="logoGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E4F8A"/>
                  <stop offset="0.5" stopColor="#6B46C1"/>
                  <stop offset="1" stopColor="#B8860B"/>
                </linearGradient>
                <linearGradient id="logoGradientFill" x1="10" y1="12" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E4F8A"/>
                  <stop offset="1" stopColor="#6B46C1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">Altitude</span>
        </div>

        {/* Hierarchy Breadcrumb */}
        <div className="px-4 py-3 border-b var(--border-default)">
          <nav className="flex items-center text-sm text-text-secondary">
            {hierarchyBreadcrumb.map((item, index) => (
              <span key={item} className="flex items-center">
                {index > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
                {index === hierarchyBreadcrumb.length - 1 ? (
                  <button onClick={() => navigate('/environments')} className="text-text-primary hover:text-blue-primary !no-underline cursor-pointer">{item}</button>
                ) : index === 1 ? (
                  <button onClick={() => navigate('/dashboard')} className="hover:text-blue-primary !no-underline cursor-pointer">{item}</button>
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
