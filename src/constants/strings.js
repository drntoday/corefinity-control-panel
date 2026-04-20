// Altitude Control Panel - Verbatim Strings/Constants
// All text content extracted directly from embedded specifications

// ===== DEPLOYMENTS PAGE =====
export const DEPLOYMENTS = {
  // Repository Connection Flow
  PIPELINE_SELECT_LABEL: 'Select pipeline',
  PROVIDER_SELECT_LABEL: 'Select provider',
  REPOSITORY_SELECT_LABEL: 'Select repository',
  BRANCH_SELECT_LABEL: 'Select a branch',
  VALIDATION_ERROR_NO_ACCOUNT: 'No account connected.',
  LINK_ACCOUNT_BUTTON: 'Link GitHub Account',
  CONFIRM_BUTTON: 'Confirm',
  SAVE_BUTTON: 'Save',
  
  // Deployments Listing Table Headers (EXACT ORDER)
  TABLE_HEADERS: [
    'DEPLOYMENT',
    'DEPLOYMENT PIPELINE',
    'TASKS',
    'STATUS',
    'CREATED',
    'DURATION',
    'ACTIONS'
  ],
  
  // Status indicators
  STATUS_SUCCEEDED: 'Succeeded',
  STATUS_FAILED: 'Failed',
  STATUS_CURRENT: 'Current',
  
  // Row actions
  ACTION_RETRY: 'Retry',
  ACTION_ROLLBACK: 'Rollback',
  ACTION_VIEW_DETAILS: 'View details',
  
  // Table header actions
  BUTTON_CREATE_DEPLOYMENT: 'Create Deployment',
  SEARCH_PLACEHOLDER: 'Search deployments...',
  SELECT_ACTION_DROPDOWN: 'Select Action',
  
  // Deployment Details Tab
  MANAGE_PIPELINES_BUTTON: 'Manage pipelines',
  SUBMIT_BUTTON: 'Submit',
  
  // Deployment Details Fields
  FIELD_DEPLOYMENT_NAME: 'Deployment Name',
  FIELD_PROVIDER: 'Provider',
  FIELD_WEBSITE: 'Website',
  FIELD_ENVIRONMENT: 'Environment',
  FIELD_DEPLOYMENT_PIPELINE: 'Deployment Pipeline',
  FIELD_NOTES: 'Notes',
  FIELD_DEPLOYMENT_ARTIFACT: 'Deployment Artifact',
  FIELD_STATUS: 'Status',
  FIELD_COMPLETED: 'Completed',
  
  // Deployment Tasks Tab
  TASK_STATUS_FINISHED: '✓ Finished',
  TASK_STATUS_IN_PROGRESS: '● In Progress',
  AUTO_SCROLL_TOGGLE: 'Auto-scroll',
};

// ===== ENVIRONMENTS SCREEN =====
export const ENVIRONMENTS = {
  // Required Tabs (EXACT ORDER & LABELS)
  TABS: [
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
    'Firewall'
  ],
  
  // General Tab Fields
  GENERAL: {
    FIELD_NAME: 'Name',
    FIELD_URL: 'URL',
    FIELD_WEBSITE: 'Website',
    FIELD_NAMESPACE_PROVIDER: 'Namespace Provider',
    FIELD_PLATFORM: 'Platform',
    FIELD_CLUSTER: 'Cluster',
    FIELD_ENVIRONMENT_TYPE: 'Environment Type',
    FIELD_INFRASTRUCTURE_TYPE: 'Infrastructure Type',
    FIELD_MONITORING: 'Monitoring',
    MONITORING_ENABLED_TEXT: '• Monitoring is enabled',
    FIELD_CURRENT_AVAILABILITY: 'Current Availability',
    NO_DATA_TEXT: 'No data',
    FIELD_SSH_GATEWAY_VERSION: 'SSH Gateway Version',
    FIELD_SSH_PORT: 'SSH Port',
    FIELD_SEO_INDEXING: 'SEO Indexing',
    FIELD_DEFAULT_ADDRESS: 'Default address',
    BUTTON_SAVE: 'Save',
  },
  
  // Pods Tab Table Headers
  PODS_TABLE_HEADERS: [
    'NAME',
    'NODE',
    'IP',
    'AGE',
    'CONTAINERS',
    'CPU',
    'MEMORY',
    'RESTARTS',
    'READY',
    'STATUS'
  ],
  
  // Nodes Tab
  NODES: {
    HEADER_PREFIX: 'Nodes: Last updated',
    HEADER_SUFFIX: 'ago',
    TABLE_HEADERS: [
      'NAME',
      'INTERNAL IP',
      'EXTERNAL IP',
      'VERSION',
      'KERNEL VERSION',
      'CPU',
      'MEMORY',
      'STATUS'
    ],
    PAGINATION_PREVIOUS: 'Previous',
    PAGINATION_NEXT: 'Next',
    PAGINATION_FORMAT: '1-X of Y',
  },
  
  // Pipelines Tab
  PIPELINES: {
    TABLE_HEADERS: [
      'ID',
      'NOTES',
      'ENVIRONMENT',
      'ROOT WEB DIRECTORY',
      'ROOT STORAGE DIRECTORY',
      'DEPLOYMENT PIPELINE TYPE',
      'CUSTOM BUILD COMMANDS',
      'ACTIONS'
    ],
    VIEW_ICON: '◎',
    DETAILS_VIEW_FIELDS: {
      ID: 'ID',
      NOTES: 'Notes',
      ENVIRONMENT: 'Environment',
      PROVIDER: 'Provider',
      PLATFORM: 'Platform',
      ROOT_WEB_DIRECTORY: 'Root Web Directory',
      ROOT_STORAGE_DIRECTORY: 'Root Storage Directory',
      DEPLOYMENT_PIPELINE_TYPE: 'Deployment Pipeline Type',
      USE_CUSTOM_BUILD_COMMANDS: 'Use Custom Build Commands',
      CUSTOM_BUILD_COMMANDS: 'Custom Build Commands',
      USE_CUSTOM_DATABASE_COMMANDS: 'Use Custom Database Commands',
      USE_CUSTOM_POST_BUILD_COMMAND: 'Use Custom Post Build Command',
      RELOAD_ADDITIONAL_DEPLOYMENTS: 'Reload additional deployments',
    },
    MONITORS_SUBTABLE: {
      HEADERS: ['ID', 'NAME', 'INITIATED BY', 'TARGET', 'STATUS', 'HAPPENED AT', 'View'],
    },
  },
  
  // Emails Tab
  EMAILS: {
    SMTP_DETAILS_HEADER: 'SMTP Details',
    TRANSACTIONAL_EMAILS: 'Pending setup',
    DEFAULT_OUTGOING_EMAIL_LABEL: 'Default outgoing email address',
    DEFAULT_OUTGOING_EMAIL_EXAMPLE: 'sales@manage.altitude.com',
  },
  
  // Cache Warmer Tab
  CACHE_WARMER: {
    STATUS_ENABLED: 'Enabled',
    BUTTON_DISABLE: 'Disable',
    SITEMAPS_AUTO_GENERATED: 'Auto Generated. Enable manual mode',
    ERROR_STATE: 'Unable to find a suitable sitemap in robots.txt file, Please switch to manual mode and enter your sitemap URL to activate the cache warmer',
    BUTTON_RUN_NOW: 'Run now',
    SCHEDULE_LABEL: 'Between',
    SCHEDULE_TIME_FROM: '1:00',
    SCHEDULE_TIME_TO: '6:00',
  },
  
  // Actions Tab
  ACTIONS: {
    TABLE_HEADERS: [
      'NAME',
      'COMPANY',
      'USER',
      'DURATION',
      'CREATED AT',
      'COMPLETED AT',
      'STATUS'
    ],
  },
  
  // Diagnostics Tab
  DIAGNOSTICS: {
    TABLE_HEADERS: [
      'TASK',
      'LAST FETCHED',
      'RESULT',
      'ACTION'
    ],
    TASKS: [
      'Nginx Logs',
      'Access Server Attached',
      'Load Balancer Logs',
      'Cloudflare Activated',
      'Load Balancer Attached'
    ],
    ACTION_RECHECK: 'Recheck',
  },
  
  // Autoscaler Tab
  AUTOSCALER: {
    TABS: ['Status', 'Graphs'],
    TIME_FILTERS: ['Hour', 'Day', 'Week', 'Month'],
    ERROR_STATE: 'THERE WAS AN ERROR',
  },
  
  // Monitors Tab
  MONITORS: {
    TABLE_HEADERS: ['URL', 'FREQUENCY', 'STATUS', 'VIEW'],
    FREQUENCY: '60s',
    STATUS_UP: '• Up',
    VIEW_ICON: '◎',
  },
  
  // Quick Actions Tab
  QUICK_ACTIONS: {
    BUTTONS: [
      { label: 'Restart Web Pods', action: 'Run' },
      { label: 'Restart Database Pods', action: 'Run' },
      { label: 'Restart Redis Pods', action: 'Run' },
      { label: 'Restart RabbitMQ Pods', action: 'Run' },
      { label: 'Restart Elastic Search Pods', action: 'Run' },
      { label: 'Restart Cli', action: 'Run' },
      { label: 'Restart Varnish', action: 'Run' },
    ],
  },
  
  // Firewall Tab
  FIREWALL: {
    SECTION_1_TABLE_HEADERS: [
      'IP',
      'TYPE',
      'ACCESS TYPE',
      'ADDED BY',
      'STATUS',
      'COMMENT',
      'CREATED AT',
      'ACTION'
    ],
    SECTION_2_FORM_HEADER: 'Whitelist a new IP in Environment (Production)',
    NOTE: 'Only IPv4 addresses are supported at this time. See What\'s Impacted?',
    FIELD_IP_ADDRESS: 'IP ADDRESS',
    FIELD_ACCESS_TYPE: 'SSH',
    FIELD_COMMENT: 'COMMENT',
    BUTTON_ADD_NEW_IP: 'Add a new IP',
  },
};

// ===== USER PROFILE SCREEN =====
export const PROFILE = {
  // Required Sections
  SECTIONS: [
    'Profile',
    'Notifications',
    'API Tokens',
    'Two Factor Authentication',
    'Firewall',
    'SSH Keys'
  ],
  
  // Profile Update
  PROFILE_UPDATE: {
    FIELD_NAME: 'Name',
    FIELD_EMAIL_ADDRESS: 'Email address',
    FIELD_POSITION: 'Position',
    FIELD_MOBILE_NUMBER: 'Mobile number',
    MOBILE_NUMBER_HINT: 'Please enter your mobile number using the international format (including country code).',
    BUTTON_SAVE: 'Save',
    
    PASSWORD_SECTION: {
      FIELD_CURRENT_PASSWORD: 'Current Password',
      FIELD_NEW_PASSWORD: 'New Password',
      FIELD_CONFIRM_PASSWORD: 'Confirm Password',
      BUTTON_UPDATE: 'Update',
    },
  },
  
  // Notifications
  NOTIFICATIONS: {
    TOGGLES: [
      'Emergency Alerts',
      'Maintenance window',
      'Monitoring Alerts',
      'Deployment Alerts',
      'Newsletters'
    ],
    TICKET_DEFAULT_SUBSCRIPTIONS: {
      YOUR_COMPANY_LABEL: 'Your Company:',
      YOUR_COMPANY_EXAMPLE: 'Example Agency',
      INHERITED_COMPANIES_LABEL: 'Inherited companies:',
      SELECT_UNSELECT_ALL: 'Select/Unselect All',
      EXAMPLE_COMPANY: 'Example Company',
      BUTTON_SAVE: 'Save',
    },
  },
  
  // API Tokens
  API_TOKENS: {
    HEADER: 'Manage API Tokens',
    NOTE: 'API Tokens allow to authenticate with our API.',
    FIELD_TOKEN_NAME: 'Token name',
    BUTTON_CREATE_TOKEN: 'Create token',
  },
  
  // Two Factor Authentication
  TWO_FACTOR_AUTH: {
    GOOGLE_2FA: {
      LABEL: 'Google 2FA',
      BUTTON_SETUP: 'Setup',
    },
    SMS_2FA: {
      LABEL: 'SMS 2FA',
      BUTTON_DISABLE: 'Disable',
    },
  },
  
  // Firewall (User IP Management)
  FIREWALL: {
    HEADER: 'Manage Your IPs',
    NOTE: 'Whitelist your IPs to have SSH access here! Only IPv4 addresses are supported at this time. See What\'s Impacted?',
    TABLE_HEADERS: ['IP Address', 'Comment', 'Created At', 'Delete'],
    FORM_HEADER: 'Add Existing IPs',
    FIELD_IP_ADDRESS: 'IP ADDRESS',
    FIELD_COMMENT: 'COMMENT',
  },
  
  // SSH Keys
  SSH_KEYS: {
    TABLE_HEADERS: ['NAME', 'SIGNATURE', 'ACTIONS'],
    CREATE_MODAL_NOTE: 'It might take up to 10min to install SSH key on all environments.',
    FIELD_NAME: 'Name',
    FIELD_SIGNATURE: 'Signature',
    FIELD_SSH_PUBLIC_KEY: 'SSH Public Key',
    BUTTON_CANCEL: 'Cancel',
    BUTTON_CREATE_AND_ADD_ANOTHER: 'Create & Add Another',
    BUTTON_CREATE_SSH_KEY: 'Create SSH Key',
  },
  
  // SSO Requirement
  SSO: {
    LABEL: 'SSO',
    DESCRIPTION: 'Under users\' access, we would like users to be able to use SSO.',
  },
};

// ===== TICKET LISTING PAGE =====
export const TICKETS = {
  // Filter Bar
  FILTER_PRIORITY: 'Priority',
  FILTER_DEPARTMENT: 'Department',
  FILTER_STATUS_PENDING: 'Pending',
  FILTER_STATUS_WAITING_ON_CUSTOMER: 'WaitingOnCustomer',
  FILTER_STATUS_RESOLVED: 'Resolved',
  FILTER_STATUS_CLOSED: 'Closed',
  FILTER_COMPANY: 'Company',
  FILTER_AGENCY: 'Agency',
  FILTER_REQUESTER: 'Requester',
  FILTER_TAGS: 'Tags',
  
  // Header Actions
  SEARCH_PLACEHOLDER: 'Tickets',
  BUTTON_CREATE_TICKET: 'Create Ticket',
  
  // Table Columns (EXACT ORDER)
  TABLE_HEADERS: [
    'SUBJECT',
    'COMPANY',
    'AGENCY',
    'ASSIGNEE',
    'CREATED AT',
    'DEPARTMENT',
    'INTEGRATION',
    'PRIORITY',
    'STATUS',
    'ACTIONS'
  ],
  
  // Pagination
  PAGINATION_PREVIOUS: 'Previous',
  PAGINATION_NEXT: 'Next',
  PAGINATION_FORMAT: '1-X of Y',
};

// ===== TICKET VIEW PAGE =====
export const TICKET_VIEW = {
  // Meta information
  META_TICKET_NUMBER: 'Ticket #',
  META_OPENED_BY: 'Opened by',
  META_ON_BEHALF_OF: 'on behalf of',
  META_IN_DEPARTMENT: 'in',
  
  // Required CTAs (same as Deployment Details)
  MANAGE_PIPELINES_BUTTON: 'Manage pipelines',
  SUBMIT_BUTTON: 'Submit',
  
  // Comments Section
  COMMENTS: {
    BUTTON_COMMENT: 'Comment',
    COMMENT_DESCRIPTION: 'Staff-only visibility',
    BUTTON_SEND_REPLY: 'Send Reply',
    REPLY_DESCRIPTION: 'Customer-visible',
  },
  
  // History Tab
  HISTORY_TAB_LABEL: 'History',
  
  // Subscribers Section
  SUBSCRIBERS: {
    REMOVE_ICON: '×',
    BUTTON_ADD: 'Add',
  },
  
  // Canned Responses
  CANNED_RESPONSES_LABEL: 'CANNED RESPONSES',
  
  // Attachments
  ATTACHMENTS: {
    BUTTON_BROWSE: 'Browse...',
    NO_FILES_SELECTED: 'No files selected',
  },
};

// Shared constants
export const SHARED = {
  ORANGE_LINK_CLASS: 'text-brand-orange hover:text-orange-700 hover:underline',
  IPV4_ONLY_NOTE: 'Only IPv4 addresses are supported at this time.',
};
