"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from 'lucide-react';

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const togglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Invalid or expired reset token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await authClient.resetPassword({
        token: token,
        newPassword: formData.newPassword
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => router.push('/auth/signin'), 2000);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || 'Failed to reset password');
        }
      });
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-antiflash-white">
          Reset Your Password
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Create a strong, unique password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-zinc-900 py-8  shadow rounded-lg ">
          {success ? (
            <div 
            className="border border-green-700 text-green-400 px-4 py-3 rounded mb-4"
            role="alert"
            >
              Password reset successful! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div 
                  className="border border-red-700 text-red-400 px-4 py-3 rounded"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div className="relative">
                <label 
                  htmlFor="newPassword" 
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={passwordVisibility.newPassword ? "text" : "password"}
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-zinc-800 rounded-md shadow-sm placeholder-gray-500 text-zinc-400 focus:outline-none sm:text-base"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-zinc-400"
                  >
                    {passwordVisibility.newPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-zinc-800 rounded-md shadow-sm placeholder-gray-500 text-zinc-400 focus:outline-none sm:text-base"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-zinc-400"
                  >
                    {passwordVisibility.confirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>



              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-zinc-900 font-semibold cursor-pointer bg-cornflower-blue hover:bg-blue-400 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;