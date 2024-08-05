import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

// Last parameter refers to the table being used in the actual DB
const Review = model("Review", reviewSchema, 'reviews');

export default Review;