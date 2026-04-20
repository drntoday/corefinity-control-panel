import { Key, Plus, Trash2, Edit } from 'lucide-react';
import OrangeLink from '../components/OrangeLink';

export default function SshKeys() {
  const sshKeys = [
    { id: 1, name: 'Production Server', fingerprint: 'SHA256:abc123...', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development Machine', fingerprint: 'SHA256:def456...', created: '2024-02-20', lastUsed: '1 day ago' },
    { id: 3, name: 'CI/CD Pipeline', fingerprint: 'SHA256:ghi789...', created: '2024-03-10', lastUsed: '5 minutes ago' },
  ];

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary">SSH Keys</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add SSH Key
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800">Manage Your SSH Keys</p>
            <p className="text-sm text-blue-700">SSH keys provide secure access to your environments. Add your public key to enable passwordless authentication.</p>
          </div>
        </div>
      </div>

      {/* SSH Keys Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-elevated border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Fingerprint</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Created</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Last Used</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sshKeys.map((key) => (
              <tr key={key.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-text-secondary" />
                    <span className="font-medium text-text-primary">{key.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs bg-bg-elevated px-2 py-1 rounded text-text-secondary">{key.fingerprint}</code>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{key.created}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{key.lastUsed}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 text-text-secondary hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <OrangeLink to="/dashboard" className="px-4 py-2 bg-bg-elevated rounded-lg text-sm font-medium hover:bg-bg-highlight transition-colors">
            Back to Dashboard
          </OrangeLink>
          <OrangeLink to="/profile" className="px-4 py-2 bg-bg-elevated rounded-lg text-sm font-medium hover:bg-bg-highlight transition-colors">
            View Profile
          </OrangeLink>
        </div>
      </div>
    </div>
  );
}
