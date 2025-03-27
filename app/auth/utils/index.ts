import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface HandleSocialSigninProps {
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    router: ReturnType<typeof useRouter>;
  }

export const handleSocialSignin = async ({
    setIsLoading,
    setError,
    router
}: HandleSocialSigninProps) =>{

    const {data,error} = await authClient.signIn.social({
        
        provider: "google",
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
    })  
}

