
import { useState } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import TextInput from '@/components/TextInput';
import Alert from '@/components/Alert';

export default function SignupTailwind() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setAlertMessage('All fields are required');
      return;
    }

    setAlertMessage('');
  };

	return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextInput
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextInput
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Checkbox
              id="admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              label="Admin user"
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
				{alertMessage && (
          <div className="mt-4">
            <Alert message={alertMessage} status="error" />
          </div>
        )}
				<div className="mt-4 text-center">
          <Link href="/login" className="text-indigo-600 hover:text-indigo-800">
              Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
