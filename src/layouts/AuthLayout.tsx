// import React from 'react'
import { Outlet } from "react-router-dom";
// import { logout } from "../services/auth.service";

// import { useEffect } from "react";
export default function AuthLayout() {

  // useEffect(() => {
  //   logout();
  // }, [])
  
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
