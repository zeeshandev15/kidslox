import express from 'express';

import {
  createInventory,
  deleteInventory,
  getCustomerById,
  getCustomers,
  updateInventory,
} from '../../../controllers/stockController.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createInventory);

router.get('/', getCustomers);
router.get('/:id', getCustomerById);

router.put('/:id', upload.single('image'), updateInventory);

router.delete('/:id', deleteInventory);

export default router;
