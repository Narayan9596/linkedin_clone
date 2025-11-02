# LinkedClone - LinkedIn-like Social Media Application

A full-stack social media application built with React, Node.js, Express, and MongoDB, similar to LinkedIn where users can sign up, log in, create posts, and interact with posts from all users.

## Features

### Core Features
- ✅ User Registration & Login with email and password
- ✅ JWT-based authentication
- ✅ Create posts with text content
- ✅ View all posts from all users (public feed)
- ✅ Posts sorted by latest first
- ✅ User profile display in navigation bar

### Bonus Features
- ✅ Like/Unlike posts
- ✅ Add comments to posts
- ✅ Edit own posts
- ✅ Delete own posts
- ✅ User profile pages
- ✅ Image upload with posts
- ✅ Real-time post updates

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linked-clone
   ```

2. **Install dependencies**
   
   Install all dependencies (both server and client):
   ```bash
   npm run install-all
   ```
   
   Or install them separately:
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   cd ..
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/linked-clone
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
   
   For MongoDB Atlas (cloud), use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linked-clone
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using local MongoDB:
   ```bash
   # On Windows (if installed as service, it should start automatically)
   # On Mac/Linux
   mongod
   ```

## Running the Application

### Development Mode (Recommended)

Run both server and client concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Running Separately

**Start the backend server:**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm start
```

## Usage

1. **Sign Up**: Navigate to `/register` to create a new account
2. **Login**: Navigate to `/login` to access your account
3. **Create Posts**: After logging in, you'll see a post creation form on the feed page
4. **View Feed**: See all posts from all users, sorted by latest first
5. **Interact**: Like posts, add comments, edit or delete your own posts
6. **Profile**: Click on your name in the navbar to view your profile page

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts (latest first)
- `POST /api/posts` - Create a new post (requires auth)
- `POST /api/posts/:id/like` - Like/Unlike a post (requires auth)
- `POST /api/posts/:id/comment` - Add a comment to a post (requires auth)
- `PUT /api/posts/:id` - Update a post (requires auth, owner only)
- `DELETE /api/posts/:id` - Delete a post (requires auth, owner only)

### Users
- `GET /api/users/:id` - Get user profile and posts (requires auth)
- `GET /api/users/me/info` - Get current user info (requires auth)

## Project Structure

```
linked-clone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context (Auth)
│   │   ├── utils/         # Utility functions (API)
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware (auth)
│   ├── uploads/           # Uploaded images
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Protected routes require valid authentication
- Users can only edit/delete their own posts
- File uploads are restricted to images only (max 5MB)

## Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your MONGODB_URI in the .env file
   - Verify MongoDB connection string format

2. **Port Already in Use**
   - Change PORT in server/.env file
   - Update REACT_APP_API_URL in client if needed

3. **CORS Errors**
   - Backend CORS is configured to allow requests from localhost:3000
   - If using a different port, update CORS settings in server/index.js

## Future Enhancements

- User search functionality
- Follow/Unfollow users
- Notifications
- Post sharing
- Advanced profile customization
- Email verification
- Password reset functionality

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Coding! 🚀**
