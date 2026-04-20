import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, LogOut, Key, User as UserIcon } from 'lucide-react';
import OrangeLink from './OrangeLink';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Mock breadcrumb data - in real app this would come from router state or context
  const [breadcrumbData, setBreadcrumbData] = useState({
    company: 'Example Company',
    website: 'Main Website',
    tab: 'General'
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '/' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for breadcrumb updates from child components
  useEffect(() => {
    const handleBreadcrumbUpdate = (event) => {
      setBreadcrumbData(event.detail);
    };

    window.addEventListener('breadcrumb-update', handleBreadcrumbUpdate);
    return () => window.removeEventListener('breadcrumb-update', handleBreadcrumbUpdate);
  }, []);

  return (
    <header className="bg-bg-canvas border-b border-border-default px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-bg-elevated rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <nav className="hidden sm:flex items-center text-sm text-text-secondary">
            <OrangeLink to="/dashboard" className="hover:text-text-primary transition-colors">All Clients</OrangeLink>
            <svg className="w-4 h-4 mx-2 text-border-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <OrangeLink to="/environments" className="font-medium !no-underline hover:!underline text-text-primary">{breadcrumbData.company}</OrangeLink>
            <svg className="w-4 h-4 mx-2 text-border-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <OrangeLink to="/environments" className="font-medium !no-underline hover:!underline text-text-primary">{breadcrumbData.website}</OrangeLink>
            {breadcrumbData.tab && (
              <>
                <svg className="w-4 h-4 mx-2 text-border-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-text-primary">{breadcrumbData.tab}</span>
              </>
            )}
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="global-search"
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-12 py-2 bg-bg-elevated border border-border-subtle rounded-lg 
                         focus:border-accent-primary focus:outline-none 
                         transition-colors duration-200 text-sm text-text-primary placeholder-text-secondary"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs 
                           text-text-secondary bg-bg-surface border border-border-subtle rounded font-mono">
              /
            </kbd>
          </div>
        </div>

        {/* Right: User Profile */}
        <div className="relative user-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 hover:bg-bg-elevated rounded-lg transition-colors"
          >
            <img
              src="https://ui-avatars.com/api/?name=Catherine+Jarosz&background=D4A23E&color=0F1217&size=32"
              alt="Catherine Jarosz"
              className="w-8 h-8 rounded-full avatar-enterprise"
            />
            <span className="hidden lg:block text-sm font-medium text-text-primary">
              Catherine Jarosz
            </span>
            <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-bg-surface rounded-lg shadow-lg border border-border-subtle py-1 z-50">
              <button
                onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => { navigate('/ssh-keys'); setIsDropdownOpen(false); }}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
              >
                <Key className="w-4 h-4" />
                SSH Keys
              </button>
              <div className="border-t border-border-subtle my-1" />
              <button
                onClick={() => { navigate('/logout'); setIsDropdownOpen(false); }}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-12 py-2 bg-bg-elevated border border-border-subtle rounded-lg 
                       focus:border-accent-primary focus:outline-none 
                       transition-colors duration-200 text-sm text-text-primary placeholder-text-secondary"
          />
        </div>
      </div>
    </header>
  );
}
