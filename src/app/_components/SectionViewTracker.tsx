"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const SECTION_SELECTOR = "[data-analytics-section]";

export default function SectionViewTracker() {
  const seenRef = useRef<Set<string>>(new Set());
  const viewIndexRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const sectionId =
            element.dataset.analyticsSection || element.id || "unknown";

          if (seenRef.current.has(sectionId)) {
            observer.unobserve(element);
            return;
          }

          seenRef.current.add(sectionId);
          viewIndexRef.current += 1;

          const order = element.dataset.analyticsSectionOrder
            ? Number(element.dataset.analyticsSectionOrder)
            : undefined;
          const label =
            element.dataset.analyticsSectionLabel || sectionId;

          posthog.capture("section_viewed", {
            section_id: sectionId,
            section_label: label,
            section_order: order,
            view_index: viewIndexRef.current,
            path: window.location.pathname,
            url: window.location.href,
          });

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.35,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
