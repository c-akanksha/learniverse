import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const apis = {
  health: () => api.get("/"),
  createLearner: (data) => api.post("/api/learner/create", data),
  loginLearner: (data) => api.post("/api/learner/login", data),
  generateCourse: (data) => api.post("/api/learning/generate-course", data),
  fetchAllCourses: (learnerId) => api.get(`/api/learning/${learnerId}`),
  fetchCourse: (learnerId, courseId) => api.get(`/api/learning/${learnerId}/${courseId}`),
  generateQuiz: (data) => api.post("/api/generate/question", data),
  generateFeedback: (data) => api.post("/api/generate/feedback", data),
  generateProgress: (learnerId, courseId) =>
    api.get(`/api/progress/generate/${learnerId}/${courseId}`),
};

export default apis;
