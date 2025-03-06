# Budget Tracker Application

## Overview
The Budget Tracker application is a full-stack web application designed to help users manage their expenses efficiently. Built using Node.js, Express.js, MongoDB, and EJS templates, this app allows users to track their income and expenses through a simple and intuitive interface.

## Features
- **User Authentication:** Secure login and registration system using session-based authentication.
- **Full CRUD Functionality:** Users can create, read, update, and delete transactions.
- **Transaction Categories:** Organize transactions by categories (e.g., food, bills, entertainment).
- **Balance Tracking:** Displays total income, expenses, and remaining balance.
- **Responsive Design:** Clean, minimalist UI with a custom CSS design.
- **Deployment Ready:** Hosted and accessible online.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Templating Engine:** EJS
- **Authentication:** Express-session
- **Frontend Styling:** Custom CSS (minimalist design)
- **Version Control:** Git/GitHub
- **Deployment:** TBD (e.g., Render, Vercel, or Heroku)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd budget-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     PORT=3000
     MONGO_URI=<your-mongodb-connection-string>
     SESSION_SECRET=<your-secret-key>
     ```
4. Start the application:
   ```bash
   npm start
   ```
   The app should be running on `http://localhost:3000`

## Usage
- Register/Login to access your personal transactions.
- Add new transactions by specifying an amount, type (income/expense), and category.
- View, edit, or delete existing transactions.
- Monitor financial health with balance tracking.

## Roadmap
- Implement data visualization (charts for expense distribution).
- Add recurring transactions feature.
- Enhance security with OAuth authentication.

## Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.

## License
This project is licensed under the MIT License.

## Contact
For questions or feedback, reach out via [GitHub Issues](<repository-url>/issues).

