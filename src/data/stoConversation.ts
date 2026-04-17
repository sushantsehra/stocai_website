export type Q1OptionId = "hard_work" | "invisible" | "missed_opportunity" | "self_doubt" | "wrong_place";

export type DiagnosticDoorId =
  | "imposter_syndrome"
  | "story_of_work"
  | "story_of_contribution"
  | "sponsor_network"
  | "communication_framework"
  | "brilliance_image_trap"
  | "values_misalignment"
  | "complex_situation";

export type ContextAnswers = {
  notExpected: string;
  knownFor: string;
  targetRole: string;
};

export const q1Options: Array<{
  id: Q1OptionId;
  label: string;
  empathy: string;
}> = [
  {
    id: "hard_work",
    label: "I worked really hard. It just didn't seem to matter in the end",
    empathy: "You worked really hard and now you might be wondering - what was the meaning of all this.",
  },
  {
    id: "invisible",
    label: "My manager barely notices I exist",
    empathy:
      "You show up, you deliver, and it's like you're invisible. Must be making you wonder if you're even in the right place.",
  },
  {
    id: "missed_opportunity",
    label: "Someone else got the opportunity I was waiting for",
    empathy:
      "You watched someone else get what you worked for. And now you're wondering - what am I even doing wrong.",
  },
  {
    id: "self_doubt",
    label: "I've started doubting myself and I hate that",
    empathy:
      "You used to back yourself. Somewhere along the way that changed. And that change is bothering you more than anything else.",
  },
  {
    id: "wrong_place",
    label: "Honestly? I'm starting to wonder if this is even for me",
    empathy:
      "Feeling different from everyone around you is lonely. But what if different is exactly what makes you special.",
  },
];

export const q1CopyById = q1Options.reduce<Record<Q1OptionId, string>>((copy, option) => {
  copy[option.id] = option.label;
  return copy;
}, {} as Record<Q1OptionId, string>);

export const doorDetails: Record<
  DiagnosticDoorId,
  {
    name: string;
    shortName: string;
    summary: string;
    concept: string;
    programLink: string;
    special?: boolean;
  }
> = {
  imposter_syndrome: {
    name: "Imposter Syndrome",
    shortName: "Imposter Syndrome",
    summary:
      "Something inside stopped you from asking early - not lack of ambition, but a belief that you were not ready or worthy yet.",
    concept:
      "This is not a confidence problem in the generic sense. It is a timing problem created by self-doubt: you wait until you feel fully ready, while promotion decisions start forming much earlier.",
    programLink:
      "corporatelife helps you notice that pattern, ask earlier, and build the internal permission to be seen before everything feels perfect.",
  },
  story_of_work: {
    name: "Story of the Work",
    shortName: "Story of Work",
    summary:
      "Your project is not visible to the people who make decisions, even if the work itself is solid.",
    concept:
      "Good work does not automatically travel upward. Leadership notices work when it is framed in the language of business priorities, risk, leverage, and outcomes.",
    programLink:
      "corporatelife teaches you how to translate the importance of your work so decision-makers understand why it matters.",
  },
  story_of_contribution: {
    name: "Story of Contribution",
    shortName: "Story of Contribution",
    summary:
      "The work may be visible, but people are not connecting the output specifically to you.",
    concept:
      "This is where reliable performers often get stuck. They let the work speak, but the work rarely names who created the change.",
    programLink:
      "corporatelife helps you stake your claim clearly, without sounding self-promotional or political.",
  },
  sponsor_network: {
    name: "Sponsor Network",
    shortName: "Sponsor Network",
    summary:
      "Your sponsor setup is too fragile: either the person backing you is not in the decision room, or you are depending on one path.",
    concept:
      "A single sponsor is a single point of failure. Promotions need multiple stakeholders who understand your value and have enough power to carry your case.",
    programLink:
      "corporatelife teaches stakeholder strategy so your growth does not depend on one person noticing you at the right time.",
  },
  communication_framework: {
    name: "Communication Framework",
    shortName: "Communication",
    summary:
      "Your sponsor may have power, but they are not motivated enough to spend political currency on you yet.",
    concept:
      "Sponsors back people when the case feels important to them too. That means communicating from their priorities, not only from your effort or frustration.",
    programLink:
      "corporatelife teaches the communication frameworks that make your growth feel like a shared win.",
  },
  brilliance_image_trap: {
    name: "Brilliance Image Trap",
    shortName: "Next Level Signal",
    summary:
      "You are seen as excellent at your current role, but not yet as someone already operating at the next level.",
    concept:
      "Being brilliant at today's job can trap your reputation there. The next level needs visible evidence tied to next-level priorities, not just stronger current-role performance.",
    programLink:
      "corporatelife helps you deliberately build that next-level signal through the right projects, language, and relationships.",
  },
  values_misalignment: {
    name: "Values Misalignment",
    shortName: "Deeper Conversation",
    summary:
      "Your work is important, your contribution is visible, and you still were not considered. That points to something deeper.",
    concept:
      "When the usual promotion signals are present but the outcome still does not move, the issue may be alignment with your manager, team, or company context.",
    programLink:
      "This is better handled in a real conversation with the corporatelife team before recommending a path.",
    special: true,
  },
  complex_situation: {
    name: "Complex Situation",
    shortName: "Deeper Conversation",
    summary:
      "You had sponsor power, sponsor willingness, and next-level evidence, but still were not chosen.",
    concept:
      "If all the visible signals are positive and the result still does not follow, there may be context that a fixed diagnostic cannot responsibly infer.",
    programLink:
      "This needs a real conversation with the corporatelife team before pointing you anywhere.",
    special: true,
  },
};

export const getQ1Empathy = (q1: Q1OptionId | null) => {
  if (!q1) return "";
  return q1Options.find((option) => option.id === q1)?.empathy ?? "";
};

export const buildResultCopy = ({
  q1,
  door,
  context,
  skippedContext,
  desireBlocker,
}: {
  q1: Q1OptionId;
  door: DiagnosticDoorId;
  context: ContextAnswers;
  skippedContext: boolean;
  desireBlocker?: string;
}) => {
  const doorCopy = doorDetails[door];
  const feeling = q1CopyById[q1].toLowerCase();
  const notExpected = context.notExpected.trim();
  const knownFor = context.knownFor.trim();
  const targetRole = context.targetRole.trim();

  const summary = skippedContext
    ? `You started with this: ${feeling}. From your diagnostic answers, this looks less like a performance problem and more like a ${doorCopy.shortName.toLowerCase()} problem.`
    : `You said what is not moving is: "${notExpected}". You are known for "${knownFor}", and you are working toward "${targetRole}". That combination points to a very specific growth bottleneck.`;

  const pain = (() => {
    if (door === "communication_framework" && q1 === "invisible") {
      return "The painful part is that being noticed is not only about doing more. It is about whether the person with power feels seen, aligned, and invested enough to notice you back.";
    }
    if (door === "communication_framework" && q1 === "missed_opportunity") {
      return "The painful part is that the person who got the opportunity may not have been better. They may simply have made the decision-maker feel clearer, safer, or more important.";
    }
    if (door === "imposter_syndrome" && desireBlocker) {
      return `The pattern started before the decision. When the moment came to signal ambition, "${desireBlocker}" held you back long enough for the opportunity to move elsewhere.`;
    }
    if (q1 === "self_doubt") {
      return "The hardest part is not only the missed movement. It is what the experience has started doing to your own belief in yourself.";
    }
    if (q1 === "hard_work") {
      return "The painful part is that effort without the right signal can feel like it disappears. You did the work, but the system did not convert it into momentum.";
    }
    if (q1 === "wrong_place") {
      return "The painful part is wondering whether you are the mismatch, when the real issue may be that your value has not been translated into the promotion system yet.";
    }
    return "The painful part is that the outcome can look personal, even when the real problem is a missing career signal that can be built deliberately.";
  })();

  return {
    title: doorCopy.name,
    summary,
    pain,
    concept: doorCopy.concept,
    program: doorCopy.programLink,
  };
};
