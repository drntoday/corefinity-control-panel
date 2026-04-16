Task: Initialize the Design System and Utility Components for the Corefinity Project.
​1. Tailwind Configuration:
Extend the tailwind.config.js to include the following specific brand colors:
​brand-blue: '#0a192f' (Primary Dark)
​brand-orange: '#FF6B00' (Primary Action)
​surface-gray: '#F9FAFB' (Background)
​2. Core Components:
Create a reusable React component named OrangeLink.
​Behavior: It should render an <a> or Link tag.
​Styling: Text color should be brand-orange. On hover, it should show an underline and a slightly deeper orange.
​Requirement: As per project instructions, use this component for all references to Companies, Websites, and Environments.
​3. Global Elements:
​Set the global font-family to 'Inter' via CSS or Tailwind.
​Create a StatusBadge component that accepts a type prop ('success', 'pending', 'error') and returns a pill-shaped badge with the appropriate brand-aligned background and a pulsing dot for 'active' states.
​4. Integration:
Ensure these colors and components are available globally so they can be used in the Sidebar and Top Header navigation.
