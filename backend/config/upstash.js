import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import 'dotenv/config';

// Create a new Ratelimit instance and set rate limit to 10 requests per minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10,'60 s'),
})

export default ratelimit;