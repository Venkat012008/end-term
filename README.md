# AI Study Planner — Smart Exam-Aware Assistant 🎓🤖

A full-stack, AI-powered study planner built with **React**, **Firebase**, and **Google Gemini API**. This app helps students manage their syllabus, track task priority with spaced repetition, and leverage AI for summaries and flashcards.

## 🚀 Features

- **AI Tools**: Generate summaries, practice questions, and flashcards from your notes using Gemini 1.5 Flash.
- **Study Database**: Save AI-generated content directly to Firestore.
- **Spaced Repetition**: Automatic revision scheduling when tasks are completed.
- **Advanced Dashboard**: Real-time progress tracking, subject mastery charts, and smart insights.
- **Premium UI**: Dark-themed, responsive design with smooth Framer Motion animations.
- **Performance**: Optimized with code splitting, memoization, and skeleton loaders.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Firebase Auth, Firestore.
- **AI**: Google Gemini API (Generative Language API).
- **Deployment**: Vercel ready.

## 📦 Vercel Deployment Instructions

To deploy this project to Vercel, follow these steps:

1. **Push to GitHub**: (Already done) Your code is at `https://github.com/Venkat012008/Study`.
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New" -> "Project"**.
   - Import your `Study` repository.
3. **Configure Environment Variables**:
   In the Vercel project settings, add the following variables from your `.env` file:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GEMINI_API_KEY`
4. **Deploy**: Vercel will automatically detect the Vite build settings and deploy your app.

## 🔧 Local Setup

1. Clone the repo.
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`.
4. Start development: `npm run dev`

## 📄 License
MIT
