# BaaS Task Tracker

A modern, full-stack task tracking application built with **Next.js** and **Firebase** (Backend-as-a-Service).

## Features

- **Real-Time Updates**: Instant state synchronization across clients using Cloud Firestore.
- **Authentication**: Secure user login and signup powered by Firebase Auth.
- **Server-Side Rendering (SSR)**: High performance and optimized initial load times with Next.js.
- **Persistent Data**: Secure database storage for tasks, categories, and user preferences.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend (BaaS)**: Firebase (Authentication, Firestore Database)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Felicien407/BaaS-task-tracker.git](https://github.com/Felicien407/BaaS-task-tracker.git)
   cd BaaS-task-tracker
   ```
2. **Install dependencies:**
```bash
  npm install
```
3. **Configure Environment Variables:**
Create a .env.local file in the root directory and add your Firebase configuration details:

```Code snippet
  NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
4. **Run the development server:**

```bash
  npm run dev
```
5. **Open http://localhost:3000 in your browser to view the app.**

### License