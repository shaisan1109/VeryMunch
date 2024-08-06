import Restaurant from './schema_restaurant.js';
import Menu from './schema_menu.js'; 
import Review from './schema_review.js'; 

// Get all restaurants from db
export const getAllRestos = async () => {
    try {
        const restos = await Restaurant.find().lean();
        return restos;
    } catch (error) {
        throw new Error('Error fetching restaurants');
    }
};

// Get specific restaurant with id
export const getRestoById = async (id) => {
    try {
        const resto = await Restaurant.findById(id).lean();
        return resto;
    } catch (error) {
        throw new Error('Error fetching restaurant by id');
    }
};

// Get specific restaurant with id, menu, and reviews
export const getRestoWithMenuAndReviews = async (id) => {
    try {
        const result = await Restaurant.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'menus', // Collection name for Menu
                    localField: 'menu',
                    foreignField: '_id',
                    as: 'menuItems'
                }
            },
            {
                $lookup: {
                    from: 'reviews', // Collection name for Review
                    localField: 'reviews',
                    foreignField: '_id',
                    as: 'reviewItems'
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $avg: '$reviewItems.rating'
                    },
                    reviewCount: {
                        $size: '$reviewItems'
                    }
                }
            }
        ]).exec();

        return result[0]; // Aggregation returns an array
    } catch (error) {
        throw new Error('Error fetching restaurant with menu and reviews');
    }
};

export default { getAllRestos, getRestoById, getRestoWithMenuAndReviews };
