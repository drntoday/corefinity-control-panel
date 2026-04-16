Task: Fix the white screen on GitHub Pages by correcting asset paths and base URL configuration.
​1. Vite Configuration:
​In vite.config.js, set base: './' (using a relative path) or base: '/corefinity-control-panel/'. This ensures <script> and <link> tags in the generated index.html have the correct prefix.
​2. React Router Configuration:
​If using BrowserRouter, update the component to include the basename prop: <BrowserRouter basename="/corefinity-control-panel">.
​3. Asset Referencing:
​Ensure all images or local assets are imported using standard ESM syntax (e.g., import logo from './assets/logo.svg') rather than absolute strings.
​4. Build Check:
​Remind the user to run npm run build and ensure the dist folder is what is being pushed to the gh-pages branch.
