# ✨ Learniverse

An AI-powered adaptive learning platform that generates personalized courses, quizzes, feedback, and progress insights for learners.

Built with:

- React + Vite
- Material UI
- FastAPI
- MongoDB
- OpenAI-powered learning generation

---

# 🚀 Features

## 🔐 Authentication

- Learner registration
- Learner login
- Persistent learner session

---

## 📚 AI Course Generation

Generate personalized courses based on:

- Skill
- Difficulty level
- Number of modules

Each generated course contains:

- Structured learning modules
- References/resources
- Estimated learning time

---

## 🧠 AI Quiz Generation

Each module supports AI-generated quizzes with:

- Adaptive questions
- Difficulty-based evaluation
- Concept understanding checks

---

## ✨ AI Feedback System

Learners receive intelligent feedback including:

- Strengths
- Weak areas
- Conceptual gaps
- Motivation feedback
- Improvement suggestions
- Next learning recommendations

---

## 📈 Progress Tracking

Track:

- Completed modules
- Completion percentage
- Average score
- AI-generated learning analysis

---

## 🎨 Modern UI

- Fully responsive design
- Dark futuristic glassmorphism theme
- Animated loaders
- Mobile-friendly experience

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Material UI
- React Query
- Axios
- Vite

## Backend

- FastAPI
- MongoDB
- Motor
- Pydantic

---

# 📂 Project Structure

## Frontend

```bash
src/
│
├── components/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

## Backend

```bash
app/
│
├── database/
├── models/
├── routes/
├── services/
└── main.py
```

---

# ⚙️ Frontend Setup

## 1. Clone Repository

```bash
git clone <repo-url>
cd learniverse-frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Create:

```bash
.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 4. Run Frontend

```bash
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

---

# ⚙️ Backend Setup

## 1. Navigate to Backend

```bash
cd learniverse-backend
```

---

## 2. Create Virtual Environment

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Create Environment File

Create:

```bash
.env
```

Add:

```env
MONGO_URL=<your_mongodb_connection>

OPENAI_API_KEY=<your_openai_api_key>
```

---

## 5. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```txt
http://localhost:8000
```

---

# 📡 API Endpoints

# 🔐 Authentication

## Register

```http
POST /register
```

### Body

```json
{
  "name": "Akanksha",
  "email": "test@example.com"
}
```

---

## Login

```http
POST /login
```

### Body

```json
{
  "email": "test@example.com"
}
```

---

# 📚 Courses

## Generate Course

```http
POST /generate-course
```

### Body

```json
{
  "learner_id": "learner_id",
  "skill": "ReactJS",
  "level": "Beginner",
  "num_of_modules": 5
}
```

---

## Fetch All Courses

```http
GET /courses/{learner_id}
```

### Response

```json
[
  {
    "_id": "course_id",
    "course_title": "ReactJS Fundamentals",
    "level": "Beginner",
    "total_modules": 5,
    "completed_modules": 2
  }
]
```

---

## Fetch Single Course

```http
GET /course/{learner_id}/{course_id}
```

---

# 🧠 Quiz

## Generate Quiz

```http
POST /generate-quiz
```

### Body

```json
{
  "learner_id": "learner_id",
  "course_id": "course_id",
  "module_title": "Introduction to React",
  "skill_name": "ReactJS Fundamentals"
}
```

---

# ✨ Feedback

## Generate Feedback

```http
POST /generate-feedback
```

### Body

```json
{
  "learner_id": "learner_id",
  "course_id": "course_id",
  "module_title": "Introduction to React",
  "qa_pairs": []
}
```

---

# 📈 Progress

## Fetch Progress

```http
GET /progress/{learner_id}/{course_id}
```

### Response Includes

- Completion percentage
- Average score
- Strengths
- Weak areas
- Improvement trends
- AI recommendations
- Motivation feedback

---

# 🌍 Deployment

## Frontend Deployment (GitHub Pages)

### Install gh-pages

```bash
npm install gh-pages --save-dev
```

---

### Deploy

```bash
npm run deploy
```

---

## Backend Deployment

Recommended platforms:

- Render
- Railway
- Fly.io

---

# 🎯 Future Improvements

- AI learning roadmap generation
- Video recommendations
- Gamification
- Daily streaks
- Leaderboards
- AI tutor chat
- Notes and bookmarks
- Certificate generation

---

# 👩‍💻 Author

Built by Akanksha C ✨