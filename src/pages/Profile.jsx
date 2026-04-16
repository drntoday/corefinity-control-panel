import { useState, useEffect } from 'react';
import { 
  Shield, 
  Bell, 
  Key, 
  Lock, 
  Globe, 
  Terminal, 
  Check, 
  X, 
  Copy, 
  Plus, 
  Trash2, 
  Smartphone,
  Building2,
  AlertTriangle,
  Server,
  GitBranch,
  Wrench,
  Eye,
  EyeOff
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [copiedTokenId, setCopiedTokenId] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState('authenticator');
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    emergency: true,
    maintenance: true,
    monitoring: true,
    deployment: false
  });
  const [sshKeys, setSshKeys] = useState([
    { id: 1, label: 'Production Server', key: 'ssh-rsa AAAAB3NzaC1yc2E...', addedDate: '2024-01-15' },
    { id: 2, label: 'Development Machine', key: 'ssh-rsa AAAAB3NzaC1yc2E...', addedDate: '2024-02-20' }
  ]);
  const [newSshKey, setNewSshKey] = useState({ label: '', key: '' });
  const [sshValidationStatus, setSshValidationStatus] = useState(null);
  const [whitelistedIPs, setWhitelistedIPs] = useState([
    { id: 1, ip: '192.168.1.100', addedDate: '2024-01-10' },
    { id: 2, ip: '10.0.0.50', addedDate: '2024-02-15' }
  ]);
  const [newIP, setNewIP] = useState('');
  const [apiTokens, setApiTokens] = useState([
    { id: 1, name: 'CI/CD Pipeline', token: 'pk_live_abc123...', lastUsed: '2024-03-10', created: '2024-01-05' },
    { id: 2, name: 'Monitoring Service', token: 'pk_live_xyz789...', lastUsed: '2024-03-08', created: '2024-02-01' }
  ]);
  const [newTokenName, setNewTokenName] = useState('');
  const [showNewTokenForm, setShowNewTokenForm] = useState(false);
  const [currentIP, setCurrentIP] = useState('');

  // Fetch current IP on mount
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setCurrentIP(data.ip))
      .catch(() => setCurrentIP('Unable to detect'));
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api-tokens', label: 'API Tokens', icon: Key },
    { id: '2fa', label: 'Two Factor Authentication', icon: Lock },
    { id: 'firewall', label: 'Firewall', icon: Globe },
    { id: 'ssh-keys', label: 'SSH Keys', icon: Terminal }
  ];

  const handleGenerateToken = () => {
    if (!newTokenName.trim()) return;
    const newToken = `pk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedToken(newToken);
    setApiTokens([...apiTokens, {
      id: Date.now(),
      name: newTokenName,
      token: `pk_live_${newToken.substring(8, 12)}...`,
      lastUsed: 'Never',
      created: new Date().toISOString().split('T')[0]
    }]);
    setShowTokenModal(true);
    setNewTokenName('');
    setShowNewTokenForm(false);
  };

  const handleCopyToken = (token, tokenId) => {
    navigator.clipboard.writeText(token);
    setCopiedTokenId(tokenId);
    setTimeout(() => setCopiedTokenId(null), 2000);
  };

  const handleValidateSSHKey = () => {
    const sshKeyRegex = /^(ssh-rsa|ssh-ed25519|ecdsa-sha2-nistp256|ecdsa-sha2-nistp384|ecdsa-sha2-nistp521)\s+[A-Za-z0-9+/]+={0,3}\s*(.*)$/;
    if (sshKeyRegex.test(newSshKey.key.trim())) {
      setSshValidationStatus('valid');
    } else {
      setSshValidationStatus('invalid');
    }
  };

  const handleAddSSHKey = () => {
    if (sshValidationStatus === 'valid' && newSshKey.label.trim()) {
      setSshKeys([...sshKeys, {
        id: Date.now(),
        label: newSshKey.label,
        key: newSshKey.key.substring(0, 30) + '...',
        addedDate: new Date().toISOString().split('T')[0]
      }]);
      setNewSshKey({ label: '', key: '' });
      setSshValidationStatus(null);
    }
  };

  const handleDeleteSSHKey = (id) => {
    setSshKeys(sshKeys.filter(key => key.id !== id));
  };

  const handleAddIP = () => {
    if (newIP.trim()) {
      setWhitelistedIPs([...whitelistedIPs, {
        id: Date.now(),
        ip: newIP,
        addedDate: new Date().toISOString().split('T')[0]
      }]);
      setNewIP('');
    }
  };

  const handleUseCurrentIP = () => {
    if (currentIP && currentIP !== 'Unable to detect') {
      setNewIP(currentIP);
    }
  };

  const handleDeleteIP = (id) => {
    setWhitelistedIPs(whitelistedIPs.filter(ip => ip.id !== id));
  };

  const handleDeleteToken = (id) => {
    setApiTokens(apiTokens.filter(token => token.id !== id));
  };

  const getSecurityHealth = () => {
    let issues = 0;
    if (!twoFactorEnabled) issues++;
    if (!ssoEnabled) issues++;
    if (sshKeys.length === 0) issues++;
    if (whitelistedIPs.length === 0) issues++;
    
    if (issues === 0) return { type: 'success', label: 'Secure' };
    if (issues <= 2) return { type: 'pending', label: 'Moderate' };
    return { type: 'error', label: 'At Risk' };
  };

  const securityHealth = getSecurityHealth();

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Security Health Overview */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Security Health</h3>
            <p className="text-sm text-gray-600 mt-1">Monitor your account security status</p>
          </div>
          <StatusBadge type={securityHealth.type} label={securityHealth.label} active={securityHealth.type === 'success'} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Lock className={`w-4 h-4 ${twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`} />
            <span className="text-sm text-gray-700">2FA: {twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className={`w-4 h-4 ${ssoEnabled ? 'text-green-600' : 'text-yellow-600'}`} />
            <span className="text-sm text-gray-700">SSO: {ssoEnabled ? 'Connected' : 'Not Configured'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${sshKeys.length > 0 ? 'text-green-600' : 'text-yellow-600'}`} />
            <span className="text-sm text-gray-700">SSH Keys: {sshKeys.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className={`w-4 h-4 ${whitelistedIPs.length > 0 ? 'text-green-600' : 'text-yellow-600'}`} />
            <span className="text-sm text-gray-700">Whitelisted IPs: {whitelistedIPs.length}</span>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" defaultValue="john.doe@corefinity.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
            <input type="text" defaultValue="Corefinity Inc." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>UTC</option>
              <option>America/New_York</option>
              <option>America/Los_Angeles</option>
              <option>Europe/London</option>
              <option>Asia/Tokyo</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
            Update Profile
          </button>
        </div>
      </div>

      {/* Organization Access / SSO */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Organization Access</h3>
              <p className="text-sm text-gray-600">Single Sign-On (SSO) Configuration</p>
            </div>
          </div>
          <StatusBadge type={ssoEnabled ? 'success' : 'pending'} label={ssoEnabled ? 'Enabled' : 'Disabled'} active={ssoEnabled} />
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Connect to Identity Provider</p>
              <p className="text-sm text-gray-600 mt-1">Configure SAML or OIDC for organization-wide access</p>
            </div>
            <button 
              onClick={() => setSsoEnabled(!ssoEnabled)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                ssoEnabled 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {ssoEnabled ? 'Disable SSO' : 'Connect IdP'}
            </button>
          </div>
          {ssoEnabled && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identity Provider URL</label>
                  <input type="text" placeholder="https://idp.example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entity ID</label>
                  <input type="text" placeholder="urn:example:entity" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
                  Save SSO Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h3>
      <p className="text-gray-600 mb-6">Manage how you receive alerts and updates</p>
      
      <div className="space-y-6">
        {/* Emergency Alerts */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Emergency Alerts</h4>
                <p className="text-sm text-gray-600">Critical security incidents and outages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.emergency}
                onChange={(e) => setNotifications({...notifications, emergency: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>

        {/* Maintenance Windows */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Maintenance Windows</h4>
                <p className="text-sm text-gray-600">Scheduled maintenance and updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.maintenance}
                onChange={(e) => setNotifications({...notifications, maintenance: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>

        {/* Monitoring Alerts */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Server className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Monitoring Alerts</h4>
                <p className="text-sm text-gray-600">Resource usage and performance warnings</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.monitoring}
                onChange={(e) => setNotifications({...notifications, monitoring: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>

        {/* Deployment Alerts */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GitBranch className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Deployment Alerts</h4>
                <p className="text-sm text-gray-600">Build and deployment status notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifications.deployment}
                onChange={(e) => setNotifications({...notifications, deployment: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );

  const renderAPITokens = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">API Tokens</h3>
            <p className="text-sm text-gray-600">Manage access tokens for API integrations</p>
          </div>
          <button 
            onClick={() => setShowNewTokenForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate New Token
          </button>
        </div>

        {showNewTokenForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Token Name</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
                placeholder="e.g., CI/CD Pipeline"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button 
                onClick={handleGenerateToken}
                className="px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
              >
                Create
              </button>
              <button 
                onClick={() => { setShowNewTokenForm(false); setNewTokenName(''); }}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {apiTokens.length === 0 ? (
          <div className="text-center py-8">
            <Key className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No API tokens yet</p>
            <p className="text-sm text-gray-400">Generate your first token to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Token Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Token</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Last Used</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiTokens.map((token) => (
                  <tr key={token.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{token.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">{token.token}</code>
                        <button
                          onClick={() => handleCopyToken(token.token, token.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedTokenId === token.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{token.created}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${token.lastUsed === 'Never' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {token.lastUsed}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => handleDeleteToken(token.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Token Copy Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Copy Your Token</h3>
            </div>
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium">⚠️ Important: This token will only be shown once!</p>
              <p className="text-xs text-red-600 mt-1">Make sure to copy it now. You won't be able to see it again.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your API Token</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={generatedToken}
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm font-mono text-gray-700"
                />
                <button 
                  onClick={handleCopyToken}
                  className="px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowTokenModal(false)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              I've Copied My Token
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const render2FA = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-gray-700" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </div>
          <StatusBadge 
            type={twoFactorEnabled ? 'success' : 'error'} 
            label={twoFactorEnabled ? 'Enabled' : 'Disabled'} 
            active={twoFactorEnabled} 
          />
        </div>

        {!twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Choose Authentication Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Google Authenticator */}
                <div 
                  onClick={() => setTwoFactorMethod('authenticator')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    twoFactorMethod === 'authenticator' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className={`w-5 h-5 ${twoFactorMethod === 'authenticator' ? 'text-orange-600' : 'text-gray-600'}`} />
                    <span className="font-medium text-gray-900">Authenticator App</span>
                  </div>
                  <p className="text-sm text-gray-600">Google Authenticator, Authy, or similar apps</p>
                </div>

                {/* SMS Authentication */}
                <div 
                  onClick={() => setTwoFactorMethod('sms')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    twoFactorMethod === 'sms' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className={`w-5 h-5 ${twoFactorMethod === 'sms' ? 'text-orange-600' : 'text-gray-600'}`} />
                    <span className="font-medium text-gray-900">SMS Authentication</span>
                  </div>
                  <p className="text-sm text-gray-600">Receive codes via text message</p>
                </div>
              </div>
            </div>

            {twoFactorMethod === 'authenticator' && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-3">Setup with Google Authenticator</h5>
                <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                  <li>Install Google Authenticator on your mobile device</li>
                  <li>Scan the QR code below or enter the secret key manually</li>
                  <li>Enter the 6-digit code from the app to verify</li>
                </ol>
                <div className="mt-4 flex justify-center">
                  <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Shield className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-xs">QR Code Placeholder</p>
                      <p className="text-xs font-mono mt-2">SECRET: ABCD1234</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                  <input 
                    type="text" 
                    placeholder="000000"
                    maxLength={6}
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg tracking-widest"
                  />
                </div>
              </div>
            )}

            {twoFactorMethod === 'sms' && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-3">Setup with SMS</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors">
                    Send Verification Code
                  </button>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Code</label>
                    <input 
                      type="text" 
                      placeholder="000000"
                      maxLength={6}
                      className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg tracking-widest"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button 
                onClick={() => setTwoFactorEnabled(true)}
                className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
              >
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Two-Factor Authentication is Enabled</p>
                  <p className="text-sm text-green-700">Your account is protected with {twoFactorMethod === 'authenticator' ? 'authenticator app' : 'SMS'} verification</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors">
                Download Backup Codes
              </button>
              <button 
                onClick={() => setTwoFactorEnabled(false)}
                className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-md hover:bg-red-200 transition-colors"
              >
                Disable 2FA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFirewall = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Whitelisted IPs</h3>
            <p className="text-sm text-gray-600">Manage IP addresses allowed to access your account</p>
          </div>
          <StatusBadge type="success" label={`${whitelistedIPs.length} Active`} active />
        </div>

        {/* Add New IP */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Add IP Address</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newIP}
              onChange={(e) => setNewIP(e.target.value)}
              placeholder="192.168.1.1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button 
              onClick={handleUseCurrentIP}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Use My Current IP
            </button>
            <button 
              onClick={handleAddIP}
              className="px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
            >
              Add IP
            </button>
          </div>
          {currentIP && (
            <p className="text-xs text-gray-500 mt-2">Your current IP: <span className="font-mono">{currentIP}</span></p>
          )}
        </div>

        {/* IP List */}
        {whitelistedIPs.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No whitelisted IPs</p>
            <p className="text-sm text-gray-400">Add your first IP address to restrict access</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">IP Address</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Added Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {whitelistedIPs.map((ip) => (
                  <tr key={ip.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono">{ip.ip}</code>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{ip.addedDate}</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => handleDeleteIP(ip.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
            Update Firewall Rules
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Security Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              When IP whitelisting is enabled, only connections from approved IP addresses will be allowed. 
              Make sure to add your current IP before enabling this feature to avoid being locked out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSSHKeys = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SSH Keys</h3>
            <p className="text-sm text-gray-600">Manage SSH keys for secure server access</p>
          </div>
          <StatusBadge type="success" label={`${sshKeys.length} Keys`} active />
        </div>

        {/* Add New SSH Key */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Add New SSH Key</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Label</label>
              <input 
                type="text" 
                value={newSshKey.label}
                onChange={(e) => setNewSshKey({...newSshKey, label: e.target.value})}
                placeholder="e.g., Production Server"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
              <textarea 
                value={newSshKey.key}
                onChange={(e) => setNewSshKey({...newSshKey, key: e.target.value})}
                placeholder="ssh-rsa AAAAB3NzaC1yc2E..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleValidateSSHKey}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Validate Key
              </button>
              {sshValidationStatus === 'valid' && (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Valid SSH key format
                </span>
              )}
              {sshValidationStatus === 'invalid' && (
                <span className="text-red-600 text-sm flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Invalid SSH key format
                </span>
              )}
            </div>
            <button 
              onClick={handleAddSSHKey}
              disabled={sshValidationStatus !== 'valid'}
              className={`px-6 py-2 font-medium rounded-md transition-colors ${
                sshValidationStatus === 'valid'
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add SSH Key
            </button>
          </div>
        </div>

        {/* SSH Keys List */}
        {sshKeys.length === 0 ? (
          <div className="text-center py-8">
            <Terminal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No SSH keys configured</p>
            <p className="text-sm text-gray-400">Add your first SSH key for secure access</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Label</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Key Fingerprint</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Added Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sshKeys.map((key) => (
                  <tr key={key.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{key.label}</td>
                    <td className="py-3 px-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono">{key.key}</code>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{key.addedDate}</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => handleDeleteSSHKey(key.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
            Save SSH Configuration
          </button>
        </div>
      </div>

      {/* SSH Key Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">How to generate an SSH key</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Open your terminal</li>
          <li>Run: <code className="bg-blue-100 px-2 py-0.5 rounded font-mono">ssh-keygen -t ed25519 -C "your_email@example.com"</code></li>
          <li>Press Enter to accept the default location</li>
          <li>Copy the public key: <code className="bg-blue-100 px-2 py-0.5 rounded font-mono">cat ~/.ssh/id_ed25519.pub</code></li>
          <li>Paste the output in the field above</li>
        </ol>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfile();
      case 'notifications': return renderNotifications();
      case 'api-tokens': return renderAPITokens();
      case '2fa': return render2FA();
      case 'firewall': return renderFirewall();
      case 'ssh-keys': return renderSSHKeys();
      default: return renderProfile();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Profile & Security</h2>
        <p className="text-gray-600 mt-1">Manage your account settings and security preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Vertical Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-600'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
