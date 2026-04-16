import { useState } from 'react';
import { ChevronDown, MoreVertical, Plus, Trash2, AlertTriangle, Copy, Check } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import OrangeLink from '../components/OrangeLink';

// Mock data for demonstration
const mockPods = [
  { id: 1, name: 'pod-web-frontend-7d8f9c', status: 'running', cpu: '45%', memory: '1.2GB' },
  { id: 2, name: 'pod-api-backend-3a2b1c', status: 'running', cpu: '62%', memory: '2.4GB' },
  { id: 3, name: 'pod-worker-queue-5e6f7g', status: 'pending', cpu: '12%', memory: '0.5GB' },
  { id: 4, name: 'pod-cache-redis-9h0i1j', status: 'running', cpu: '28%', memory: '3.1GB' },
];

const mockNodes = [
  { id: 1, name: 'node-prod-01', status: 'running', cpu: '71%', memory: '14.2GB' },
  { id: 2, name: 'node-prod-02', status: 'running', cpu: '55%', memory: '10.8GB' },
  { id: 3, name: 'node-prod-03', status: 'error', cpu: '0%', memory: '0GB' },
];

const mockPipelines = ['main-pipeline', 'staging-pipeline', 'hotfix-pipeline'];
const mockProviders = ['GitHub', 'GitLab', 'Bitbucket'];
const mockRepositories = { GitHub: ['corefinity/web-app', 'corefinity/api-service'], GitLab: ['infra/terraform'], Bitbucket: ['legacy/monolith'] };
const mockBranches = { 'corefinity/web-app': ['main', 'develop', 'feature/new-ui'], 'corefinity/api-service': ['main', 'develop'], 'infra/terraform': ['main'], 'legacy/monolith': ['master', 'develop'] };

const TABS = [
  'General', 'Pods', 'Nodes', 'Deployments', 'Pipelines', 'Emails', 
  'Cache Warmer', 'Actions', 'Diagnostics', 'Autoscaler', 'Monitors', 
  'Quick Actions', 'Firewall'
];

export default function Environments() {
  const [activeTab, setActiveTab] = useState('Pods');
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  
  // Deployment form state
  const [accountConnected, setAccountConnected] = useState(true);
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedRepository, setSelectedRepository] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  
  // Firewall state
  const [whitelistedIPs, setWhitelistedIPs] = useState(['192.168.1.1', '10.0.0.1']);
  const [newIP, setNewIP] = useState('');
  const [copiedIP, setCopiedIP] = useState(null);

  // Update breadcrumb on mount
  useEffect(() => {
    const event = new CustomEvent('breadcrumb-update', {
      detail: { company: 'Example Agency', website: 'Production Env' }
    });
    window.dispatchEvent(event);
  }, []);

  // IPv4 regex validation
  const isValidIPv4 = (ip) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };
  
  const canAddIP = isValidIPv4(newIP) && !whitelistedIPs.includes(newIP);
  
  const handleAddIP = () => {
    if (canAddIP) {
      setWhitelistedIPs([...whitelistedIPs, newIP]);
      setNewIP('');
    }
  };
  
  const handleRemoveIP = (ipToRemove) => {
    setWhitelistedIPs(whitelistedIPs.filter(ip => ip !== ipToRemove));
  };

  const handleCopyIP = (ip) => {
    navigator.clipboard.writeText(ip);
    setCopiedIP(ip);
    setTimeout(() => setCopiedIP(null), 2000);
  };
  
  // Check if all deployment fields are filled
  const canSaveDeployment = selectedPipeline && selectedProvider && selectedRepository && selectedBranch;
  
  // Get available repositories based on selected provider
  const getAvailableRepositories = () => {
    if (!selectedProvider) return [];
    return mockRepositories[selectedProvider] || [];
  };
  
  // Get available branches based on selected repository
  const getAvailableBranches = () => {
    if (!selectedRepository) return [];
    return mockBranches[selectedRepository] || [];
  };
  
  // Handle provider selection - reset dependent fields
  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    setSelectedRepository('');
    setSelectedBranch('');
  };
  
  // Handle repository selection - reset branch
  const handleRepositoryChange = (repo) => {
    setSelectedRepository(repo);
    setSelectedBranch('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Pods':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">CPU Usage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Memory Usage</th>
                </tr>
              </thead>
              <tbody>
                {mockPods.map((pod) => (
                  <tr key={pod.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <OrangeLink href="#" className="font-mono text-sm">{pod.name}</OrangeLink>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge 
                        type={pod.status === 'running' ? 'success' : pod.status === 'error' ? 'error' : 'pending'} 
                        active={pod.status === 'running'}
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{pod.cpu}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{pod.memory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'Nodes':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">CPU Usage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Memory Usage</th>
                </tr>
              </thead>
              <tbody>
                {mockNodes.map((node) => (
                  <tr key={node.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <OrangeLink href="#" className="font-mono text-sm">{node.name}</OrangeLink>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge 
                        type={node.status === 'running' ? 'success' : node.status === 'error' ? 'error' : 'pending'} 
                        active={node.status === 'running'}
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{node.cpu}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{node.memory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'Deployments':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Repository</h3>
            
            {!accountConnected && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">⚠️ No account connected. Please link a provider in Settings.</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
              {/* Pipeline Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline</label>
                <div className="relative">
                  <select
                    value={selectedPipeline}
                    onChange={(e) => setSelectedPipeline(e.target.value)}
                    disabled={!accountConnected}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${!accountConnected ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
                      focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent`}
                  >
                    <option value="">Select Pipeline</option>
                    {mockPipelines.map(pipeline => (
                      <option key={pipeline} value={pipeline}>{pipeline}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Provider Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <div className="relative">
                  <select
                    value={selectedProvider}
                    onChange={(e) => handleProviderChange(e.target.value)}
                    disabled={!accountConnected || !selectedPipeline}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || !selectedPipeline) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
                      focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent`}
                  >
                    <option value="">Select Provider</option>
                    {mockProviders.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Repository Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repository</label>
                <div className="relative">
                  <select
                    value={selectedRepository}
                    onChange={(e) => handleRepositoryChange(e.target.value)}
                    disabled={!accountConnected || !selectedPipeline || !selectedProvider}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || !selectedPipeline || !selectedProvider) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
                      focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent`}
                  >
                    <option value="">Select Repository</option>
                    {getAvailableRepositories().map(repo => (
                      <option key={repo} value={repo}>{repo}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Branch Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    disabled={!accountConnected || !selectedPipeline || !selectedProvider || !selectedRepository}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || !selectedPipeline || !selectedProvider || !selectedRepository) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
                      focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent`}
                  >
                    <option value="">Select Branch</option>
                    {getAvailableBranches().map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                disabled={!canSaveDeployment}
                className={`px-6 py-2 rounded-md font-medium transition-all
                  ${canSaveDeployment 
                    ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-sm' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Confirm & Save
              </button>
            </div>
          </div>
        );
      
      case 'Firewall':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Whitelisted IPs</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">IP Address</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {whitelistedIPs.map((ip) => (
                    <tr key={ip} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <OrangeLink href="#" className="font-mono text-sm">{ip}</OrangeLink>
                          <button
                            onClick={() => handleCopyIP(ip)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedIP === ip ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleRemoveIP(ip)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Remove IP"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Add IP Row */}
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={newIP}
                        onChange={(e) => setNewIP(e.target.value)}
                        placeholder="Enter IPv4 address"
                        className={`w-full px-3 py-2 border rounded-md font-mono text-sm
                          ${isValidIPv4(newIP) || newIP === '' ? 'border-gray-300' : 'border-red-300 focus:border-red-500'}
                          focus:outline-none focus:ring-2 focus:ring-brand-orange`}
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={handleAddIP}
                        disabled={!canAddIP}
                        className={`p-2 rounded-md transition-all
                          ${canAddIP 
                            ? 'bg-brand-orange text-white hover:bg-orange-600' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        title="Add IP"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <p>{activeTab} content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            <OrangeLink href="#" className="hover:text-orange-600">Production - Main Site</OrangeLink>
          </h1>
          <StatusBadge type="success" label="Live" active={true} />
        </div>
        
        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setQuickActionsOpen(!quickActionsOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Quick Actions</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          
          {quickActionsOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setQuickActionsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Restart Service
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Clear Cache
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* High-Density Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setTabLoading(true);
                  setTimeout(() => {
                    setActiveTab(tab);
                    setTabLoading(false);
                  }, 150);
                }}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2
                  ${activeTab === tab 
                    ? 'text-brand-orange border-brand-orange bg-orange-50' 
                    : 'text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-0 min-h-[200px]">
          {tabLoading ? (
            <div className="p-8 space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
}
