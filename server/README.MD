# Advanced Authentication System

A robust authentication system built with Node.js featuring email verification, JWT tokens, and password reset functionality.

## Features

- User registration with email verification
- JWT-based authentication with refresh tokens
- Password reset functionality
- Secure cookie handling
- Token-based session management
- Email notifications

## Tech Stack

- Node.js
- Express.js 
- MongoDB
- Nodemailer
- JSON Web Tokens (JWT)

## Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auth-system.git
cd auth-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## Development

Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-email` - Verify email
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `DELETE /api/v1/auth/logout` - Logout user

## Project Structure

```
├── controllers/
│   └── authController.js
├── models/
│   ├── User.js
│   └── Token.js
├── utils/
│   ├── nodemailerConfig.js
│   ├── sendEmail.js
│   ├── sendVerificationEmail.js
│   └── sendResetPasswordEmail.js
└── routes/
    └── authRoutes.js
```

## Implemented Features

- [x] User Model with verification fields
- [x] Registration with email verification
- [x] Login with verification check
- [x] Email verification system
- [x] Nodemailer configuration
- [x] Token model for refresh tokens
- [x] Multiple cookie handling
- [x] Password reset functionality
- [x] Token hashing for security

## Security Features

- Password hashing
- JWT token encryption
- Secure cookie options
- Email verification
- Rate limiting
- XSS protection


## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
