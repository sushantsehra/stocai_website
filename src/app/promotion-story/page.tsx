import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PromotionIdentityComparison from "./PromotionIdentityComparison";
import PromotionSequence from "./PromotionSequence";
import styles from "./page.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Why Am I Not Getting Promoted?",
  description:
    "When everyone around you gets promoted, the answer may not be another certification, manager, or company.",
  alternates: {
    canonical: "/promotion-story",
  },
};

export default function PromotionStoryPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.brand} aria-label="Better Corporate Life home">
            <Image src="/bcl-logo.png" alt="" width={42} height={42} priority />
            <span>Better Corporate Life</span>
          </Link>
          <Link href="/diagnostic" className={styles.navCta}>
            Find your blind spot
          </Link>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>The promotion story nobody talks about</p>
          <h1>
            You typed <span>“congrats”</span>
            <span className={styles.cursor} aria-hidden="true" />.
          </h1>
          <div className={styles.emotionalBeat}>
            <p className={styles.beatSentence}>
              <span className={styles.laptopLine}>Then you closed the laptop.</span>{" "}
              <span className={styles.stillLine}>and just sat there.</span>
            </p>
            <span className={styles.closingLine} aria-hidden="true" />
          </div>

          <PromotionSequence />

          <div className={styles.heroQuestion}>
            <span />
            <div className={styles.questionCopy}>
              <p className={styles.eyebrow}>You are left wondering</p>
              <p>
                If I am so smart,
                <br />
                why am I not getting promoted?
              </p>
            </div>
          </div>
        </div>

        <a className={styles.scrollCue} href="#the-next-morning">
          <span>Keep reading</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section id="the-next-morning" className={styles.followUp}>
        <div className={styles.followUpCopy}>
          <p className={styles.eyebrow}>The next morning</p>
          <h2>You start building a case against yourself.</h2>
        </div>

        <figure className={styles.artwork}>
          <div className={styles.imageFrame}>
            <PromotionIdentityComparison />
          </div>
          <figcaption>
            Your performance is visible. The decision-making criteria are not.
          </figcaption>
        </figure>

        <div className={`${styles.followUpCopy} ${styles.followUpContinuation}`}>
          <p className={styles.fallApart}>But every answer falls apart.</p>
          <p className={styles.closingQuestion}>What am I still not seeing?</p>
        </div>
      </section>
    </main>
  );
}
