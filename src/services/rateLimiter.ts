
import Redis from "ioredis"


export const redis = new Redis(process.env.REDIS_URL)
    const REDIS_KEYS = {
    rateLimit: (tag:string)=> `tb:rate_limiter:${tag}`
}

interface Rate_L_Config_Item{
expireTime:number;
maxTries:number;
userId:string;
tag:string;
}
export default async  function  checkAllRateLimts(config:Rate_L_Config_Item[] ){
        for ( const item of config){
            const tag = item.userId +":"+item.tag
            if(await isRateLimited(tag, item.expireTime, item.maxTries)){
        return true
            }
        }
        return false


}


export async function isRateLimited (tag:string, expireTime:number, maxTries:number):Promise<boolean>{
    const tries = await redis.incrby(REDIS_KEYS.rateLimit(tag), 1);
    if(tries === 1){
        redis.expire(REDIS_KEYS.rateLimit(tag), expireTime);
    }
    return tries > maxTries;
    

}