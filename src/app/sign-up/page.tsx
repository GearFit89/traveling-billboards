"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUp } from "@/lib/auth-actions";
import Password from "@/components/auth/password";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error, success } = await signUp({ username, password, email });

    if (error || !success) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const redirectTo = "/user";
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-lg border p-6"
      >
        <h1 className="text-lg font-semibold">Create Account</h1>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Username</Label>
          <Input
            id="email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <Password
          password={password}
          onChange={(value) => setPassword(value)}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>
        {"Already have an Account?"}
        <Link href="/login" className="underline">
          {" "}
          Sign In
        </Link>
      </form>
    </div>
  );
}
