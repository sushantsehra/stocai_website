"use client";
import { useEffect } from "react";
import posthog, { PostHog } from "posthog-js";

export default function PostHogInit() {
  useEffect(() => {
    const ph = posthog as PostHog & { __loaded?: boolean };
    if (ph.__loaded) return;

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

    if (!apiKey) {
      console.warn(
        "[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY environment variable. PostHog not initialized."
      );
      return;
    }

    posthog.init(apiKey, {
      api_host: apiHost,
      autocapture: true,
      session_recording: { maskAllInputs: true },
      loaded: (ph) => {
        (ph as any).__loaded = true;
      },
    });
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