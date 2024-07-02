import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    certificate_category: {
        type: String,
        required: true,
    },
    certificate_status: {
        type: Boolean,
        default: true, 
    }
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
