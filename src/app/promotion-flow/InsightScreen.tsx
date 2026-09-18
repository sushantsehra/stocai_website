import Link from "next/link";
import { getPromotionInsight } from "./insightData";
import SolvingScreen from "./SolvingScreen";
import styles from "./promotionFlow.module.css";

export default function InsightScreen({ barrierId, barrierLabel, choiceId }: { barrierId: string; barrierLabel: string; choiceId?: string }) {
  const content = getPromotionInsight(barrierId, choiceId);
  if (!content) return <SolvingScreen barrierId={barrierId} barrierLabel={barrierLabel} />;

  return <main className={styles.truthPage}>
    <div className={styles.truthShell}>
      <div className={styles.picked}><span><i />You picked</span><strong>{barrierLabel}</strong></div>
      <section className={`${styles.truthStory} ${styles.insightStory}`}>
        <div className={styles.feelsPanel}>
          <p className={styles.insightSelected}>{content.selected}</p>
          <h1>{content.title}</h1>
          <div className={styles.barrierSetup}><p>{content.body}</p></div>
        </div>
        <div className={styles.truthDivider} aria-hidden="true"><i /></div>
        <div className={`${styles.changesPanel} ${styles.barrierDetails}`}>
          <h2 className={styles.insightGapTitle}>The gap</h2>
          <div className={styles.insightGap}><p>{content.gap[0]}</p><i className={styles.tealRule} aria-hidden="true" /><p><strong>{content.gap[1]}</strong></p></div>
          <Link href={`/promotion-flow?barrier=${encodeURIComponent(barrierId)}&stage=offer&choice=${encodeURIComponent(choiceId!)}`}>Show me what I need to do <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  </main>;
}
