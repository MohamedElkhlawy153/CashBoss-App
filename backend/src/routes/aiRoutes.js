// aiRoutes
import express from 'express';
import { getAIAdvice } from "../controllers/aiAdvisorController.js";
import { getAIChatReply } from "../controllers/aiChatController.js";

const router = express.Router();

// Route for AI Advice
router.get('/advice/:userId', getAIAdvice);

// Route for AI Chat
router.post('/chat', getAIChatReply);

export default router;
