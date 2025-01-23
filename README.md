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

## Deployed URL
Base URL: [https://blog-application-backend-1-tabj.onrender.com](https://blog-application-backend-1-tabj.onrender.com)

---

## API Endpoints

### User Routes (`/api/users`)

- **POST** `/signup`  
  **Description:** Registers a new user.  
  **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **POST** `/login`  
  **Description:** Authenticates a user and provides a token.  
  **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **POST** `/logout`  
  **Description:** Logs out the user.

- **GET** `/getAllUsers`  
  **Description:** Fetches all users.

- **GET** `/getUser/:userId`  
  **Description:** Fetches details of a specific user.  
  **Path Parameters:**
  - `userId` (string): The ID of the user.

- **PUT** `/updateUserdetails`  
  **Description:** Updates user details. Requires authentication.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

---

### Post Routes (`/api/posts`)

- **POST** `/createpost`  
  **Description:** Creates a new blog post. Requires authentication.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
  **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

- **GET** `/getAllPosts`  
  **Description:** Fetches all blog posts. Requires authentication.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

- **PUT** `/updatePost/:postId`  
  **Description:** Updates a specific blog post by ID. Requires authentication.  
  **Path Parameters:**
  - `postId` (string): The ID of the post.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
  **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

- **DELETE** `/deletePost/:postId`  
  **Description:** Deletes a specific blog post by ID. Requires authentication.  
  **Path Parameters:**
  - `postId` (string): The ID of the post.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

---

### Comment Routes (`/api/comments`)

- **POST** `/postComment/:postId`  
  **Description:** Posts a comment on a specific post. Requires authentication.  
  **Path Parameters:**
  - `postId` (string): The ID of the post.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```  
  **Request Body:**
  ```json
  {
    "comment": "string"
  }
  ```

- **GET** `/getAllComments`  
  **Description:** Fetches all comments. Requires authentication.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

- **GET** `/getComment/:commentId`  
  **Description:** Fetches a specific comment by ID. Requires authentication.  
  **Path Parameters:**
  - `commentId` (string): The ID of the comment.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

- **PUT** `/updateComment/:commentId`  
  **Description:** Updates a specific comment by ID. Requires authentication.  
  **Path Parameters:**
  - `commentId` (string): The ID of the comment.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```  
  **Request Body:**
  ```json
  {
    "comment": "string"
  }
  ```

- **DELETE** `/deleteComment/:commentId`  
  **Description:** Deletes a specific comment by ID. Requires authentication.  
  **Path Parameters:**
  - `commentId` (string): The ID of the comment.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

---




