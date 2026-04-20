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
          fixed top-0 left-0 h-full w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          lg:static lg:flex-shrink-0
          z-50 border-r border-gray-200
          shadow-lg lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
            <div className="flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
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
            <span className="text-xl font-bold bg-gradient-to-r from-[#1E4F8A] to-[#6B46C1] bg-clip-text text-transparent">
              Altitude
            </span>
          </div>

          {/* Hierarchy Breadcrumb */}
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <nav className="flex items-center text-xs font-medium text-gray-500" aria-label="Breadcrumb">
              {hierarchyBreadcrumb.map((item, index) => (
                <span key={item} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />}
                  {index === hierarchyBreadcrumb.length - 1 ? (
                    <button 
                      onClick={() => navigate('/environments')} 
                      className="text-gray-700 hover:text-[#1E4F8A] transition-colors duration-150 font-semibold"
                    >
                      {item}
                    </button>
                  ) : index === 1 ? (
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className="hover:text-[#1E4F8A] transition-colors duration-150"
                    >
                      {item}
                    </button>
                  ) : (
                    <span className="text-gray-500">{item}</span>
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
                    group flex items-center gap-3 px-3.5 py-3 rounded-lg
                    transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-transparent text-[#1E4F8A] font-semibold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <div className={`
                    flex-shrink-0 p-1.5 rounded-md transition-all duration-200
                    ${isActive 
                      ? 'bg-[#1E4F8A]/10 text-[#1E4F8A]' 
                      : 'text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-100'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1E4F8A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section - Logout */}
          <div className="px-3 py-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <div className="flex-shrink-0 p-1.5 rounded-md text-gray-400 group-hover:text-red-600 group-hover:bg-red-100 transition-all duration-200">
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
