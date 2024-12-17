# Authentication API with Bearer Token

This project implements an authentication API using Node.js as the backend and React.js as the frontend. The API uses a Bearer Token for authentication, which is generated when a user logs in with valid credentials. Authenticated users can add employees.

---

## Features

- User authentication with username and password.
- JWT (JSON Web Token) generation upon successful login.
- Bearer Token-based authentication for protected routes.
- CRUD operations for employee management.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MySQL** (Database)
- **jsonwebtoken** (JWT for authentication)
- **bcryptjs** (Password hashing)

### Frontend
- **React.js**
- **Axios** (For API calls)

---

## Installation

### Prerequisites
- Node.js installed.
- MySQL database set up.
- Git installed.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd authentication-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdatabase
   JWT_SECRET=yourjwtsecret
   ```

4. Run database migrations (if applicable):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

---

## API Endpoints

### Authentication Endpoints

#### 1. **Login**
- **URL:** `/api/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "user_name": "username",
    "password": "password"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt-token"
  }
  ```

### Employee Management Endpoints

#### 2. **Add Employee** (Authenticated Route)
- **URL:** `/api/employees`
- **Method:** POST
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt-token"
  }
  ```
- **Request Body:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "phone": "1234567890",
    "emp_img": "image_url",
    "organization": "Org Name",
    "designation": "Manager",
    "salary": 50000
  }
  ```
- **Response:**
  ```json
  {
    "message": "Employee added successfully!"
  }
  ```

#### 3. **Get All Employees**
- **URL:** `/api/employees`
- **Method:** GET
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt-token"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "emp_img": "image_url",
      "organization": "Org Name",
      "designation": "Manager",
      "salary": 50000
    }
  ]
  ```

---

## Security Features
- Passwords are hashed using `bcrypt` before storage.
- Tokens are verified using `jsonwebtoken` to authenticate API requests.

---

## Future Improvements
- Add user roles and permissions.
- Implement token expiration and refresh token mechanism.
- Add unit and integration tests.

---

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For any questions or feedback, please contact:
- **Email:** your-email@example.com
- **GitHub:** [your-github-profile](https://github.com/your-github-profile)

