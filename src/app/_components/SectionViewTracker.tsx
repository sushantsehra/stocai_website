"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const SECTION_SELECTOR = "[data-analytics-section]";

export default function SectionViewTracker() {
  const seenRef = useRef<Set<string>>(new Set());
  const viewIndexRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ Function to initialize observer
    const initializeObserver = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)
      );

      console.log("🔍 SectionViewTracker found sections:", elements.length);

      if (elements.length === 0) {
        console.warn("⚠️ No sections found with [data-analytics-section]");
        return;
      }

      // ✅ Clean up previous observer if exists
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // ✅ Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target as HTMLElement;
            const sectionId =
              element.dataset.analyticsSection || element.id || "unknown";

            if (seenRef.current.has(sectionId)) {
              observerRef.current?.unobserve(element);
              return;
            }

            seenRef.current.add(sectionId);
            viewIndexRef.current += 1;

            const order = element.dataset.analyticsSectionOrder
              ? Number(element.dataset.analyticsSectionOrder)
              : undefined;
            const label =
              element.dataset.analyticsSectionLabel || sectionId;

            const eventName = `section_viewed_${sectionId}`;

            console.log("📊 Section viewed:", {
              eventName,
              sectionId,
              label,
              order,
            });

            posthog.capture(eventName, {
              section_id: sectionId,
              section_label: label,
              section: sectionId,
              section_name: label,
              section_order: order,
              view_index: viewIndexRef.current,
              path: window.location.pathname,
              url: window.location.href,
            });

            observerRef.current?.unobserve(element);
          });
        },
        {
          threshold: 0.35,
          rootMargin: "0px",
        }
      );

      // ✅ Observe all elements
      elements.forEach((element) => {
        console.log("👁️ Observing section:", element.dataset.analyticsSection);
        observerRef.current?.observe(element);
      });
    };

    // ✅ Initialize immediately
    initializeObserver();

    // ✅ Re-initialize after a short delay to catch dynamically rendered content
    const timeoutId = setTimeout(initializeObserver, 500);

    // ✅ Re-initialize on route changes (for Next.js navigation)
    const handleRouteChange = () => {
      console.log("🔄 Route changed, re-initializing observer");
      seenRef.current.clear();
      viewIndexRef.current = 0;
      initializeObserver();
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener("popstate", handleRouteChange);

    // ✅ Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("popstate", handleRouteChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
}

// "use client";

// import { useEffect, useRef } from "react";
// import posthog from "posthog-js";

// const SECTION_SELECTOR = "[data-analytics-section]";

// export default function SectionViewTracker() {
//   const seenRef = useRef<Set<string>>(new Set());
//   const viewIndexRef = useRef(0);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const elements = Array.from(
//       document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)
//     );

//     if (elements.length === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return;

//           const element = entry.target as HTMLElement;
//           const sectionId =
//             element.dataset.analyticsSection || element.id || "unknown";

//           if (seenRef.current.has(sectionId)) {
//             observer.unobserve(element);
//             return;
//           }

//           seenRef.current.add(sectionId);
//           viewIndexRef.current += 1;

//           const order = element.dataset.analyticsSectionOrder
//             ? Number(element.dataset.analyticsSectionOrder)
//             : undefined;
//           const label =
//             element.dataset.analyticsSectionLabel || sectionId;

//           const eventName = `section_viewed_${sectionId}`;

//           posthog.capture(eventName, {
//             section_id: sectionId,
//             section_label: label,
//             section: sectionId,
//             section_name: label,
//             section_order: order,
//             view_index: viewIndexRef.current,
//             path: window.location.pathname,
//             url: window.location.href,
//           });

//           observer.unobserve(element);
//         });
//       },
//       {
//         threshold: 0.35,
//       }
//     );

//     elements.forEach((element) => observer.observe(element));

//     return () => observer.disconnect();
//   }, []);

//   return null;
// }
