import mongoose from "mongoose";

// schema with userid: int, and profile picture which is in base64 format
const ppSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.ProfilePicture || mongoose.model("ProfilePicture", ppSchema);;