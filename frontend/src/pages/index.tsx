// src/pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push('/auth');
  }, [router]);

  return null; // Render nothing while redirecting
};

export default HomePage;