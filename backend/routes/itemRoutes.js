import express from 'express';
import { getAllItems, getItem, createItem, updateItem, deleteItem } from '../controllers/item.controller.js';
const router = express.Router();

import {itemValidationRules} from '../middleware/validators/itemValidator.js';
import validate from '../middleware/validators/validate.js';

import { verifyToken, requireRole } from '../middleware/auth.js';

router.get('/', getAllItems);
router.get('/:id', getItem);
router.post('/', 
    verifyToken,
    requireRole('archivist', 'admin'), 
    itemValidationRules, 
    validate, 
    createItem
);
router.put('/:id', 
    verifyToken,
    requireRole('archivist', 'admin'), 
    itemValidationRules, 
    validate, 
    updateItem
);
router.delete('/:id', 
    verifyToken,
    requireRole('archivist', 'admin'), 
    deleteItem
);

export default router;