/**
 * Tree-shaken Chart.js registration for **Bar · Doughnut · Polar area** demos.
 * Add more controllers/elements only if you use those chart types (keeps bundles small).
 *
 * Other Chart.js chart types you can add the same way: `LineController` + `LineElement` + `PointElement` + `Filler`,
 * `PieController`, `RadarController` + `RadialLinearScale` + `PointElement`, `BubbleController`, etc.
 */
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

function synchroniseChartJsFontFamily(): void {
  if (typeof document === "undefined") {
    return;
  }
  const family = window.getComputedStyle(document.body).fontFamily;
  const trimmed = family?.trim();
  if (trimmed) {
    ChartJS.defaults.font.family = trimmed;
  }
}

// Eagerly register Chart.js components at module load time
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

synchroniseChartJsFontFamily();

export { ChartJS };
