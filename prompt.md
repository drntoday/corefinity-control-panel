Task: Fix the GitHub Pages 404 error for a Vite + React project and set up an automated Deployment Workflow.
​1. Vite Configuration:
​Update vite.config.js to include base: '/corefinity-control-panel/'. This ensures all asset paths (JS/CSS) point to the correct GitHub subfolder.
​2. GitHub Actions Workflow:
​Create a file at .github/workflows/deploy.yml.
​Write a workflow that:
​Triggers on every push to the main branch.
​Sets up Node.js.
​Runs npm install and npm run build.
​Uses the JamesIves/github-pages-deploy-action to push the contents of the dist folder to a branch named gh-pages.
​3. Routing Fix:
​Since this is a Single Page Application (SPA), update the BrowserRouter in main.jsx or App.jsx to include basename="/corefinity-control-panel".
​4. Public Folder:
​Add a 404.html file in the public folder that redirects to index.html. (This is a standard trick to keep React Router working on GitHub Pages).
