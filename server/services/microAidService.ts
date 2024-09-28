interface MicroAidRequest {
    id: string;
    description: string;
    location: string;
    userId: string;
    status: 'pending' | 'accepted';
    volunteerId?: string;
  }
  
  let requests: MicroAidRequest[] = [];
  
  // Service to add a new micro-aid request
  export const addRequest = (request: Omit<MicroAidRequest, 'id' | 'status'>): MicroAidRequest => {
    const newRequest: MicroAidRequest = {
      id: (requests.length + 1).toString(),
      ...request,
      status: 'pending'
    };
    requests.push(newRequest);
    return newRequest;
  };
  
  // Service to get all micro-aid requests
  export const getAllRequests = (): MicroAidRequest[] => {
    return requests;
  };
  
  // Service to accept a micro-aid request
  export const acceptAidRequest = (id: string, volunteerId: string): MicroAidRequest | null => {
    const request = requests.find(req => req.id === id);
  
    if (request && request.status === 'pending') {
      request.status = 'accepted';
      request.volunteerId = volunteerId;
      return request;
    }
  
    return null;
  };
  