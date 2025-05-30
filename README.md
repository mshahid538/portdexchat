# AI Chat Application

A modern chat application built with React, TypeScript, and Vite, featuring AI-powered responses using Portdex AI.

## Features

- Clean Architecture implementation
- Real-time chat interface
- AI-powered responses
- Conversation context management
- Modern UI with Tailwind CSS
- TypeScript support
- Environment configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Portdex AI API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-application
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
VITE_API_URL=https://api.portdex.ai/chat/completions
VITE_API_KEY=your_api_key_here
VITE_AI_MODEL=thinker
VITE_APP_NAME=Portdex AI Chat
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── domain/           # Business logic and entities
│   ├── entities/     # Domain entities
│   ├── repositories/ # Repository interfaces
│   └── use-cases/    # Business use cases
├── infrastructure/   # External services and implementations
│   ├── api/         # API clients
│   └── storage/     # Storage implementations
├── presentation/    # UI components and hooks
│   ├── components/  # React components
│   ├── hooks/       # Custom React hooks
│   └── pages/       # Page components
└── shared/          # Shared utilities and types
    ├── config/      # Application configuration
    ├── types/       # TypeScript type definitions
    └── utils/       # Utility functions
```

## Architecture

The application follows Clean Architecture principles:

1. **Domain Layer**: Contains business logic, entities, and use cases
2. **Infrastructure Layer**: Implements external services and storage
3. **Presentation Layer**: Handles UI components and user interaction
4. **Shared Layer**: Contains shared utilities and types

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT