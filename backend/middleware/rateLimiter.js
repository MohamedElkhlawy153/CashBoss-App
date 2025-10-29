import ratelimit from "../config/upstash.js";

// Rate Limiter Middleware
const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit-key");
        if (!success) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }
        next();
    } catch (error) {
        console.error('Rate Limiter Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default rateLimiterMiddleware;
