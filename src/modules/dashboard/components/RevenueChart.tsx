"use client"

import { useMemo, useState } from "react"
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartTooltip,
    type ChartConfig,
} from "@/components/ui/chart"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { formatCurrency } from "@/lib/formatcurrency"

// ✅ TYPE
type ApiData = {
    month: string
    earning?: number
    earnings?: number
    year?: number
}

type ViewType = "monthly" | "quarterly" | "yearly"

const monthOrder = [
    "jan", "feb", "mar",
    "apr", "may", "jun",
    "jul", "aug", "sep",
    "oct", "nov", "dec"
]

// ✅ chart config (used by shadcn chart)
const chartConfig = {
    earning: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

type RevenuePoint = {
    month: string
    year: number
    earning: number
}

function RevenueTooltip({
    active,
    payload,
}: {
    active?: boolean
    payload?: Array<{ payload?: Partial<RevenuePoint>; value?: unknown }>
}) {
    if (!active || !payload?.length) return null

    const point = payload[0]?.payload
    const year = point?.year
    const month = point?.month
    const earning =
        typeof point?.earning === "number"
            ? point.earning
            : typeof payload[0]?.value === "number"
                ? payload[0]?.value
                : undefined

    if (earning == null) return null

    const yearStr = year != null ? String(year) : null
    const monthStr = month != null ? String(month) : null
    const shouldAppendYear =
        yearStr != null && monthStr != null && !monthStr.includes(yearStr)

    return (
        <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-xl">
            <div className="font-medium">
                {monthStr}
                {shouldAppendYear ? ` ${yearStr}` : null}
            </div>
            <div className="mt-1 text-muted-foreground">Earned</div>
            <div className="font-mono font-medium text-foreground">
                {formatCurrency(earning)}
            </div>
        </div>
    )
}

export function RevenueChart({ data }: { data: ApiData[] }) {
    const [view, setView] = useState<ViewType>("monthly")

    const defaultYear = data[0]?.year ?? 2026

    const parseDateKey = (d: ApiData) => {
        const monthIndex = monthOrder.indexOf(d.month.toLowerCase())
        if (monthIndex < 0) return null
        const year = d.year ?? defaultYear
        return { year, monthIndex, dateKey: year * 12 + monthIndex }
    }

    const validPoints = data
        .map((d) => {
            const parsed = parseDateKey(d)
            if (!parsed) return null
            const earningValue =
                typeof d.earning === "number"
                    ? d.earning
                    : typeof d.earnings === "number"
                        ? d.earnings
                        : null
            if (earningValue == null) return null
            return {
                month: d.month,
                earning: earningValue,
                year: parsed.year,
                monthIndex: parsed.monthIndex,
                dateKey: parsed.dateKey,
            }
        })
        .filter((p): p is NonNullable<typeof p> => p != null)

    // ✅ Sort data
    const latestDateKey = useMemo(() => {
        if (!validPoints.length) return null
        return validPoints.reduce((max, p) => Math.max(max, p.dateKey), -Infinity)
    }, [validPoints])

    const pointsInRange = useMemo(() => {
        if (latestDateKey == null) return []
        const startKey = latestDateKey - 11 // last 12 months
        return validPoints
            .filter((p) => p.dateKey >= startKey && p.dateKey <= latestDateKey!)
            .sort((a, b) => a.dateKey - b.dateKey)
    }, [validPoints, latestDateKey])

    // ✅ Transform data
    const chartData = useMemo(() => {
        if (pointsInRange.length === 0) return []

        if (view === "monthly") {
            return pointsInRange.map((p) => ({
                month: p.month.toUpperCase(),
                year: p.year,
                earning: p.earning,
            }))
        }

        if (view === "quarterly") {
            const rangeStart = pointsInRange[0]
            const rangeEnd = pointsInRange[pointsInRange.length - 1]

            const startQuarterNum = Math.floor(rangeStart.monthIndex / 3) + 1
            const startQuarterStartMonthIndex = (startQuarterNum - 1) * 3
            // If the range starts in the middle of a quarter (example: Sep 2025), skip that partial quarter.
            let firstQuarterKey = rangeStart.year * 4 + (startQuarterNum - 1)
            if (rangeStart.monthIndex !== startQuarterStartMonthIndex) firstQuarterKey += 1

            const endQuarterNum = Math.floor(rangeEnd.monthIndex / 3) + 1
            const lastQuarterKey = rangeEnd.year * 4 + (endQuarterNum - 1)

            const quarterSeries: RevenuePoint[] = []
            for (let qk = firstQuarterKey; qk <= lastQuarterKey; qk++) {
                const qYear = Math.floor(qk / 4)
                const qNum = (qk % 4) + 1

                const quarterPoints = pointsInRange.filter((p) => {
                    const quarter = Math.floor(p.monthIndex / 3) + 1
                    return p.year === qYear && quarter === qNum
                })

                if (!quarterPoints.length) continue

                const total = quarterPoints.reduce((sum, p) => sum + p.earning, 0)
                quarterSeries.push({
                    month: `Q${qNum} ${qYear}`,
                    year: qYear,
                    earning: total,
                })
            }

            return quarterSeries
        }

        if (view === "yearly") {
            const yearTotals = new Map<number, number>()
            for (const p of pointsInRange) {
                yearTotals.set(p.year, (yearTotals.get(p.year) ?? 0) + p.earning)
            }

            return Array.from(yearTotals.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([year, total]) => ({
                    month: String(year),
                    year,
                    earning: total,
                }))
        }

        return []
    }, [view, pointsInRange])
    const isRevenueEmpty = chartData.length === 0

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>Revenue</CardTitle>
                </div>

                {/* ✅ FIXED DROPDOWN */}
                <Select
                    value={view}
                    onValueChange={(value) =>
                        setView(value as ViewType)
                    }
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                <div className="relative">
                    <ChartContainer
                        config={chartConfig}
                        style={{ height: 300, width: "100%" }}
                    >
                        <LineChart
                            data={chartData}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid vertical={false} />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={<RevenueTooltip />}
                            />

                            <Line
                                dataKey="earning"
                                type="monotone"
                                stroke="#FFD700"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                isAnimationActive="auto"
                                animateNewValues={true}
                                animationDuration={350}
                                animationEasing="ease"
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                    {isRevenueEmpty && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-[2px]">
                            <p className="rounded-md bg-white/75 px-3 py-1 text-sm font-medium text-gray-700">
                                Revenue is not started
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}