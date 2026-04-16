Task: Move all files and folders from a sub-directory to the root directory of the repository.
​Current Structure: /corefinity-control-panel/corefinity-panel/[all-files]
Target Structure: /corefinity-control-panel/[all-files]
​Commands to Execute:
​Identify all items inside the corefinity-panel folder (including hidden files like .gitignore).
​Move all identified items up to the current root directory.
​Remove the now-empty corefinity-panel folder.
​Update the package.json and vite.config.js if they contain any hardcoded paths that pointed to the sub-folder.
​Deliverable: Provide a single-line shell command (for Mac/Linux) or a PowerShell script (for Windows) to perform this move safely without deleting the .git history.
