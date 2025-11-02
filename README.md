
# 💸 CashBoss — Personal Finance & AI Assistant App

**CashBoss** is a modern cross-platform finance management app that helps users easily track expenses, manage budgets, and get personalized financial insights powered by AI.

Built with **React Native + Expo** on the frontend and **Node.js + Express + PostgreSQL (Neon)** on the backend.

---

## 🚀 Features

* 📱 **Cross-Platform App** – Built using  **React Native + Expo** , works on Android and iOS.
* 🔐 **Authentication** – Secure user authentication with  **Clerk** .
* 💰 **Expense Tracking** – Add, edit, and delete income or expense transactions.
* 📊 **Balance Overview** – Automatically calculates total income, total expenses, and net balance.
* 🤖 **AI Advisor** – Generates smart financial insights using the  **Google Gemini API** .
* 💬 **AI Chat Assistant** – Chat naturally with an AI about saving, budgeting, and spending habits.
* ☁️ **Backend API** – Powered by **Node.js + Express** and **Neon PostgreSQL** for reliable data handling.

---

## 🧩 Project Structure

### 🧠 Backend (`/backend`)

<pre class="overflow-visible!" data-start="1278" data-end="1652"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>/backend
├── src
│   ├── controllers
│   │   ├── transactionController.js
│   │   ├── aiAdvisorController.js
│   │   └── aiChatController.js
│   ├── models
│   │   └── </span><span>Transaction</span><span>.js
│   ├── routes
│   │   ├── transactionRoutes.js
│   │   ├── aiAdvisorRoutes.js
│   │   └── aiChatRoutes.js
│   ├── config
│   │   └── db.js
│   └── </span><span>server</span><span>.js
├── .env
└── package.json
</span></span></code></div></div></pre>

### 📱 Frontend (`/app`)

<pre class="overflow-visible!" data-start="1679" data-end="2025"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>/app
├── (root)
│   ├── </span><span>index</span><span>.jsx
│   ├── ai-advisor.jsx
│   ├── ai-chat.jsx
│   └── </span><span>create</span><span>.jsx
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
</span></span></code></div></div></pre>

---

## ⚙️ Backend Setup

<pre class="overflow-visible!" data-start="2053" data-end="2087"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> backend
npm install
</span></span></code></div></div></pre>

Create a `.env` file:

<pre class="overflow-visible!" data-start="2111" data-end="2201"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>PORT</span><span>=</span><span>5001</span><span>
</span><span>DATABASE_URL</span><span>=your_postgres_connection_url
</span><span>GEMINI_API_KEY</span><span>=your_gemini_key
</span></span></code></div></div></pre>

Run the development server:

<pre class="overflow-visible!" data-start="2231" data-end="2254"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm run dev
</span></span></code></div></div></pre>

---

## 📱 Mobile App Setup (Expo)

<pre class="overflow-visible!" data-start="2292" data-end="2346"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> CashBoss-App
npm install
npx expo start
</span></span></code></div></div></pre>

---

## 🧠 API Endpoints (Examples)

| Method           | Endpoint                              | Description                               |
| ---------------- | ------------------------------------- | ----------------------------------------- |
| **GET**    | `/api/transactions/:userId`         | Get all transactions for a user           |
| **GET**    | `/api/transactions/summary/:userId` | Get income, expenses, and balance summary |
| **POST**   | `/api/transactions`                 | Create a new transaction                  |
| **DELETE** | `/api/transactions/:id`             | Delete a specific transaction             |
| **GET**    | `/api/ai/advice/:userId`            | Get personalized AI financial advice      |

---

## 🧩 Common Issues & Fixes

### ❌ Network request failed / JSON Parse error

**Cause:** The app received HTML instead of JSON.

**Fix:**

* Ensure backend is running and `/api/health` returns JSON.
* Verify `API_URL` in `/constants/api.js` is correct (use `10.0.2.2` for Android emulator).
* Check backend logs for 404/500 errors.

### ❌ AI / Gemini Errors

* Make sure `GEMINI_API_KEY` exists in `.env`.
* Restart server after adding the key.
* Check server logs for SDK errors.

### ❌ CORS Errors

Add in backend:

<pre class="overflow-visible!" data-start="3367" data-end="3418"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-js"><span><span>import</span><span> cors </span><span>from</span><span></span><span>"cors"</span><span>;
app.</span><span>use</span><span>(</span><span>cors</span><span>());
</span></span></code></div></div></pre>

### 💡 Emulator Networking Tips

* **Android Emulator →** use `http://10.0.2.2:5001/api`
* **Physical Device →** use your **local IP address**

---

## 🌟 Future Work

Here are **3 recommended future improvements** to make *CashBoss* even more powerful:

1. 🧾 **Recurring Transactions & Bill Reminders**

   Allow users to set automatic monthly payments or reminders for upcoming bills.
2. 📈 **Advanced Financial Analytics Dashboard**

   Visualize spending patterns, category-based insights, and predictive budgeting using charts and ML forecasting.
3. 🌍 **Cloud Sync & Multi-Device Access**

   Let users sync their financial data securely across multiple devices with real-time updates.

---

## 🎥 Demo & Presentation

* 🔗 **Live Demo:** [ https://drive.google.com/file/d/1Eeku1mI6VyXzhiWKGamq5Jdzq-E0ATcK/view?usp=sharingAdd your demo link her ]
* 🧾 **Presentation Slides:** [ https://docs.google.com/presentation/d/1S0XdDQx5_QZWGWZClfoMMtWdKHeBJlib/edit?usp=sharing&ouid=113364148737647477316&rtpof=true&sd=true ]

---

## 🧑‍💻 Tech Stack

**Frontend:** React Native (Expo)

**Backend:** Node.js + Express

**Database:** PostgreSQL (Neon)

**AI Engine:** Google Gemini API

**Auth:** Clerk

**Deployment:** Render (API), Expo Go (Mobile)
