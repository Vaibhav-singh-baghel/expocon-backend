import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    badge_category: {
        type: String,
        required: true,
        unique: true,
    },
    badge_status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;