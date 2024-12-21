<div align="center">
# Aiplora - Multi-Model AI Chatbot Platform

</div>

<div align="center">

[![Made with React](https://img.shields.io/badge/Made_with-React-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Powered_by-Node.js-43853d?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Aiplora is a powerful and versatile chatbot application that integrates multiple advanced AI models and assistants, providing users with seamless and intelligent conversational experiences. Inspired by platforms like Poe.com, Aiplora brings together a variety of cutting-edge AI models to cater to diverse user needs.

</div>

<br>
<br>
<div align="center">
  <img src="https://github.com/Sahira100/Aiplora/blob/main/aiplora.gif" alt="Aiplora Demo">
</div>

<div align="center">

<br>
📹 [Watch Demo Video](https://www.youtube.com/watch?v=UiZTiYObXNE)
  
</div>

<br>

## Key Features

### Supported AI Models
<div align="center">
<table>
<tr>
<td align="center"><img src="https://img.shields.io/badge/GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white" alt="GPT-4"/></td>
<td align="center"><img src="https://img.shields.io/badge/Claude-000000?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude"/></td>
<td align="center"><img src="https://img.shields.io/badge/Gemini_Pro-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini Pro"/></td>
</tr>
</table>
</div>

### Core Capabilities

- **Real-time Interactions**
  - Streaming responses via Server-Sent Events (SSE)
  - Instant model switching capability
  - Responsive interface with minimal latency

- **Smart Conversation Management**
  - Edit messages on the fly
  - Clear conversation context/history
  - Selective message deletion
  - Automatic conversation persistence

- **Advanced Credit System**
  - Token-based usage tracking
  - Per-model usage analytics
  - Flexible credit top-up options
  - Detailed usage statistics

## Technology Stack

### Frontend Technologies
<div align="center">
<table>
<tr>
<td align="center"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/></td>
<td align="center"><img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux"/></td>
<td align="center"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/></td>
</tr>
</table>
</div>

### Backend Infrastructure
<div align="center">
<table>
<tr>
<td align="center"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/></td>
<td align="center"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/></td>
<td align="center"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/></td>
<td align="center"><img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/></td>
</tr>
</table>
</div>

## Prerequisites

- Node.js v16 or higher
- MongoDB database
- Redis server
- API keys for supported AI models

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aiplora.git
cd aiplora
```

2. **Install dependencies**
```bash
# Frontend dependencies
cd client
npm install

# Backend dependencies
cd ../server
npm install
```

3. **Configure environment**
```bash
# Set up environment files
cp .env.example .env
```

4. **Launch development servers**
```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
```

## Usage

1. Create an account or sign in to your existing account
2. Add credits to your account balance
3. Choose your preferred AI model from the available options
4. Start engaging in conversations with advanced AI models

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
