import mongoose from 'mongoose';

const notAllowedSchema = new mongoose.Schema({
    notAllowed_name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const NotAllowed = mongoose.model('NotAllowed', notAllowedSchema);

export default NotAllowed;
