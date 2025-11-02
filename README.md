# 💸 CashBoss - Personal Finance & AI Assistant App

**CashBoss** is a cross-platform finance management app built with **React Native + Expo** and a **Node.js + Express** backend.
It helps users track expenses, manage transactions, and get smart AI insights or chat with an AI financial assistant.



## 🚀 Features

- 📱 **Cross-Platform App** – Built using React Native + Expo.
- 🔐 **Authentication** – User login/signup with Clerk.
- 💰 **Expense Tracking** – Add, edit, and delete income/expense transactions.
- 📊 **Balance Summary** – Automatic calculation of total income, expenses, and remaining balance.
- 🤖 **AI Advisor** – Provides automatic financial insights using Google Gemini API.
- 💬 **AI Chat** – Allows users to chat naturally with an AI assistant about saving, budgeting, and more.
- ☁️ **Backend API** – Node.js + Express + **PostgreSQL** using **Neon** for data handling.



## 🧩 Project Structure

### Backend (`/backend`)


/backend
├── src
│   ├── controllers
│   │   ├── transactionController.js
│   │   ├── aiAdvisorController.js
│   │   └── aiChatController.js
│   ├── models
│   │   └── Transaction.js
│   ├── routes
│   │   ├── transactionRoutes.js
│   │   ├── aiAdvisorRoutes.js
│   │   └── aiChatRoutes.js
│   ├── config
│   │   └── db.js
│   └── server.js
├── .env
└── package.json



### Frontend (`/app`)

/app
├── (root)
│   ├── index.jsx
│   ├── ai-advisor.jsx
│   ├── ai-chat.jsx
│   └── create.jsx
├── components
│   ├── BalanceCard.jsx
│   ├── TransactionItem.jsx
│   ├── NoTransactionsFound.jsx
│   └── SignOutButton.jsx
├── assets
│   ├── styles
│   │   └── home.styles.js
│   └── images
│       └── logo.png
└── constants
    └── api.js


## Backend — Setup & Run

cd backend
npm install

Create a `.env` file

PORT=5001
MONGO_URI=your_mongodb_connection
GEMINI_API_KEY=your_gemini_key

Then run:

npm run dev


## Mobile (Expo) — Setup & Run

cd CashBoss-App
npm install
npx expo start


## API Endpoints (examples)


- Get user transactions

  - GET /api/transactions/:userId
- Get summary (income/expenses/balance)

  - GET /api/transactions/summary/:userId
- Create transaction

  - POST /api/transactions

    - Body: { user_id, title, amount, category, isExpense }
- Delete transaction

  - DELETE /api/transactions/:id
- AI advice

  - GET /api/ai/advice/:userId



## Common issues & troubleshooting



- Network request failed / JSON Parse error: Unexpected character: <

  - Cause: server returned HTML (error page) or wrong URL.
  - Fix:

    - Verify backend is running and `/api/health` returns JSON.
    - Ensure mobile API_URL points to correct host (use emulator IPs or local machine IP for physical device).
    - Inspect server logs for route 404/500 details.
- AI / Gemini 404 or errors

  - Ensure `GEMINI_API_KEY` is present in backend `.env` and server restarted.
  - Confirm `GEMINI_MODEL` value matches the SDK documentation.
  - Check server logs for SDK error details (err.response, err.status).
- CORS errors

  - Add `cors` middleware to backend (`app.use(cors())`).
- Hooks run before user loaded

  - Ensure you check Clerk's `isLoaded` before passing `user.id` to hooks (e.g., useTransactions(user?.id)).
- Emulator networking

  - Android emulator -> 10.0.2.2 maps to host localhost.
  - Physical device -> use host IP in LAN.

---
