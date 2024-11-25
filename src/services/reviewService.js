import Review from '../models/Review.js';

const reviewService = {

    async createReview(reviewData){
        const reviews = new Review(reviewData);
        return reviews;
    },

    async saveReview(reviews){
        await reviews.save();
        return reviews;
    },
    
    async getReviewsByProduct(productId){
        const filter = { productId };

        if (ratingFilter) {
            filter.rating = ratingFilter;

            const reviews = await Review.find(filter).populate('userId', 'name email');
            return reviews;
        }

        const reviews = await Review.find(productId)
                .populate('userId', 'name email')
                .sort({ rating: -1 });

        return reviews;
    },
    
}

export default reviewService
