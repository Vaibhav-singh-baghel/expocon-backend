import mongoose from 'mongoose';

const howUsSchema = new mongoose.Schema({
    howUs_name: {
        type: String,
        required: true,
        unique: true,
    },
    howUs_status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const HowUs = mongoose.model('HowUs', howUsSchema);

export default HowUs;