# Expense Tracker

Welcome to the Expense Tracker repository!  
A full-stack web app to manage your daily, weekly, and monthly expenses with secure authentication, advanced reporting, premium features, and a modern, responsive UI.

---

## Features

- **User Authentication**: Secure signup/login, password recovery via email (JWT & bcrypt).
- **Expense Management**: Add, view, delete, and filter expenses by category and time period.
- **Premium Features**: Leaderboard, downloadable expense reports, dark mode, advanced analytics.
- **Reports & Analytics**: Generate categorized daily, weekly, and monthly reports with export.
- **UI/UX**: Responsive dashboard for smooth experience across devices.

---

## Screenshots

**Login, Signup, and Reset Password**  
![Login Page](https://github.com/user-attachments/assets/2ecd3558-3b5f-4876-b741-1cd8d6575e20)  
![Signup Page](https://github.com/user-attachments/assets/0ceb16ff-85cc-4ad4-bacc-3acd8e9aae69)  
![Reset Password](https://github.com/user-attachments/assets/ec3ebad3-86c2-4556-b09e-de46d404a930)  

**Database (Password hashed with bcrypt)**  
![Database](https://github.com/user-attachments/assets/8e5a4b96-dc0e-4cb0-8089-83de82713104)  

**New User Dashboard**  
![New User](https://github.com/user-attachments/assets/3969e290-cbfe-4649-ae50-b87be28a44e8)  

**Returning User**  
![Returning User](https://github.com/user-attachments/assets/809c8af8-10d5-4040-b9c8-a64099759512)  

**Premium Features**  
![Premium Features](https://github.com/user-attachments/assets/36839aaa-b9d8-4e22-ae96-0b434c16ca04)  
Leaderboard and downloadable CSV report:  
![Leaderboard](https://github.com/user-attachments/assets/15680b32-6b6b-47e0-8767-283a0223420c)  
![Report Download](https://github.com/user-attachments/assets/ff8d5158-cd96-45bd-a074-e3ec9fe46175)  

---

## Getting Started

### 1. Fork the repository
Click **Fork** (top-right) to copy to your GitHub account.

### 2. Clone to your machine
```sh
git clone https://github.com/your-username/Expense-Tracker.git
cd Expense-Tracker
```

### 3. Install dependencies
```sh
npm install
```

### 4. Configure environment variables
Create a `.env` file in the root folder:
```
DB_HOST=localhost
DB=root
DB_PASSWORD=yourpassword
DB_NAME=expense_tracker
JWT_SECRET=your_secret_key
SENDINBLUE_API_KEY=your_sendinblue_key
SENDER_EMAIL=your_email
```

### 5. Start the server
```sh
npm start
```

### 6. Access the app
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

Enjoy tracking your expenses!  
For issues or contributions, please open a GitHub issue or
