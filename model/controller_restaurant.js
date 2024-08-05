import Restaurant from './schema_restaurant.js';

// export const getUser = async (email) => {
// 	const user = await Restaurant.findOne({ 'login.email': email }).lean();
// 	return user;
// };

// Get all restaurants from db
export const getAllRestos = async () => {
    const resto = await Restaurant.find().lean();
    return resto;
}

// Get specific restaurant with name
export const getRestoByName = async () => {
    const resto = await Restaurant.findOne().lean();
    return resto;
}

export default { getAllRestos, getRestoByName };