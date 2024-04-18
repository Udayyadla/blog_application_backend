# blog_application_backend

This project is a blog application developed using Node.js, Express.js, and MongoDB. It provides API endpoints for user authentication, blog post management, and commenting functionality.

## API Functionality

### User Management

Create endpoints for user registration, login, and profile management (CRUD operations).

- **Signup Endpoint**: Allows users to register with the application.
- **Login Endpoint**: Allows registered users to log in.
- **Logout Endpoint**: Allows Users can Logout From Application.
- **Profile Management Endpoints**: Allow users to update their profile information, change passwords, etc.

### Blog Posts

Allow users to create, read, update, and delete blog posts.

- **Create Post Endpoint**: Allows users to create new blog posts.
- **Read Post Endpoint**: Retrieves blog posts from the database.
- **Update Post Endpoint**: Allows users to update existing blog posts.
- **Delete Post Endpoint**: Allows users to delete their blog posts.

### Comments

Enable users to add, view, and delete comments on blog posts.

- **Add Comment Endpoint**: Allows users to add comments to blog posts.
- **View Comments Endpoint**: Retrieves comments associated with blog posts.
- **Update Comments Endpoint**: Update a comment (Users can update their own comments).
- **Delete Comment Endpoint**: Allows users to delete their comments.(Users can Delete their own comments or   the post owner can delete any comment).

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   https://github.com/Udayyadla/blog_application_backend.git

2. Navigate to the project directory:

   <b> cd blog_application_backend </b>

3. Install dependencies:

   <code><b>**npm install**</b></code>

4. Set up environment variables:
   <h5>// Create a .env file and add environment variables</h5>

- **MONGODB_URI=your_mongodb_uri**
- **JWT_SECRET_KEY=your_jwt_secret_key**

5. Run the application:

- **Production Mode**:

   <code>npm start</code>

- **Development Mode**: (with nodemon for automatic server restarts):

  <code>npm run server</code>
