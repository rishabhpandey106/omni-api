import { Redis } from '@upstash/redis/cloudflare';
import {Hono} from 'hono'
import { env } from 'hono/adapter';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const runtime = 'edge'

const app = new Hono().basePath('/api');
app.use('/*', cors());

type EnvConfig = {
    REDIS_TOKEN : string;
    REDIS_URL : string;
    DATABASE_URL : string;
}

app.get('/search' , async (c) => {

    try {
        const start = performance.now();
   
        const {REDIS_TOKEN , REDIS_URL} = env<EnvConfig>(c);
    
        const redis = new Redis({
            token: REDIS_TOKEN,
            url: REDIS_URL
        });
    
        const term = c.req.query('t')?.toUpperCase();
        console.log(term);
    
        if(!term)
            {
                return c.json({message: "Search Query Is Empty"},{status: 400});
            }
    
        const res = []
        const rank = await redis.zrank("terms" , term);
    
        if(rank !== null && rank !== undefined)
            {
                const suggestions = await redis.zrange<string[]>("terms" , rank , rank + 50)
    
                for(const suggestion of suggestions)
                    {
                        if(!suggestion.startsWith(term))
                            {
                                break
                            }
                        
                        if(suggestion.endsWith('*'))
                            {
                                res.push(suggestion.substring(0 , suggestion.length - 1));
                            }
                    }
            }
        
        const end = performance.now();
    
        return c.json({
            data: res,
            time: end - start
        } , {status: 200});

    } catch (error:any) {
        return c.json({error: error},{status: 500});
    }
})

app.get('/search/psql' , async (c) => {

    try {

        const {DATABASE_URL} = env<EnvConfig>(c);
    
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL,
        }).$extends(withAccelerate())

        const start = performance.now();
    
        const term = c.req.query('t')?.toString();
        console.log(term);
    
        if(!term)
            {
                return c.json({message: "Search Query Is Empty"},{status: 400});
            }

        const res = await prisma.terms.findMany({
            where: {
              name: {
                startsWith: term
              },
            },
            select: {
                name: true
            },
            take: 5,
            cacheStrategy: { swr: 300, ttl: 3600 }
          });
        
        console.log(res)
        
        const end = performance.now();

        const formattedRes = res.map(item => item.name);
    
        return c.json({
            data: formattedRes,
            time: end - start
        } , {status: 200});

    } catch (error:any) {
        return c.json({error: error},{status: 500});
    }
})

export const GET = handle(app)

export default app as never
