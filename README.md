# DevTinder 🚀

> Tinder-like platform for Developers to connect, chat, and network!

## 📖 Overview

DevTinder is a comprehensive backend service built with Node.js and Express. It serves as a matchmaking and networking platform tailored specifically for developers. Features include user authentication, profile management, connection requests (swipe left/right style), real-time chatting, and a premium subscription model.

## ✨ Features

- **User Authentication:** Secure signup, login, and logout using JWT and bcrypt.
- **Profile Management:** View, update, and manage developer profiles including password updates.
- **Connections & Requests:**
  - Send connection requests (interested/ignored).
  - Review connection requests (accept/reject).
  - View your connections and pending requests.
- **Feed:** Pagination supported feed to discover other developers.
- **Real-time Chat:** Seamless real-time messaging with connected developers using Socket.io.
- **Payments:** Premium subscription handling via Razorpay integration.
- **Emails:** Email notifications powered by AWS SES.
- **Scheduled Tasks:** Automated background tasks handled via node-cron.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Real-Time Communication:** Socket.io
- **Security:** JWT (JSON Web Tokens), bcrypt
- **Payments:** Razorpay
- **Email Service:** AWS SES
- **Other Utilities:** node-cron, date-fns, validator

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB instance (local or Atlas)
- Razorpay API keys (for payments)
- AWS SES credentials (for emails)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd devtinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env` file in the root directory and configure the necessary variables (e.g., Database URI, JWT Secret, Razorpay keys, AWS SES credentials).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. The server should be running on `http://localhost:7777`.

## 📚 API Endpoints

### Auth Routes
- `POST /signup` - Register a new user
- `POST /login` - Authenticate user and receive token
- `POST /logout` - Clear authentication token

### Profile Routes
- `GET /profile` - View your profile
- `PATCH /profile/edit` - Update profile details
- `PATCH /profile/password` - Change account password
- `DELETE /profile` - Delete user account

### Connection Request Routes
- `POST /request/send/:status/:userID` - Send a connection request (`status` can be 'interested' or 'ignored')
- `POST /request/review/:status/:requestID` - Review a request (`status` can be 'accepted' or 'rejected')

### User Routes
- `GET /feed` - Get developers feed (Supports pagination: `?page=1&limit=10`)
- `GET /user/connections` - Get all accepted connections
- `GET /user/requests` - Get all pending connection requests

### Chat Routes
- Accessible via WebSockets/Socket.io and related REST endpoints in `/chat`

### Payment Routes
- Handled through endpoints defined in `/payment`

## 👨‍💻 Author

**Abhishek Ojha**

## 📄 License

This project is licensed under the ISC License.
