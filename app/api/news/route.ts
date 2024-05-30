import { NextRequest } from "next/server";
import mongoose from "mongoose";
import News from "./model";

export async function GET(req: NextRequest) {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });
        const news = await News.find();
        console.log(news);
        return new Response(JSON.stringify(news), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        
    } catch (e) {
        console.log(e);
        return new Response("Unauthorized", {
            status: 401
        });
    }
}