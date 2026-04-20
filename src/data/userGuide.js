export const guideContent = {
  // Dashboard
  'metric-environments': {
    title: 'Total Environments',
    description: 'Isolated instances of your application—Production, Staging, or Development. Each has its own configuration and deployment history.',
    action: 'Click to view all environments and their status.',
    permission: 'Viewer+',
    shortcut: '⌘E'
  },
  'metric-deployments': {
    title: 'Active Deployments',
    description: 'Deployments currently running or in progress.',
    action: 'Click to see build logs, commit details, and rollback options.',
    permission: 'Viewer+',
    shortcut: '⌘D'
  },
  'metric-tickets': {
    title: 'Pending Tickets',
    description: 'Open support requests awaiting response from you or our team.',
    action: 'Click to view all tickets and respond.',
    permission: 'Viewer+',
    shortcut: '⌘T'
  },
  'metric-health': {
    title: 'System Health',
    description: 'Aggregate health score based on uptime, latency, error rates, and redundancy.',
    action: 'Click to view detailed health metrics and status page.',
    permission: 'Viewer+',
    shortcut: '⌘H'
  },
  
  // Deployments
  'btn-deploy': {
    title: 'Deploy Button',
    description: 'Initiates deployment from your connected Git repository.',
    action: 'Opens modal: Select branch → Select commit → Confirm deployment.',
    permission: 'Developer, Admin, Owner',
    shortcut: '⌘⇧D'
  },
  'deployment-status': {
    title: 'Deployment Status',
    description: 'Current state of this deployment.',
    action: '🟢 Active: Running healthy. 🟠 Building: In progress. 🔴 Failed: Click to view logs.',
    permission: 'Viewer+',
    shortcut: null
  },
  'deployment-rollback': {
    title: 'Rollback',
    description: 'Revert to the previous successful deployment.',
    action: 'One-click rollback. Infrastructure changes may require manual review.',
    permission: 'Developer, Admin, Owner',
    shortcut: null
  },
  
  // Environments
  'env-variables': {
    title: 'Environment Variables',
    description: 'Key-value pairs injected into your application at runtime.',
    action: 'Add, edit, or delete variables. All values are encrypted at rest.',
    permission: 'Developer, Admin, Owner',
    shortcut: null
  },
  'env-settings': {
    title: 'Environment Settings',
    description: 'Configure auto-scaling, domains, SSL, backups, and protection rules.',
    action: 'Changes take effect on next deployment.',
    permission: 'Admin, Owner',
    shortcut: null
  },
  
  // Tickets
  'ticket-priority': {
    title: 'Priority Levels',
    description: 'Determines response time and support tier.',
    action: '🔴 High: 15min SLA. 🟡 Medium: 2hr SLA. 🔵 Low: 24hr SLA.',
    permission: 'All users',
    shortcut: null
  },
  'ticket-attachment': {
    title: 'Attachments',
    description: 'Add logs, screenshots, or recordings to help support understand your issue.',
    action: 'Supports images, logs, HAR files, and video up to 50MB.',
    permission: 'All users',
    shortcut: null
  },
  
  // Profile
  'profile-api-tokens': {
    title: 'API Tokens',
    description: 'Programmatic access to Altitude APIs.',
    action: 'Create tokens with scoped permissions: Read-only, Deploy, or Full Admin.',
    permission: 'Admin, Owner',
    shortcut: null
  },
  'profile-audit-log': {
    title: 'Audit Log',
    description: 'Complete history of account activity.',
    action: 'Tracks logins, deployments, config changes, team invites, and API usage.',
    permission: 'Admin, Owner',
    shortcut: null
  }
};

export const emptyStateGuides = {
  deployments: {
    title: 'Ready to deploy your first application',
    description: 'Deployments are how your code gets to production. Connect your Git repository to get started.',
    steps: [
      'Connect GitHub/GitLab',
      'Select repository',
      'Choose branch (main recommended)',
      'Click "Deploy"'
    ],
    primaryAction: 'Connect Repository',
    secondaryAction: 'Watch Tutorial'
  },
  environments: {
    title: 'Create your first environment',
    description: 'Environments are isolated instances of your application. Start with Production, then add Staging for testing.',
    steps: [
      'Click "New Environment"',
      'Name it (e.g., "production")',
      'Select deployment source',
      'Configure variables and settings'
    ],
    primaryAction: 'Create Environment',
    secondaryAction: 'Learn More'
  },
  tickets: {
    title: 'Need help? Create a support ticket',
    description: 'Our expert support team is available 24/7 for Enterprise plans.',
    steps: [
      'Click "New Ticket"',
      'Select category and priority',
      'Describe your issue',
      'Attach relevant files'
    ],
    primaryAction: 'Create Ticket',
    secondaryAction: 'View Documentation'
  }
};
