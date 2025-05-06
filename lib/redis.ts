import { Redis } from "ioredis";

if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not defined in the environment variables");
}

const redis = new Redis(process.env.REDIS_URL !);
redis.on("connect",() =>{
    console.log("Connected to Redis");
})
redis.on("error",(error) =>{
    console.error("Cant connect to Redis",error)
})
export default redis;