<div align="center">

# 🌙 IQRA - Islamic Knowledge Platform

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.5-38B2AC?style=flat-square&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.35-5A0EF8?style=flat-square)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.14.1-47A248?style=flat-square&logo=mongodb)

<p align="center">
  <i>An elegant platform for Islamic knowledge sharing, accessible in Bengali, Arabic, and English</i>
</p>

[✨ Features](#features) • [🚀 Getting Started](#getting-started) • [📚 Documentation](#documentation) • [🛠️ Tech Stack](#tech-stack) • [🔮 Roadmap](#roadmap)

<!-- ![Project Screenshot](https://via.placeholder.com/900x450?text=IQRA+Platform+Screenshot) -->

</div>

## ✨ Features

<div class="grid grid-cols-2 gap-4">
<div>

### 📖 Core Features

- **Multilingual Quran Access** - Read Quran with Bengali, Arabic, and English translations
- **Authentic Hadith Collection** - Verified hadiths with proper references
- **Islamic Fatwa Repository** - Reliable scholarly opinions on contemporary issues
- **Prayer Timetable** - Accurate prayer times based on location

</div>
<div>

### 💻 Technical Features

- **Responsive Design** - Seamless experience across all devices
- **Dark/Light Mode** - Comfortable reading in any environment
- **JWT Authentication** - Secure login and user management
- **Role-based Access** - Admin and user privileges
- **Fast Performance** - Built with modern tech stack

</div>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local installation or Atlas account)

### Frontend Installation

```bash
# Navigate to frontend directory
cd iqra_frontend

# Install dependencies
npm install

# Run development server
npm run dev

# For network access
npm run host
```

### Backend Installation

```bash
# Navigate to backend directory
cd iqra_backend

# Install dependencies
npm install

# Create .env file with required variables:
# PORT=3000
# MONGO_DB_URL=your_mongodb_connection_string
# JWT_SECRET_KEY=your_jwt_secret

# Run development server
npm run dev
```

## 📚 Documentation

<details>
<summary>📱 Frontend Structure</summary>

```
iqra_frontend/
├── src/
│   ├── assets/         # Static assets and fonts
│   ├── components/
│   │   ├── pages/      # Page components
│   │   ├── provider/   # Context providers
│   │   └── ui/         # Reusable UI components
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
└── index.html          # HTML template
```

</details>

<details>
<summary>⚙️ Backend API</summary>

### Authentication Endpoints

| Method | Endpoint        | Description         | Access        |
| ------ | --------------- | ------------------- | ------------- |
| POST   | `/api/login`    | Log in a user       | Public        |
| POST   | `/api/logout`   | Log out a user      | Authenticated |
| POST   | `/api/register` | Register a new user | Public        |

### Content Endpoints

| Method | Endpoint                  | Description                   | Access |
| ------ | ------------------------- | ----------------------------- | ------ |
| GET    | `/api/posts`              | Get all posts with pagination | Public |
| GET    | `/api/postbyid/:id`       | Get post by ID                | Public |
| GET    | `/api/postsearch`         | Search posts by title         | Public |
| POST   | `/api/post`               | Create a new post             | Admin  |
| DELETE | `/api/postdeletebyid/:id` | Delete post by ID             | Admin  |

</details>

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>DevOps & Tools</b></td>
  </tr>
  <tr>
    <td>
      • React 19<br/>
      • TailwindCSS 4<br/>
      • DaisyUI 5<br/>
      • Vite 6
    </td>
    <td>
      • Express 5<br/>
      • MongoDB/Mongoose<br/>
      • JWT Authentication<br/>
      • bcrypt
    </td>
    <td>
      • Git/GitHub<br/>
      • Nodemon<br/>
      • ESLint<br/>
      • Environment Config
    </td>
  </tr>
</table>

## 🌟 Key Features

### 🕌 Prayer Timetable

<!-- ![Prayer Timetable](https://via.placeholder.com/800x200?text=Prayer+Timetable+Feature) -->

The Prayer Timetable component provides accurate prayer times for any location, using the Aladhan API to fetch prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha. The component includes:

- Local caching to reduce API calls
- Beautiful timeline visualization
- Automatic time conversion to 12-hour format
- Multilingual display (Bengali & English)

### 🌓 Dark/Light Theme

<!-- ![Theme Switching](https://via.placeholder.com/800x200?text=Theme+Switching+Feature) -->

Users can switch between light and dark themes with our theme context provider:

- Theme preference stored in localStorage
- System-wide theme application
- Smooth transition between themes
- Optimized for reading lengthy content

## 🔮 Roadmap

- [ ] **Advanced Search** - Search by category, tags, and content type
- [ ] **Comment System** - Enable community discussion on content

## 👥 Development Team

- **Shaon An Nafi** - [GitHub](https://github.com/Nafisarkar) | [Portfolio](https://www.shaonannafi.me/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

Made with ❤️ and ☕ for the Muslim Ummah

</div>
