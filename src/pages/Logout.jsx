import { LogOut, User, Key } from 'lucide-react';

export default function Logout() {
  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogOut className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Logged Out Successfully</h2>
        <p className="text-text-secondary mb-6">You have been securely logged out of your session.</p>
        <a 
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Sign In Again
        </a>
      </div>
    </div>
  );
}
