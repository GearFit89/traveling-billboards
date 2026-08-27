"use client"

import { useEffect, useState } from "react"
import { Collection, collections, FnMap, Ids } from "@/app/admin/dashboard/content"

export function useCollections(initialCollectionId?: Ids) {
  const [activeId, setActiveId] = useState<Ids>(
    initialCollectionId ?? collections[0].id,
  )
  const [active, setActive] = useState<Collection>()
  const [cachedData, setCachedData] = useState<Partial<Record<Ids, any>>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCollection() {
      const collection = collections.find((item) => item.id === activeId)

      if (!collection) {
        setError(new Error(`Unknown collection: ${activeId}`))
        return
      }

      setLoading(true)
      setError(null)

      try {
        let data = cachedData[activeId]

        if (!data) {
          const result = await FnMap[activeId]()
          data = result.data

          if (!cancelled) {
            setCachedData((current) => ({
              ...current,
              [activeId]: data,
            }))
          }
        }

        if (!cancelled) {
          setActive({
            ...collection,
            sampleRows: data,
          })
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause : new Error("Failed to load collection"))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCollection()

    return () => {
      cancelled = true
    }
  }, [activeId, cachedData])

  return {
    active,
    activeId,
    setActiveId,
    loading,
    error,
  }
}