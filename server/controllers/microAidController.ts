import { Request, Response } from 'express';
import { addRequest, getAllRequests, acceptAidRequest } from '../services/microAidService';
import { emailService } from '../services/emailService';

// Controller to handle creating a new micro-aid request
export const createRequest = (req: Request, res: Response) => {
  const { description, location, username } = req.body; // Input from the request body
  const newRequest = addRequest({ description, location, username });
  try {
    const to = "karankamboj289@gmail.com"
    const subject = "New Request Arrived"
    const html = "<html><body>Description: "+description+" Location: "+location+" by Username:"+username+"</body></html>"
    emailService.sendMail(to, subject, html);
  } catch (error) {
    console.log("Failed to send the email")
  }
  res.status(201).json(newRequest);
};

// Controller to handle retrieving all micro-aid requests
export const getRequests = (req: Request, res: Response) => {
  const requests = getAllRequests();
  res.json(requests);
};

// Controller to handle retrieving requests for a particular user
export const getUserRequests = (req: Request, res: Response) => {
  const { username } = req.params;
  const userRequests = getAllRequests().filter(req => req.username === username); // Filter requests by username

  if (userRequests.length === 0) {
    return res.status(404).json({ message: 'No requests found for this user.' });
  }

  res.status(200).json(userRequests); // Return the filtered requests
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
