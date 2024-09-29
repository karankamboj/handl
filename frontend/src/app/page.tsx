// src/app/page.tsx
import HomePage from '../pages/index';

const Page: React.FC = () => {
  return <HomePage />;
};

export default Page;

// // src/app/page.tsx
// "use client";
// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import AuthPage from "../pages/auth";
// import Dashboard from "../pages/dashboard";
// import { usePathname } from 'next/navigation';
// import { auth } from '../firebase/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';

// // Create a context for the username
// const UserContext = createContext<{ username: string; setUsername: (username: string) => void } | undefined>(undefined);

// const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [username, setUsername] = useState<string>('');
//   return (
//     <UserContext.Provider value={{ username, setUsername }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// export default function Home() {
//   const { username, setUsername } = useUser();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserProvider>
//       {isAuthenticated && pathname === '/dashboard' ? <Dashboard username={username} /> : <AuthPage setUsername={setUsername} />}
//     </UserProvider>
//   );
// }