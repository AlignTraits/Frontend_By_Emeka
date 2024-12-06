import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("Verifying...");

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("Invalid verification link.");
        return;
      }

      try {
        const response = await axios.post("/api/auth/verify-email", { token });
        if (response.data.success) {
          setStatus("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus(
            "Verification failed. The link might be invalid or expired."
          );
        }
      } catch (error: any) {
        setStatus(
          error.response?.data?.message ||
            "An error occurred during verification. Please try again."
        );
      }
    };

    verifyEmailToken();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Email Verification</h1>
      <p className="mt-4 text-lg text-gray-600">{status}</p>
    </div>
  );
};

export default VerifyEmail;
