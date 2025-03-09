import mongoose from "mongoose"

// Only initialize the model once
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    emailVerified: Date,
    signupDate: {
        type: Date,
        default: Date.now,
    },
    lastLogin: Date,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    preferences: {
        theme: {
            type: String,
            enum: ["light", "dark", "system"],
            default: "system",
        },
        notifications: {
            type: Boolean,
            default: true,
        },
    },
    // Fields for tracking early access status
    earlyAccess: {
        type: Boolean,
        default: true,
    },
    earlyAccessSignupDate: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)

