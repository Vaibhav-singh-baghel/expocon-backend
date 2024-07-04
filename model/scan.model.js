import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
    scan_id:{
        type: String,
        required: true,
        unique: true,
    },
    scan_category: {
        type: String,
        required: true,
        unique: true,
    },
    scan_type: {
        type: String,
        required: true,
    },
    scan_status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;