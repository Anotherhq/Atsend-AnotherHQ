"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { handleSocialSignin } from "../utils";
import ForgotPasswordModal from "./ForgotPasswordModal"; 

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  const {data, isPending} = authClient.useSession();

  useEffect(() => {
    if (!data && !isPending) {
      router.push('/dashboard');
    }
  }, [data, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
      }, {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
              setIsLoading(false);
              router.push('/dashboard');
          },
          onError: (ctx) => {
              setIsLoading(false);
              setError(ctx.error.message);
          }
      });
    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-antiflash-white">
            Sign in to Atsend
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Dont have an account?{" "}
            <a
              href="/auth/register"
              className="font-medium text-periwinkle hover:text-blue-300"
            >
              sign up
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-4 sm:rounded-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div
                  className=" border border-red-700 text-red-400 px-4 py-3 rounded relative"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-gray-500 text-zinc-400 focus:outline-none sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-gray-500 text-zinc-400 focus:outline-none sm:text-base"
                    placeholder="********"
                  />
                </div>
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordModalOpen(true)}
                    className="text-sm text-periwinkle hover:text-blue-300 cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-zinc-900 font-semibold cursor-pointer bg-cornflower-blue hover:bg-blue-400 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Login to your account"}
                </button>
              </div>

              <div className="w-full flex flex-col gap-5 items-center justify-center text-zinc-400">
                <div className="w-full flex items-center justify-center">
                  <div className="h-[0.1px] w-full bg-zinc-600"></div>
                  <p className="px-4">OR</p>
                  <div className="h-[0.1px] w-full bg-zinc-600"></div>
                </div>
                <div className="w-full">
                  <button
                    onClick={() => {
                      handleSocialSignin({
                        setIsLoading,
                        setError,
                        router: router
                      })
                    }}
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm text-zinc-400 font-normal cursor-pointer bg-zinc-900 border-zinc-800 gap-4 items-center hover:bg-zinc-800 focus:outline-none disabled:opacity-50"
                  >
                    <FaGoogle size={20}/> Sign in with google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ForgotPasswordModal 
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
    </>
  );
};

export default LoginPage;