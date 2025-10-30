import mongoose from 'mongoose';

const dispenserConfigSchema = new mongoose.Schema({
    dispenserId: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 4
    },
    intervalSeconds: {
        type: Number,
        required: true,
        min: 1,
        default: 3600
    }
}, {
    timestamps: true
});

export default mongoose.models.DispenserConfig || mongoose.model('DispenserConfig', dispenserConfigSchema);