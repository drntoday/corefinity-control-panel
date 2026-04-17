import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';

// Icons
const IconDashboard = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);
const IconEnvironments = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);
const IconDeployments = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);
const IconTickets = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);
const IconProfile = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const IconServer = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);
const IconPod = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const IconFirewall = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconRefresh = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const IconTrash = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const IconKey = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);
const IconShield = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const IconUser = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const IconBell = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const IconMenu = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconExternalLink = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
const IconSettings = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconZap = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const IconDatabase = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);
const IconActivity = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// OrangeLink Component - #FF6B00
const OrangeLink = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-[#FF6B00] hover:text-orange-700 underline font-medium cursor-pointer inline-flex items-center gap-1"
    style={{ color: '#FF6B00' }}
  >
    {children}
    <IconExternalLink className="w-3 h-3" />
  </a>
);

// Monospace text component
const Monospace = ({ children, className = '' }) => (
  <code className={`font-mono bg-gray-100 px-2 py-0.5 rounded text-sm ${className}`} style={{ fontFamily: 'monospace' }}>
    {children}
  </code>
);

// Environment data with hardcoded specs per Corefinity documentation
const environmentData = {
  name: 'Production - Main Site',
  id: 'env-3029',
  ip: '192.168.1.100',
  region: 'us-east-1',
  platform: 'Laravel',
  cluster: 'cf-europe-west2-cluster-1',
  sshPort: 5004,
  sshGatewayVersion: '1.2.4',
  phpVersion: '8.2',
  diskUsage: '45%',
  sslStatus: 'Active',
};

// Tab definitions - exactly 13 tabs as per documentation
const TABS = [
  'General',
  'Pods',
  'Nodes',
  'Deployments',
  'Pipelines',
  'Emails',
  'Cache Warmer',
  'Actions',
  'Diagnostics',
  'Autoscaler',
  'Monitors',
  'Quick Actions',
  'Firewall',
];

// Sample Pods Data with exact columns
const podsData = [
  { name: 'laravel-app-7d8f9b6c5-x2k4m', node: 'node-pool-1', ip: '10.0.1.15', age: '5d', containers: 2, cpu: '250m', memory: '512Mi', restarts: 0, ready: '2/2', status: 'Running' },
  { name: 'laravel-app-7d8f9b6c5-p9n3j', node: 'node-pool-2', ip: '10.0.2.22', age: '5d', containers: 2, cpu: '180m', memory: '480Mi', restarts: 1, ready: '2/2', status: 'Running' },
  { name: 'redis-master-0', node: 'node-pool-1', ip: '10.0.1.18', age: '12d', containers: 1, cpu: '100m', memory: '256Mi', restarts: 0, ready: '1/1', status: 'Running' },
  { name: 'mysql-primary-0', node: 'node-pool-3', ip: '10.0.3.5', age: '30d', containers: 1, cpu: '500m', memory: '1Gi', restarts: 0, ready: '1/1', status: 'Running' },
  { name: 'nginx-ingress-abc12', node: 'node-pool-1', ip: '10.0.1.10', age: '45d', containers: 1, cpu: '150m', memory: '300Mi', restarts: 2, ready: '1/1', status: 'Running' },
];

// Sample Deployments Data
const deploymentsData = [
  { commitHash: 'a3f7b2c', commitMessage: 'Fix checkout cart total calculation', author: 'john.doe@company.com', duration: '2m 34s', timestamp: '2024-01-15 14:30' },
  { commitHash: 'b8e4d1f', commitMessage: 'Update product image compression', author: 'jane.smith@agency.co', duration: '3m 12s', timestamp: '2024-01-15 12:15' },
  { commitHash: 'c2a9e5b', commitMessage: 'Add new payment gateway integration', author: 'dev.team@example.org', duration: '5m 45s', timestamp: '2024-01-14 16:45' },
];

// Pipeline options
const pipelines = ['Magento 2 Deployment', 'Laravel Standard', 'Node.js API', 'Static Site'];
const providers = ['GitHub', 'GitLab', 'Bitbucket'];
const repositories = {
  'Magento 2 Deployment': ['acme/magento-store', 'acme/magento-enterprise'],
  'Laravel Standard': ['acme/laravel-api', 'acme/laravel-web'],
  'Node.js API': ['acme/node-service'],
  'Static Site': ['acme/website'],
};
const branches = {
  'acme/magento-store': ['main', 'develop', 'staging'],
  'acme/magento-enterprise': ['master', 'production'],
  'acme/laravel-api': ['main', 'develop'],
  'acme/laravel-web': ['main', 'develop'],
  'acme/node-service': ['main', 'dev'],
  'acme/website': ['main', 'gh-pages'],
};

// Ticket context data
const ticketContext = {
  agency: 'Digital Solutions Agency',
  company: 'Acme Corporation',
  website: 'www.acmecorp.com',
};

// SSH Keys sample data
const initialSshKeys = [
  { id: 1, label: 'Work Laptop', key: 'SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz1234567890', addedDate: '2024-01-10' },
  { id: 2, label: 'Home Desktop', key: 'SHA256:ZyXwVuTsRqPoNmLkJiHgFeDcBa0987654321', addedDate: '2024-01-05' },
];

// Firewall rules sample
const firewallRules = [
  { id: 1, type: 'Allow', protocol: 'TCP', port: '443', source: '0.0.0.0/0', description: 'HTTPS Access' },
  { id: 2, type: 'Allow', protocol: 'TCP', port: '80', source: '0.0.0.0/0', description: 'HTTP Access' },
  { id: 3, type: 'Allow', protocol: 'TCP', port: '22', source: '192.168.1.0/24', description: 'SSH from Office' },
];

// Quick Actions with specific restart logic per documentation
const quickActionsList = [
  { id: 'restart-php-fpm', label: 'Restart PHP-FPM', icon: IconZap, service: 'php-fpm' },
  { id: 'restart-nginx', label: 'Restart Nginx', icon: IconServer, service: 'nginx' },
  { id: 'restart-redis', label: 'Restart Redis', icon: IconDatabase, service: 'redis' },
  { id: 'restart-varnish', label: 'Restart Varnish', icon: IconActivity, service: 'varnish' },
  { id: 'rebuild-containers', label: 'Rebuild Containers', icon: IconPod, service: 'containers' },
];

// Diagnostics items with Recheck buttons per documentation
const diagnosticsItems = [
  { id: 'nginx-logs', label: 'Nginx Logs', status: 'healthy', lastChecked: '2024-01-15 14:00' },
  { id: 'access-server', label: 'Access Server', status: 'healthy', lastChecked: '2024-01-15 14:00' },
  { id: 'load-balancer', label: 'Load Balancer', status: 'warning', lastChecked: '2024-01-15 13:30' },
  { id: 'cloudflare', label: 'Cloudflare', status: 'healthy', lastChecked: '2024-01-15 14:00' },
];

// Profile navigation items
const profileNavItems = [
  { id: 'profile', label: 'Profile Update', icon: IconUser },
  { id: 'ssh-keys', label: 'SSH Keys', icon: IconKey },
  { id: 'api-tokens', label: 'API Tokens', icon: IconSettings },
  { id: '2fa', label: '2FA', icon: IconShield },
  { id: 'firewall', label: 'Firewall', icon: IconFirewall },
];

// Main Dashboard Component
function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Environments</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Pods</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">48</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Deployments</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Open Tickets</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">7</p>
        </div>
      </div>
    </div>
  );
}

// Environment Page with 13 Tabs
function EnvironmentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'General';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('tab', activeTab);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [activeTab, navigate, location.pathname]);

  // Deployment form state with sequential locking
  const [pipeline, setPipeline] = useState('');
  const [provider, setProvider] = useState('');
  const [repository, setRepository] = useState('');
  const [branch, setBranch] = useState('');

  // Reset downstream fields when upstream changes
  useEffect(() => {
    setProvider('');
    setRepository('');
    setBranch('');
  }, [pipeline]);

  useEffect(() => {
    setRepository('');
    setBranch('');
  }, [provider]);

  useEffect(() => {
    setBranch('');
  }, [repository]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Platform</label>
                  <p className="text-gray-900 font-medium">{environmentData.platform}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Cluster</label>
                  <p className="text-gray-900 font-medium">{environmentData.cluster}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">SSH Port</label>
                  <p className="text-gray-900 font-medium"><Monospace>{environmentData.sshPort}</Monospace></p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">SSH Gateway Version</label>
                  <p className="text-gray-900 font-medium"><Monospace>{environmentData.sshGatewayVersion}</Monospace></p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">IP Address</label>
                  <p className="text-gray-900 font-medium"><Monospace>{environmentData.ip}</Monospace></p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Region</label>
                  <p className="text-gray-900 font-medium">{environmentData.region}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">PHP Version</label>
                  <p className="text-gray-900 font-medium">{environmentData.phpVersion}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Environment ID</label>
                  <p className="text-gray-900 font-medium"><OrangeLink href={`/environments/${environmentData.id}`}>{environmentData.id}</OrangeLink></p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Pods':
        return (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">NAME</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">NODE</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">IP</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">AGE</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">CONTAINERS</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">CPU</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">MEMORY</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">RESTARTS</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">READY</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {podsData.map((pod) => (
                    <tr key={pod.name} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 font-mono">{pod.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pod.node}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-mono">{pod.ip}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pod.age}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pod.containers}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-mono">{pod.cpu}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 font-mono">{pod.memory}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pod.restarts}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{pod.ready}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${pod.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {pod.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Nodes':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cluster Nodes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['node-pool-1', 'node-pool-2', 'node-pool-3'].map((node) => (
                <div key={node} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-mono text-gray-900">{node}</h4>
                  <p className="text-sm text-gray-500 mt-2">Ready - 4 CPUs - 16GB RAM</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Deployments':
        return (
          <div className="space-y-6">
            {/* Sequential Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">New Deployment</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline</label>
                  <select
                    value={pipeline}
                    onChange={(e) => setPipeline(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select Pipeline</option>
                    {pipelines.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    disabled={!pipeline}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 ${!pipeline ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-orange-500 focus:border-orange-500'}`}
                  >
                    <option value="">Select Provider</option>
                    {providers.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Repository</label>
                  <select
                    value={repository}
                    onChange={(e) => setRepository(e.target.value)}
                    disabled={!provider || !pipeline}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 ${(!provider || !pipeline) ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-orange-500 focus:border-orange-500'}`}
                  >
                    <option value="">Select Repository</option>
                    {(pipeline && repositories[pipeline])?.map((repo) => (
                      <option key={repo} value={repo}>{repo}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    disabled={!repository || !provider || !pipeline}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 ${(!repository || !provider || !pipeline) ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-2 focus:ring-orange-500 focus:border-orange-500'}`}
                  >
                    <option value="">Select Branch</option>
                    {(repository && branches[repository])?.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                disabled={!branch || !repository || !provider || !pipeline}
                className={`mt-4 px-6 py-2 rounded-md font-medium transition-colors ${branch && repository && provider && pipeline ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Deploy Now
              </button>
            </div>

            {/* Tasks Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200">Recent Deployments</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Commit Hash</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Commit Message</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Author</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Duration</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deploymentsData.map((deployment, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-mono text-gray-900">{deployment.commitHash}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{deployment.commitMessage}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{deployment.author}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 font-mono">{deployment.duration}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">Details</button>
                            <button className="text-red-600 hover:text-red-800">Rollback</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Pipelines':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CI/CD Pipelines</h3>
            <div className="space-y-4">
              {pipelines.map((p) => (
                <div key={p} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{p}</h4>
                    <p className="text-sm text-gray-500">Last run: 2 hours ago</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Run Pipeline</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Emails':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Configuration</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">SMTP Settings</h4>
                <p className="text-sm text-gray-500 mt-1">Host: smtp.mailgun.org</p>
                <p className="text-sm text-gray-500">Port: 587</p>
              </div>
            </div>
          </div>
        );

      case 'Cache Warmer':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cache Warmer</h3>
            <div className="space-y-4">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Warm All Caches</button>
              <div className="text-sm text-gray-500">Last warmed: 1 hour ago</div>
            </div>
          </div>
        );

      case 'Actions':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickActionsList.map((action) => (
                <button
                  key={action.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                >
                  <action.icon className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'Diagnostics':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Diagnostics</h3>
            <div className="space-y-4">
              {diagnosticsItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-500">Last checked: {item.lastChecked}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status}
                    </span>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                      <IconRefresh className="w-4 h-4" />
                      Recheck
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Autoscaler':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Horizontal Pod Autoscaler</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="text-sm text-gray-500">Min Pods</label>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="text-sm text-gray-500">Max Pods</label>
                  <p className="text-2xl font-bold text-gray-900">10</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm text-gray-500">Current Pods</label>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="text-sm text-gray-500">Target CPU Utilization</label>
                <p className="text-2xl font-bold text-gray-900">70%</p>
              </div>
            </div>
          </div>
        );

      case 'Monitors':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring</h3>
            <div className="space-y-4">
              {['CPU Usage', 'Memory Usage', 'Disk I/O', 'Network Traffic', 'Request Rate', 'Error Rate'].map((metric) => (
                <div key={metric} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{metric}</span>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm">View Graph</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Quick Actions':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActionsList.map((action) => (
                <button
                  key={action.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  <action.icon className="w-6 h-6 text-orange-600" />
                  <span className="font-medium text-gray-900">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'Firewall':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Firewall Rules</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Protocol</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Port</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Source</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firewallRules.map((rule) => (
                    <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${rule.type === 'Allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rule.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono">{rule.protocol}</td>
                      <td className="py-3 px-4 text-sm font-mono">{rule.port}</td>
                      <td className="py-3 px-4 text-sm font-mono">{rule.source}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{rule.description}</td>
                      <td className="py-3 px-4 text-sm">
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Add Rule</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{environmentData.name}</h2>
          <OrangeLink href={`/environments/${environmentData.id}`}>{environmentData.id}</OrangeLink>
        </div>
        <p className="text-gray-600">Manage your environment settings and configurations</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

// Ticket Page with Dual-Mode Input
function TicketPage() {
  const { id } = useParams();
  const [internalNote, setInternalNote] = useState('');
  const [publicReply, setPublicReply] = useState('');

  return (
    <div className="p-6">
      <div className="flex gap-6">
        {/* Main Ticket Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Ticket <OrangeLink href={`/tickets/tkt-1042`}>tkt-1042</OrangeLink></h2>
            </div>
            <p className="text-gray-600 mb-4">Issue with deployment pipeline failing on staging environment</p>
            
            {/* Internal Note - Gold background #FFFBEB, Gold border */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Internal Note</label>
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                style={{ backgroundColor: '#FFFBEB', borderColor: '#FCD34D' }}
                rows={4}
                placeholder="Add an internal note visible only to staff..."
              />
              <button className="mt-2 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-medium">
                Post Staff Note
              </button>
            </div>

            {/* Public Reply - White background, Blue/Orange button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Public Reply</label>
              <textarea
                value={publicReply}
                onChange={(e) => setPublicReply(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                rows={4}
                placeholder="Write a public reply to the customer..."
              />
              <button className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-md hover:from-blue-700 hover:to-orange-700 font-medium">
                Send Reply
              </button>
            </div>
          </div>
        </div>

        {/* Context Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Context</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Agency</label>
                <p><OrangeLink href="/agencies/digital-solutions">{ticketContext.agency}</OrangeLink></p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Company</label>
                <p><OrangeLink href="/companies/acme-corp">{ticketContext.company}</OrangeLink></p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Website</label>
                <p><OrangeLink href={`https://${ticketContext.website}`} target="_blank">{ticketContext.website}</OrangeLink></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Profile Page with sub-pages
function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Update</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="john@example.com" />
              </div>
              <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Update Profile</button>
            </div>
          </div>
        );

      case 'ssh-keys':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SSH Keys</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add New SSH Key</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                  rows={4}
                  placeholder="Paste your SSH public key here (ssh-ed25519 AAAA...)"
                />
              </div>
              <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Add SSH Key</button>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Existing Keys</h4>
                {initialSshKeys.map((key) => (
                  <div key={key.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{key.label}</p>
                      <p className="text-sm font-mono text-gray-500">{key.key}</p>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <IconTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'api-tokens':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Tokens</h3>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 mb-4">Generate New Token</button>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Production API Key</p>
                  <p className="text-sm font-mono text-gray-500">sk_live_••••••••••••abcd</p>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  <IconTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );

      case '2fa':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Google Authenticator</p>
                  <p className="text-sm text-gray-500">Use Google Authenticator app</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">SMS Verification</p>
                  <p className="text-sm text-gray-500">Receive codes via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'firewall':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Firewall Settings</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium">IPv4 Only Notice</p>
              <p className="text-sm text-blue-600 mt-1">This system currently supports IPv4 addresses only. IPv6 support is planned for a future release.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowed IP Addresses</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                  rows={4}
                  placeholder="Enter IP addresses (one per line)&#10;192.168.1.1&#10;10.0.0.0/8"
                />
              </div>
              <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Update Firewall Rules</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Profile & Security</h2>
      <div className="flex gap-6">
        {/* Navigation */}
        <div className="w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {profileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-600'
                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

// Environments List Page
function EnvironmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Environments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Production - Main Site</h3>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">ID: <Monospace>env-3029</Monospace></p>
          <p className="text-sm text-gray-500 mb-2">IP: <Monospace>192.168.1.100</Monospace></p>
          <p className="text-sm text-gray-500">Platform: Laravel</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Staging Environment</h3>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Deploying</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">ID: <Monospace>env-3030</Monospace></p>
          <p className="text-sm text-gray-500 mb-2">IP: <Monospace>192.168.1.101</Monospace></p>
          <p className="text-sm text-gray-500">Platform: Node.js</p>
        </div>
      </div>
    </div>
  );
}

// Deployments Page
function DeploymentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Deployments</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Environment</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Commit</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Duration</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deploymentsData.map((deployment, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <OrangeLink href={`/environments/env-3029`}>env-3029</OrangeLink>
                </td>
                <td className="py-3 px-4 font-mono text-sm">{deployment.commitHash}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Success</span>
                </td>
                <td className="py-3 px-4 font-mono text-sm">{deployment.duration}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-800">Rollback</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Tickets List Page
function TicketsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Tickets</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ticket ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Subject</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <OrangeLink href="/tickets/tkt-1042">tkt-1042</OrangeLink>
              </td>
              <td className="py-3 px-4">Deployment pipeline failing on staging</td>
              <td className="py-3 px-4">
                <OrangeLink href="/companies/acme-corp">Acme Corporation</OrangeLink>
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">In Progress</span>
              </td>
              <td className="py-3 px-4">
                <button className="text-blue-600 hover:text-blue-800">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Layout with Sidebar
function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: IconDashboard, label: 'Dashboard' },
    { path: '/environments', icon: IconEnvironments, label: 'Environments' },
    { path: '/deployments', icon: IconDeployments, label: 'Deployments' },
    { path: '/tickets', icon: IconTickets, label: 'Tickets' },
    { path: '/profile', icon: IconProfile, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0a192f] text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <IconMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Corefinity</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full">
              <IconBell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <IconUser className="w-5 h-5" />
              </div>
              <span className="hidden md:inline">Admin User</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] transition-all duration-300 overflow-hidden`}>
          <nav className="p-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 hover:bg-gray-50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router basename="/corefinity-control-panel">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/environments" element={<EnvironmentsPage />} />
          <Route path="/environments/:id" element={<EnvironmentPage />} />
          <Route path="/deployments" element={<DeploymentsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/:id" element={<TicketPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
