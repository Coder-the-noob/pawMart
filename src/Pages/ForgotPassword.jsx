import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const location = useLocation();
  const prefillEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefillEmail);

  const handleReset = () => {
    window.location.href = "https://mail.google.com";
  };

  return (
    <div className="flex mx-auto min-h-screen justify-center items-center">
      <div className="card-body flex justify-center items-center bg-base-200 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          className="input mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleReset} className="btn btn-neutral">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
