# Aiplora - Multi-Model AI Chatbot Platform

Aiplora is a versatile AI chat platform that provides access to multiple language models and AI assistants in one unified interface. Similar to platforms like Poe, it offers a seamless experience for interacting with various AI models including GPT-4, Claude, Gemini Pro, and more.

<br>
<p align="center">
  <a href="https://yourdomain.com" target="_blank">
    <img src="https://github.com/Sahira100/Aiplora/blob/main/aiplora.gif" alt="Demonstarion"  />
  </a>
</p>


<br>

## Key Features

- **Multiple AI Models**: Access to various AI models including:
  - GPT-4
  - Claude
  - Gemini Pro
  - Custom Assistants
  - Web Search Integration

- **Real-time Interactions**:
  - Server-Sent Events (SSE) for streaming responses
  - Instant model switching

- **Conversation Management**:
  - Edit existing messages
  - Clear context/history
  - Delete individual messages
  - Persistent conversation history

- **Credit System**:
  - Token-based credit system
  - Usage tracking per model
  - Credit top-up functionality
  - Usage analytics

## Technology Stack

- **Frontend**:
  - React.js
  - Redux for state management
  - TailwindCSS for styling

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for data persistence

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis
- API keys for supported AI models

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aiplora.git
cd aiplora
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Configure environment variables:
```bash
# Create .env files in both client and server directories
cp .env.example .env
```

4. Start the development servers:
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm start
```

## Usage

1. Register for an account or log in
2. Purchase or add credits to your account
3. Select your preferred AI model
4. Start chatting and enjoy the features!


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

