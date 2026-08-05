"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const STORAGE_KEY = "promotion-story-exit-popup-seen";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const show = () => {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setIsOpen(true);
    };
    const handleMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 8 && !event.relatedTarget) show();
    };
    const mobileTimer = window.setTimeout(() => {
      if (window.matchMedia("(hover: none)").matches) show();
    }, 45000);

    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      window.clearTimeout(mobileTimer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.exitOverlay} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
      <div ref={dialogRef} className={styles.exitDialog} role="dialog" aria-modal="true" aria-labelledby="exit-title" tabIndex={-1}>
        <button className={styles.exitClose} type="button" onClick={() => setIsOpen(false)} aria-label="Close popup"><X aria-hidden="true" /></button>
        <p className={styles.exitEyebrow}>Before you go</p>
        <h2 id="exit-title">Still thinking it over?</h2>
        <p>The next cycle is coming whether you&apos;re ready or not. The only question is whether you walk in with a plan, or watch it happen again.</p>
        <div className={styles.exitActions}>
          <Link href="#offer" className={styles.exitPrimary} onClick={() => setIsOpen(false)}>Get promoted without playing politics <ArrowRight aria-hidden="true" /></Link>
          <Link href="/diagnostic" className={styles.exitSecondary} onClick={() => setIsOpen(false)}>Not ready? See where you stand first <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
