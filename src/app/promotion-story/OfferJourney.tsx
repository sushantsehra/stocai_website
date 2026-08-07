"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const pointerStart = useRef(0);
  const go = (index: number) => setActive((index + weeks.length) % weeks.length);
  const progress = (active + 1) * 12.5;
  const week = weeks[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % weeks.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return <section id="offer" className={styles.journeyOffer}>
    <div className={styles.journeyFrame}>
      <header className={styles.journeyHead}><div><p>The 8-week journey</p><h2>Get on the earlier curve.</h2></div><div><strong>8 weeks. 8 shifts.</strong><span>Swipe the ID card to see what changes every week.</span></div></header>
      <div className={styles.idSystem}>
        <div className={styles.idShell}>
          <div className={styles.promotionId} onPointerDown={e => { pointerStart.current = e.clientX; }} onPointerUp={e => { const delta=e.clientX-pointerStart.current; if(Math.abs(delta)>45) go(active+(delta<0?1:-1)); }}>
            <div className={styles.idTop}><span>Your promotion ID</span><span>Profile refresh <b>{String(active+1).padStart(2,"0")}/08</b></span></div>
            <div className={styles.idBody}><div className={styles.idPerson}><b><Image src="/promotion-story/finance-head-testimonial.png" alt="Professional profile portrait" width={74} height={74} /></b><strong>Your Name</strong><span>Your current role</span><em>Being rebuilt</em><small>ID&nbsp; PA–008 &nbsp;·&nbsp; Promotion Architect</small></div>
              <article className={styles.shiftSlide} key={active}><div><span>{week[0]}</span><span>Week {String(active+1).padStart(2,"0")}</span></div><h3>{week[1]}</h3><p>{week[2]}</p><aside><small>Your profile now has</small>{week[3]}</aside></article>
            </div>
            <footer className={styles.idFooter}><div className={styles.buildMeta}><span>Profile build</span><b>{progress}%</b></div><div className={styles.buildTrack}><i style={{width:`${progress}%`}} /></div><nav aria-label="Browse the eight-week journey"><div>{weeks.map((_,i)=><button key={i} className={i===active?styles.activeDot:""} onClick={()=>go(i)} aria-label={`Week ${i+1}`} />)}</div></nav></footer>
          </div><small className={styles.swipeHint}>Swipe inside the ID card</small>
        </div>
      </div>
      <div className={styles.journeyBottom}><div><p>Movement guarantee</p><strong>Do the program, apply the plan, and if you see no movement toward your promotion, we refund every rupee.</strong><span>The only thing you risk is staying on the curve you&apos;re already on.</span></div><div><Link href="/diagnostic">Get promoted without playing politics <span>→</span></Link><small>Get chosen first. Get backed for the next level.</small></div></div>
    </div>
  </section>;
}
