import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    shown: Boolean,
    deleted: Boolean,
    image: String,
});

export default mongoose.models.News || mongoose.model("News", newsSchema);;