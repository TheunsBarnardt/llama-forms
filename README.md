/app
 ├── (auth)/  <-- Authentication Pages
 │   ├── layout.tsx  <-- Auth Page Layout
 │   ├── login/page.tsx  <-- Google Auth Login Page
 │   ├── api/auth/[...nextauth]/route.ts  <-- NextAuth API Route
 ├── (dashboard)/  <-- Main User Dashboard
 │   ├── layout.tsx  <-- Dashboard Layout
 │   ├── page.tsx  <-- Workspace (User’s Forms Overview)
 │   ├── form/
 │   │   ├── new/page.tsx  <-- Create New Form Page
 │   │   ├── [id]/
 │   │   │   ├── page.tsx  <-- Form Builder UI (Main Editor)
 │   │   │   ├── responses/page.tsx  <-- Responses Tab
 │   │   │   ├── settings/page.tsx  <-- Settings Tab
 ├── components/  <-- UI & Form Components
 │   ├── Navbar.tsx  <-- Top Navigation
 │   ├── Sidebar.tsx  <-- Sidebar Navigation
 │   ├── FormCard.tsx  <-- Card UI for Forms
 │   ├── FormBuilder.tsx  <-- Main Form Builder
 │   ├── QuestionsList.tsx  <-- List of Questions in a Form
 │   ├── ResponseList.tsx  <-- List of Form Responses
 │   ├── SettingsPanel.tsx  <-- Settings for Forms
 │   ├── form-builder/  <-- Subfolder for Form Components
 │   │   ├── SortableItem.tsx  <-- Draggable Question Item
 │   │   ├── QuestionItem.tsx  <-- Individual Question UI
 │   │   ├── Toolbar.tsx  <-- Toolbar for Adding Items
 │   │   ├── QuestionTypes.tsx  <-- Dropdown for Question Types
 ├── lib/  <-- Backend Helpers
 │   ├── prisma.ts  <-- Prisma Client for Database
 │   ├── auth.ts  <-- Auth Helper (Google Auth)
 ├── prisma/  <-- Database Schema
 │   ├── schema.prisma  <-- SQLite Database Schema
 ├── styles/  <-- Tailwind Styles
 │   ├── globals.css
 ├── utils/  <-- Utility Functions
 ├── public/  <-- Static Assets (Icons, Logos)
 ├── package.json
 ├── next.config.js
 ├── tailwind.config.js
 ├── tsconfig.json
