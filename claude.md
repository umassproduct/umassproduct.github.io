claude.md
Project Overview
This repository contains the official website for UMass Product, a design-forward, Apple-inspired product organization at UMass Amherst.
The site will be hosted on GitHub Pages and built using React.
The primary goal of the website is to:
Drive newsletter sign-ups
Funnel users to Discord
Funnel users to Instagram
Present UMass Product as premium, intentional, and design-forward
This is not a cluttered student org website.
It must feel minimal, technical, and slightly intimidating.
Core Design Philosophy
Brand Feel
The website should feel like:
If Apple built a student product organization website
Minimal
Clean
Premium
Intentional
Structured
High contrast
Slightly dramatic
Never playful or messy
No loud animations.
No clutter.
No random UI elements.
Every pixel must feel intentional.
Color System
Background
Pure black: #000000
No global gradients across entire sections
Depth should come from glow and soft shadow
Primary Accent
UMass Maroon
#881C1C
Signature Red Gradient
Used for:
Bubble glow
Accent elements
Call-to-action buttons
linear-gradient(135deg, #FF0000, #5E0000)
This gradient should feel powerful and directional, not neon.
Secondary Text
Light gray: #C9C8C8
Used for supporting text
Never use pure white for body copy
Typography
Primary Font
Frutiger Condensed Light
Tracking equivalent to Canva -40
In CSS: use tight letter spacing (approx -0.02em to -0.04em depending on size)
Headlines:
Large
Light weight
High contrast
Sometimes soft glow
Body text:
Clean
No decoration
Light gray
Hierarchy must be clear through scale, spacing, and glow.
Layout Principles
Large spacing
Clean vertical rhythm
Center-dominant hero section
No heavy borders
No unnecessary dividers
Use rounded containers strategically
Everything must breathe.
Motion & Interaction
Allowed:
Soft fade-in transitions
Slow slideshow crossfade
Slight hover scale (subtle)
Soft glow transitions
Not allowed:
Fast animations
Parallax overload
Bounce effects
Playful motion
Think Apple product page subtlety.
Website Architecture
Pages
Navbar should include 3 links (final names TBD but conceptually):
Product Showcase
For Students
For Founders
Logo on top-left.
Nav items on top-right.
Transparent navbar.
No background bar unless subtle blur is used.
Homepage Structure
1. Navbar
Transparent
White text
Subtle opacity hover
Logo left
Links right
Generous spacing between links
2. Hero Section
Centerpiece: Signature Red Bubble Container
Red Bubble Design
Large rounded rectangle with:
Black center
Heavy border radius (40–60px)
Red glow around edges
Floating depth effect
Use box-shadow with red glow:
Outer red blur
Soft depth shadow
This is the main design signature.
Inside Hero Bubble
Slideshow of past event visuals
Soft crossfade transitions
Clean image presentation
Below slideshow:
Newsletter Capture
Long pill-shaped input bar.
Design:
Black background
Subtle border or glow
Rounded edges (fully pill)
Placeholder: “Enter your email”
Red gradient CTA button on right side
Primary conversion goal.
3. Social Section
Minimal horizontal row:
Discord
Instagram
LinkedIn
White icons.
Hover → subtle red tint or glow.
No large boxed buttons.
Keep elegant and restrained.
Product Showcase Page
Grid of past event visuals
Red bubble cards for featured items
Large headlines with glow
Clean spacing
Black background
For Students Page
Purpose:
Explain why students should join.
Content themes:
Career growth
Product thinking
Real-world exposure
Community
Design:
Grey glass containers for content clusters
Strong typographic hierarchy
For Founders Page
Purpose:
Explain value to startup founders.
Content themes:
Product feedback
Demo days
Talent pipeline
Collaboration
Design:
Minimal
Structured
Confident
Visual Patterns to Preserve
From existing brand materials:
Use glow for major headings only
Use grey rounded containers for structured content
Use asymmetry occasionally (tilted images, floating elements)
Maintain high contrast
Never:
Use bright random colors
Use generic UI libraries that look templated
Use heavy outlines or boxy layouts
Technical Guidelines
React-based
Optimized for GitHub Pages deployment
Modular components
Clean folder structure
No unnecessary dependencies
Responsive design required
Performance matters.
Final Standard
If the website feels:
Corporate
Generic
Student-org-template-like
Over-animated
Colorful or playful
It is wrong.
If it feels:
Intentional
Dramatic
Minimal
Confident
Design-forward
It is correct.