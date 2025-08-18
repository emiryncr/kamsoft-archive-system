# KamSoft - KAM Management System

This project is a MERN stack application developed as an internship assignment.  
KamSoft is a system for managing Library, Archive, and Museum (KAM) digital content and operations.

## 🚀 Tech Stack

**Frontend**
- **React.js**: User interface framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Context API**: State management for authentication

**Backend**
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **GridFS**: File storage for large files
- **Multer**: File upload middleware
- **JWT**: Authentication with JSON Web Tokens
- **bcryptjs**: Password hashing

## 📋 Features

- **Authentication & Authorization**
    - User registration and login
    - JWT-based authentication
    - Role-based access control (Reader(User), Archiver, Admin)
    - Password hashing with bcrypt

- **Archive Management**
    - Rich metadata: title, description, category, format, condition, period, subject areas, keywords, language, dimensions, source, donor, acquisition date, copyright status, access level
    - File upload with GridFS (PDF, images, videos; up to 50MB)
    - In-browser file viewer (PDF, images, video)
    - Download functionality

- **User Interface**
    - Responsive design (mobile-first with Tailwind CSS)
    - Grid & list views
    - Search & filter by title, description, keywords, tags
    - Sorting by date and title
    - Visual indicators: format icons, condition color coding, access level badges

- **User Management**
    - Profile page with user statistics
    - User archives display
    - Admin panel for user management
    - Role-based UI restrictions

## 🛠 Installation & Setup

**Prerequisites**
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

**Backend Setup**
```bash
# Clone repository
git clone <repository-url>
cd KamSoft/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
MONGO_URI=mongodburl
JWT_SECRET=your-secret-key
PORT=5000

# Start development server
npm run dev
```

**Frontend Setup**
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Backend .env Example**
```
MONGO_URI=mongodburl
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
PORT=5000
```

**Frontend**
- API base URL: `http://localhost:5000/api`

## 📁 Project Structure

```
KamSoft/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── item.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── userRoutes.js
│   │   └── uploadRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── config/
│   │   └── gridfs.js
│   ├── utils/
│   │   └── db.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ItemsList.jsx
│   │   │   ├── ItemForm.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── public/
```

## 🔐 API Endpoints

**Authentication**
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login

**Archives**
- `GET /api/items` — Get all public archives
- `POST /api/items` — Create new archive
- `GET /api/items/:id` — Get archive by ID
- `PUT /api/items/:id` — Update archive
- `DELETE /api/items/:id` — Delete archive

**File Upload**
- `POST /api/upload/file` — Upload file to GridFS
- `GET /api/upload/file/:id` — Download/view file

**Users**
- `GET /api/users` — Get all users (admin only)
- `DELETE /api/users/:id` — Delete user (admin only)

## 🎯 User Roles & Permissions

**Reader**
- View public archives
- Search and filter archives
- Download public files

**Archiver**
- All Reader permissions
- Create new archives
- Edit/delete own archives
- Upload files to archives

**Admin**
- All Archiver permissions
- Manage all archives
- User management
- Delete any user/archive