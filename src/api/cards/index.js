import express from 'express';
import { assignCard } from "./addCardForCustomer.js"; 
import { cardDefault } from "./cardDefaultForCustomer.js";
import { getCards } from "./getCardsByUserId.js";
import { create } from "./createCard.js";
import { catchAsync } from '../../middlewares/catchAsync.js';
const router = express.Router();

router.post('/assign', catchAsync(assignCard)); 
router.post('/default', catchAsync(cardDefault));
router.get('/:id', catchAsync(getCards));
router.post('/create', catchAsync(create));
export default router;
