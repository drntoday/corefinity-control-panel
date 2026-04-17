import { useState, useEffect, useRef } from 'react';
import { ChevronDown, MoreVertical, Plus, Trash2, AlertTriangle, Copy, Check, Loader2, ToggleLeft, ToggleRight, Activity, Server, Zap, Shield, RefreshCw, Container, Globe, WifiOff, Terminal, HardDrive, MapPin, Cpu, MemoryStick } from 'lucide-react';
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
  'General', 'Pods', 'Nodes', 'Deployments', 'Firewall', 
  'Cache Warmer', 'Autoscaler', 'Diagnostics', 'Monitors',
  'Variables', 'Cron Jobs', 'Backups', 'Access Control'
];

export default function Environments() {
  const [activeTab, setActiveTab] = useState('General');
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  
  // Environment details data with localStorage persistence
  const [envDetails] = useState({
    name: 'Production - Main Site',
    id: 'env-prod-7a8b9c0d',
    ip: '192.168.1.100',
    region: 'us-east-1',
    phpVersion: '8.2',
    diskUsage: '45%',
    sslStatus: 'Active'
  });
  
  // Live data state for Pods and Nodes
  const [pods, setPods] = useState(initialPods);
  const [nodes, setNodes] = useState(initialNodes);
  
  // Deployment form state with localStorage persistence
  const [deploymentHistory, setDeploymentHistory] = useState(() => {
    const saved = localStorage.getItem('deployment_history');
    return saved ? JSON.parse(saved) : [
      { id: 1, pipeline: 'main-pipeline', provider: 'GitHub', repo: 'corefinity/web-app', branch: 'main', status: 'completed', progress: 100, date: '2024-01-15 10:30' },
      { id: 2, pipeline: 'staging-pipeline', provider: 'GitLab', repo: 'infra/terraform', branch: 'develop', status: 'completed', progress: 100, date: '2024-01-14 15:45' },
      { id: 3, pipeline: 'main-pipeline', provider: 'GitHub', repo: 'corefinity/api-service', branch: 'main', status: 'failed', progress: 65, date: '2024-01-13 09:15' },
    ];
  });
  const [accountConnected, setAccountConnected] = useState(true);
  const [checkingAccount, setCheckingAccount] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedRepository, setSelectedRepository] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Firewall state with localStorage persistence
  const [firewallRules, setFirewallRules] = useState(() => {
    const saved = localStorage.getItem('firewall_rules');
    return saved ? JSON.parse(saved) : [
      { ip: '192.168.1.1', type: 'Allow' },
      { ip: '10.0.0.1', type: 'Allow' }
    ];
  });
  const [newIP, setNewIP] = useState('');
  const [newRuleType, setNewRuleType] = useState('Allow');
  const [copiedIP, setCopiedIP] = useState(null);
  
  // Cache Warmer state with localStorage persistence
  const [cacheUrls, setCacheUrls] = useState(() => {
    const saved = localStorage.getItem('cache_urls');
    return saved ? JSON.parse(saved) : [
      'https://example.com/',
      'https://example.com/products',
      'https://example.com/about'
    ];
  });
  const [newUrl, setNewUrl] = useState('');
  const [automaticWarming, setAutomaticWarming] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  
  // Autoscaler state with localStorage persistence
  const [autoscalerEnabled, setAutoscalerEnabled] = useState(() => {
    const saved = localStorage.getItem('autoscaler_enabled');
    return saved ? JSON.parse(saved) : true;
  });
  const [minReplicas, setMinReplicas] = useState(() => {
    const saved = localStorage.getItem('min_replicas');
    return saved ? parseInt(saved) : 2;
  });
  const [maxReplicas, setMaxReplicas] = useState(() => {
    const saved = localStorage.getItem('max_replicas');
    return saved ? parseInt(saved) : 10;
  });
  const [targetCPU, setTargetCPU] = useState(() => {
    const saved = localStorage.getItem('target_cpu');
    return saved ? parseInt(saved) : 70;
  });
  const [activePodsCount, setActivePodsCount] = useState(4);
  const [scalingHistory, setScalingHistory] = useState([4, 5, 4, 6, 5, 4, 5, 6, 7, 6]);
  
  // Diagnostics state
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticsOutput, setDiagnosticsOutput] = useState([]);
  const terminalRef = useRef(null);
  
  // Monitors state
  const [monitors] = useState({
    http: { uptime: '99.99%', status: 'healthy' },
    ping: { uptime: '99.98%', status: 'healthy' },
    ssl: { uptime: '99.99%', status: 'healthy' }
  });

  // Save firewall rules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('firewall_rules', JSON.stringify(firewallRules));
  }, [firewallRules]);

  // Save deployment history to localStorage
  useEffect(() => {
    localStorage.setItem('deployment_history', JSON.stringify(deploymentHistory));
  }, [deploymentHistory]);

  // Save autoscaler settings to localStorage
  useEffect(() => {
    localStorage.setItem('autoscaler_enabled', JSON.stringify(autoscalerEnabled));
    localStorage.setItem('min_replicas', minReplicas.toString());
    localStorage.setItem('max_replicas', maxReplicas.toString());
    localStorage.setItem('target_cpu', targetCPU.toString());
  }, [autoscalerEnabled, minReplicas, maxReplicas, targetCPU]);

  // Save cache URLs to localStorage
  useEffect(() => {
    localStorage.setItem('cache_urls', JSON.stringify(cacheUrls));
  }, [cacheUrls]);

  // Update breadcrumb on mount - matches hierarchy: All Clients > Example Company > Website Name > Environment
  useEffect(() => {
    const event = new CustomEvent('breadcrumb-update', {
      detail: { company: 'Example Company', website: 'Main Website' }
    });
    window.dispatchEvent(event);
  }, []);

  // Update active pods count based on running pods
  useEffect(() => {
    const runningPods = pods.filter(pod => pod.status === 'running').length;
    setActivePodsCount(runningPods);
  }, [pods]);

  // Simulate live data fluctuations for Pods and Nodes - updates every 2 seconds
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
    }, 2000);
    
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
  
  const canAddIP = isValidIP(newIP) && !firewallRules.some(rule => rule.ip === newIP);
  
  const handleAddIP = () => {
    if (canAddIP) {
      setFirewallRules([...firewallRules, { ip: newIP, type: newRuleType }]);
      setNewIP('');
      setNewRuleType('Allow');
    }
  };
  
  const handleRemoveIP = (ipToRemove) => {
    setFirewallRules(firewallRules.filter(rule => rule.ip !== ipToRemove));
  };

  const handleCopyIP = (ip) => {
    navigator.clipboard.writeText(ip);
    setCopiedIP(ip);
    setTimeout(() => setCopiedIP(null), 2000);
  };

  // Get current IP for firewall
  const handleAddCurrentIP = () => {
    const mockCurrentIP = '203.0.113.42';
    if (!firewallRules.some(rule => rule.ip === mockCurrentIP)) {
      setFirewallRules([...firewallRules, { ip: mockCurrentIP, type: 'Allow' }]);
    }
    setNewIP(mockCurrentIP);
  };

  // Handle clearing cache with 2 second loading
  const handleClearCache = () => {
    setClearingCache(true);
    setCacheCleared(false);
    setTimeout(() => {
      setClearingCache(false);
      setCacheCleared(true);
      setTimeout(() => setCacheCleared(false), 3000);
    }, 2000);
  };

  // Handle adding URL to cache warmer
  const handleAddUrl = () => {
    if (newUrl && !cacheUrls.includes(newUrl)) {
      setCacheUrls([...cacheUrls, newUrl]);
      setNewUrl('');
    }
  };

  // Handle removing URL from cache warmer
  const handleRemoveUrl = (urlToRemove) => {
    setCacheUrls(cacheUrls.filter(url => url !== urlToRemove));
  };

  // Handle running diagnostics with typed output
  const handleRunDiagnostics = () => {
    setDiagnosticsRunning(true);
    setDiagnosticsOutput([]);
    
    const steps = [
      { text: 'Checking SSL...', result: 'OK', delay: 500 },
      { text: 'Testing Database...', result: 'OK', delay: 1200 },
      { text: 'Latency:', result: '12ms', delay: 1800 },
    ];
    
    let totalDelay = 0;
    steps.forEach((step, index) => {
      totalDelay = step.delay;
      setTimeout(() => {
        setDiagnosticsOutput(prev => [...prev, { text: step.text, result: step.result }]);
        if (index === steps.length - 1) {
          setDiagnosticsRunning(false);
        }
      }, step.delay);
    });
  };

  // Simulate scaling history updates for the graph
  useEffect(() => {
    if (autoscalerEnabled) {
      const interval = setInterval(() => {
        setScalingHistory(prev => {
          const newCount = Math.max(minReplicas, Math.min(maxReplicas, prev[prev.length - 1] + (Math.random() > 0.5 ? 1 : -1)));
          return [...prev.slice(1), newCount];
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [autoscalerEnabled, minReplicas, maxReplicas]);
  
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
    setDeploymentStep(1);
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
    setDeploymentStep(2);
    setSelectedBranch('');
  };

  // Handle pipeline selection
  const handlePipelineChange = (pipeline) => {
    setSelectedPipeline(pipeline);
    setDeploymentStep(1);
    setSelectedProvider('');
    setSelectedRepository('');
    setSelectedBranch('');
  };

  // Handle branch selection
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setDeploymentStep(3);
  };

  const handleDeploy = () => {
    if (canSaveDeployment) {
      setIsDeploying(true);
      setDeploymentProgress(0);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Environment Details */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Environment Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Name</label>
                    <OrangeLink href="#" className="block font-medium text-sm">{envDetails.name}</OrangeLink>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">ID</label>
                    <div className="flex items-center gap-2">
                      <OrangeLink href="#" className="font-mono text-sm">{envDetails.id}</OrangeLink>
                      <button onClick={() => { navigator.clipboard.writeText(envDetails.id); }} className="text-gray-400 hover:text-gray-600">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">IP Address</label>
                    <div className="flex items-center gap-2">
                      <OrangeLink href="#" className="font-mono text-sm">{envDetails.ip}</OrangeLink>
                      <button onClick={() => { navigator.clipboard.writeText(envDetails.ip); }} className="text-gray-400 hover:text-gray-600">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Region</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <OrangeLink href="#" className="font-medium text-sm">{envDetails.region}</OrangeLink>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Technical Specs */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 uppercase">PHP Version</label>
                    <p className="font-mono text-sm text-gray-900">{envDetails.phpVersion}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Disk Usage</label>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-3 h-3 text-gray-400" />
                      <p className="font-mono text-sm text-gray-900">{envDetails.diskUsage}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">SSL Status</label>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      <p className="font-medium text-sm text-green-700">{envDetails.sslStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Pods':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Pod Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">CPU %</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Memory</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Restart</th>
                </tr>
              </thead>
              <tbody>
                {pods.map((pod) => (
                  <tr key={`pod-${pod.id}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3">
                      <OrangeLink href="#" className="font-mono text-sm">{pod.name}</OrangeLink>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${pod.status === 'running' ? 'bg-green-500 animate-pulse' : pod.status === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                        <span className="text-gray-700 capitalize">{pod.status}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-brand-orange h-1.5 rounded-full" style={{ width: `${pod.cpu}%` }}></div>
                        </div>
                        <span className="font-mono text-xs text-gray-600">{pod.cpu}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="w-3 h-3 text-gray-400" />
                        <span className="font-mono text-xs text-gray-600">{pod.memory}GB</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <button className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors">
                        Restart
                      </button>
                    </td>
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
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Node Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">CPU %</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Memory</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Restart</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={`node-${node.id}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3">
                      <OrangeLink href="#" className="font-mono text-sm">{node.name}</OrangeLink>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${node.status === 'running' ? 'bg-green-500 animate-pulse' : node.status === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                        <span className="text-gray-700 capitalize">{node.status}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-brand-orange h-1.5 rounded-full" style={{ width: `${node.cpu}%` }}></div>
                        </div>
                        <span className="font-mono text-xs text-gray-600">{node.cpu}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="w-3 h-3 text-gray-400" />
                        <span className="font-mono text-xs text-gray-600">{node.memory}GB</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <button className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors">
                        Restart
                      </button>
                    </td>
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
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">
                  No account connected. <OrangeLink href="#" className="font-semibold">Link GitHub Account</OrangeLink>
                </span>
              </div>
            )}
            
            {!accountConnected && !checkingAccount && selectedProvider !== 'GitHub' && selectedProvider && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">⚠️ No account connected. Please link a provider in Settings.</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
              {/* Pipeline Dropdown - Step 0 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline</label>
                <div className="relative">
                  <select
                    value={selectedPipeline}
                    onChange={(e) => handlePipelineChange(e.target.value)}
                    disabled={checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${checkingAccount ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
              
              {/* Provider Dropdown - Step 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <div className="relative">
                  <select
                    value={selectedProvider}
                    onChange={(e) => handleProviderChange(e.target.value)}
                    disabled={deploymentStep < 1 || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(deploymentStep < 1 || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
              
              {/* Repository Dropdown - Step 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repository</label>
                <div className="relative">
                  <select
                    value={selectedRepository}
                    onChange={(e) => handleRepositoryChange(e.target.value)}
                    disabled={deploymentStep < 2 || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(deploymentStep < 2 || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
              
              {/* Branch Dropdown - Step 3 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => handleBranchChange(e.target.value)}
                    disabled={deploymentStep < 3 || checkingAccount}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white pr-10
                      ${(deploymentStep < 3 || checkingAccount) ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}
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
              <h3 className="text-lg font-semibold text-gray-900">Firewall Rules</h3>
              <button
                onClick={handleAddCurrentIP}
                className="px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Use My Current IP
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">IP Address</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Rule Type</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firewallRules.map((rule) => (
                    <tr key={rule.ip} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <OrangeLink href="#" className="font-mono text-sm">{rule.ip}</OrangeLink>
                          <button
                            onClick={() => handleCopyIP(rule.ip)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedIP === rule.ip ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-1 rounded ${rule.type === 'Allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.type}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => handleRemoveIP(rule.ip)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Remove Rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newIP}
                          onChange={(e) => setNewIP(e.target.value)}
                          placeholder="Enter IPv4 or IPv6 address"
                          className={`w-full px-3 py-2 border rounded-md font-mono text-sm
                            ${isValidIP(newIP) || newIP === '' ? 'border-gray-300' : 'border-red-300 focus:border-red-500'}
                            focus:outline-none focus:ring-2 focus:ring-brand-orange`}
                        />
                        <button
                          onClick={handleAddCurrentIP}
                          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium text-gray-700 transition-colors whitespace-nowrap"
                          title="Use My Current IP"
                        >
                          Use My Current IP
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={newRuleType}
                        onChange={(e) => setNewRuleType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      >
                        <option value="Allow">Allow</option>
                        <option value="Deny">Deny</option>
                      </select>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={handleAddIP}
                        disabled={!canAddIP}
                        className={`p-2 rounded-md transition-all
                          ${canAddIP 
                            ? 'bg-brand-orange text-white hover:bg-orange-600' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        title="Add Rule"
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
            
            {/* Live Active Pods Count - Current Load Indicator */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-800">
                  <Container className="w-5 h-5" />
                  <span className="font-medium">Current Load: <strong>{activePodsCount} pods active</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Min: {minReplicas}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">Max: {maxReplicas}</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-orange h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (activePodsCount / maxReplicas) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Pods: {minReplicas}</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Pods: {maxReplicas}</label>
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
              <div className="bg-black rounded-lg p-4 font-mono text-sm border border-gray-800">
                <div className="text-green-500 mb-3 border-b border-gray-700 pb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Terminal Output
                </div>
                <div className="space-y-2 min-h-[120px]">
                  {diagnosticsOutput.map((line, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">$</span>
                      <span>{line.text}</span>
                      <span className="text-green-400">{line.result}</span>
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
      
      case 'Variables':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Variables</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Manage environment variables for this deployment.</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Key</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Value</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3 font-mono text-sm">DATABASE_URL</td>
                    <td className="py-2 px-3 font-mono text-sm text-gray-500">••••••••••••</td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-red-600 hover:text-red-800 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3 font-mono text-sm">API_KEY</td>
                    <td className="py-2 px-3 font-mono text-sm text-gray-500">••••••••••••</td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-red-600 hover:text-red-800 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="mt-4 px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Variable
              </button>
            </div>
          </div>
        );

      case 'Cron Jobs':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Cron Jobs</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Schedule recurring tasks for your environment.</p>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Schedule</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Last Run</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3 font-mono text-sm">daily-backup</td>
                    <td className="py-2 px-3 font-mono text-sm">0 2 * * *</td>
                    <td className="py-2 px-3 text-gray-500">2024-01-15 02:00</td>
                    <td className="py-2 px-3"><span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">Success</span></td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-gray-600 hover:text-gray-800 transition-colors p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="mt-4 px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Cron Job
              </button>
            </div>
          </div>
        );

      case 'Backups':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Configuration</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-gray-900">Automatic Backups</p>
                  <p className="text-sm text-gray-600">Daily backups at 3:00 AM UTC</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md font-medium bg-green-100 text-green-800">
                  <ToggleRight className="w-6 h-6" />
                  Enabled
                </button>
              </div>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Size</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3 font-mono text-sm">2024-01-15</td>
                    <td className="py-2 px-3 font-mono text-sm">2.4 GB</td>
                    <td className="py-2 px-3"><span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">Full</span></td>
                    <td className="py-2 px-3 text-right">
                      <OrangeLink href="#" className="text-brand-orange hover:text-orange-600 text-sm">Restore</OrangeLink>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3 font-mono text-sm">2024-01-14</td>
                    <td className="py-2 px-3 font-mono text-sm">2.3 GB</td>
                    <td className="py-2 px-3"><span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">Full</span></td>
                    <td className="py-2 px-3 text-right">
                      <OrangeLink href="#" className="text-brand-orange hover:text-orange-600 text-sm">Restore</OrangeLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Access Control':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Control</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Manage user access to this environment.</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">User</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Last Access</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-sm font-medium">JD</div>
                        <span className="font-medium">John Doe</span>
                      </div>
                    </td>
                    <td className="py-2 px-3"><span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">Admin</span></td>
                    <td className="py-2 px-3 text-gray-500">2024-01-15 10:30</td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-gray-600 hover:text-gray-800 transition-colors p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-medium">JS</div>
                        <span className="font-medium">Jane Smith</span>
                      </div>
                    </td>
                    <td className="py-2 px-3"><span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">Developer</span></td>
                    <td className="py-2 px-3 text-gray-500">2024-01-14 15:45</td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-gray-600 hover:text-gray-800 transition-colors p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="mt-4 px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            <OrangeLink href="#" className="hover:text-orange-600">{envDetails.name}</OrangeLink>
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
