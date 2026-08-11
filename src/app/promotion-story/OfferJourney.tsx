"use client";

import Link from "next/link";
import Image from "next/image";
import { PointerEvent, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const weeks = [
  ["Phase 01 · See the game clearly", "What actually makes someone promotable", "See your real gaps and what needs fixing first.", "A clear starting point."],
  ["Phase 01 · See the game clearly", "Expanding scope and influence", "Map your stakeholders and make your first influence move.", "A stakeholder map."],
  ["Phase 02 · Get seen on purpose", "Communicating impact in executive language", "Build an impact story you can use immediately.", "An impact story that lands."],
  ["Phase 02 · Get seen on purpose", "Visibility without self-promotion", "Plan three moves that put you on the radar honestly.", "A way to get seen without showing off."],
  ["Phase 03 · Build the reputation that travels", "Stakeholder management and political capital", "Make a plan for the five people who matter most.", "A plan for building support."],
  ["Phase 03 · Build the reputation that travels", "Leadership presence before the title", "Build a clear leadership brand and the words for it.", "A next-level leadership signal."],
  ["Phase 04 · Close the promotion", "Promotion psychology", "Know how to position yourself before the next cycle opens.", "The right timing."],
  ["Phase 04 · Close the promotion", "Your personalised 30–60–90 roadmap", "Leave with a plan built around your actual role.", "A promotion plan ready to run."],
];

export default function OfferJourney() {
  const [active, setActive] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const go = (index: number) => setActive((index + weeks.length) % weeks.length);

  const relativePosition = (index: number) => {
    const forward = (index - active + weeks.length) % weeks.length;
    if (forward === 0) return 0;
    if (forward === 1) return 1;
    if (forward === weeks.length - 1) return -1;
    return null;
  };

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) > 45) go(active + (distance < 0 ? 1 : -1));
    pointerStart.current = null;
    setIsInteracting(false);
  };

  useEffect(() => {
    if (isInteracting || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % weeks.length), 4200);
    return () => window.clearInterval(timer);
  }, [isInteracting]);

  return <section id="offer" className={styles.journeyOffer}>
    <div className={styles.journeyFrame}>
      <header className={styles.journeyHead}><div><p>The 8-week journey</p><h2>Get on the earlier curve.</h2></div><div><strong>8 weeks. 8 shifts.</strong><span>Swipe the ID card to see what changes every week.</span></div></header>
      <div
        className={styles.idSystem}
        role="region"
        aria-roledescription="carousel"
        aria-label="The eight-week Promotion Architect journey"
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") go(active - 1);
          if (event.key === "ArrowRight") go(active + 1);
        }}
        onPointerDown={event => {
          pointerStart.current = event.clientX;
          setIsInteracting(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={finishSwipe}
        onPointerCancel={() => { pointerStart.current = null; setIsInteracting(false); }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => { pointerStart.current = null; setIsInteracting(false); }}
        onFocus={() => setIsInteracting(true)}
        onBlur={() => setIsInteracting(false)}
      >
        <div className={styles.idCarousel}>
          {weeks.map((week, index) => {
            const position = relativePosition(index);
            if (position === null) return null;
            const progress = (index + 1) * 12.5;
            const positionClass = position === 0 ? styles.activeCard : position < 0 ? styles.previousCard : styles.nextCard;

            return <div
              className={`${styles.carouselCard} ${positionClass}`}
              key={index}
              aria-hidden={position !== 0}
              onClick={() => position !== 0 && go(index)}
            >
              <div className={styles.idShell}>
                <div className={styles.promotionId}>
                  <div className={styles.idTop}><span>Your promotion ID</span><span>Profile refresh <b>{String(index + 1).padStart(2, "0")}/08</b></span></div>
                  <div className={styles.idBody}>
                    <div className={styles.idPerson}><b><Image src="/promotion-story/finance-head-testimonial.png" alt={position === 0 ? "Professional profile portrait" : ""} width={74} height={74} /></b><strong>Your Name</strong><span>Your current role</span><em>Being rebuilt</em><small>ID&nbsp; PA–008 &nbsp;·&nbsp; Promotion Architect</small></div>
                    <article className={styles.shiftSlide}><div><span>{week[0]}</span><span>Week {String(index + 1).padStart(2, "0")}</span></div><h3>{week[1]}</h3><p>{week[2]}</p><aside><small>Your profile now has</small>{week[3]}</aside></article>
                  </div>
                  <footer className={styles.idFooter}><div className={styles.buildMeta}><span>Profile build</span><b>{progress}%</b></div><div className={styles.buildTrack}><i style={{ width: `${progress}%` }} /></div></footer>
                </div>
              </div>
            </div>;
          })}
        </div>
        <nav className={styles.journeyDots} aria-label="Browse the eight-week journey">
          {weeks.map((_, index) => <button key={index} className={index === active ? styles.activeDot : ""} onClick={() => go(index)} aria-label={`Show week ${index + 1}`} aria-current={index === active ? "true" : undefined} />)}
        </nav>
        <small className={styles.swipeHint}>Swipe or use arrow keys</small>
      </div>
      <div className={styles.journeyBottom}><div><p>Movement guarantee</p><strong>Do the program, apply the plan, and if you see no movement toward your promotion, we refund every rupee.</strong><span>The only thing you risk is staying on the curve you&apos;re already on.</span></div><div><Link href="#promotion-story-access" data-cta-location="mid_page">Get promoted without playing politics <span>→</span></Link><small>Get chosen first. Get backed for the next level.</small></div></div>
    </div>
  </section>;
}
