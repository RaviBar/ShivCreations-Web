"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const AuthCallbackPage: React.FC = () => {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (sessionChecked) return;

      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session?.user) {
          console.error("Authentication error:", error?.message || "No session");
          return router.push("/blogs");
        }

        const userId = session.user.id;
        const userEmail = session.user.email?.trim().toLowerCase() || "";

        // Check if the user already exists (only if needed)
        let role = "user";
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", userId)
          .single();

        if (!profile && profileError?.code === "PGRST116") {
          const { error: insertError } = await supabase.from("profiles").insert([
            { user_id: userId, email: userEmail, role: "user" },
          ]);
          if (insertError) console.error("User insertion failed:", insertError.message);
        } else {
          role = profile?.role || "user";
        }

        // Redirect based on role using Next.js router (avoids full reload)
        router.push(role === "admin" ? "/admin" : "/blogs");

        setSessionChecked(true);
      } catch (err) {
        console.error("Unexpected error:", err);
        router.push("/blogs");
      }
    };

    handleOAuthCallback();
  }, [router, sessionChecked]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Authenticating...
    </div>
  );
};

export default AuthCallbackPage;
