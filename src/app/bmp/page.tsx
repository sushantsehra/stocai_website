import type { Metadata } from "next";
import Image from "next/image";
import styles from "./BmpPage.module.css";
import sushantPicture from "../../assets/SushantPicture.png";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Be More Promotable - Get Promoted in 60 Days",
  description:
    "An 8-week system for senior professionals to get promoted without office politics. ICF-certified coaching included.",
  openGraph: {
    title: "Be More Promotable - Get Promoted in 60 Days",
    description:
      "An 8-week system for senior professionals to get promoted without office politics. ICF-certified coaching included.",
    images: ["/bmp-hero.jpg"],
  },
};

const companies = [
  "Accenture",
  "Morgan Stanley",
  "Deloitte",
  "Edelweiss",
  "Mahindra",
  "UT Austin",
  "King's London",
  "IIM Calcutta",
  "IIT",
  "NVIDIA",
  "Citi",
];

const problems = [
  "You deliver strong results but keep getting passed over when leadership roles open up",
  'You get told "be more visible" or "show more leadership" but no one tells you what that means',
  "You watch less experienced colleagues get promoted while you're still waiting your turn",
  'Appraisals are always "good" but somehow that never turns into a promotion conversation',
  "You feel uncomfortable promoting yourself but also know staying quiet isn't working",
  "You're starting to wonder if there's something everyone else figured out that you didn't",
];

const withoutBmp = [
  "They see your work in a report",
  "You wait for your manager to mention you",
  "You describe what you did",
  "You pitch yourself in an appraisal",
  "The promotion is a surprise request",
  "The call is a pitch",
  "You're hoping someone notices",
];

const withBmp = [
  "They see you shaping the strategy",
  "You're already known two levels up",
  "You communicate the impact you created",
  "The decision is made before the meeting",
  "The promotion is a formality",
  "The conversation is already decided",
  "You engineered it that way",
];

const weeks = [
  {
    title: "Decode How Promotion Decisions Are Really Made",
    body: "Learn who actually decides, what they look for, and why performance alone is never enough.",
    action: "Stop waiting for appraisal season and start shaping the decision early.",
  },
  {
    title: "Position Yourself For The Next Level",
    body: "Translate your work into leadership signals that senior stakeholders can understand quickly.",
    action: "Make your current work look like evidence for your next role.",
  },
  {
    title: "Build Visibility Without Self-Promotion",
    body: "Create a visibility map across managers, skip-levels, peers, and decision-makers.",
    action: "Become known for impact without sounding political or performative.",
  },
  {
    title: "Communicate Impact In Executive Language",
    body: "Replace task updates with business outcomes, tradeoffs, and strategic contribution.",
    action: "Make your work memorable before the promotion conversation begins.",
  },
  {
    title: "Stakeholder Influence System",
    body: "Build advocates before you need them and make your promotion easier to support.",
    action: "Turn quiet approval into active sponsorship.",
  },
  {
    title: "Handle Office Politics Without Playing Dirty",
    body: "Understand hidden power, perception, and timing without compromising your values.",
    action: "Navigate the room instead of being surprised by it.",
  },
  {
    title: "Your Promotion Pitch",
    body: "Prepare the story, evidence, and ask that makes your next step feel obvious.",
    action: "Walk into the conversation with clarity, not hope.",
  },
  {
    title: "Your Personalised Promotion Roadmap",
    body: "A custom 30-60-90 day plan around your role, company, and timeline.",
    action: "Walk away with a step-by-step plan, not a vague goal.",
  },
];

const bonuses = [
  ["AI Promotion Pitch Coach", "Practice the conversation with an AI coach. Walk in prepared, not nervous.", "₹999"],
  ["Personalised Action Plan + Training", "A 12-month roadmap built around your specific role and goals.", "₹2,999"],
  ["Delegation & Stakeholder App (12 mo.)", "LNO framework, branding tools, stakeholder tracker - all in one place.", "₹17,999"],
  ["How To Handle Office Politics - E-Book", "The unwritten rulebook. Navigate without losing yourself.", "₹749"],
  ["Mentorship Events & Community", "Monthly group coaching + private community with cohort and alumni.", "₹5,999"],
];

const offerRows = [
  ["8-Week Be More Promotable Program", "₹17,999"],
  ["ICF-Certified 1:1 Coaching Sessions", "FREE"],
  ["AI Promotion Pitch Coach (12 mo.)", "₹999"],
  ["Personalised Action Plan & Training (12 mo.)", "₹2,999"],
  ["Delegation + Stakeholder App (12 mo.)", "₹17,999"],
  ["Office Politics E-Book", "₹749"],
  ["Community + Mentorship (12 mo.)", "₹5,999"],
  ["Monthly Group Coaching Calls (12 mo.)", "FREE"],
  ["Private Community Access (Cohort + Alumni)", "FREE"],
];

const faqs = [
  [
    "How is this different from other leadership courses?",
    "Most programs teach theory. This one teaches the hidden rules of how promotion decisions are actually made - and gives you a system to act on it immediately.",
  ],
  [
    "I have 12+ years of experience. Will this still help?",
    "Yes. This was built specifically for senior professionals. The more experienced you are, the more the old approach stops working. This is where that gap closes.",
  ],
  [
    "How much time will this take each week?",
    "Each module is under 30 minutes. The actions happen inside your existing job - you won't be adding work, just doing it differently.",
  ],
  [
    "What if I'm already known in my company?",
    "Visibility at your current level isn't the same as promotability at the next level. BMP shows you how to reach the people who matter for your next role.",
  ],
  [
    "What if I complete the program and nothing changes?",
    "Complete the modules, apply the system, see no movement - we give you a full refund. No questions asked.",
  ],
  [
    "Is this only for people in large corporates?",
    "It works best in mid-to-large Indian corporates and MNCs. If unsure whether it fits, our team will tell you honestly on a call.",
  ],
];

function Cta({ small = false }: { small?: boolean }) {
  return (
    <a className={`${styles.primaryButton} ${small ? styles.smallButton : ""}`} href="#cta">
      Get Early Access <span aria-hidden="true">→</span>
      {!small && <span className={styles.price}>₹1,970</span>}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={styles.sectionHead}>
      <span className={`${styles.divider} ${light ? styles.lightDivider : ""}`}>{eyebrow}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {copy && <p className={styles.subcopy}>{copy}</p>}
    </div>
  );
}

export default function BmpPage() {
  return (
    <main id="top" className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark}>B</span>
            <span>Better Corporate Life</span>
          </a>
          <nav className={styles.nav}>
            <a href="#problem">The Problem</a>
            <a href="#program">Program</a>
            <a href="#results">Results</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className={styles.actions}>
            <a href="#login">Login</a>
            <Cta small />
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={`${styles.glow} ${styles.heroGlow}`} />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrowPill}>For professionals with 8+ years of experience</span>
            <h1 className={styles.heroTitle}>
              Learn to position yourself & get
              <span className={styles.gradientText}> promoted faster </span>
              in the next 60 days.
            </h1>
            <p className={styles.lead}>
              <strong>87% of our students get promoted</strong> without office politics or competition - using our{" "}
              <em>Be More Promotable</em> 8-Week comprehensive program.
            </p>
            <div className={styles.heroCta}>
              <Cta />
              <span className={styles.rating}>★★★★★ <strong>4.8/5</strong> · since 2020</span>
            </div>
            <ul className={styles.checkList}>
              <li>✓ Built for senior professionals</li>
              <li>✓ ICF-Certified coaching included</li>
              <li>✓ Used across Fortune 500 companies</li>
            </ul>
          </div>
          <div className={styles.imageWrap}>
            <div className={styles.imageGlow} />
            <Image className={styles.heroImage} src="/bmp-hero.jpg" alt="Senior professional ready for promotion" width={1080} height={1600} priority />
            <div className={styles.imageBadge}>
              <p className={styles.kicker}>Average time to first visible shift</p>
              <p className={styles.badgeValue}>8 Weeks</p>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {[
              ["125+", "Promotions Influenced"],
              ["87%", "Promoted Within 6 Months"],
              ["8 Wk", "First Visible Shift"],
              ["4.8/5", "Rated Since 2020"],
            ].map(([value, label]) => (
              <div className={styles.stat} key={label}>
                <div className={styles.statValue}>{value}</div>
                <div className={styles.muted}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.trusted}>
        <div className={styles.container}>
          <p className={styles.kicker}>Trusted by professionals from</p>
          <div className={styles.logoCloud}>
            {companies.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className={styles.section}>
        <div className={`${styles.container} ${styles.center}`}>
          <SectionHead
            eyebrow="Do you relate?"
            title={
              <>
                If you nodded at even one... <br />
                <span className={styles.gradientText}>the problem isn&apos;t you.</span>
              </>
            }
          />
          <ul className={styles.problemGrid}>
            {problems.map((problem) => (
              <li className={`${styles.card} ${styles.surfaceCard} ${styles.problemCard}`} key={problem}>
                <span className={styles.checkCircle}>✓</span>
                <p>{problem}</p>
              </li>
            ))}
          </ul>
          <p className={`${styles.lead} ${styles.center}`} style={{ margin: "40px auto 24px" }}>
            It&apos;s the system. This program will show you the real challenge - and how to fix it.
          </p>
          <Cta />
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.container}>
          <SectionHead
            eyebrow="The Problem"
            title="The career math nobody wants you to do."
            copy="Most professionals stop the calculation before it gets uncomfortable. Here's where it actually ends up."
            light
          />
          <div className={styles.darkStepGrid}>
            {[
              ["01", "You work hard and deliver results", "The people who decide rarely notice"],
              ['02', 'You get "good" appraisal feedback', "Still no promotion"],
              ["03", "You wait for your manager to advocate", "They're too busy"],
              ["04", "Another cycle passes", "A less qualified peer moves up"],
            ].map(([num, title, copy]) => (
              <div className={styles.darkCard} key={num}>
                <div className={`${styles.display} ${styles.stepNumber}`}>{num}</div>
                <p style={{ marginTop: 8, fontWeight: 600 }}>{title}</p>
                <p className={styles.subcopy} style={{ marginTop: 8, fontSize: 14 }}>{copy}</p>
              </div>
            ))}
          </div>
          <div className={styles.costBox}>
            <p className={styles.kicker} style={{ color: "#9dbdff" }}>True cost of doing nothing</p>
            <p className={styles.costTitle}>Another 2-3 years.</p>
            <p className={styles.subcopy}>
              Another missed cycle. Another title you deserved. Working harder will not fix this. Waiting longer will not
              fix this. The problem was never your performance - it&apos;s that every year you show up without a promotion
              strategy, you arrive in the decision-makers&apos; minds as a stranger.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHead
            eyebrow="The Shift"
            title={
              <>
                What if the decision was already made... <span className={styles.gradientText}>in your favour?</span>
              </>
            }
          />
          <div className={styles.twoGrid}>
            <div className={`${styles.card} ${styles.surfaceCard}`}>
              <p className={styles.kicker}>Without BMP</p>
              <ul className={styles.comparison}>
                {withoutBmp.map((item) => (
                  <li key={item}><span className={styles.cross}>✕</span><span className={styles.muted}>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className={`${styles.card} ${styles.highlightCard}`}>
              <p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>With BMP</p>
              <ul className={styles.comparison}>
                {withBmp.map((item) => (
                  <li key={item}><span className={styles.check}>✓</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <p className={`${styles.lead} ${styles.center}`} style={{ margin: "48px auto 0" }}>
            8 Weeks. One System. A career that finally moves towards promotion. The investment you make in your
            promotability now pays back in salary, title, and impact - for the rest of your career.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.surface}`}>
        <div className={styles.container}>
          <SectionHead eyebrow="What this is not" title="Be More Promotable is not what you think it is." />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Type</th><th>What most programs do</th><th>What BMP does</th></tr>
              </thead>
              <tbody>
                <tr><td>Leadership Course</td><td className={styles.muted}>Teaches theory. Doesn&apos;t convert.</td><td>Shows you the hidden rules of promotion. Then makes you use them.</td></tr>
                <tr><td>Executive Coaching</td><td className={styles.muted}>One opinion. High cost.</td><td>A system rooted in real corporate psychology + ICF-certified coaching at every step.</td></tr>
                <tr><td>MBA</td><td className={styles.muted}>2 years. ₹40 Lakhs. No guarantee.</td><td>8 weeks. ₹1,970. A system that works in your actual job, starting this week.</td></tr>
                <tr><td>Motivational Content</td><td className={styles.muted}>Inspires you for 48 hours.</td><td>Permanently changes how you show up, speak, and get perceived.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="results" className={styles.section}>
        <div className={styles.container}>
          <SectionHead
            eyebrow="Real professionals. Real promotions."
            title={<>The system worked for them. <span className={styles.gradientText}>Here&apos;s exactly what changed.</span></>}
          />
          <div className={styles.caseGrid}>
            <article className={`${styles.card} ${styles.surfaceCard} ${styles.caseCard}`}>
              <p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>Case Study · Eleena R.</p>
              <h3>From 3 years stuck → Senior Manager in one cycle.</h3>
              <p className={styles.subcopy}>11 years experience. Strong ratings. A manager who liked her work. And had been in the same role for 3 years.</p>
              <div className={styles.caseSplit}>
                <div><p className={styles.kicker}>Before</p><ul className={styles.muted}><li>3 years in the same role</li><li>&quot;Invisible contributor&quot;</li><li>Strong performer, no advocate</li><li>Feedback: &quot;be more visible&quot;</li></ul></div>
                <div><p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>After</p><ul><li>Promoted to Senior Manager</li><li>Known 2 levels up</li><li>3 senior stakeholder relationships</li><li>Sponsor before cycle opened</li></ul></div>
              </div>
            </article>
            <article className={`${styles.card} ${styles.surfaceCard} ${styles.caseCard}`}>
              <p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>Case Study · M. Hussain</p>
              <h3>Two promotions in 18 months. 40% salary jump.</h3>
              <p className={styles.subcopy}>Stuck at mid-level for 4 years before discovering the framework.</p>
              <div className={styles.caseCard} style={{ borderTop: "1px solid var(--bmp-border)", paddingTop: 16 }}>
                <p><span className={styles.kicker}>First 8 Weeks</span><br />Learned stakeholder framework. Communicated impact in executive language. → Senior level. <strong className={styles.accent}>+40% salary</strong>.</p>
                <p><span className={styles.kicker}>Next Cycle</span><br />Used the full system at the new level. Built cross-functional influence. → <strong className={styles.accent}>Associate Director</strong>.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="program" className={`${styles.section} ${styles.surface}`}>
        <div className={styles.container}>
          <SectionHead
            eyebrow="What you get"
            title={<>Eight weeks. Eight shifts. <span className={styles.gradientText}>One promotion that finally happens.</span></>}
            copy="Every module is under 30 minutes of focused learning - and every single one ends with something you apply at work that week."
          />
          <ol className={styles.timeline}>
            {weeks.map((week, index) => (
              <li className={styles.week} key={week.title}>
                <div className={styles.weekCard}>
                  <span className={styles.weekNo}>{String(index + 1).padStart(2, "0")}</span>
                  <p className={styles.weekMeta}>Week {String(index + 1).padStart(2, "0")}</p>
                  <h3>{week.title}</h3>
                  <p className={styles.subcopy} style={{ marginTop: 8 }}>{week.body}</p>
                  <p className={styles.weekAction}><span className={styles.check}>→</span><span>{week.action}</span></p>
                </div>
              </li>
            ))}
          </ol>
          <p className={`${styles.center} ${styles.muted}`} style={{ marginTop: 40 }}>
            These are the skills most professionals only discover after 15-20 years. You&apos;re getting them in 8.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHead eyebrow="Bonuses" title={<>Plus everything below - <span className={styles.gradientText}>completely free.</span></>} />
          <div className={styles.bonusGrid}>
            {bonuses.map(([title, body, value], index) => (
              <div className={`${styles.card} ${styles.bonusCard}`} key={title}>
                <p><span className={styles.gift}>🎁</span><span className={styles.kicker}>Bonus {String(index + 1).padStart(2, "0")}</span></p>
                <h3 style={{ marginTop: 16 }}>{title}</h3>
                <p className={styles.subcopy} style={{ marginTop: 8 }}>{body}</p>
                <p className={styles.kicker} style={{ color: "var(--bmp-primary)", marginTop: 16 }}>Value: {value}</p>
              </div>
            ))}
          </div>
          <p className={`${styles.center} ${styles.lead}`} style={{ margin: "40px auto 0" }}>
            <span className={styles.muted}>Total bonus value:</span> <s>₹28,745</s>{" "}
            <strong className={styles.accent}>You pay: ₹0</strong>
          </p>
        </div>
      </section>

      <section id="cta" className={`${styles.section} ${styles.dark}`}>
        <div className={styles.gridBg} style={{ opacity: 0.1 }} />
        <div className={styles.container} style={{ position: "relative" }}>
          <div className={styles.sectionHead}>
            <span className={`${styles.divider} ${styles.glowDivider}`}>The Full Offer</span>
            <h2 className={styles.sectionTitle}>Get the complete Be More Promotable system.</h2>
            <p className={styles.subcopy}>8 Weeks. 5 Bonuses. 12 Months of Support. One payment. No subscription. No catch.</p>
          </div>
          <div className={styles.offerCard}>
            <table className={styles.offerTable}>
              <tbody>
                {offerRows.map(([name, price]) => (
                  <tr key={name}><td>{name}</td><td>{price}</td></tr>
                ))}
              </tbody>
            </table>
            <div className={styles.offerPrice}>
              <p className={styles.kicker} style={{ color: "rgba(255,255,255,.65)" }}>Total value <s>₹30,000+</s></p>
              <p className={styles.bigPrice}>₹1,970</p>
              <p className={styles.subcopy}>Early access price · one-time</p>
            </div>
          </div>
          <div className={styles.center} style={{ marginTop: 40 }}>
            <Cta />
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: 12, marginTop: 16 }}>🔒 Secure checkout · 30-day refund if you complete the program & see no movement</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHead eyebrow="Our guarantee" title="A simple commitment. We only win when you win." />
          <div className={styles.guaranteeGrid}>
            <div className={`${styles.card} ${styles.surfaceCard}`}><p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>We provide</p><ul className={styles.comparison}><li>The complete promotion strategy</li><li>Playbooks & frameworks</li><li>Resources & templates</li><li>ICF-certified coach</li><li>Weekly reviews & accountability</li></ul></div>
            <div className={`${styles.card} ${styles.surfaceCard}`}><p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>You commit to</p><ul className={styles.comparison}><li>Complete all modules</li><li>Create and execute your plan</li><li>Check in weekly</li><li>Apply your learnings</li><li>Show up for yourself</li></ul></div>
          </div>
          <p className={`${styles.center} ${styles.subcopy}`} style={{ margin: "32px auto 0", maxWidth: 700 }}>
            If you complete the program, apply the system, and see no movement in your career - email us for a full refund.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.surface}`}>
        <div className={`${styles.container} ${styles.founderGrid}`}>
          <div className={styles.imageWrap}>
            <div className={styles.imageGlow} />
            <Image className={styles.founderImage} src={sushantPicture} alt="Sushant Sehra, Founder" width={1024} height={1024} />
          </div>
          <div>
            <span className={styles.divider}>Who built this</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: 20 }}>The exact system we used to get unstuck ourselves.</h2>
            <p className={styles.subcopy} style={{ marginTop: 20 }}>
              We&apos;re not motivational speakers. We&apos;re not LinkedIn coaches posting platitudes. We sell a system. Our team brings expertise in psychology, neuroscience, marketing, HR, business strategy, coaching, and behavioural science - with 100+ years of corporate experience across SAP, Nvidia, Accenture, and Citi.
            </p>
            <div className={styles.card} style={{ marginTop: 24 }}>
              <h3>Sushant Sehra</h3>
              <p className={styles.kicker}>Founder, Better Corporate Life</p>
              <div className={styles.founderStats}>
                {[
                  ["125", "Promotion cycles observed"],
                  ["25", "Promotions influenced"],
                  ["200+", "Pitches reviewed"],
                  ["61", "Bosses survived"],
                ].map(([value, label]) => (
                  <div key={label}><p className={styles.statValue} style={{ fontSize: 28 }}>{value}</p><p className={styles.muted} style={{ fontSize: 12 }}>{label}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHead eyebrow="Is this for you?" title="Let's be honest about who this fits." />
          <div className={styles.fitGrid}>
            <div className={`${styles.card} ${styles.highlightCard}`}>
              <p className={styles.kicker} style={{ color: "var(--bmp-primary)" }}>This is for you if...</p>
              <ul className={styles.comparison}>
                {["You have 8+ years of experience and deliver strong results", 'You\'ve been told "not yet" or given vague feedback like "be more visible"', "You're ready to stop waiting and build your promotion intentionally", "You want to take back control without playing dirty politics", "You're willing to learn, reflect, and take action"].map((item) => (
                  <li key={item}><span className={styles.check}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.card} ${styles.surfaceCard}`}>
              <p className={styles.kicker}>This is not for you if...</p>
              <ul className={styles.comparison}>
                {["You believe promotions should happen without any effort on your part", "You're not open to changing how you show up at work", "You want a magic hack or a shortcut", "You're looking for motivation... not a system"].map((item) => (
                  <li key={item}><span className={styles.cross}>✕</span><span className={styles.muted}>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.section} ${styles.surface}`}>
        <div className={styles.container}>
          <SectionHead eyebrow="Frequently asked" title="Your questions, answered." />
          <div className={styles.faq}>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary><span>{question}</span><span className={styles.accent}>+</span></summary>
                <p className={styles.subcopy} style={{ marginTop: 12 }}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.center}`}>
          <span className={styles.divider}>The bottom line</span>
          <h2 className={styles.sectionTitle} style={{ marginTop: 24 }}>
            If you keep doing great work silently, nothing changes. <br />
            <span className={styles.gradientText}>If you learn how promotions actually work, everything changes.</span>
          </h2>
          <p className={styles.subcopy} style={{ marginTop: 24 }}>
            Early access pricing is only available for a short time. After years of helping professionals get unstuck privately, we&apos;re opening this to a limited founding batch.
          </p>
          <div style={{ marginTop: 28 }}><Cta /></div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <p>© 2026 Better Corporate Life · Sushant Sehra</p>
          <p style={{ maxWidth: 560, color: "rgba(255,255,255,.42)" }}>
            Not affiliated with Facebook or any Facebook entities. Once you leave Facebook, the responsibility no longer is on their site.
          </p>
        </div>
      </footer>
    </main>
  );
}
