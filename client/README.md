# Blog Application 

A modern React-based frontend for a full-stack blog application built with Vite, featuring authentication, post management, and comments. This client application provides a seamless user experience for creating, reading, updating, and deleting blog posts.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Usage Guide](#usage-guide)
- [API Integration](#api-integration)
- [Components](#components)
- [Hooks](#hooks)
- [Pages](#pages)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**: Register and login functionality with token-based authentication
- **Blog Post Management**: Create, read, update, and delete blog posts
- **Post Details**: View detailed information about individual blog posts
- **Comments System**: Read and submit comments on blog posts
- **Responsive UI**: Clean, modern interface with responsive design
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Loading indicators for better user experience
- **Navigation**: Intuitive navigation using React Router
- **State Management**: Context API for global authentication state
- **API Integration**: Axios-based API client with interceptors for authentication

## Tech Stack

- **React** (19.2.0) - JavaScript library for building user interfaces
- **Vite** (7.2.4) - Next generation frontend build tool with fast HMR
- **React Router DOM** (7.13.0) - Client-side routing and navigation
- **Axios** (1.13.4) - HTTP client for API communication
- **CSS** - Inline and external CSS for styling
- **ESLint** - Code linting for code quality

### Development Dependencies

- **@vitejs/plugin-react** - React plugin for Vite
- **ESLint plugins** - For React and React Hooks linting
- **@types/react** - TypeScript type definitions for React

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - For version control
- **Backend Server** - The Express.js server running on `http://localhost:5000`

## Installation

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment variables file**:
   Create a `.env.local` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Verify installation**:
   ```bash
   npm run lint
   ```

## Project Structure

```
client/
├── public/                          # Static assets
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── CommentForm.jsx          # Form for submitting comments
│   │   ├── CommentList.jsx          # Display list of comments
│   │   ├── ErrorMessage.jsx         # Error notification component
│   │   ├── Loader.jsx               # Loading spinner component
│   │   ├── Navbar.jsx               # Navigation header
│   │   └── PostCard.jsx             # Individual post card component
│   ├── context/                     # React Context for state management
│   │   └── AuthContext.jsx          # Authentication context provider
│   ├── hooks/                       # Custom React hooks
│   │   ├── useApi.js                # Hook for API calls with loading/error states
│   │   └── useAuth.js               # Hook for accessing authentication context
│   ├── pages/                       # Page-level components
│   │   ├── CreateEditPost.jsx       # Create and edit blog post form
│   │   ├── Login.jsx                # Login page
│   │   ├── PostDetails.jsx          # Single post details view
│   │   ├── PostList.jsx             # List of all blog posts
│   │   └── Register.jsx             # User registration page
│   ├── services/                    # API service and utilities
│   │   └── api.js                   # Axios instance with interceptors
│   ├── App.css                      # Application global styles
│   ├── App.jsx                      # Main App component with routing
│   ├── index.css                    # Global CSS styles
│   └── main.jsx                     # React application entry point
├── .eslintignore                    # ESLint ignore rules
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies and scripts
├── vite.config.js                   # Vite configuration
└── README.md                        # This file
```

## Configuration

### Environment Variables

Create a `.env.local` file in the client directory to configure the API URL:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

**Note**: Environment variables must be prefixed with `VITE_` to be accessible in the React application.

### Vite Configuration

The `vite.config.js` file is pre-configured with React plugin for HMR (Hot Module Replacement) and optimized builds.

### ESLint Configuration

The project includes ESLint configuration for code quality. Run linting:

```bash
npm run lint
```

## Scripts

### Development

```bash
npm run dev
```
Starts the development server with Vite at `http://localhost:5173`. Features:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh on code changes
- Development environment setup

### Build

```bash
npm run build
```
Creates an optimized production build:
- Minifies code
- Optimizes assets
- Generates dist folder for deployment

### Preview

```bash
npm run preview
```
Locally preview the production build:
- Useful for testing before deployment
- Mimics production environment

### Linting

```bash
npm run lint
```
Runs ESLint to check code quality:
- Identifies potential issues
- Ensures code style consistency
- Helps maintain code standards

##  Usage Guide

### Starting the Development Server

1. Make sure the backend server is running on `http://localhost:5000`
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the displayed URL (typically `http://localhost:5173`)

### User Authentication Flow

1. **Register**: Click on the Register link and fill in your credentials
2. **Login**: Use your registered credentials to log in
3. **Token Storage**: Authentication token is automatically stored in `localStorage` as `userInfo`
4. **Protected Routes**: Certain routes are protected and require authentication

### Creating a Blog Post

1. Log in to your account
2. Click on "Create Post" in the navigation
3. Fill in the post details (title, content, category)
4. Click "Submit" to create the post
5. You'll be redirected to the post details page

### Viewing Posts

1. Visit the home page to see all blog posts
2. Click on a post card to view its details
3. View comments from other users
4. Add your own comment if logged in

### Managing Your Posts

- **Edit**: Only the post creator can edit their posts
- **Delete**: Only the post creator can delete their posts
- Click the edit/delete buttons on the post details page

## 🔌 API Integration

### API Service

The `src/services/api.js` file provides an Axios instance configured for the application:

```javascript
import api from '../services/api';

// GET request
const response = await api.get('/posts');

// POST request
const response = await api.post('/posts', { title: 'New Post' });

// PUT request
const response = await api.put(`/posts/${id}`, { title: 'Updated' });

// DELETE request
await api.delete(`/posts/${id}`);
```

### Authentication Interceptor

The API service automatically:
- Adds Bearer token from `localStorage` to request headers
- Handles 401 responses for unauthorized requests
- Manages error responses consistently

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all blog posts |
| GET | `/posts/:id` | Get specific post details |
| POST | `/posts` | Create a new post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |
| GET | `/categories` | Get all categories |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | User login |
| GET | `/comments/:postId` | Get comments for a post |
| POST | `/comments` | Submit a comment |

## Components

### Navbar
- **Location**: `src/components/Navbar.jsx`
- **Purpose**: Navigation header with links to different pages
- **Features**: Displays login/register links or user info and logout button

### PostCard
- **Location**: `src/components/PostCard.jsx`
- **Purpose**: Displays summary of a blog post
- **Props**: `post` object with title, excerpt, date, author info
- **Interaction**: Clicking navigates to post details

### PostList
- **Location**: `src/pages/PostList.jsx`
- **Purpose**: Displays all blog posts in a grid/list format
- **Features**: Loading states, error handling, category filtering

### PostDetails
- **Location**: `src/pages/PostDetails.jsx`
- **Purpose**: Displays full post content with comments
- **Features**: Edit/delete options (if owner), comment section, related posts

### CreateEditPost
- **Location**: `src/pages/CreateEditPost.jsx`
- **Purpose**: Form for creating and editing posts
- **Features**: Form validation, image upload, category selection

### CommentForm
- **Location**: `src/components/CommentForm.jsx`
- **Purpose**: Form for users to submit comments
- **Features**: Text input, submission handling, user authentication check

### CommentList
- **Location**: `src/components/CommentList.jsx`
- **Purpose**: Displays all comments for a post
- **Features**: Author info, timestamps, nested replies (if implemented)

### ErrorMessage
- **Location**: `src/components/ErrorMessage.jsx`
- **Purpose**: Display error notifications to users
- **Props**: `message` string, optional `onClose` callback

### Loader
- **Location**: `src/components/Loader.jsx`
- **Purpose**: Loading spinner for async operations
- **Usage**: Displayed while fetching data from API

## Custom Hooks

### useApi()

A custom hook for making API requests with automatic loading and error state management.

```javascript
import { useApi } from '../hooks/useApi';

const Component = () => {
  const { request, loading, error } = useApi();

  const fetchPosts = async () => {
    try {
      const data = await request('GET', '/posts');
      // Handle data
    } catch (err) {
      // Error is automatically set in hook
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={fetchPosts}>Fetch Posts</button>
    </div>
  );
};
```

**Hook State**:
- `loading`: Boolean indicating if request is in progress
- `error`: Error message if request failed
- `request`: Function to make API calls

**Method Signature**:
```javascript
request(method, url, data = null, config = {})
```

### useAuth()

A custom hook for accessing authentication context.

```javascript
import { useAuth } from '../hooks/useAuth';

const Component = () => {
  const { user, token, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
};
```

**Context Value**:
- `user`: Current user object
- `token`: Authentication token
- `login(userData)`: Function to set user and token
- `logout()`: Function to clear user and token
- `isAuthenticated`: Boolean indicating if user is logged in

##  Pages

### PostList (`src/pages/PostList.jsx`)

The home page displaying all blog posts.

**Features**:
- Lists all available posts
- Post cards with summary information
- Click to view full details
- Loading and error states
- Filtering and search capabilities

### PostDetails (`src/pages/PostDetails.jsx`)

Displays detailed view of a single blog post.

**Features**:
- Full post content
- Author information
- Comments section
- Edit/Delete buttons (for post owner)
- Comment submission form

### CreateEditPost (`src/pages/CreateEditPost.jsx`)

Form for creating new posts or editing existing ones.

**Features**:
- Title input field
- Rich text editor for content
- Category selection dropdown
- Image upload functionality
- Form validation
- Submit button with loading state

### Login (`src/pages/Login.jsx`)

User authentication page.

**Features**:
- Email input field
- Password input field
- "Remember me" option
- Link to registration page
- Error message display
- Submit button with loading state

### Register (`src/pages/Register.jsx`)

User registration page.

**Features**:
- Name input field
- Email input field
- Password input field
- Confirm password field
- Password strength validation
- Link to login page
- Submit button with loading state

## Development

### Setting Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the provided URL

### Code Style and Linting

- The project uses ESLint for code quality
- Run linting before committing:
   ```bash
   npm run lint
   ```

### Hot Module Replacement (HMR)

Vite provides instant updates when you save files:
- React component changes are reflected immediately
- State is preserved during refreshes
- No full page reload required

### Debugging

- Use browser Developer Tools (F12 or Ctrl+Shift+I)
- React DevTools extension for component inspection
- Network tab to monitor API calls
- Console for error messages and logs

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder:
- Minified JavaScript
- Optimized CSS
- Compressed images
- Source maps for debugging

### Deploying

The `dist` folder contains your production-ready application:
- Deploy to Vercel, Netlify, GitHub Pages, or any static hosting
- Ensure `VITE_API_URL` environment variable points to your backend API
- Consider CORS settings if API is on different domain

##  Troubleshooting

### Common Issues and Solutions

#### 1. **Port 5173 Already in Use**

```bash
# Kill the process using the port, or use a different port:
npm run dev -- --port 5174
```

#### 2. **API Connection Errors**

- Verify backend server is running on `http://localhost:5000`
- Check `VITE_API_URL` in `.env.local`
- Ensure CORS is enabled on the backend
- Check browser console for network errors

#### 3. **Authentication Token Not Persisting**

- Verify `localStorage` is enabled in browser
- Check if `userInfo` is being saved correctly
- Clear browser cache and try logging in again
- Check browser console for storage errors

#### 4. **Blank Page or White Screen**

- Open browser Developer Tools (F12)
- Check Console tab for JavaScript errors
- Verify `index.html` and `main.jsx` are correctly configured
- Try clearing browser cache and hard refresh (Ctrl+Shift+R)

#### 5. **ESLint Errors During Development**

- Run `npm run lint` to see all issues
- Fix issues manually or use:
   ```bash
   npm run lint -- --fix
   ```

#### 6. **Module Not Found Errors**

- Verify all imports use correct file paths
- Ensure all dependencies are installed: `npm install`
- Check for typos in import statements
- Rebuild the project if necessary

#### 7. **CORS Errors**

Backend configuration issue:
- Ensure backend has CORS enabled
- Check allowed origins include `http://localhost:5173`
- Verify proper headers in API responses

#### 8. **Build Fails**

- Clear node_modules and package-lock.json:
   ```bash
   rm -r node_modules package-lock.json
   npm install
   npm run build
   ```
- Check for TypeScript errors if using type checking
- Verify all imports are correct

### Getting Help

- Check the browser console for error messages
- Review API responses in Network tab
- Check backend server logs for API errors
- Review component props in React DevTools
- Ensure environment variables are correctly set

##  Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [MDN Web Docs](https://developer.mozilla.org)

##  Notes

- Keep the authentication token secure - never expose it in public code
- Always validate user input on the frontend (validation also happens on backend)
- Follow React best practices and component composition patterns
- Keep components small and focused on single responsibilities
- Use custom hooks to share stateful logic between components
- Test API integration thoroughly before deployment

## Security Considerations

- Tokens are stored in localStorage - be aware of XSS vulnerabilities
- Always sanitize user inputs
- Use HTTPS in production
- Keep dependencies updated: `npm audit` and `npm update`
- Validate file uploads before submission
- Never commit sensitive information to version control

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Production Ready
