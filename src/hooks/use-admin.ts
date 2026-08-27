"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getToken, setToken } from "@/lib/admin-actions"

export function useAdmin() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [adminToken, setAdminToken] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)

  const saveToken = useCallback(
    async (token: string) => {
      const { success } = await setToken(token)

      toast({
        title: success ? "Admin token saved" : "Failed to save admin token",
        style: { color: success ? "black" : "red" },
      })

      if (success) {
        setAdminToken(token)
        setShowLoginModal(false)
      } else{
        setShowLoginModal(true)
      }
    },
    [toast],
  )

  const logout = useCallback(async () => {
    await setToken("")
    setAdminToken("")
  }, [])

  useEffect(() => {
    let cancelled = false

    async function checkAuthentication() {
      const parameterToken = searchParams.get("ac")

      if (parameterToken) {
        await saveToken(parameterToken)
        return
      }

      try {
        const { data: cookieToken } = await getToken()

        if (cancelled) return

        if (cookieToken) {
          setAdminToken(cookieToken)
        } else {
          setShowLoginModal(true)
        }
      } catch (error) {
        console.error("Admin authentication error:", error)
        if (!cancelled) setShowLoginModal(true)
      }
    }

    checkAuthentication()

    return () => {
      cancelled = true
    }
  }, [saveToken, searchParams])

  return {
    adminToken,
    showLoginModal,
    setShowLoginModal,
    saveToken,
    logout,
  }
}