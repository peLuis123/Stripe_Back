import express from 'express';
import { confirmPayment } from "./ConfirmPayment.js";
import { createPayment } from "./CreatePayment.js";
const router = express.Router();

router.post('/confirm', confirmPayment);
router.post('/create', createPayment);
export default router;
