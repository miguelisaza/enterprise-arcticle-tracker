import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import decodeToken from 'jsonwebtoken/decode';

import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import Alert from '@/components/Alert';

import request from '@/utils/request';

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState('');
  const [alertState, setAlertState] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setAlertState("error");
      setAlertMessage('Both fields are required');
      return;
    }

    const doLogin = request('auth/login', 'POST', { username, password })

    doLogin.then(response => {
      if (response.status === 401) {
        setAlertMessage(response.body.message)
        setAlertState("error");
        return;
      }

      const userInfo = decodeToken(response.body.token)

      localStorage.setItem("login-token", response.body.token);
      localStorage.setItem("user-info", JSON.stringify(userInfo));

      setAlertState("success");
      setAlertMessage("Successful Login. Redirecting...")
      router.replace('/enterprises');

    }).catch(error => {
      setAlertState("error");
      setAlertMessage('Network Error')
    })
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-8">Enterprise Article Tracker</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput
              type="username"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <TextInput
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Log In</Button>
        </form>
        {alertMessage && (
          <div className="mt-4">
            <Alert message={alertMessage} status={alertState} />
          </div>
        )}
        <div className="mt-4 text-center">
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-800">
              Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}