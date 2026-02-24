import express from 'express';
import { createCustomer } from "./createCustomer.js";
import { deleteCustomer } from "./deleteCustomer.js";
import { updateCustomer } from "./updateCustomer.js";
import { getCustomerById } from "./getCustomerById.js";
import { getAllCustomers } from "./getAllCustomers.js";
const router = express.Router();

router.post('/create', createCustomer);
router.delete('/delete', deleteCustomer);
router.put('/update', updateCustomer);
router.get('/:id', getCustomerById);
router.get('/', getAllCustomers);
export default router;
