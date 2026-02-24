import express from 'express';
import { assignCard } from "./addCardForCustomer.js"; 
import { cardDefault } from "./cardDefaultForCustomer.js";
import { getCards } from "./getCardsByUserId.js";
import { create } from "./createCard.js";
const router = express.Router();

router.post('/assign', assignCard); 
router.post('/default', cardDefault);
router.get('/:id', getCards);
router.post('/create', create);
export default router;
