import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const catSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

// Last parameter refers to the table being used in the actual DB
const Category = model("Category", catSchema, 'categories');

export default Category;