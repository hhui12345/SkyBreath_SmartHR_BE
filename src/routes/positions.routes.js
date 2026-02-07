import express from 'express';
import * as positionsController from '../controllers/positions.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// Get positions list (simple: id, position_name only)
router.get('/list', authenticate, positionsController.getPositionsList);

// Get positions with pagination and search
router.get('/', authenticate, positionsController.getPositionsWithPagination);

// Get position by ID
router.get('/:id', authenticate, positionsController.getPositionById);

export default router;
