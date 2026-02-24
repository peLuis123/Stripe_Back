import express from 'express';
import { confirmPayment } from "./ConfirmPayment.js";
import { createPayment } from "./CreatePayment.js";
import { catchAsync } from '../../middlewares/catchAsync.js';
const router = express.Router();

router.post('/confirm', catchAsync(confirmPayment));
router.post('/create', catchAsync(createPayment));
export default router;
