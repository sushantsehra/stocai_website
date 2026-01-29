"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import {
  getAttributionProperties,
  persistAttribution,
} from "@/lib/analytics/attribution";

export default function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    persistAttribution();
    posthog.register(getAttributionProperties());

    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    posthog.capture("$pageview", {
      path: pathname,
      search: search ?? "",
      url,
    });
  }, [pathname, searchParams]);

  return null;
}
