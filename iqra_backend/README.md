# 🌙 IQRA Backend API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-v5.1.0-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v5+-darkgreen.svg)

A robust RESTful API backend for the IQRA Islamic knowledge sharing platform. This service provides endpoints for authenticated content management of Islamic resources including Quranic verses, Hadiths, and Fatwas.

## ✨ Features

- 🔐 **Secure Authentication System** - JWT-based auth with cookie storage
- 👤 **User Management** - Registration, login, and role-based authorization
- 📝 **Content Management** - CRUD operations for Islamic educational content
- 🔍 **Advanced Searching** - Find content by title, category, or tags
- 📊 **Pagination Support** - Efficient data retrieval for large collections
- 🛡️ **Security Features** - XSS protection, rate limiting, and validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/iqra_backend.git
   cd iqra_backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

   ```
   PORT=3000
   MONGO_DB_USERNAME=your_username
   MONGO_DB_PASSWORD=your_password
   MONGO_DB_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint        | Description         | Access        |
| ------ | --------------- | ------------------- | ------------- |
| POST   | `/api/login`    | Log in a user       | Public        |
| POST   | `/api/logout`   | Log out a user      | Authenticated |
| POST   | `/api/register` | Register a new user | Public        |

### Post Endpoints

| Method | Endpoint                  | Description                   | Access |
| ------ | ------------------------- | ----------------------------- | ------ |
| GET    | `/api/posts`              | Get all posts with pagination | Public |
| GET    | `/api/postbyid/:id`       | Get post by ID                | Public |
| GET    | `/api/postsearch`         | Search posts by title         | Public |
| POST   | `/api/post`               | Create a new post             | Admin  |
| DELETE | `/api/postdeletebyid/:id` | Delete post by ID             | Admin  |

### Seeding Endpoints (Development)

| Method | Endpoint         | Description         | Access |
| ------ | ---------------- | ------------------- | ------ |
| GET    | `/api/seed/user` | Seed users database | Admin  |
| GET    | `/api/seed/post` | Seed posts database | Admin  |

## 🛠️ Technologies Used

- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Joi** - Data validation
- **express-rate-limit** - Rate limiting
- **express-xss-sanitizer** - XSS protection
- **Cookie Parser** - Cookie management
- **Morgan** - HTTP request logging

## 🗺️ Roadmap

- ⬜ Post update functionality
- ⬜ Post views tracking
- ⬜ User profile management
- ⬜ Password reset feature
- ⬜ Comment system
- ⬜ Advanced search by categories and tags
- ⬜ Favorites/bookmarks system
- ⬜ Social sharing functionality
- ⬜ Analytics for user engagement

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Developer

- [Shaon An Nafi](https://github.com/Nafisarkar)
