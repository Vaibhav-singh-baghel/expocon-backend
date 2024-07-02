import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true,
        unique: true,
    },
    user_password: {
        type: String,
        required: true,
    }, 
    user_status: {
        type: Boolean, 
        default: true,
    },
    user_role: {
        type: String,
        default: "user",
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
