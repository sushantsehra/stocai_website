"use client";
import { useEffect } from "react";
import posthog, { PostHog } from "posthog-js";
import env from "@/utils/env";
import {
  getAttributionProperties,
  getFirstTouchProperties,
  persistAttribution,
} from "@/lib/analytics/attribution";

type PostHogWithLoaded = PostHog & { __loaded?: boolean };

export default function PostHogInit() {
  useEffect(() => {
    const ph = posthog as PostHogWithLoaded;
    if (ph.__loaded) return;

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

    if (!apiKey || !env.features.analytics) {
      console.warn(
        "[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY environment variable. PostHog not initialized."
      );
      return;
    }

    posthog.init(apiKey, {
      api_host: apiHost,
      autocapture: true,
      capture_pageview: false,
      capture_pageleave: true,
      session_recording: { maskAllInputs: true },
      loaded: (phInstance) => {
        (phInstance as PostHogWithLoaded).__loaded = true;
      },
    });

    persistAttribution();
    posthog.register(getAttributionProperties());
    posthog.register_once(getFirstTouchProperties());
  }, []);

  return null;
}

// 'use client'
// import { useEffect } from 'react'
// import posthog, { PostHog } from 'posthog-js'

// export default function PostHogInit() {
//   useEffect(() => {
//     const ph = posthog as PostHog & { __loaded?: boolean }
//     if (ph.__loaded) return

//     posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
//       api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
//       autocapture: true,
//       session_recording: { maskAllInputs: true },
//       defaults: '2025-05-24',
//     })
//   }, [])

//   return null
// }
