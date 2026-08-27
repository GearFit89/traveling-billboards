"use client"

import { useEffect, useState } from "react"
import AdminDashboard from "./admin-dashboard"
import { dashboardContent, FnMap } from "./content"

export default function DashboardPage() {
  const [totals, setTotals] = useState<Record<string, number>>({})

  useEffect(() => {
    async function loadStats() {
      const result: Record<string, number> = {}

      await Promise.all(
        dashboardContent.stats.map(async (stat) => {
          const { data } = await FnMap[stat.collectionId]()
          result[stat.id] = data.reduce(
            (total: number, row: any) => total + stat.getValue(row),
            0,
          )
        }),
      )

      setTotals(result)
    }

    void loadStats()
  }, [])

  return (
    <AdminDashboard initialCollectionId="home">
      <section className="space-y-10">
        <div>
          <p className="text-5xl font-black tracking-tight text-black md:text-8xl">
            {dashboardContent.greeting}
          </p>
          <h1 className="text-7xl font-black tracking-tighter text-red-600 md:text-[10rem] md:leading-none">
            {dashboardContent.title}
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {dashboardContent.stats.map((stat) => (
            <article key={stat.id} className="rounded-2xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-5xl font-black">
                {totals[stat.id]?.toLocaleString() ?? "—"}
              </p>
            </article>
          ))}
        </div>
      </section>
    </AdminDashboard>
  )
}