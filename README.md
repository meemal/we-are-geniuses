# We Are Geniuses

A community platform for Dr Joe Dispenza practitioners to connect and share experiences.

## Features

- User profiles with skills and expertise
- Real-time chat between members
- Online status indicators
- Directory search and filtering
- Favorite profiles system
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- Vite
- React Router
- React Hot Toast

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/we-are-geniuses.git
cd we-are-geniuses
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── hooks/         # Custom React hooks
├── layouts/       # Page layout components
├── lib/          # Third-party library configurations
├── pages/        # Page components
├── routes/       # Route configurations
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.