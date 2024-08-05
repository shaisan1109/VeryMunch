import Restaurant from './schema_restaurant.js';

// Get all restaurants from db
export const getAllRestos = async () => {
    const resto = await Restaurant.find().lean();
    return resto;
}

// Get specific restaurant with id
export const getRestoById = async (id) => {
    const resto = await Restaurant.findById(id).lean();
    return resto;
}

// Get specific restaurant with id PLUS menu
export const getRestoWithMenu = async (id) => {
    const resto = await Restaurant.findById(id).populate("menu").lean();
    return resto;
}

export default { getAllRestos, getRestoById, getRestoWithMenu };