'use client'
import { useEffect } from 'react'
import posthog, { PostHog } from 'posthog-js'

export default function PostHogInit() {
  useEffect(() => {
    const ph = posthog as PostHog & { __loaded?: boolean }
    if (ph.__loaded) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: true,
      session_recording: { maskAllInputs: true },
      defaults: '2025-05-24',
    })
  }, [])

  return null
}
