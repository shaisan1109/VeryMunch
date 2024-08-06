import Review from './schema_review.js';
import User from './schema_user.js';

export const getReviewsByRestaurantId = async (restaurantId) => {
    try {
        const reviews = await Review.find({ restaurantId }).populate('userId', 'firstName lastName').lean();
        return reviews;
    } catch (error) {
        throw new Error('Error fetching reviews');
    }
};

export const getAverageRatingAndCounts = async (restaurantId) => {
    try {
        const reviews = await Review.find({ restaurantId }).lean();
        const totalReviews = reviews.length;
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let totalRating = 0;

        reviews.forEach(review => {
            totalRating += review.rating;
            ratingCounts[review.rating] += 1;
        });

        const averageRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : 0;
        return { averageRating, ratingCounts, totalReviews };
    } catch (error) {
        throw new Error('Error calculating ratings');
    }
};

export default { getReviewsByRestaurantId, getAverageRatingAndCounts };
