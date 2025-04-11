# ☕ BuyMeaTea

BuyMeaTea is a web platform where content creators can receive cryptocurrency donations from supporters, inspired by BuyMeACoffee. Built with Next.js, Tailwind CSS, and MongoDB, it supports Google OAuth authentication via NextAuth.js, image uploads with Cloudinary, and crypto payments via NowPayments.

 **Live Demo**: [https://buymeatea.vercel.app](https://buymeatea.vercel.app)

---

## Features

-  **Google OAuth** authentication using NextAuth.js
-  Creator profiles with **Cloudinary** image uploads
-  Cryptocurrency donations via **NowPayments API**
-  Donation history tracking
-  Responsive design with **Tailwind CSS**
-  Serverless backend with **Next.js API routes**
-  Secure environment variable management

---

## 🛠 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes (serverless), MongoDB (Mongoose)
- **Authentication**: Google OAuth with NextAuth.js
- **Image Hosting**: Cloudinary
- **Crypto Payments**: NowPayments API
- **Deployment**: Vercel

---

## Project Structure
```
src/
├── components/      # Reusable UI components
├── actions/         # Backend logic helpers (e.g., database calls)
├── models/          # Mongoose schemas for MongoDB
├── pages/
│   ├── api/         # API routes (auth, user, donations)
│   └── ...          # Frontend pages
├── styles/          # Global CSS and Tailwind config
└── utils/           # Database connection, helpers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.x)
- MongoDB Atlas account
- Cloudinary account
- NowPayments account
- Google Cloud Console for OAuth credentials
- pnpm (or npm/yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/myself-jay7/buymeatea.git
cd buymeatea
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# Google OAuth (NextAuth.js)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_uri

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# NowPayments
NOWPAYMENTS_API_KEY=your_nowpayments_api_key
```

> **Tip**: Generate a random `NEXTAUTH_SECRET` with `openssl rand -base64 32`.  

### 3. Run Locally

```bash
pnpm dev

```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁ Deploying to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/import) and import `buymeatea`.
3. Add the `.env.local` variables in Vercel’s **Settings > Environment Variables**.
4. Click **Deploy**.

Vercel handles:
- Hosting the Next.js frontend
- Serverless API routes
- Automatic scaling and redeploys

> **Note**: Update `NEXTAUTH_URL` to your Vercel deployment URL (e.g., `https://buymeatea.vercel.app`).

---

##  Developer Notes

- **MongoDB**: Ensure Atlas allows Vercel’s IP range or set to `0.0.0.0/0` (for dev only).
- **Cloudinary**: Uploads are secured via signed backend API calls.
- **NowPayments**: Crypto transactions use their REST API.
- **OAuth**: Test locally with `http://localhost:3000` before deploying.
- **Debugging**: Check Vercel logs for serverless function errors.
```
---

##  Screenshots


---
```
##  Credits

Built by [@myself-jay7](https://github.com/myself-jay7)  
Inspired by BuyMeACoffee, reimagined for crypto creators ☕💸

---

##  License

This project is licensed under the [MIT License](LICENSE).


---
