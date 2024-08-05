import Category from './schema_category.js';

// Get all categories from db
export const getAllCategories = async () => {
    const category = await Category.find().lean();
    return category;
}

export default { getAllCategories };