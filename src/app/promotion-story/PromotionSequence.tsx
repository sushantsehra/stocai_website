"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

const allPromotionMoments = [
  "The one you trained got promoted.",
  "The one who asks you for help got promoted.",
  "The one younger than you got promoted.",
  "The one who joined after you got promoted.",
  "The one you thought was “solid, not exceptional” got promoted.",
  "The one whose mistakes you covered got promoted.",
];

const people = ["trained", "younger", "joined", "covered"] as const;

function pickFourMoments() {
  return [...allPromotionMoments]
    .sort(() => Math.random() - 0.5)
    .slice(0, people.length);
}

export default function PromotionSequence() {
  const [moments, setMoments] = useState(allPromotionMoments.slice(0, people.length));

  useEffect(() => {
    setMoments(pickFourMoments());
  }, []);

  return (
    <figure className={styles.promotionSequence}>
      <div className={styles.teamPhoto}>
        <Image
          src="/promotion-team-offsite.png"
          alt="Ten colleagues together at a corporate team offsite."
          width={1672}
          height={939}
          sizes="(max-width: 900px) calc(100vw - 32px), 1030px"
          priority
        />

        {people.map((person, index) => (
          <div
            key={person}
            className={`${styles.annotation} ${styles[person]}`}
            style={{ "--sequence-index": index } as CSSProperties}
            aria-hidden="true"
          >
            <svg className={styles.faceCircle} viewBox="0 0 120 150">
              <ellipse cx="60" cy="75" rx="52" ry="66" />
            </svg>
            <p className={styles.quoteCard}>
              {moments[index]}
            </p>
          </div>
        ))}
      </div>
      <figcaption className={styles.srOnly}>{moments.join(" ")}</figcaption>
    </figure>
  );
}
