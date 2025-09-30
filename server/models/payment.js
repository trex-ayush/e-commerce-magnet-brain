const moongose = require('mongoose');

const paymentSchema = new moongose.Schema({
    orderId: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Stripe'],
        required: true
    },
    stripePaymentId: {
        type: String
    }
}, { timestamps: true });

module.exports = moongose.model('Payment', paymentSchema);