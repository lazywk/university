import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urls } from "./urls";
import { useAppSelector } from "@/store";

interface AppProps {
  children: React.ReactNode
}

export function PrivateRouter({ children }: AppProps) {
  const location = useLocation();
  const { isLogin } = useAppSelector(state => state.auth)


  useEffect(() => {
    if (!isLogin && location.pathname !== urls.LOGIN) {
      window.location.replace('/login')
    }
    else if (isLogin && (location.pathname === urls.LOGIN || location.pathname === '/')) {
      window.location.replace('/dashboard')
    }
  }, [location.pathname, isLogin]);

  return <>{children}</>;
}