'use client';  // Need this for client-side features like routing

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Note: use 'next/navigation' in App Router

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/signup');
  }, []);

  // Return the welcome page content while redirect is happening
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center">Welcome to the Gift Registry</h1>
    </div>
  );
}
