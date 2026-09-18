"use client";

import { useEffect, useState } from "react";
import PromotableHeroWaitlist from "@/components/PromotableHeroWaitlist";
import { readStoDiagnosticContext, type StoDiagnosticContext } from "@/lib/diagnosticContext";
import styles from "./promotionFlow.module.css";

export default function CheckoutScreen() {
  const [context, setContext] = useState<StoDiagnosticContext | null>(null);
  useEffect(() => { setContext(readStoDiagnosticContext()); }, []);

  return <main className={styles.checkoutPage}>
    <div className={styles.checkoutPageShell}>
      {context ? <PromotableHeroWaitlist
        isOpen
        onClose={() => {}}
        presentation="page"
        checkoutVariant="promotion-architect"
        initialEmail={context.email}
        initialName={context.name}
        initialPhone={context.phone}
        initialCountryCode={context.countryCode}
        initialReferenceId={context.referenceId || context.waitlistId}
        initialWaitlistId={context.waitlistId}
        source={context.source || "promotion_flow"}
      /> : <p role="status">Loading checkout…</p>}
    </div>
  </main>;
}
