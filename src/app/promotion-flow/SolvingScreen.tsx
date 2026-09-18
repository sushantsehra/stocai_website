"use client";

import Link from "next/link";

import styles from "./promotionFlow.module.css";

import { approaches } from "./insightData";

export default function SolvingScreen({ barrierId, barrierLabel }: { barrierId: string; barrierLabel: string }) {
  return <main className={styles.principlePage}>
    <div className={styles.solvingShell}>
      <p className={styles.solvingBranch}>{barrierLabel}</p>
      <div className={styles.picked}><span><i />You picked</span><strong>{barrierLabel}</strong></div>
      <fieldset className={styles.solvingChoices} aria-describedby="solving-instruction">
        <legend>So how have you been trying to solve it?</legend>
        <p id="solving-instruction" className={styles.solvingInstruction}>Choose the one that comes closest to what you&apos;ve been doing.</p>
        {approaches.map((approach, index) => <Link key={approach.id} className={styles.solvingOption} href={`/promotion-flow?barrier=${encodeURIComponent(barrierId)}&stage=insight&choice=${approach.id}`}>
          <span className={styles.solvingNumber} aria-hidden="true">0{index + 1}</span>
          <span><strong>{approach.title}</strong><em>{approach.detail}</em></span>
          <span className={styles.solvingArrow} aria-hidden="true">&rarr;</span>
        </Link>)}
      </fieldset>
    </div>
  </main>;
}
