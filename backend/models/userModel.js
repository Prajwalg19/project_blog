import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    userPfp: {type: String, default: null}
},
    {
        timestamps: true
    })


const userModel = mongoose.model("user", userSchema);
export default userModel;

