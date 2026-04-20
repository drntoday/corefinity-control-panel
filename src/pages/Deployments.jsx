import { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';
import OrangeLink from '../components/OrangeLink';

// Mock data
const PIPELINE_TYPES = ['Web', 'Worker', 'Cron'];
const PROVIDERS = ['GitHub', 'Bitbucket', 'GitLab'];
const REPOSITORIES = {
  GitHub: ['altitude/app', 'altitude/api', 'altitude/frontend'],
  Bitbucket: ['bitbucket/team/project-a', 'bitbucket/team/project-b'],
  GitLab: ['gitlab/group/service-x', 'gitlab/group/service-y'],
};
const BRANCHES = ['main', 'develop', 'staging'];

const INITIAL_DEPLOYMENTS = [
  {
    id: 1,
    commitHash: 'a7b2c3d',
    commitMessage: 'Fix authentication bug in login flow',
    author: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?u=john',
    duration: '2m 34s',
    status: 'success',
    repository: 'altitude/app',
    environmentId: 'ENV-001',
    branch: 'main',
  },
  {
    id: 2,
    commitHash: 'e8f9a0b',
    commitMessage: 'Update dependencies for security patch',
    author: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/100?u=jane',
    duration: '3m 12s',
    status: 'success',
    repository: 'altitude/api',
    environmentId: 'ENV-002',
    branch: 'develop',
  },
  {
    id: 3,
    commitHash: 'c1d2e3f',
    commitMessage: 'Add new feature flag system',
    author: 'Bob Wilson',
    avatar: 'https://i.pravatar.cc/100?u=bob',
    duration: '1m 58s',
    status: 'success',
    repository: 'altitude/frontend',
    environmentId: 'ENV-003',
    branch: 'staging',
  },
  {
    id: 4,
    commitHash: 'f4g5h6i',
    commitMessage: 'Refactor database queries',
    author: 'Alice Brown',
    avatar: 'https://i.pravatar.cc/100?u=alice',
    duration: '4m 05s',
    status: 'error',
    repository: 'altitude/app',
    environmentId: 'ENV-001',
    branch: 'develop',
  },
];

export default function Deployments() {
  // Form state machine
  const [pipelineType, setPipelineType] = useState('');
  const [provider, setProvider] = useState('');
  const [repository, setRepository] = useState('');
  const [branch, setBranch] = useState('');
  
  // Deployment state
  const [deployments, setDeployments] = useState(INITIAL_DEPLOYMENTS);
  const [activeDeployment, setActiveDeployment] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // Derived state for form validation
  const isFormComplete = pipelineType && provider && repository && branch;
  const showGitHubWarning = provider === 'GitHub';

  // Progress bar animation for active deployment
  useEffect(() => {
    if (activeDeployment) {
      const startTime = Date.now();
      const duration = 10000; // 10 seconds
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Complete the deployment
          setTimeout(() => {
            const completedDeployment = {
              ...activeDeployment,
              status: 'success',
              duration: `${Math.floor(Math.random() * 3 + 1)}m ${Math.floor(Math.random() * 59)}s`,
            };
            setDeployments(prev => [completedDeployment, ...prev.slice(0, -1)]);
            setActiveDeployment(null);
            setProgress(0);
          }, 500);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [activeDeployment]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleDeploy = () => {
    if (!isFormComplete) return;
    
    const newDeployment = {
      id: Date.now(),
      commitHash: Math.random().toString(16).substring(2, 9),
      commitMessage: 'New deployment triggered',
      author: 'Current User',
      avatar: 'https://i.pravatar.cc/100?u=current',
      duration: 'Pending...',
      status: 'deploying',
      repository: repository,
      environmentId: `ENV-${Math.floor(Math.random() * 1000)}`,
      branch: branch,
      pipelineType: pipelineType,
    };
    
    setActiveDeployment(newDeployment);
    setDeployments(prev => [newDeployment, ...prev]);
    setProgress(0);
    
    // Show toast
    setToast({ type: 'success', message: 'Deployment Started Successfully.' });
    
    // Reset form
    setPipelineType('');
    setProvider('');
    setRepository('');
    setBranch('');
  };

  const handleRollbackClick = (deployment) => {
    setRollbackTarget(deployment);
    setShowRollbackModal(true);
  };

  const confirmRollback = () => {
    if (rollbackTarget) {
      // Create rollback deployment
      const rollbackDeployment = {
        id: Date.now(),
        commitHash: rollbackTarget.commitHash,
        commitMessage: `Rollback to ${rollbackTarget.commitHash}`,
        author: 'Current User',
        avatar: 'https://i.pravatar.cc/100?u=current',
        duration: 'Pending...',
        status: 'deploying',
        repository: rollbackTarget.repository,
        environmentId: rollbackTarget.environmentId,
        branch: rollbackTarget.branch,
        pipelineType: 'Web',
      };
      
      setActiveDeployment(rollbackDeployment);
      setDeployments(prev => [rollbackDeployment, ...prev]);
      setProgress(0);
      
      setToast({ type: 'success', message: 'Rollback Started Successfully.' });
      setShowRollbackModal(false);
      setRollbackTarget(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Deployments</h2>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Connect New Repository Card */}
      <div className="card-premium rounded-lg shadow-sm border var(--border-default) p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Connect New Repository</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Pipeline Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Pipeline Type</label>
            <select
              value={pipelineType}
              onChange={(e) => {
                setPipelineType(e.target.value);
                setProvider('');
                setRepository('');
                setBranch('');
              }}
              className="w-full px-3 py-2 border var(--border-default) rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent"
            >
              <option value="">Select Pipeline</option>
              {PIPELINE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Provider */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Provider</label>
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                setRepository('');
                setBranch('');
              }}
              disabled={!pipelineType}
              className={`w-full px-3 py-2 border var(--border-default) rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent ${
                !pipelineType ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select Provider</option>
              {PROVIDERS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Repository */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Repository</label>
            <select
              value={repository}
              onChange={(e) => {
                setRepository(e.target.value);
                setBranch('');
              }}
              disabled={!provider}
              className={`w-full px-3 py-2 border var(--border-default) rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent ${
                !provider ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select Repository</option>
              {provider && REPOSITORIES[provider]?.map(repo => (
                <option key={repo} value={repo}>
                  {repo}
                </option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={!repository}
              className={`w-full px-3 py-2 border var(--border-default) rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent ${
                !repository ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select Branch</option>
              {BRANCHES.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GitHub Warning */}
        {showGitHubWarning && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-orange-800 font-medium">No account connected.</span>
            <OrangeLink href="#" className="font-semibold underline">Link GitHub Account</OrangeLink>
          </div>
        )}

        {/* Deploy Button */}
        <button
          onClick={handleDeploy}
          disabled={!isFormComplete || activeDeployment !== null}
          className={`px-6 py-2 rounded-md font-medium transition-all btn-primary ${
            !isFormComplete || activeDeployment !== null
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {activeDeployment !== null ? 'Deployment in Progress...' : 'Deploy'}
        </button>
      </div>

      {/* Recent Deployment Tasks Table */}
      <div className="card-premium rounded-lg shadow-sm border var(--border-default) overflow-hidden">
        <div className="px-6 py-4 border-b var(--border-default)">
          <h3 className="text-lg font-semibold text-text-primary">Recent Deployment Tasks</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  Status
                </th>
                <th className="px-6 py-3 text-left">
                  Commit Hash
                </th>
                <th className="px-6 py-3 text-left">
                  Commit Message
                </th>
                <th className="px-6 py-3 text-left">
                  Author
                </th>
                <th className="px-6 py-3 text-left">
                  Repository
                </th>
                <th className="px-6 py-3 text-left">
                  Environment ID
                </th>
                <th className="px-6 py-3 text-left">
                  Duration
                </th>
                <th className="px-6 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deployments.map((deployment, index) => {
                const isActive = activeDeployment && deployment.id === activeDeployment.id;
                
                return (
                  <tr key={deployment.id} className={`${isActive ? 'bg-green-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isActive ? (
                        <div className="flex items-center gap-3">
                          <StatusBadge type="success" label="Deploying..." active={true} />
                          <div className="w-32">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-text-secondary mt-1">{Math.round(progress)}%</span>
                          </div>
                        </div>
                      ) : (
                        <StatusBadge 
                          type={deployment.status === 'success' ? 'success' : deployment.status === 'error' ? 'error' : 'pending'} 
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {deployment.commitHash}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-primary">{deployment.commitMessage}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img 
                          src={deployment.avatar} 
                          alt={deployment.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-text-primary">{deployment.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gold">{deployment.repository}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gold">{deployment.environmentId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-text-secondary">{deployment.duration}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!isActive && deployment.status === 'success' && index > 0 && (
                        <button
                          onClick={() => handleRollbackClick(deployment)}
                          className="px-3 py-1 text-sm bg-gray-100 text-text-primary rounded-md hover:bg-gray-200 transition-colors"
                        >
                          Rollback
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rollback Confirmation Modal */}
      {showRollbackModal && rollbackTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card-premium rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Confirm Rollback</h3>
            <p className="text-text-secondary mb-2">
              Are you sure you want to rollback to commit:
            </p>
            <code className="block bg-gray-100 px-3 py-2 rounded font-mono text-sm mb-4">
              {rollbackTarget.commitHash}
            </code>
            <p className="text-text-secondary mb-6">
              This will redeploy <span className="text-gold font-medium">{rollbackTarget.repository}</span> to environment <span className="text-gold font-medium">{rollbackTarget.environmentId}</span>.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRollbackModal(false);
                  setRollbackTarget(null);
                }}
                className="px-4 py-2 text-text-primary bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRollback}
                className="px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Confirm Rollback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
