import express from 'express';
import { confirmPayment } from "./ConfirmPayment.js";
import { createPayment } from "./CreatePayment.js";
import { refundPayment } from "./RefundPayment.js";
import { getRefundsByPaymentIntent } from "./GetRefundsByPaymentIntent.js";
import { getAllPayments } from "./GetAllPayments.js";
import { getPaymentById } from "./GetPaymentById.js";
import { catchAsync } from '../../middlewares/catchAsync.js';
const router = express.Router();

router.get('/', catchAsync(getAllPayments));
router.get('/:paymentIntentId', catchAsync(getPaymentById));
router.post('/confirm', catchAsync(confirmPayment));
router.post('/create', catchAsync(createPayment));
router.post('/refund', catchAsync(refundPayment));
router.get('/refund/payment-intent/:paymentIntentId', catchAsync(getRefundsByPaymentIntent));
export default router;
