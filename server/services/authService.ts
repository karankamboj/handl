interface User {
    id: string;
    username: string;
    password: string; // In production, this should be hashed
  }
  
  let users: User[] = []; // In-memory store for users
  
  // Service to handle user registration
  export const register = async (username: string, password: string): Promise<User> => {
    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    // Create a new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      password, // Store plain password for demonstration (hash in production)
    };
    users.push(newUser);
    return newUser;
  };
  
  // Service to handle user login
  export const login = async (username: string, password: string): Promise<string> => {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
  
    // Generate a simple token (replace with JWT or other mechanism in production)
    const token = `token-${user.id}`;
    return token;
  };
  