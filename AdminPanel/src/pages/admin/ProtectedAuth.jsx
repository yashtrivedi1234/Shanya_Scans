import { useIsLoginMutation } from '@/Rtk/authApi';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from '../Loading/SpinLoading';

const ProtectedAuth = ({ isPrivate }) => {
  const [isLoginTrigger] = useIsLoginMutation(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await isLoginTrigger().unwrap();
        console.log("🔑 Login response:", response);

        if (response?.success) {
          console.log("✅ User is logged in.");
          if (!isPrivate) navigate("/dashboard/home", { replace: true });
        } else {
          console.log("⛔ User is not logged in.");
          if (isPrivate) navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("🚨 Error in login check:", error);
        if (isPrivate) navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [isPrivate, navigate, isLoginTrigger]);

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedAuth;
