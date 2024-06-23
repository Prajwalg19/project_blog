import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    userPfp: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3dJ0r0uxQNbUzKe3t_cjTyB5GsreqHhzHg&s"}
},
    {
        timestamps: true
    })


const userModel = mongoose.model("user", userSchema);
export default userModel;

