import { Request, Response } from 'express';
import { addRequest, getAllRequests, acceptAidRequest } from '../services/microAidService';

// Controller to handle creating a new micro-aid request
export const createRequest = (req: Request, res: Response) => {
  const { description, location, userId } = req.body; // Input from the request body
  const newRequest = addRequest({ description, location, userId });
  res.status(201).json(newRequest);
};

// Controller to handle retrieving all micro-aid requests
export const getRequests = (req: Request, res: Response) => {
  const requests = getAllRequests();
  res.json(requests);
};

// Controller to handle accepting a micro-aid request
export const acceptRequest = (req: Request, res: Response) => {
  const { id } = req.params; // Request ID from the URL parameter
  const { volunteerId } = req.body; // Volunteer ID from the request body
  const result = acceptAidRequest(id, volunteerId);

  if (result) {
    res.json({ message: 'Request accepted successfully', request: result });
  } else {
    res.status(404).json({ message: 'Request not found' });
  }
};
