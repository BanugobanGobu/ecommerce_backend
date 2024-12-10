import Bull from "bull";
import 'dotenv/config';

const redisConfig = {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD ?? 'Alternative Password',
    db: Number(process.env.REDIS_DB) || 0,
};

const productQueue = new Bull('productQueue', {
    redis: redisConfig,
});

export default productQueue;