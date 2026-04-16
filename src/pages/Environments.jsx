import { useState, useEffect } from 'react';
import { ChevronDown, MoreVertical, Plus, Trash2, AlertTriangle, Copy, Check, Loader2, ToggleLeft, ToggleRight, Activity, Server, Zap, Shield, RefreshCw, Container, Globe, WifiOff } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import OrangeLink from '../components/OrangeLink';

// Mock data for demonstration
const initialPods = [
  { id: 1, name: 'pod-web-frontend-7d8f9c', status: 'running', cpu: 45, memory: 1.2 },
  { id: 2, name: 'pod-api-backend-3a2b1c', status: 'running', cpu: 62, memory: 2.4 },
  { id: 3, name: 'pod-worker-queue-5e6f7g', status: 'pending', cpu: 12, memory: 0.5 },
  { id: 4, name: 'pod-cache-redis-9h0i1j', status: 'running', cpu: 28, memory: 3.1 },
];

const initialNodes = [
  { id: 1, name: 'node-prod-01', status: 'running', cpu: 71, memory: 14.2 },
  { id: 2, name: 'node-prod-02', status: 'running', cpu: 55, memory: 10.8 },
  { id: 3, name: 'node-prod-03', status: 'error', cpu: 0, memory: 0 },
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
  
  // Live data state for Pods and Nodes
  const [pods, setPods] = useState(initialPods);
  const [nodes, setNodes] = useState(initialNodes);
  
  // Deployment form state
  const [accountConnected, setAccountConnected] = useState(true);
  const [checkingAccount, setCheckingAccount] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedRepository, setSelectedRepository] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Firewall state with localStorage persistence
  const [whitelistedIPs, setWhitelistedIPs] = useState(() => {
    const saved = localStorage.getItem('firewall_ips');
    return saved ? JSON.parse(saved) : ['192.168.1.1', '10.0.0.1'];
  });
  const [newIP, setNewIP] = useState('');
  const [copiedIP, setCopiedIP] = useState(null);
  
  // Autoscaler state
  const [autoscalerEnabled, setAutoscalerEnabled] = useState(true);
  const [minReplicas, setMinReplicas] = useState(2);
  const [maxReplicas, setMaxReplicas] = useState(10);
  const [targetCPU, setTargetCPU] = useState(70);
  const [activePodsCount, setActivePodsCount] = useState(4);
  
  // Cache Warmer state
  const [automaticWarming, setAutomaticWarming] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);
  
  // Diagnostics state
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticsOutput, setDiagnosticsOutput] = useState([]);
  
  // Monitors state
  const [monitors, setMonitors] = useState({
    uptime: true,
    performance: true,
    errors: true,
    logs: false,
    security: true
  });

  // Save IPs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('firewall_ips', JSON.stringify(whitelistedIPs));
  }, [whitelistedIPs]);

  // Update breadcrumb on mount
  useEffect(() => {
    const event = new CustomEvent('breadcrumb-update', {
      detail: { company: 'Example Agency', website: 'Production Env' }
    });
    window.dispatchEvent(event);
  }, []);

  // Update active pods count based on running pods
  useEffect(() => {
    const runningPods = pods.filter(pod => pod.status === 'running').length;
    setActivePodsCount(runningPods);
  }, [pods]);

  // Simulate live data fluctuations for Pods and Nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setPods(prevPods => prevPods.map(pod => ({
        ...pod,
        cpu: pod.status === 'running' ? Math.min(100, Math.max(0, pod.cpu + (Math.random() - 0.5) * 4)).toFixed(0) : pod.cpu,
        memory: pod.status === 'running' ? Math.max(0.1, (pod.memory + (Math.random() - 0.5) * 0.3)).toFixed(1) : pod.memory
      })));
      
      setNodes(prevNodes => prevNodes.map(node => ({
        ...node,
        cpu: node.status === 'running' ? Math.min(100, Math.max(0, node.cpu + (Math.random() - 0.5) * 4)).toFixed(0) : node.cpu,
        memory: node.status === 'running' ? Math.max(0.1, (node.memory + (Math.random() - 0.5) * 0.5)).toFixed(1) : node.memory
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate deployment progress
  useEffect(() => {
    if (isDeploying && deploymentProgress < 100) {
      const timer = setTimeout(() => {
        setDeploymentProgress(prev => Math.min(100, prev + Math.random() * 15));
      }, 500);
      return () => clearTimeout(timer);
    } else if (deploymentProgress >= 100) {
      setIsDeploying(false);
    }
  }, [isDeploying, deploymentProgress]);

  // IPv4 and IPv6 regex validation
  const isValidIP = (ip) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|$|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };
  
  const canAddIP = isValidIP(newIP) && !whitelistedIPs.includes(newIP);
  
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
  
  // Handle provider selection - simulate account check
  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    setSelectedRepository('');
    setSelectedBranch('');
    setCheckingAccount(true);
    setAccountConnected(false);
    
    // Simulate checking for accounts
    setTimeout(() => {
      setCheckingAccount(false);
      // Randomly decide if account is connected (for demo purposes, always false)
      setAccountConnected(false);
    }, 1500);
  };
  
  // Handle repository selection - reset branch
  const handleRepositoryChange = (repo) => {
    setSelectedRepository(repo);
    setSelectedBranch('');
  };

  const handleDeploy = () => {
    if (canSaveDeployment) {
      setIsDeploying(true);
      setDeploymentProgress(0);
    }
  };

  // Handle adding current IP to firewall
  const handleAddCurrentIP = () => {
    const mockCurrentIP = '192.168.1.1';
    if (!whitelistedIPs.includes(mockCurrentIP)) {
      setWhitelistedIPs([...whitelistedIPs, mockCurrentIP]);
    }
    setNewIP(mockCurrentIP);
  };

  // Handle clearing cache
  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 3000);
  };

  // Handle running diagnostics
  const handleRunDiagnostics = () => {
    setDiagnosticsRunning(true);
    setDiagnosticsOutput([]);
    
    const steps = [
      { text: 'Checking SSL...', delay: 500 },
      { text: 'Checking DB Connection...', delay: 1000 },
      { text: 'Checking Disk Space... 82%', delay: 1500 },
    ];
    
    let totalDelay = 0;
    steps.forEach((step, index) => {
      totalDelay = step.delay;
      setTimeout(() => {
        setDiagnosticsOutput(prev => [...prev, { text: step.text, status: 'OK' }]);
        if (index === steps.length - 1) {
          setDiagnosticsRunning(false);
        }
      }, step.delay);
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Pods':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">CPU Usage</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Memory Usage</th>
                </tr>
              </thead>
              <tbody>
                {pods.map((pod) => (
                  <tr key={pod.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3">
                      <OrangeLink href="#" className="font-mono text-sm">{pod.name}</OrangeLink>
                    </td>
                    <td className="py-2 px-3">
                      <StatusBadge 
                        type={pod.status === 'running' ? (parseInt(pod.cpu) > 90 ? 'pending' : 'success') : pod.status === 'error' ? 'error' : 'pending'} 
                        active={pod.status === 'running' && parseInt(pod.cpu) <= 90}
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-600 font-mono">{pod.cpu}%</td>
                    <td className="py-2 px-3 text-gray-600 font-mono">{pod.memory}GB</td>
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
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">CPU Usage</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Memory Usage</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3">
                      <OrangeLink href="#" className="font-mono text-sm">{node.name}</OrangeLink>
                    </td>
                    <td className="py-2 px-3">
                      <StatusBadge 
                        type={node.status === 'running' ? (parseInt(node.cpu) > 90 ? 'pending' : 'success') : node.status === 'error' ? 'error' : 'pending'} 
                        active={node.status === 'running' && parseInt(node.cpu) <= 90}
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-600 font-mono">{node.cpu}%</td>
                    <td className="py-2 px-3 text-gray-600 font-mono">{node.memory}GB</td>
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
            
            {/* Deployment Progress Timeline */}
            {isDeploying && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-3">Deployment in Progress</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${deploymentProgress >= 25 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {deploymentProgress >= 25 ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-700">Initializing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${deploymentProgress >= 50 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {deploymentProgress >= 50 ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-700">Building</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${deploymentProgress >= 75 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {deploymentProgress >= 75 ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-700">Deploying</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${deploymentProgress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {deploymentProgress >= 100 ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-700">Complete</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-orange h-2 rounded-full transition-all duration-500"
                      style={{ width: `${deploymentProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{deploymentProgress.toFixed(0)}% complete</p>
                </div>
              </div>
            )}
            
            {checkingAccount && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <span className="text-blue-800 font-medium">Checking for accounts...</span>
              </div>
            )}
            
            {!accountConnected && !checkingAccount && selectedProvider === 'GitHub' && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  ⚠️ No account connected. <OrangeLink href="#" className="font-semibold">Link GitHub Account</OrangeLink>
                </span>
              </div>
            )}
            
            {!accountConnected && !checkingAccount && selectedProvider !== 'GitHub' && (
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
                    disabled={!accountConnected || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
                    disabled={!accountConnected || !selectedPipeline || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || !selectedPipeline || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
                    disabled={!accountConnected || !selectedPipeline || !selectedProvider || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || !selectedPipeline || !selectedProvider || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
                    disabled={!accountConnected || !selectedPipeline || !selectedProvider || !selectedRepository || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(!accountConnected || !selectedPipeline || !selectedProvider || !selectedRepository || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
                onClick={handleDeploy}
                disabled={!canSaveDeployment || isDeploying}
                className={`px-6 py-2 rounded-md font-medium transition-all flex items-center gap-2
                  ${(canSaveDeployment && !isDeploying) 
                    ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-sm' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  'Confirm & Save'
                )}
              </button>
            </div>
          </div>
        );
      
      case 'Firewall':
        return (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Whitelisted IPs</h3>
              <button
                onClick={handleAddCurrentIP}
                className="px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Add My Current IP
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">IP Address</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {whitelistedIPs.map((ip) => (
                    <tr key={ip} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-3">
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
                      <td className="py-2 px-3 text-right">
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
                  
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={newIP}
                        onChange={(e) => setNewIP(e.target.value)}
                        placeholder="Enter IPv4 or IPv6 address"
                        className={`w-full px-3 py-2 border rounded-md font-mono text-sm
                          ${isValidIP(newIP) || newIP === '' ? 'border-gray-300' : 'border-red-300 focus:border-red-500'}
                          focus:outline-none focus:ring-2 focus:ring-brand-orange`}
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
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
      
      case 'Autoscaler':
        return (
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Horizontal Pod Autoscaler</h3>
                <p className="text-sm text-gray-600">Automatically scale your application based on CPU usage</p>
              </div>
              <button
                onClick={() => setAutoscalerEnabled(!autoscalerEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  autoscalerEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {autoscalerEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                {autoscalerEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            
            {/* Live Active Pods Count */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <Container className="w-5 h-5" />
                <span className="font-medium">Currently Active Pods: <strong>{activePodsCount}</strong></span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Pods: {minReplicas}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={minReplicas}
                  onChange={(e) => setMinReplicas(Math.min(parseInt(e.target.value), maxReplicas - 1))}
                  disabled={!autoscalerEnabled}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Pods: {maxReplicas}</label>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={maxReplicas}
                  onChange={(e) => setMaxReplicas(Math.max(parseInt(e.target.value), minReplicas + 1))}
                  disabled={!autoscalerEnabled}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Target CPU: {targetCPU}%</label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={targetCPU}
                  onChange={(e) => setTargetCPU(parseInt(e.target.value))}
                  disabled={!autoscalerEnabled}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
              </div>
            </div>
            
            {autoscalerEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Activity className="w-5 h-5" />
                  <span className="font-medium">Autoscaler is active and monitoring pod metrics</span>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'Monitors':
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Configuration</h3>
            <div className="space-y-3">
              {[
                { key: 'uptime', label: 'Uptime Monitoring', desc: 'Alert when service is unreachable', icon: Activity },
                { key: 'performance', label: 'Performance Metrics', desc: 'Track response times and throughput', icon: Zap },
                { key: 'errors', label: 'Error Tracking', desc: 'Monitor application errors and exceptions', icon: AlertTriangle },
                { key: 'logs', label: 'Log Aggregation', desc: 'Collect and analyze application logs', icon: Server },
                { key: 'security', label: 'Security Scanning', desc: 'Detect vulnerabilities and threats', icon: Shield }
              ].map(({ key, label, desc, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${monitors[key] ? 'text-brand-orange' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMonitors({ ...monitors, [key]: !monitors[key] })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
                      monitors[key] 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {monitors[key] ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                    {monitors[key] ? 'On' : 'Off'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'Cache Warmer':
        return (
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cache Warmer</h3>
                <p className="text-sm text-gray-600">Automatically warm cache for faster page loads</p>
              </div>
              <button
                onClick={() => setAutomaticWarming(!automaticWarming)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  automaticWarming 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {automaticWarming ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                Automatic Warming: {automaticWarming ? 'On' : 'Off'}
              </button>
            </div>
            
            {cacheCleared && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Cache cleared successfully!</span>
              </div>
            )}
            
            <div className="flex gap-4">
              <button
                onClick={handleClearCache}
                className="px-6 py-3 bg-brand-orange text-white rounded-md font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Clear All Cache
              </button>
            </div>
            
            {automaticWarming && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Automatic warming is enabled - cache will be refreshed every 15 minutes</span>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'Diagnostics':
        return (
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Diagnostics</h3>
                <p className="text-sm text-gray-600">Run health checks on your environment</p>
              </div>
              <button
                onClick={handleRunDiagnostics}
                disabled={diagnosticsRunning}
                className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                  diagnosticsRunning
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-brand-orange text-white hover:bg-orange-600'
                }`}
              >
                {diagnosticsRunning ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Running...</>
                ) : (
                  <><Activity className="w-5 h-5" /> Run Health Check</>
                )}
              </button>
            </div>
            
            {(diagnosticsOutput.length > 0 || diagnosticsRunning) && (
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-400 mb-2 border-b border-gray-700 pb-2">Terminal Output</div>
                <div className="space-y-2">
                  {diagnosticsOutput.map((line, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{line.text}</span>
                      <span className="text-green-400 ml-auto">{line.status}</span>
                    </div>
                  ))}
                  {diagnosticsRunning && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Running diagnostics...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'Quick Actions':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-brand-orange hover:bg-orange-50 transition-all group">
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="w-10 h-10 text-gray-400 group-hover:text-brand-orange transition-colors" />
                  <span className="font-medium text-gray-900">Restart PHP-FPM</span>
                  <span className="text-sm text-gray-500 text-center">Restart the PHP FastCGI Process Manager</span>
                </div>
              </button>
              
              <button className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-brand-orange hover:bg-orange-50 transition-all group">
                <div className="flex flex-col items-center gap-3">
                  <Container className="w-10 h-10 text-gray-400 group-hover:text-brand-orange transition-colors" />
                  <span className="font-medium text-gray-900">Rebuild Containers</span>
                  <span className="text-sm text-gray-500 text-center">Rebuild all Docker containers</span>
                </div>
              </button>
              
              <button className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-brand-orange hover:bg-orange-50 transition-all group">
                <div className="flex flex-col items-center gap-3">
                  <Globe className="w-10 h-10 text-gray-400 group-hover:text-brand-orange transition-colors" />
                  <span className="font-medium text-gray-900">Purge CDN</span>
                  <span className="text-sm text-gray-500 text-center">Clear all CDN cached content</span>
                </div>
              </button>
            </div>
          </div>
        );
      
      case 'General':
      case 'Pipelines':
      case 'Emails':
      case 'Actions':
        return (
          <div className="p-8 text-center text-gray-500">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab}</h3>
              <p className="text-gray-600 mb-6">This feature is coming soon. Check back later for updates.</p>
              <button className="px-6 py-2 bg-brand-orange text-white font-medium rounded-md hover:bg-orange-600 transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nothing here yet</h3>
              <p className="text-gray-600 mb-6">This feature is coming soon. Check back later for updates.</p>
              <button className="px-6 py-2 bg-brand-orange text-white font-medium rounded-md hover:bg-orange-600 transition-colors">
                Get Notified
              </button>
            </div>
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
            <div className="animate-fadeIn">{renderTabContent()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
