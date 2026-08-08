import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, BarChart3, FileCheck2, Presentation, Users } from "lucide-react";
import sushantPicture from "@/assets/SushantPicture.png";
import eleenaPicture from "@/assets/EleenaR.jpg";
import hussainPicture from "@/assets/MHussain.jpg";
import venkatramanPicture from "@/assets/VenkatramanA.jpg";
import accentureLogo from "@/assets/accenture.png";
import citiLogo from "@/assets/citi_logo.png";
import deloitteLogo from "@/assets/deloitte.png";
import mahindraLogo from "@/assets/mahindra.png";
import nvidiaLogo from "@/assets/nvidia.png";
import morganStanleyLogo from "@/assets/morganstanley.png";
import edelweissLogo from "@/assets/edelweiss.png";
import PromotionIdentityComparison from "./PromotionIdentityComparison";
import PromotionSequence from "./PromotionSequence";
import ExitIntentPopup from "./ExitIntentPopup";
import OfferJourney from "./OfferJourney";
import PromotionStoryAccessFlow from "./PromotionStoryAccessFlow";
import Footer from "@/components/FooterSection";
import styles from "./page.module.css";

const outcomes = [
  { number: "01", state: "Seen", title: "Get credit", copy: "Make sure the impact of your work carries your name.", Icon: FileCheck2 },
  { number: "02", state: "Believed", title: "Signal the next level", copy: "Look ready for the role before you hold the title.", Icon: BadgeCheck },
  { number: "03", state: "Seen", title: "Command the meeting room", copy: "Shape the room when reputation and decisions are being made.", Icon: Presentation },
  { number: "04", state: "Backed", title: "Get sponsored", copy: "Build advocates who back you when you are not in the room.", Icon: Users },
];

const formulaItems = [
  { label: "Seen", copy: "The right people know your work.", image: "/promotion-formula/seen.png" },
  { label: "Believed", copy: "They can already picture you at the next level.", image: "/promotion-formula/believed.png" },
  { label: "Backed", copy: "Someone in the room will stake their credibility on you.", image: "/promotion-formula/backed-v2.png" },
];

const transformationSteps = [
  { number: "01", label: "Video", title: "Awareness Videos", subtitle: "See what you are missing.", copy: "Short videos explain the frameworks using psychology, coaching, marketing and real corporate experience.", visual: "awareness" },
  { number: "02", label: "Personal plan", title: "Your 30–60–90 Day Plan", subtitle: "Know what moves to make.", copy: "Build a plan based on your role, your stakeholders and the promotion you want.", visual: "plan" },
  { number: "03", label: "Apps", title: "Promotion Apps", subtitle: "Start using the plan at work.", copy: "Use the Stakeholder Map, Delegation and Personal Branding apps.", visual: "apps" },
  { number: "04", label: "Practice", title: "AI Coach", subtitle: "Practice before the real conversation.", copy: "Work through personal barriers and practice your promotion pitch.", visual: "coach" },
  { number: "05", label: "Human support", title: "Accountability Partner + Coach on Call", subtitle: "Keep moving when work gets busy.", copy: "Someone keeps you on track. You can call a coach when a real situation gets difficult.", visual: "support" },
];

const testimonials = [
  { quote: "How decisions get made when you're not in the room. That changed how I show up completely.", role: "Director of Operations · Bengaluru · Consulting", image: eleenaPicture },
  { quote: "Finally understood how to communicate impact without it feeling like self-promotion. That was my biggest block.", role: "Senior Product Manager · Gurugram · Global SaaS", image: hussainPicture },
  { quote: "Practising my promotion pitch with the AI coach before the real conversation—that is what made the difference.", role: "Engineering Head · Pune · Global Product", image: venkatramanPicture },
];

const memberCompanies = [
  { name: "Accenture", logo: accentureLogo },
  { name: "Citi", logo: citiLogo },
  { name: "Deloitte", logo: deloitteLogo },
  { name: "Mahindra", logo: mahindraLogo },
  { name: "NVIDIA", logo: nvidiaLogo },
  { name: "Morgan Stanley", logo: morganStanleyLogo },
  { name: "Edelweiss Life", logo: edelweissLogo },
];

const faqs = [
  ["What if I do it and nothing changes?", "Then you get every rupee back. Do the program, apply the plan, and if you see no movement toward your promotion, we refund you. You will still walk into your next cycle knowing exactly where you stand."],
  ["I've got 12+ years in. Is this still for me?", "More, not less. Sponsorship, visibility, and how you are perceived matter more the higher you go. Delivery stopped being the only differentiator years ago."],
  ["My decision-makers are remote, or abroad.", "That is exactly the case this is built for. When leadership cannot see you work, perception and backing do the deciding. This is how you shape both from a distance."],
  ["How is this different from every other leadership course?", "Most courses teach you to be a better leader. This teaches you how the promotion decision actually gets made and how to position for it in your real situation—not in theory."],
  ["I don't have time for another course.", "Move at your own pace and revisit any module anytime. Most modules are short and end with something you can use at work that week."],
];

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
    <>
      <main className={styles.page}>
      <section className={styles.hero}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.brand} aria-label="Better Corporate Life home">
            <Image src="/bcl-logo.png" alt="" width={42} height={42} priority />
            <span>Better Corporate Life</span>
          </Link>
          <Link href="#promotion-story-access" className={styles.navCta}>
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

      <section className={`${styles.contentSection} ${styles.formulaSection}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Somewhere along the way, the rules changed</p>
          <h2>Early in your career, good work moves you forward. Later, it only keeps you in the running.</h2>
          <p className={styles.sectionLead}>Good work still matters. It is just no longer the whole case.</p>
          <div className={styles.formula} aria-label="Seen times believed times backed equals promoted">
            {formulaItems.map(({ label, copy, image }, index) => (
              <div className={styles.formulaPart} key={label}>
                <div className={styles.formulaCard}>
                  <div className={styles.formulaVisual}><Image src={image} alt="" fill sizes="(max-width: 600px) 28vw, 180px" /></div>
                  <div className={styles.formulaCopy}><strong>{label}</strong><span>{copy}</span></div>
                </div>
                <span className={styles.operator} aria-hidden="true">{index === 2 ? "=" : "×"}</span>
              </div>
            ))}
            <div className={`${styles.formulaCard} ${styles.formulaResult}`}>
              <div className={styles.formulaVisual}><Image src="/promotion-formula/promoted.png" alt="" fill sizes="(max-width: 600px) 112px, 180px" /></div>
              <div className={styles.formulaCopy}><strong>Promoted</strong><span>The decision goes your way.</span></div>
            </div>
          </div>
          <p className={styles.formulaLine}>Good work gets you considered. <strong>Seen × Believed × Backed</strong> is what gets you promoted.</p>
        </div>
      </section>

      <section className={`${styles.contentSection} ${styles.outcomesSection}`}>
        <div className={styles.architectInner}>
          <span className={styles.pageMark} aria-hidden="true">PA / 01</span>
          <p className={styles.architectEyebrow}><span />Introducing</p>
          <h2>Promotion Architect</h2>
          <p className={styles.architectLead}>An advanced online system that designs your personal strategy for becoming the first choice for promotion.</p>
          <div className={styles.strategyLabel}><span>Your strategy is designed to help you</span><i /></div>
          <div className={styles.architectMap}>
            <svg className={styles.desktopPath} viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.pathShadow} d="M40 438 L150 365 L350 365 L430 265 L610 265 L685 165 L855 165 L930 65 L1070 65 L1150 18" />
              <path className={styles.pathLine} d="M40 438 L150 365 L350 365 L430 265 L610 265 L685 165 L855 165 L930 65 L1070 65 L1150 18" />
              <path className={styles.guideLine} d="M75 465 L1150 55" />
              {[[150,365],[430,265],[685,165],[1008,65]].map(([cx,cy]) => <g key={cx}><circle className={styles.pathHalo} cx={cx} cy={cy} r="12" /><circle className={styles.pathDot} cx={cx} cy={cy} r="5" /></g>)}
            </svg>
            <div className={styles.mobilePath} aria-hidden="true"><i /><i /><i /><i /></div>
            {outcomes.map(({ number, state, title, copy, Icon }) => (
              <article className={`${styles.architectStep} ${styles[`architectStep${number}`]}`} key={number}>
                <div className={styles.stepMeta}><span>{number}</span><b>{state}</b></div>
                <h3>{title}</h3><p>{copy}</p><Icon aria-hidden="true" />
              </article>
            ))}
            <div className={styles.architectOutcome}><span>Outcome</span><strong>Promoted<br />first</strong></div>
          </div>
          <div className={styles.architectLegend}><span>Seen</span><i /><span>Believed</span><i /><span>Seen</span><i /><span>Backed</span></div>
        </div>
        <blockquote className={styles.architectQuote}>
          <div><span aria-hidden="true">“</span><p>The stakeholder framework alone was worth the entire program.</p></div>
          <cite>
            <span className={styles.architectQuoteAvatar}><Image src="/promotion-story/finance-head-testimonial.png" alt="" fill sizes="56px" /></span>
            <span className={styles.architectQuoteIdentity}><strong>Finance Head</strong><span>Mumbai · Financial Services</span></span>
          </cite>
        </blockquote>
      </section>

      <section className={`${styles.contentSection} ${styles.planSection}`}>
        <div className={styles.transformationInner}>
          <header className={styles.transformationHeader}>
            <div>
              <p className={styles.transformationEyebrow}><span />Inside Promotion Architect</p>
              <h2>Everything you need to get promotion ready in less than 8 weeks.</h2>
              <p>Awareness videos. A 30–60–90 day plan. Apps. AI coach. Human support. Use them at your own pace.</p>
            </div>
            <dl className={styles.transformationFacts}>
              <div><dt>Format</dt><dd>Self-paced</dd></div><div><dt>Duration</dt><dd>Less than 8 weeks</dd></div><div><dt>Support</dt><dd>Human + AI</dd></div>
            </dl>
          </header>
          <div className={styles.transformationTimeline}>
            {transformationSteps.map((step) => <article className={styles.transformationStep} key={step.number}>
              <span className={styles.transformationNumber}>{step.number}</span>
              <div className={styles.transformationCopy}><p>{step.label}</p><h3>{step.title}</h3><strong>{step.subtitle}</strong><span>{step.copy}</span></div>
              <div className={`${styles.transformationVisual} ${styles[`visual${step.visual}`]}`} aria-hidden="true">
                <small>{step.visual === "plan" ? "Your promotion plan" : step.label}</small>
                {step.visual === "awareness" && <div className={styles.awarenessGraphic}><i /><i /><i /><b>You</b><span>Work</span><span>Perception</span><span>Pattern</span></div>}
                {step.visual === "plan" && <div className={styles.daysGraphic}>{[30,60,90].map(day => <div key={day}><b>{day}</b><small>Days</small><i /><i /><i /></div>)}</div>}
                {step.visual === "apps" && <div className={styles.appsGraphic}><div>Stakeholder Map<small>Map influence</small></div><div>Delegation</div><div>Personal Brand<small>Shape perception</small></div></div>}
                {step.visual === "coach" && <div className={styles.coachGraphic}><div><b>You</b>I know the work. I don&apos;t know how to talk about it.</div><div><b>AI coach</b>Okay. Tell me what changed because of your work.</div><div><b>Practice</b>&ldquo;Because of my work...&rdquo;</div></div>}
                {step.visual === "support" && <div className={styles.supportGraphic}><ul><li>Did this week&apos;s move</li><li>Spoke to stakeholder</li><li>Next move</li><li>Weekly check-in</li></ul><div><b>↗</b><strong>Coach<br/>on call</strong><small>For real situations</small></div></div>}
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.contentSection} ${styles.stakesSection}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The cost of waiting</p>
          <h2>A promotion delayed by two years follows you for a decade.</h2>
          <p className={styles.sectionLead}>Your salary follows your title. Miss a cycle and the raise you did not get is not a one-time loss. Every future raise compounds off the lower number.</p>
          <div className={styles.chart}>
            <div className={styles.chartHeader}>
              <div><span>Illustrative annual compensation</span><strong>₹ LPA</strong></div>
              <div className={styles.chartLegend}><span><i className={styles.strategicDot} />Earlier promotion</span><span><i className={styles.reactiveDot} />Delayed promotion</span></div>
            </div>
            <div className={styles.chartBody}>
              <div className={styles.chartGraphic}>
                <svg viewBox="0 0 760 390" role="img" aria-labelledby="promotion-chart-title promotion-chart-desc">
                  <title id="promotion-chart-title">Compensation paths over twelve years</title>
                  <desc id="promotion-chart-desc">The earlier-promotion path grows from 15 to 120 lakh per annum while the delayed-promotion path grows from 15 to 70 lakh per annum.</desc>
                  {[15, 50, 85, 120].map((value, index) => <g key={value}><line x1="58" y1={315 - index * 82} x2="708" y2={315 - index * 82} className={styles.gridLine} /><text x="42" y={320 - index * 82} textAnchor="end" className={styles.axisLabel}>{value}</text></g>)}
                  <line x1="58" y1="315" x2="708" y2="315" className={styles.axisLine} />
                  <polyline points="58,287 166,270 274,248 382,210 490,164 598,110 706,55" className={styles.strategicLine} />
                  <polyline points="58,287 166,281 274,270 382,255 490,236 598,212 706,164" className={styles.reactiveLine} />
                  {[15,24,36,52,70,92,120].map((value,index) => { const x=58+index*108; const y=[287,270,248,210,164,110,55][index]; return <g key={`s-${value}`}><circle cx={x} cy={y} r="6" className={styles.strategicPoint} /><text x={x} y={y-14} textAnchor="middle" className={styles.strategicValue}>{value}</text></g>; })}
                  {[15,18,24,32,42,55,70].map((value,index) => { const x=58+index*108; const y=[287,281,270,255,236,212,164][index]; return <g key={`r-${value}`}><circle cx={x} cy={y} r="5" className={styles.reactivePoint} /><text x={x} y={y+23} textAnchor="middle" className={styles.reactiveValue}>{value}</text></g>; })}
                  <line x1="706" y1="67" x2="706" y2="152" className={styles.gapLine} />
                  <path d="M699 74 L706 64 L713 74 M699 145 L706 155 L713 145" className={styles.gapArrow} />
                  <g className={styles.gapBadge}><rect x="538" y="84" width="148" height="48" rx="8" /><text x="612" y="104" textAnchor="middle">₹50 LPA gap</text><text x="612" y="121" textAnchor="middle">every year by year 12</text></g>
                  {[0,2,4,6,8,10,12].map((year,index) => <text key={year} x={58+index*108} y="347" textAnchor="middle" className={styles.yearLabel}>{year}</text>)}
                  <text x="382" y="378" textAnchor="middle" className={styles.axisTitle}>YEARS IN CORPORATE</text>
                </svg>
              </div>
              <aside className={styles.chartSummary} aria-label="Twelve year compensation comparison">
                <p>After 12 years</p>
                <div><span>Earlier promotion</span><strong>₹1.20 crore</strong><small>annual compensation</small></div>
                <div><span>Delayed promotion</span><strong>₹70 lakh</strong><small>annual compensation</small></div>
                <div className={styles.summaryGap}><span>The difference</span><strong>₹50 lakh<br />every year</strong></div>
              </aside>
            </div>
            <div className={styles.compoundNote}><span><BarChart3 aria-hidden="true" /></span><strong>Promotions compound.<br />So does the cost of delay.</strong><p>Your salary follows your title.<br /><b>Your salary follows how quickly you reach that title.</b></p></div>
            <p className={styles.chartDisclaimer}>Illustrative example only. Individual outcomes depend on performance, company, role, market conditions, and other factors.</p>
          </div>
          <p className={styles.stakesPull}>Two paths, same person. By year 12, the gap is about <strong>₹50 lakh every year.</strong> Over a decade, more than ₹1 crore.</p>
        </div>
      </section>

      <OfferJourney />

      <section className={`${styles.contentSection} ${styles.founderSection}`}>
        <div className={`${styles.sectionInner} ${styles.founderLayout}`}>
          <div className={styles.founderImage}><Image src={sushantPicture} alt="Sushant Sehra, founder of Promotion Architect" priority={false} /></div>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>Why this exists</p>
            <p>For years I believed what most professionals are taught. Work hard, stay patient, the promotion will come. Then I watched talented people get overlooked cycle after cycle, while others moved ahead because they understood how visibility, influence, and leadership perception actually work.</p>
            <p>So I spent years studying the rules most professionals are never taught, then turned them into a step-by-step system experienced professionals could act on.</p>
            <h2 className={styles.founderConclusion}>That system is Promotion Architect.</h2>
            <div className={styles.founderIdentity}>
              <p className={styles.signature}>Sushant Sehra <span>Founder, Promotion Architect</span></p>
              <a href="https://www.linkedin.com/in/sushantsehra/" target="_blank" rel="noreferrer" className={styles.textLink}>LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.contentSection} ${styles.proofSection}`}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>From professionals doing the work</p><h2>Small shifts. Different conversations.</h2>
          <div className={styles.testimonialGrid}>{testimonials.map(({ quote, role, image }) => <blockquote key={role}><div className={styles.memberPortrait}><Image src={image} alt="" fill sizes="72px" /></div><div><span className={styles.quoteMark} aria-hidden="true">“</span>{quote}<cite>{role}</cite></div></blockquote>)}</div>
          <div className={styles.companies}>
            <span>Our members come from teams like</span>
            <div className={styles.companyRail}>
              <div className={styles.companyTrack}>
                {[...memberCompanies, ...memberCompanies].map(({ name, logo }, index) => <div className={styles.companyLogo} key={`${name}-${index}`} aria-hidden={index >= memberCompanies.length}><Image src={logo} alt={index < memberCompanies.length ? name : ""} fill sizes="140px" /></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.contentSection} ${styles.faqSection}`}>
        <div className={styles.sectionInner}><p className={styles.eyebrow}>Questions worth asking</p><h2>FAQs</h2><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalHeadline}>Next time,<br />it should be for you.</h2>
          <p className={styles.finalPromise}>Getting congratulated. Getting promoted.</p>
          <div className={styles.finalDivider} />
          <div className={styles.finalResponsibility}>
            <h3>Not getting promoted is not your fault.</h3>
            <p>Learning the invisible rules of promotion is your responsibility.</p>
          </div>
          <Link href="#promotion-story-access" className={styles.finalButton}>Join to get promoted <span aria-hidden="true">→</span></Link>
        </div>
        <span className={styles.finalPageMark} aria-hidden="true">PA / COMPLETE</span>
      </section>
        <PromotionStoryAccessFlow />
        <ExitIntentPopup />
      </main>
      <Footer className={styles.promotionFooter} />
    </>
  );
}
