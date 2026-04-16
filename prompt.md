Task: Build a Master Layout for a high-end Hosting Control Panel (Corefinity) using React and Tailwind CSS.
​1. Branding & Colors: > - Define a Tailwind configuration or CSS variables for "Corefinity Blue" (#0a192f) and "Corefinity Orange" (#FF6B00).
​Set the default font to a clean, professional sans-serif (Inter).
​2. Sidebar Navigation (Left):
​Fixed sidebar in Dark Blue.
​Icons (use Lucide-react) and labels for: Dashboard, Environments, Deployments, Tickets, Profile.
​Support a nested hierarchy visual: Show a "breadcrumb" style indicator that we are under "Agency > Company > Website".
​3. Top Header (Global):
​Left side: A breadcrumb showing "All Clients > Example Company".
​Center: A search bar with a shortcut hint "Press / to search".
​Right side: User profile dropdown with "Profile," "SSH Keys," and "Logout." Include the user's name "Catherine Jarosz" and a placeholder avatar.
​4. Main Content Area:
​A light gray background (#F9FAFB) where the page-specific content will load.
​Ensure the layout is responsive (Sidebar becomes a drawer on mobile).
​5. Navigation Logic:
​Implement react-router-dom so that clicking sidebar links updates the URL and the main content area without a full page refresh.
