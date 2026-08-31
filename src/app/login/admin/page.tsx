"use client"

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { adminLogin, type AdminActionState } from "@/lib/admin-actions"

const initialState: AdminActionState = { success: false }

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard"
  const [state, formAction, pending] = useActionState(adminLogin, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form action={formAction} className="w-full max-w-sm space-y-4 rounded-lg border p-6">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <h1 className="text-lg font-semibold">Admin Login</h1>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="ml-4 text-sm">
        {"Don't know where you are?"}
        <Link href="/" className="underline"> Go home</Link>
      </div>
    </div>
  )
}