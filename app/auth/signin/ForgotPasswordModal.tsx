import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setMessage('');

    try {
        const { data, error } = await authClient.forgetPassword({
            email: email,
            redirectTo: "/auth/reset-password",
        }, {
            onRequest: () => setIsLoading(true),
            onSuccess: (ctx) => {
                setIsLoading(false);
                
                // Check if the response indicates the user doesn't exist
                if (ctx.data === null) {
                    setError('No account found with this email address');
                    return;
                }

                setSuccess(true);
                setMessage('Password reset link sent successfully');
            },
            onError: (ctx) => {
                setIsLoading(false);
                
                // More specific error handling
                if (ctx.error.code === 'user_not_found' || 
                    ctx.error.message.includes('user not found') || 
                    ctx.error.message.toLowerCase().includes('email not registered')) {
                    setError('No account found with this email address');
                } else {
                    setError(ctx.error.message || 'Failed to send password reset link');
                }
            }
        });

        // Additional fallback error handling
        if (error) {
            setError(error.message || 'An unexpected error occurred');
        }

        setIsLoading(false);

    } catch (err: any) {
        // Catch any unexpected errors
        setError(err.message || 'Failed to send password reset link');
        setIsLoading(false);
    }
};


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        aria-labelledby="forgot-password-title"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-zinc-900 w-full max-w-md mx-4 rounded-lg shadow-xl border border-zinc-800 relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="p-6">
            <h2 
              id="forgot-password-title" 
              className="text-2xl font-bold text-antiflash-white mb-4"
            >
              Reset Password
            </h2>

            {error && (
              <div 
                className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                {error}
              </div>
            )}

            {success ? (
              <div 
                className="border border-green-700 text-green-400 px-4 py-3 rounded mb-4"
                role="alert"
              >
                {message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="reset-email" 
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-gray-500 text-zinc-400 focus:outline-none sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-zinc-800 font-semibold cursor-pointer bg-cornflower-blue hover:bg-blue-400 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;