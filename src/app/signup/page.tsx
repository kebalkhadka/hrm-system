'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('hr');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Redirect to login page after successful signup
      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg bg-slate-100 max-w-sm w-full">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name</label>
            <input
              id="name"
              type="text"
              className="p-2 border w-full rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label htmlFor="role" className="block">Role</label>
            <select
              id="role"
              className="p-2 border w-full rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-500">Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
