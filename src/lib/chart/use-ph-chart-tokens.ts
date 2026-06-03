"use client";

import { useEffect, useRef, useState } from "react";
import { FALLBACK_CHART_TOKENS, readChartTokens } from "@/lib/chart/ph-chart-tokens";
import type { ChartTokens } from "@/lib/chart/ph-chart-tokens";

function tokensEqual(a: ChartTokens, b: ChartTokens): boolean {
  if (a.series.length !== b.series.length) return false;
  for (let i = 0; i < a.series.length; i++) {
    if (a.series[i] !== b.series[i]) return false;
  }
  return (
    a.grid === b.grid &&
    a.text === b.text &&
    a.textMuted === b.textMuted &&
    a.surface === b.surface &&
    a.borderStrong === b.borderStrong &&
    a.accent === b.accent
  );
}

/** Re-reads `--ph-data-*` / border / text tokens whenever `data-theme` changes. */
export function useChartTokens(): ChartTokens {
  const [tokens, setTokens] = useState<ChartTokens>(FALLBACK_CHART_TOKENS);
  const tokensRef = useRef<ChartTokens>(FALLBACK_CHART_TOKENS);

  useEffect(() => {
    const root = document.documentElement;
    const refresh = () => {
      const next = readChartTokens(root);
      if (!tokensEqual(tokensRef.current, next)) {
        tokensRef.current = next;
        setTokens(next);
      }
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return tokens;
}
