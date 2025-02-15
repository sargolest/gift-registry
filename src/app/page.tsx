'use client';  // Need this for client-side features like routing
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/signup');
  }, [router]);  // Added router to the dependency array to fix the warning
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center">Welcome to the Gift Registry</h1>
    </div>
  );
}
