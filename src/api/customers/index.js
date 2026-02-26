import express from 'express';
import { createCustomer } from "./createCustomer.js";
import { deleteCustomer } from "./deleteCustomer.js";
import { updateCustomer } from "./updateCustomer.js";
import { getCustomerById } from "./getCustomerById.js";
import { getAllCustomers } from "./getAllCustomers.js";
import { catchAsync } from '../../middlewares/catchAsync.js';
const router = express.Router();

router.post('/create', catchAsync(createCustomer));
router.delete('/delete', catchAsync(deleteCustomer));
router.put('/update', catchAsync(updateCustomer));
router.get('/:id', catchAsync(getCustomerById));
router.get('/', catchAsync(getAllCustomers));
export default router;
