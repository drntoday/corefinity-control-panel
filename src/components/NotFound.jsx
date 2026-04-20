import { AlertTriangle, Home } from 'lucide-react';
import OrangeLink from './OrangeLink';

export default function NotFound() {
  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-brand-orange" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h2>
        <p className="text-text-secondary mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col gap-3">
          <OrangeLink to="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Back to Dashboard
          </OrangeLink>
          <OrangeLink to="/environments" className="inline-block px-6 py-3 bg-bg-elevated text-text-primary rounded-lg hover:bg-bg-highlight transition-colors font-medium">
            View Environments
          </OrangeLink>
        </div>
      </div>
    </div>
  );
}
