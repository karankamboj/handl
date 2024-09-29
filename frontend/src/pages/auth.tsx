// src/pages/auth.tsx
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Fetch username from the server or set it directly if available
      // const response = await axios.get(`/api/user?email=${email}`);
      // const fetchedUsername = response.data.username;

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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
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