import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    ordered: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Review = model("Review", reviewSchema, 'reviews');

export default Review;
