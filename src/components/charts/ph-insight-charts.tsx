"use client";

import { useEffect, useMemo, useState } from "react";

// Register Chart.js components BEFORE importing react-chartjs-2
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LinearScale,
  PolarAreaController,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";

if (!(ChartJS as any).__oldUiRegistered) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarController,
    BarElement,
    DoughnutController,
    PolarAreaController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  );
  (ChartJS as any).__oldUiRegistered = true;
}

import { Bar, Doughnut, PolarArea } from "react-chartjs-2";

import {
  buildDoughnutDemo,
  buildHorizontalBarDemo,
  buildPolarAreaDemo,
  buildStackedBarDemo,
  buildVerticalBarDemo,
} from "@/lib/chart/ph-chart-options";
import { useChartTokens } from "@/lib/chart/use-ph-chart-tokens";
import { buildHogChartTheme } from "@/lib/hog-charts-lite/build-theme";
import { CanvasTrendLineChart } from "@/lib/hog-charts-lite/CanvasTrendLineChart";

const DEMO_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
}

interface ChartSkeletonProps {
  /** Tailwind height class */
  className?: string;
}

function ChartSkeleton({ className = "h-[280px]" }: ChartSkeletonProps) {
  return (
    <div
      className={`w-full animate-pulse rounded-lemon bg-ph-muted ${className}`}
      aria-hidden
    />
  );
}

/**
 * Canvas + `d3-scale` trend — same **model** as PostHog `lib/hog-charts` (MIT), not a pixel-perfect port.
 */
export function HogTrendLineChart() {
  const mounted = useClientMounted();
  const tokens = useChartTokens();
  const theme = useMemo(() => buildHogChartTheme(tokens), [tokens]);

  const series = useMemo(
    () => [
      {
        key: "pageview",
        label: "$pageview",
        data: [4200, 5100, 4800, 6200, 5900, 3100, 2800],
        color: tokens.series[0],
        fill: { opacity: 0.35 },
      },
      {
        key: "signup",
        label: "signup_completed",
        data: [920, 990, 940, 1040, 1012, 540, 510],
        color: tokens.series[1],
        stroke: { pattern: [5, 5] as number[] },
      },
    ],
    [tokens.series],
  );

  if (!mounted) {
    return <ChartSkeleton />;
  }

  return (
    <div className="relative h-[280px] w-full min-h-[220px]">
      <CanvasTrendLineChart
        labels={DEMO_LABELS}
        series={series}
        theme={theme}
        showGrid
        showCrosshair
        className="h-full min-h-[220px]"
      />
    </div>
  );
}

export function InsightVerticalBarChart() {
  const mounted = useClientMounted();
  const tokens = useChartTokens();
  const config = useMemo(() => buildVerticalBarDemo(tokens), [tokens]);

  if (!mounted) {
    return <ChartSkeleton />;
  }

  return (
    <div className="relative h-[280px] w-full min-h-[220px]">
      <Bar data={config.data} options={config.options} redraw={false} />
    </div>
  );
}

export function InsightHorizontalBarChart() {
  const mounted = useClientMounted();
  const tokens = useChartTokens();
  const config = useMemo(() => buildHorizontalBarDemo(tokens), [tokens]);

  if (!mounted) {
    return <ChartSkeleton className="h-[320px]" />;
  }

  return (
    <div className="relative h-[320px] w-full min-h-[260px]">
      <Bar data={config.data} options={config.options} redraw={false} />
    </div>
  );
}

export function InsightStackedBarChart() {
  const mounted = useClientMounted();
  const tokens = useChartTokens();
  const config = useMemo(() => buildStackedBarDemo(tokens), [tokens]);

  if (!mounted) {
    return <ChartSkeleton className="h-[300px]" />;
  }

  return (
    <div className="relative h-[300px] w-full min-h-[240px]">
      <Bar data={config.data} options={config.options} redraw={false} />
    </div>
  );
}

export function InsightDoughnutChart() {
  const mounted = useClientMounted();
  const tokens = useChartTokens();
  const config = useMemo(() => buildDoughnutDemo(tokens), [tokens]);

  if (!mounted) {
    return <ChartSkeleton className="h-[260px]" />;
  }

  return (
    <div className="relative mx-auto h-[260px] w-full max-w-[280px] min-h-[220px]">
      <Doughnut data={config.data} options={config.options} redraw={false} />
    </div>
  );
}

export function InsightPolarAreaChart() {
  const mounted = useClientMounted();
  const tokens = useChartTokens();
  const config = useMemo(() => buildPolarAreaDemo(tokens), [tokens]);

  if (!mounted) {
    return <ChartSkeleton className="h-[280px]" />;
  }

  return (
    <div className="relative mx-auto h-[280px] w-full max-w-[320px] min-h-[240px]">
      <PolarArea data={config.data} options={config.options} redraw={false} />
    </div>
  );
}
