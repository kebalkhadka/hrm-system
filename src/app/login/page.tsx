'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Both fields are required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('userName', data.userName); // Store the user name

      if (data.role === 'hr') {
        router.push('/dashboard'); // HR Dashboard
      } else if (data.role === 'employee') {
        router.push('/employee'); // Employee Dashboard
      } else {
        throw new Error('Unknown user role');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null; // Prevents rendering before client-side router is available
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg bg-slate-100 max-w-sm w-full">
        <h2 className="text-2xl mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              type="email"
              className="p-2 border w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block">Password</label>
            <input
              id="password"
              type="password"
              className="p-2 border w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <a href="/signup" className="text-blue-500">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
