import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("login-token");
    localStorage.removeItem("user-info");

    router.replace('/login');
  }, []);

  return null;
};

export default Logout;