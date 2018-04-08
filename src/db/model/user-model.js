import mongoose from 'mongoose';

const UserModel = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    persistedFaceId: {
        type: String,
        required: true
    },
    highScores: {
        addition: { type: Number },
        subtraction: { type: Number },
        multiplication: { type: Number }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserModel);
