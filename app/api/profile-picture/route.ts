import mongoose from "mongoose";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
import ProfilePicture from "./model";

export async function GET(req: NextRequest) {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });

        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
              return new Response("Unauthorized", {
                  status: 401
              })
        }
        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = data.payload.userId

        const img = await ProfilePicture.findOne({userId: userId});
        if (!img) {
            return new Response("No profile picture found", {
                status: 404
            });
        }
        return new Response(img.profilePicture, {
            headers: {
                "Content-Type": "image/png"
            }
        });

    } catch (e) {
        console.log(e);
        return new Response("Unauthorized", {
            status: 401
        });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
              return new Response("Unauthorized", {
                  status: 401
              })
        }
        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = data.payload.userId

        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'DreamLab',
          });
        const img = await ProfilePicture.findOneAndUpdate({userId: userId}, {profilePicture: body.profilePicture}, {new: true, upsert: true});
        return new Response(JSON.stringify(img), {
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