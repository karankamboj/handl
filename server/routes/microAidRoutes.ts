import { Router } from 'express';
import { createRequest, getRequests, acceptRequest } from '../controllers/microAidController';

const router = Router();

// Endpoint to create a new micro-aid request
router.post('/request', createRequest);

// Endpoint to get all micro-aid requests
router.get('/request', getRequests);

// Endpoint to accept a micro-aid request
router.post('/request/:id/accept', acceptRequest);

export default router;
