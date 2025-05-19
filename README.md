# X Frontend

A modern React-based frontend for the X social media platform, featuring a responsive design and intuitive user interface.

## 🚀 Features

- **Authentication**
  - Email/Password login
  - Protected routes

- **Posts**
  - Create and edit posts
  - Multiple image upload
  - Like/unlike functionality
  - Infinite scroll feed
  - Post management

- **User Interface**
  - Responsive design
  - Modern UI components
  - Loading states
  - Error handling

## 🛠️ Tech Stack

- React 18
- React Router DOM v6
- Axios for API calls
- TailwindCSS with DaisyUI
- Lucide React for icons
- React Icons
- Vite for build tooling

## 📦 Installation

1. Navigate to the project directory:
```bash
cd X
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
X/
├── src/
│   ├── components/        # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── posts/        # Post-related components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context
│   ├── utils/            # Utility functions
│   ├── assets/           # Static assets
│   └── styles/           # Global styles
├── public/               # Public assets
└── index.html           # Entry HTML file
```

## 🎨 UI Components

### Authentication
- Login form
- Registration form
- Password reset

### Posts
- Post creation form
- Post card
- Image upload
- Like button
- Post actions

### Layout
- Sidebar
- Modal

## 🔄 State Management

- React Context for global state
- Local state with useState
- Custom hooks for reusable logic
- Form state management

## 🎯 Future Enhancements

1. **User Experience**
   - Real-time updates
   - Infinite scroll optimization
   - Skeleton loading
   - Progressive image loading
   - Offline support

2. **Features**
   - Comments system
   - Share functionality
   - User profiles
   - Direct messaging
   - Notifications

3. **Performance**
   - Code splitting
   - Image optimization
   - Bundle size optimization
   - Caching strategies

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance testing
   - Accessibility testing

5. **Developer Experience**
   - Storybook integration
   - Component documentation
   - TypeScript migration
   - Better error boundaries
   - Enhanced logging

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Style

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Conventional commits

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
