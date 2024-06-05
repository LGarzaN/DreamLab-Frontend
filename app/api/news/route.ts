import { NextRequest } from "next/server";
import mongoose from "mongoose";
import News from "./model";

export async function GET(req: NextRequest) {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });
        if (req.headers.get("source" ) === "admin") {
            console.log("admin");
            const news = await News.find();
            return new Response(JSON.stringify(news), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } else {
            const news = await News.find({shown: true});
            return new Response(JSON.stringify(news), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        
    } catch (e) {
        console.log(e);
        return new Response("Unauthorized", {
            status: 401
        });
    }
}

export async function PUT(req: Request) {
    //find the news by id and update the "shown" field to the value found in the body of the request
    try {
        const body = await req.json();
        const id = body._id;
        const shown = body.shown;
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });
        const news = await News.findByIdAndUpdate(id, {shown: shown});
        return new Response(JSON.stringify(news), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    catch (e) {
        console.log(e);
        return new Response("Unauthorized", {
            status: 401
        });
    }
}

export async function POST(req: Request) {
    //create a new news item
    try {
        const body = await req.json();
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });
        const news = new News(body);
        await news.save();
        return new Response(JSON.stringify(news), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    catch (e) {
        console.log(e);
        return new Response("Unauthorized", {
            status: 401
        });
    }
}

export async function DELETE(req: Request) {
    //delete a news item by id
    try {
        const body = await req.json();
        const id = body._id;
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });
        const news = await News.findByIdAndDelete(id);
        return new Response(JSON.stringify(news), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    catch (e) {
        console.log(e);
        return new Response("Unauthorized", {
            status: 401
        });
    }
}