"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";



const AuthCallbackPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error during OAuth callback:", error.message);
          router.push("/blogs"); 
          return;
        }

        if (session?.user) {
          const userEmail = session.user.email?.trim().toLowerCase() || "";
          const userId = session.user.id;

          // Check if the user already exists in the profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', userId)
            .single();

          if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows found
            console.error("Error fetching profile:", profileError.message);
            router.push("/blogs");
            return;
          }

          // If the user doesn't exist in the profiles table, insert them
          if (!profile) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ user_id: userId, email: userEmail, role: 'user' }]);

            if (insertError) {
              console.error("Error inserting user into profiles:", insertError.message);
              router.push("/blogs");
              return;
            }
          }

          // Redirect based on role
          // const redirectPath = localStorage.getItem("redirectPath") || "/blogs";
          if (profile?.role === 'admin') {
            console.log("User is an admin. Redirecting to /admin");
            window.location.href = "/admin";
          } else {
            console.log("User is not an admin. Redirecting to /blogs");
            window.location.href = "/blogs";
          }
        } else {
          console.error("No session found after OAuth callback");
          router.push("/blogs");
        }

        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error("Unexpected error during OAuth callback:", err);
        router.push("/blogs"); 
      }
    };

    handleOAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Authenticating...
    </div>
  );
};

export default AuthCallbackPage;