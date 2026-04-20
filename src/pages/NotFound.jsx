import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" stroke="url(#notFoundGradient)" strokeWidth="2" strokeDasharray="8 8"/>
            <text x="60" y="75" textAnchor="middle" fill="url(#notFoundGradient)" fontSize="48" fontWeight="bold" fontFamily="system-ui">404</text>
            <defs>
              <linearGradient id="notFoundGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E4F8A"/>
                <stop offset="0.5" stopColor="#6B46C1"/>
                <stop offset="1" stopColor="#B8860B"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-text-primary mb-3">Page Not Found</h1>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-text-primary rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-text-secondary mb-4">Or navigate to:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/environments" className="text-brand-orange hover:text-orange-700 hover:underline text-sm">Environments</Link>
            <Link to="/deployments" className="text-brand-orange hover:text-orange-700 hover:underline text-sm">Deployments</Link>
            <Link to="/tickets" className="text-brand-orange hover:text-orange-700 hover:underline text-sm">Tickets</Link>
            <Link to="/profile" className="text-brand-orange hover:text-orange-700 hover:underline text-sm">Profile</Link>
            <Link to="/settings" className="text-brand-orange hover:text-orange-700 hover:underline text-sm">Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
