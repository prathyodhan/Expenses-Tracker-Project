# Expense Tracker

Welcome to the Expense Tracker repository!  
This is a full-stack web application designed to help users manage their daily, weekly, and monthly expenses efficiently. The application comes with secure authentication, advanced reporting, premium features, and a clean, responsive UI.

## Functionalities

- **User Authentication**: Secure signup/login with account recovery via email using JWT & bcrypt.  
- **Expense Management**: Add, view, delete, and filter expenses by category and time period.  
- **Premium Features**: Leaderboard, downloadable expense reports, dark mode, and advanced analytics.  
- **Reports & Analytics**: Generate categorized daily, weekly, and monthly reports with export functionality.  
- **UI/UX**: Responsive and modern dashboard ensuring smooth experience across devices.  

---

## Screenshots

### Login, Signup, and Reset Password Pages
![Login Page](https://github.com/user-attachments/assets/2ecd3558-3b5f-4876-b741-1cd8d6575e20)  
![Signup Page](https://github.com/user-attachments/assets/0ceb16ff-85cc-4ad4-bacc-3acd8e9aae69)  
![Reset Password](https://github.com/user-attachments/assets/ec3ebad3-86c2-4556-b09e-de46d404a930)  

### Database (Password hashed with bcrypt)
![Database](https://github.com/user-attachments/assets/8e5a4b96-dc0e-4cb0-8089-83de82713104)  

### New User Dashboard
![New User](https://github.com/user-attachments/assets/3969e290-cbfe-4649-ae50-b87be28a44e8)  

### Returning User
![Returning User](https://github.com/user-attachments/assets/809c8af8-10d5-4040-b9c8-a64099759512)  

### Premium Features
![Premium Features](https://github.com/user-attachments/assets/36839aaa-b9d8-4e22-ae96-0b434c16ca04)  
Leaderboard showing users' total expenses from high to low and downloadable CSV report:  
![Leaderboard](https://github.com/user-attachments/assets/15680b32-6b6b-47e0-8767-283a0223420c)  
![Report Download](https://github.com/user-attachments/assets/ff8d5158-cd96-45bd-a074-e3ec9fe46175)  

---

## Getting Started

To get started with this project, follow these steps:

### 1. Fork this repository
Click on the **Fork** button in the top-right corner to create a copy in your GitHub account.  

### 2. Clone this repository to your local machine
```bash
git clone https://github.com/your-username/Expense-Tracker.git
3. Install dependencies

Navigate to the backend and frontend folders to install dependencies:

cd Expense-Tracker
cd server && npm install
cd ../client && npm install

4. Configure environment variables

Create a .env file inside the server folder and add the following:

DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=expense_tracker
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

5. Start the backend server
cd server && npm start

6. Start the frontend
cd client && npm start

7. Access the application

Open your browser and go to:
 http://localhost:3000
