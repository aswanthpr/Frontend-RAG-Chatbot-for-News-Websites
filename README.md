# ChatBot Frontend Application

A modern, responsive chatbot frontend application built with React, TypeScript, Redux, and Tailwind CSS. Features real-time messaging via WebSocket, user authentication, and a beautiful UI with SCSS styling.

## 🚀 Features

### Authentication
- **Login & Signup**: Secure user authentication with form validation
- **Protected Routes**: Route protection based on authentication status
- **Token Management**: Automatic token handling and refresh

### Chat Interface
- **Real-time Messaging**: WebSocket integration for instant message delivery
- **Streaming Responses**: Typewriter effect for bot responses
- **Message History**: Persistent chat history with session management
- **Session Management**: Unique session IDs with debugging display
- **Reset Functionality**: Clear chat history with confirmation dialog

### User Experience
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI**: Clean, minimal design with SCSS styling
- **Smooth Animations**: Transitions and micro-interactions throughout
- **Loading States**: Proper loading indicators and disabled states
- **Error Handling**: Comprehensive error messaging and recovery

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Centralized state management with RTK
- **WebSocket Support**: Socket.io integration for real-time features
- **REST API Integration**: Axios-based API client with interceptors
- **Component Architecture**: Modular, reusable component design

## 📦 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + SCSS Modules
- **Routing**: React Router v6
- **Real-time Communication**: Socket.io Client
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Backend API server running (see backend requirements)

### Environment Setup

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd chatbot-frontend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your backend API configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_WEBSOCKET_URL=http://localhost:3000
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for Production**:
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── AuthPages.scss
│   ├── chat/            # Chat interface components
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── InputBox.tsx
│   │   ├── ResetButton.tsx
│   │   └── *.scss       # Component styles
│   └── layout/          # Layout components
│       └── Header.tsx
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   └── slices/          # Redux slices
│       ├── authSlice.ts
│       └── chatSlice.ts
├── services/            # API and WebSocket services
│   ├── api.ts           # REST API client
│   └── websocket.ts     # WebSocket service
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main app component
└── main.tsx             # App entry point
```

## 🔧 Component Overview

### Core Components

- **`ChatWindow`**: Main chat interface with message display and controls
- **`MessageBubble`**: Individual message component with streaming animation
- **`InputBox`**: Message input with auto-resize and keyboard shortcuts
- **`ResetButton`**: Chat reset with confirmation dialog
- **`LoginPage/SignupPage`**: Authentication forms with validation

### Key Features

- **Real-time Streaming**: Messages appear with typewriter effect
- **Session Management**: Automatic session creation and management
- **WebSocket Fallback**: Graceful fallback to REST API if WebSocket fails
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Error Boundaries**: Comprehensive error handling throughout

## 🌐 API Integration

### Backend Requirements

The frontend expects a backend API with these endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration  
- `POST /auth/logout` - User logout

#### Chat
- `POST /chat/session` - Create new chat session
- `POST /chat/message` - Send message
- `GET /chat/history/:sessionId` - Get chat history
- `DELETE /chat/session/:sessionId` - Reset/delete session

#### WebSocket Events
- `user_message` - Send user message
- `bot_response_start` - Bot starts responding
- `bot_response_chunk` - Streaming response chunk
- `bot_response_complete` - Response complete
- `join_session` - Join chat session
- `leave_session` - Leave chat session

### API Response Format
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## 🎨 Styling & Theming

### Design System
- **Colors**: Blue/Indigo gradient primary, semantic colors for states
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: 8px grid system for consistent spacing
- **Breakpoints**: Mobile-first responsive design

### SCSS Architecture
- Component-scoped styles with SCSS modules
- Consistent design tokens and variables
- Smooth animations and transitions
- Custom scrollbars and micro-interactions

## 📱 Mobile Responsiveness

- **Mobile-first**: Optimized for small screens
- **Touch-friendly**: Appropriate touch targets
- **Responsive Layout**: Adapts to different screen sizes
- **Performance**: Optimized for mobile networks

## 🚢 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Docker**: Containerized deployment

### Environment Variables for Production
Ensure these are set in your deployment environment:
- `VITE_API_BASE_URL`: Production API URL
- `VITE_WEBSOCKET_URL`: Production WebSocket URL

## 🔍 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Proper error boundaries
- Component testing setup ready

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

For questions or support, please open an issue in the repository.