import Image from "next/image";
import kavitaProfile from "@/assets/KavitaG.jpg";
import protagonistProfile from "@/assets/successStoriesImage3.jpg";
import styles from "./page.module.css";

function Pin({ dark = false }: { dark?: boolean }) {
  return <span className={`${styles.evidencePin} ${dark ? styles.darkPin : ""}`} aria-hidden="true" />;
}

export default function PromotionIdentityComparison() {
  return (
    <div className={styles.investigationBoard}>
      <div className={styles.boardHeading}>
        <span>Case file 03</span>
        <strong>The usual suspects</strong>
      </div>

      <svg className={`${styles.evidenceThreads} ${styles.desktopThreads}`} viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.primaryThread} d="M600 204 Q455 238 216 60 M600 204 Q770 238 990 60 M600 204 Q410 270 180 290 M600 204 Q800 270 1002 295 M600 204 Q445 440 270 535 M600 204 Q775 430 935 535" />
      </svg>

      <svg className={`${styles.evidenceThreads} ${styles.compactThreads}`} viewBox="0 0 620 880" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.primaryThread} d="M310 238 Q230 278 152 55 M310 238 Q395 278 472 62 M310 238 Q230 345 115 450 M310 238 Q405 340 515 435 M310 238 Q235 540 155 700 M310 238 Q405 535 500 705" />
      </svg>

      <svg className={`${styles.evidenceThreads} ${styles.mobileThreads}`} viewBox="0 0 360 1350" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.primaryThread} d="M180 458 Q120 330 118 68 M180 458 Q250 390 244 244 M180 458 Q120 560 108 730 M180 458 Q245 620 250 865 M180 458 Q125 720 124 1028 M180 458 Q250 800 252 1182" />
      </svg>

      <article className={`${styles.evidencePiece} ${styles.youDossier}`}>
        <Pin dark />
        <p className={styles.evidenceLabel}>Person of interest</p>
        <div className={styles.dossierIdentity}>
          <div className={styles.dossierPhoto}>
            <Image src={protagonistProfile} alt="You" fill sizes="110px" />
          </div>
          <div>
            <h3>You</h3>
            <p>Dependable high performer</p>
          </div>
        </div>
        <dl>
          <div><dt>Experience</dt><dd>12 years</dd></div>
          <div><dt>Current role</dt><dd>3 years</dd></div>
          <div><dt>Last review</dt><dd>Exceeds expectations</dd></div>
        </dl>
        <div className={styles.notPromotedStamp}>Not promoted</div>
      </article>

      <article className={`${styles.evidencePiece} ${styles.promotionClipping}`}>
        <Pin />
        <p className={styles.clippingSource}>The company chronicle · People</p>
        <h3>Leadership appointments announced</h3>
        <div className={styles.colleagueRow}>
          <div className={styles.colleaguePhoto}>
            <Image src={kavitaProfile} alt="Your colleague" fill sizes="64px" />
          </div>
          <div><strong>Your colleague promoted</strong><span>Named Director after four years with the company</span></div>
        </div>
        <p className={styles.markerUnderline}>Joined after you</p>
      </article>

      <article className={`${styles.evidencePiece} ${styles.reviewEvidence}`}>
        <Pin />
        <p className={styles.evidenceLabel}>Exhibit A · Performance review</p>
        <blockquote>“Consistently exceeds expectations and can always be relied upon.”</blockquote>
        <div className={styles.reviewRating}><span>Overall rating</span><strong>5 / 5</strong></div>
        <span className={`${styles.suspectTag} ${styles.bossSuspect}`}>My boss is the problem</span>
      </article>

      <article className={`${styles.evidencePiece} ${styles.credentialsEvidence}`}>
        <Pin dark />
        <p className={styles.handDate}>Tuesday, 11:40 PM</p>
        <p className={styles.handwrittenLine}>B.Tech ✓</p>
        <p className={styles.handwrittenLine}>MBA ✓</p>
        <p className={styles.handwrittenLine}>12 yrs experience ✓</p>
        <span className={styles.handNote}>So what am I missing?</span>
        <span className={`${styles.suspectTag} ${styles.certificationSuspect}`}>Need another certification</span>
      </article>

      <article className={`${styles.evidencePiece} ${styles.winsEvidence}`}>
        <Pin />
        <p className={styles.evidenceLabel}>Exhibit C · Track record</p>
        <ul>
          <li>Led critical accounts</li>
          <li>Delivered visible projects</li>
          <li>Fixed problems quietly</li>
        </ul>
        <span className={styles.blueCircle} aria-hidden="true" />
        <span className={`${styles.suspectTag} ${styles.presenceSuspect}`}>No executive presence?</span>
      </article>

      <article className={`${styles.evidencePiece} ${styles.timelineEvidence}`}>
        <Pin dark />
        <p className={styles.evidenceLabel}>Career map · same destination?</p>
        <svg className={styles.careerMap} viewBox="0 0 280 120" aria-hidden="true">
          <path className={styles.mapRoad} d="M-10 83 C40 60 54 100 100 72 S168 20 204 54 S252 102 292 76" />
          <path className={styles.mapRoadThin} d="M28 -10 C60 30 40 72 75 130 M178 -8 C154 35 190 68 162 130 M238 -5 C222 30 250 45 282 48" />
          <path className={styles.mapRoute} d="M28 80 C78 54 104 84 145 58 S205 39 248 70" />
          <circle className={styles.mapPoint} cx="28" cy="80" r="6" />
          <circle className={styles.mapPoint} cx="145" cy="58" r="6" />
          <circle className={styles.mapPoint} cx="248" cy="70" r="6" />
          <text x="12" y="105">2017 · YOU</text>
          <text x="124" y="42">2020 · THEM</text>
          <text x="218" y="98">PROMOTED</text>
        </svg>
        <span className={`${styles.suspectTag} ${styles.timeSuspect}`}>Maybe one more year</span>
      </article>

      <aside className={`${styles.suspectTag} ${styles.jobSuspect}`}>I need a new job</aside>
      <aside className={`${styles.suspectTag} ${styles.visibilitySuspect}`}>Need more visibility</aside>

      <aside className={styles.unansweredNote}>
        <Pin />
        <span>What am I</span>
        <strong>not seeing?</strong>
      </aside>
    </div>
  );
}
