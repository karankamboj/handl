import { useState, FormEvent } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and signup
  const router = useRouter();

  // Function to fetch email by username
  const fetchEmailByUsername = async (username: string): Promise<string> => {
    // Replace this with your actual API call to fetch the email by username
    // const response = await axios.get(`/api/getEmailByUsername?username=${username}`);
    // return response.data.email;
    return username;
  };

  // Handle user registration
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);

      // Send username and email to the server
      // await axios.post('/api/register', {
      //   username,
      //   email,
      // });

      // Redirect to dashboard with username in query parameters
      router.push({
        pathname: '/dashboard',
        query: { username },
      });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Handle user login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Fetch the email associated with the username
      const email = await fetchEmailByUsername(username);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Redirect to dashboard with username in query parameters
      router.push({
        pathname: '/dashboard',
        query: { username },
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;