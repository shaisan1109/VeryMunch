import Menu from './schema_menu.js';

// Get specific restaurant with name
export const getFoodByResto = async (restaurantId) => {
    const resto = await Menu.find({ restaurantId }).lean();
    return resto;
}

export default { getFoodByResto };