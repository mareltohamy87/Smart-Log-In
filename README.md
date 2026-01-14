# 🔐 Smart Login System

A simple and clean **Smart Login System** built with **Vanilla JavaScript**, designed to practice authentication logic, form validation, and local storage handling.

This project simulates a basic sign-up and login flow and is intended for **learning and portfolio purposes**.

---

## ✨ Features

- 🔹 User Registration (Sign Up)
- 🔹 User Authentication (Login)
- 🔹 Real-time form validation
- 🔹 Email uniqueness check
- 🔹 Password strength validation
- 🔹 Error handling with clear UI feedback
- 🔹 LocalStorage-based user persistence
- 🔹 Auto-login if user is already authenticated
- 🔹 Logout functionality

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap**
- **JavaScript (Vanilla JS)**
- **SweetAlert2**
- **LocalStorage API**

---

## 📋 Validation Rules

- **Name**
  - Minimum 3 characters
  - Letters only (English & Arabic supported)

- **Email**
  - Valid email format
  - Must be unique (not registered before)

- **Password**
  - At least 8 characters
  - Contains:
    - Uppercase letter
    - Lowercase letter
    - Number
    - Special character

---

## 🧠 How It Works

1. User registers with valid name, email, and password.
2. Data is stored in `localStorage`.
3. During login:
   - Email is checked first.
   - Password is verified.
4. On success:
   - User is saved as `currentUser`.
   - Home page is displayed dynamically.
5. User can log out and session will be cleared.

---

## 🚀 Live Demo

🔗 **Live Demo:**(https://mareltohamy87.github.io/Smart-Log-In/)

---
## Images
<img width="1846" height="702" alt="signup" src="https://github.com/user-attachments/assets/637f7be1-189c-44d3-b4e3-263e7819f841" />
<img width="1798" height="539" alt="signin" src="https://github.com/user-attachments/assets/866d8c42-b94e-4eb4-a08c-029120ccdc81" />


---

## 📂 Project Structure

Smart-Login-System/
│
├── index.html
├── css/
│ ├── style.css
│ ├── utilities.css
│ ├── animation.css
│ └── media.css
│
├── js/
│ └── index.js
│
└── imgs/

---

## 👩‍💻 Author

**Mariam El Tohamy**  
Front-End Developer | JavaScript Enthusiast  
---

⭐ If you like this project, feel free to star the repository!
