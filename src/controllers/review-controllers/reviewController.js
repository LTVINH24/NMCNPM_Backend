import reviewService from '../../services/reviewService.js';
// import orderService from '../../services/orderService.js';       Kiểm tra đơn hàng người dùng

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const createReview = async (req, res) => {
    try {
        const reviewData = {
            productId: req.body.productId,
            userId: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment,
        };

        // Check if the user has purchased the product
        // const hasPurchased = await orderService.checkIfUserPurchasedProduct(userId, productId);

        // if (!hasPurchased) {
        //     return res.status(BAD_REQUEST_STATUS).send({
        //         message: 'You can only review products that you have purchased.',
        //     });
        // }


        const reviews = await reviewService.createReview(reviewData);

        return res.status(SUCCESS_STATUS).send({
            reviews,
        });
    } 
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};

export { createReview };


const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const ratingFilter = req.query.rating ? parseInt(req.query.rating) : null;

        const reviews = await reviewService.getReviewsByProduct({
            productId,
            ratingFilter,
        });

        return res.status(SUCCESS_STATUS).send(reviews);
    } 
    catch (e) {
        res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};


export { createReview, getProductReviews };