# 🎓 Virtual Courses - AI Powered Learning Management System

<div align="center">
  <img src="./Client/public/logo.jpg" alt="Logo" width="180" />
</div>

<div align="center">

<br/> 

  <!-- Shields -->

  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  <img src="https://img.shields.io/badge/React-19.0+-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-6.0+-47A248?logo=mongodb" />
  <img src="https://img.shields.io/badge/Socket.IO-4.7+-010101?logo=socket.io" />

<br/>

**A modern, AI-powered Learning Management System built with the MERN stack**


</div>

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [🛠️ Tech Stack & Tools](#️-tech-stack--tools)
- [✨ Features](#-features)
- [🎬 Project Preview](#-project-preview)
- [🏗️ Architecture](#️-architecture)
- [⚡ Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎯 Usage](#-usage)
- [📚 API Documentation](#-api-documentation)
- [🎨 UI/UX Features](#-uiux-features)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

**Virtual Courses** is a comprehensive Learning Management System (LMS) that leverages artificial intelligence to enhance the educational experience. Built with the MERN stack, this platform provides a seamless environment for both educators and students to create, manage, and engage with online courses.

### 🎯 Key Objectives

- **Intelligent Learning**: AI-powered course recommendations and search functionality
- **User-Centric Design**: Intuitive interface for both educators and students
- **Scalable Architecture**: Robust backend handling thousands of concurrent users
- **Modern Web Standards**: Responsive design with cutting-edge technologies

## 🛠️ Tech Stack & Tools

### Frontend Technologies
- **React 19.2.0** - Modern UI library with concurrent features
- **Vite 7.2.4** - Lightning-fast build tool and development server
- **TailwindCSS 4.1.18** - Utility-first CSS framework
- **Redux Toolkit** - State management solution
- **React Router DOM 7.11.0** - Client-side routing
- **Framer Motion 12.23.26** - Animation library
- **React Icons 5.5.0** - Icon library
- **Recharts 3.6.0** - Data visualization
- **React Toastify 11.0.5** - Notification system

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express 5.2.1** - Web application framework
- **MongoDB 9.0.2** - NoSQL database with Mongoose ODM
- **Google Generative AI 1.34.0** - AI integration for smart features
- **JWT 9.0.3** - Authentication tokens
- **bcryptjs 3.0.3** - Password hashing
- **Razorpay 2.9.6** - Payment gateway integration
- **Cloudinary 2.8.0** - Cloud media management
- **Nodemailer 7.0.12** - Email services
- **Multer 2.0.2** - File upload handling

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Auto-restart development server
- **Git** - Version control

## ✨ Features

### 🎓 For Students
- **Course Discovery**: Browse and search through a comprehensive course catalog
- **AI-Powered Search**: Intelligent course recommendations using Google AI
- **Enrollment Management**: Easy enrollment 
- **Interactive Learning**: Video lectures with Free Demo Lecture
- **Reviews & Ratings**: Share feedback and read reviews


### 👨‍🏫 For Educators
- **Course Creation**: Comprehensive course builder with multimedia support
- **Lecture Management**: Upload and organize video content
- **Student Analytics**: Track enrollment and engagement metrics
- **Revenue Management**: Monitor earnings and payment history
- **Content Control**: Publish/unpublish courses dynamically
- **Profile Management**: Customizable educator profiles

### 🔐 Security & Authentication
- **Secure Authentication**: JWT-based authentication system
- **Role-Based Access**: Student and Educator role management
- **Google OAuth**: Social login integration
- **Email Verification**: OTP-based verification system
- **Password Recovery**: Secure password reset functionality

### 💳 Payment Integration
- **Razorpay Integration**: Secure payment processing
- **Order Management**: Complete payment workflow
- **Transaction Verification**: Secure payment confirmation

### 🤖 AI Features
- **Smart Search**: AI-powered course discovery
- **Content Recommendations**: Personalized course suggestions
- **Natural Language Processing**: Advanced search capabilities

## 🎬 Project Preview

![1](https://github.com/user-attachments/assets/feef488a-9882-41cc-98a6-4e598cc005a3)

![2](https://github.com/user-attachments/assets/aca58b49-aad0-4742-b8fc-145210e6aff3)

![3](https://github.com/user-attachments/assets/39bbcc4d-4821-4baf-8865-572ff4ab6bd1)

![4](https://github.com/user-attachments/assets/e63035da-907c-4610-b01b-48b540b9bd19)

![5](https://github.com/user-attachments/assets/3f5f95f9-ff35-465e-957e-d386da668ac0)

![6](https://github.com/user-attachments/assets/e9ad9186-16fa-4eb0-84f5-2ef026c84815)


### 📱 Mobile Responsive Design
- Fully responsive layout optimized for all devices
- Touch-friendly interface for mobile users
- Progressive Web App capabilities

### 🎨 Modern UI/UX
- Clean, intuitive interface design
- Smooth animations and transitions
- Accessibility compliance

### 📊 Analytics Dashboard
- Real-time enrollment statistics
- Revenue tracking for educators
- Learning progress visualization
- Interactive charts and graphs

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    subgraph "Client Side"
        A[React Frontend]
        B[Redux Store]
        C[Router]
    end
    
    subgraph "Server Side"
        D[Express API]
        E[Authentication Middleware]
        F[File Upload Middleware]
    end
    
    subgraph "External Services"
        G[MongoDB Database]
        H[Google AI API]
        I[Razorpay Payment]
        J[Cloudinary Storage]
        K[Nodemailer SMTP]
    end
    
    A --> D
    B --> A
    C --> A
    D --> E
    D --> F
    E --> G
    D --> H
    D --> I
    F --> J
    D --> K
```

### Database Schema

```mermaid
erDiagram
    User ||--o{ Course : creates
    User ||--o{ Enrollment : enrolls
    Course ||--o{ Lecture : contains
    Course ||--o{ Review : has
    User ||--o{ Review : writes
    
    User {
        ObjectId _id
        String name
        String email
        String password
        String role
        String photoUrl
        Array enrolledCourses
    }
    
    Course {
        ObjectId _id
        String title
        String description
        String category
        String level
        Number price
        String thumbnail
        ObjectId creator
        Boolean isPublished
    }
    
    Lecture {
        ObjectId _id
        String title
        String videoUrl
        Number duration
        ObjectId course
    }
    
    Review {
        ObjectId _id
        Number rating
        String comment
        ObjectId user
        ObjectId course
    }
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database access
- Google AI API key
- Razorpay account (for payments)

### One-Click Setup
```bash
# Clone the repository
git clone https://github.com/PranavThorat1432/Virtual-Courses-a-AI-Powered-LMS-Website.git

# Navigate to project directory
cd Virtual-Courses-a-AI-Powered-LMS-Website

# Install dependencies (both client and server)
npm run install-all

# Start development servers
npm run dev
```

### Manual Setup
<details>
<summary>Click to expand manual setup instructions</summary>

1. **Clone the repository**
   ```bash
   git clone https://github.com/PranavThorat1432/Virtual-Courses-a-AI-Powered-LMS-Website.git
   cd Virtual-Courses-a-AI-Powered-LMS-Website
   ```

2. **Install Server Dependencies**
   ```bash
   cd Server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../Client
   npm install
   ```

4. **Environment Setup**
   - Copy `.env.example` to `.env` in both directories
   - Configure environment variables (see Configuration section)

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Server
   cd Server
   npm run dev
   
   # Terminal 2 - Client
   cd Client
   npm run dev
   ```

</details>

## 📦 Installation

### System Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **MongoDB**: 5.0 or higher
- **Git**: Latest version

### Step-by-Step Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/PranavThorat1432/Virtual-Courses-a-AI-Powered-LMS-Website.git
   cd Virtual-Courses-a-AI-Powered-LMS-Website
   ```

2. **Server Setup**
   ```bash
   cd Server
   npm install
   ```

3. **Client Setup**
   ```bash
   cd ../Client
   npm install
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a new database cluster
   - Get connection string

5. **Environment Configuration**
   - Set up environment variables (see Configuration section)
   - Obtain API keys for external services

## ⚙️ Configuration

### Server Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/virtual-courses

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google AI API
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Razorpay Payment
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Client Environment Variables (.env)

```env
# API Configuration
VITE_SERVER_URL=http://localhost:5000

# Razorpay (Public Key)
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id

# Firebase (Google Authentication)
VITE_FIREBASE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### External Services Setup

#### 1. Google AI API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your `.env` file

#### 2. Razorpay Payment Gateway
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your Key ID and Key Secret
3. Add them to your environment variables

#### 3. Cloudinary (Media Storage)
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Configure in environment variables

#### 4. Email Service (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Configure Nodemailer settings

## 🎯 Usage

### For Students

1. **Registration & Login**
   - Sign up with email or Google OAuth
   - Verify email with OTP
   - Complete profile setup

2. **Course Discovery**
   - Browse available courses
   - Use AI-powered search for recommendations
   - Filter by category, level, and price

3. **Learning Experience**
   - Enroll in courses
   - Watch video lectures
   - Leave reviews and ratings

### For Educators

1. **Account Setup**
   - Register as an educator
   - Complete profile with description


2. **Course Management**
   - Create comprehensive courses
   - Upload video lectures
   - Set pricing and availability
   - Monitor student enrollment

3. **Analytics**
   - View enrollment statistics
   - Track revenue
   - Analyze student engagement

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000
Production: https://your-api-domain.com
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | User registration | No |
| POST | `/api/auth/signin` | User login | No |
| GET | `/api/auth/signout` | User logout | Yes |
| POST | `/api/auth/send-otp` | Send verification OTP | No |
| POST | `/api/auth/verify-otp` | Verify OTP | No |
| POST | `/api/auth/reset-password` | Reset password | No |
| POST | `/api/auth/google-auth` | Google OAuth | No |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/profile` | Get user profile | Yes |
| PUT | `/api/user/update-profile` | Update profile | Yes |
| POST | `/api/user/upload-photo` | Upload profile photo | Yes |

### Course Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/course/get-published-courses` | Get all published courses | No |
| POST | `/api/course/create-course` | Create new course | Yes (Educator) |
| GET | `/api/course/get-creator-courses` | Get educator's courses | Yes (Educator) |
| GET | `/api/course/get-course/:courseId` | Get course details | Yes |
| PUT | `/api/course/edit-course/:courseId` | Update course | Yes (Educator) |
| DELETE | `/api/course/remove-course/:courseId` | Delete course | Yes (Educator) |
| POST | `/api/course/search` | AI-powered search | Yes |

### Lecture Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/course/create-lecture/:courseId` | Create lecture | Yes (Educator) |
| GET | `/api/course/course-lecture/:courseId` | Get course lectures | Yes |
| PUT | `/api/course/edit-lecture/:lectureId` | Update lecture | Yes (Educator) |
| DELETE | `/api/course/remove-lecture/:lectureId` | Delete lecture | Yes (Educator) |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/order/razorpay-order` | Create payment order | Yes |
| POST | `/api/order/verify-payment` | Verify payment | Yes |

### Review Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/review/create-review` | Create review | Yes |
| GET | `/api/review/course-reviews/:courseId` | Get course reviews | No |
| PUT | `/api/review/update-review/:reviewId` | Update review | Yes |
| DELETE | `/api/review/delete-review/:reviewId` | Delete review | Yes |

### API Response Format

#### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Modern, accessible color scheme
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI component library

### Interactive Elements
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Non-intrusive feedback system
- **Modal Dialogs**: Contextual user interactions

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Tailwind's responsive utilities
- **Touch Gestures**: Mobile-friendly interactions
- **Progressive Enhancement**: Graceful degradation

### Accessibility Features
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard access
- **Focus Management**: Logical tab order
- **Color Contrast**: WCAG compliant colors

## 📁 Project Structure

```
Virtual-Courses-a-AI-Powered-LMS-Website/
├── Client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── Components/              # Reusable components
│   │   │   ├── About.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── Pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AllCourses.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Educator/            # Educator-pages
│   │   │   └── ...
│   │   ├── Redux/                   # State management
│   │   │   ├── authSlice.js
│   │   │   ├── courseSlice.js
│   │   │   └── ...
│   │   ├── Hooks/                   # Custom hooks
│   │   ├── assets/                  # Static assets
│   │   ├── utils/                   # Utility functions
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # App entry point
│   ├── package.json
│   └── vite.config.js
├── Server/                          # Node.js Backend
│   ├── Controllers/                 # Route controllers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── userController.js
│   │   └── ...
│   ├── Models/                      # Database models
│   │   ├── UserModel.js
│   │   ├── CourseModel.js
│   │   ├── LectureModel.js
│   │   └── ReviewModel.js
│   ├── Routes/                      # API routes
│   │   ├── authRoute.js
│   │   ├── courseRoute.js
│   │   ├── userRoute.js
│   │   └── ...
│   ├── Middlewares/                 # Custom middlewares
│   │   ├── isAuth.js
│   │   └── multer.js
│   ├── Config/                      # Configuration files
│   │   └── mongoDB.js
│   ├── Public/                      # Static files
│   ├── server.js                    # Server entry point
│   ├── package.json
│   └── .env                         # Environment variables
├── .gitignore
└── README.md                        # This file
```

## 🧪 Testing

### Frontend Testing
```bash
# Run ESLint
cd Client
npm run lint

# Run tests (when implemented)
npm test
```

### Backend Testing
```bash
# Run server in development mode
cd Server
npm run dev

# Run tests (when implemented)
npm test
```

### Test Coverage
- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load and stress testing

### Testing Tools (Planned)
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing
- **Supertest**: API testing
- **Cypress**: End-to-end testing

## 🚀 Deployment

### Deployment Options

#### 1. Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client directory
cd Client
vercel --prod
```

#### 2. Render (Full Stack Deployment)
```bash
# Connect repository to Render
# Configure build settings:
# Build Command: npm run build
# Start Command: npm start
```

#### 3. Manual Deployment

**Frontend (Netlify/Vercel)**
```bash
# Build for production
cd Client
npm run build

# Deploy dist/ folder
```

**Backend (Heroku/DigitalOcean)**
```bash
# Install production dependencies
cd Server
npm install --production

# Set environment variables
# Start server
npm start
```

### Environment Configuration for Production

#### Production Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/virtual-courses
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-domain.com
```


## 🤝 Contributing

I welcome contributions from the community! Please follow these guidelines:

### 📋 How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/Virtual-Courses-a-AI-Powered-LMS-Website.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear description
   - Include screenshots if applicable
   - Link to any relevant issues

### 🎯 Contribution Areas

- **Bug Fixes**: Help me squash bugs
- **New Features**: Suggest and implement new features
- **Documentation**: Improve documentation and examples
- **Testing**: Add test coverage
- **Performance**: Optimize application performance
- **Accessibility**: Improve accessibility features

### 📝 Coding Standards

- **JavaScript**: Use ES6+ features
- **React**: Follow React best practices
- **CSS**: Use TailwindCSS utilities
- **Commits**: Follow conventional commit messages
- **Code Style**: Consistent formatting with ESLint

### 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

### 💡 Feature Requests

For feature requests:
- Provide a clear use case
- Explain the proposed solution
- Consider implementation complexity
- Discuss potential alternatives

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.


---

## 🙏 Acknowledgments

- **Google AI** - For providing powerful AI capabilities
- **Razorpay** - For secure payment processing
- **Cloudinary** - For reliable media storage
- **MongoDB** - For robust database solutions
- **Open Source Community** - For amazing tools and libraries

## 📞 Contact & Support

| Platform              | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| 🧑 **Author**      | Pranav Thorat                      |
| 🌐 **Live Demo**      | [View Now](https://virtual-courses-lms-platform.vercel.app)                        |
| 🧑‍💻 **GitHub Repo** | [View Code](https://github.com/PranavThorat1432/Virtual-Courses-a-AI-Powered-LMS-Website.git) |
| 💼 **LinkedIn**       | [Connect with Me](https://www.linkedin.com/in/curiouspranavthorat)       |
| 📩 **Email**          | [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)   |


---

<div align="center">

**⭐ If you find this project helpful, please give it a star!**

**🚀 Happy Learning & Teaching!**

</div>
