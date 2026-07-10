"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { ActivityPoint } from "@/types/user"

const chartConfig = {
  resumesCreated: {
    label: "Resumes created",
    color: "var(--chart-1)",
  },
  downloads: {
    label: "Downloads",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ActivityChart({ data }: { data: ActivityPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity over time</CardTitle>
        <CardDescription>Resumes created vs. downloads, last 7 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart data={data} margin={{ left: 0, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="resumesCreated"
              type="monotone"
              fill="var(--color-resumesCreated)"
              fillOpacity={0.2}
              stroke="var(--color-resumesCreated)"
              stackId="a"
            />
            <Area
              dataKey="downloads"
              type="monotone"
              fill="var(--color-downloads)"
              fillOpacity={0.2}
              stroke="var(--color-downloads)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
