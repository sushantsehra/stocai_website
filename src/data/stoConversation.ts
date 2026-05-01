export type Q1OptionId = "hard_work" | "invisible" | "missed_opportunity" | "self_doubt";

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
  targetRole: string;
};

export const q1Options: Array<{
  id: Q1OptionId;
  label: string;
  empathy: string;
}> = [
  {
    id: "hard_work",
    label: "I've worked really hard. But it doesn't seem to make a difference to my career.",
    empathy:
      "Yes, putting in the work and not seeing results in your career is disheartening. Makes you question why your effort wasn't enough.",
  },
  {
    id: "invisible",
    label: "My manager barely notices that I exist.",
    empathy:
      "That's a lonely place to be at work, being invisible to the one person who's supposed to see your contribution. You're probably wondering if you're in the wrong place.",
  },
  {
    id: "missed_opportunity",
    label: "Someone else got the opportunity I was waiting for.",
    empathy:
      "That's a real gut punch, when you've been waiting patiently for your moment. It's natural to feel disappointed, even a little betrayed.",
  },
  {
    id: "self_doubt",
    label: "I'm starting to doubt myself. Maybe this job/role isn't for me.",
    empathy:
      "It's natural for self-doubt to creep in when things aren't going well. And then it can color everything around you.",
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
      "Have you heard of Impostor Syndrome? It's when talented people start doubting themselves and their abilities. Working harder won't fix things. It's about fixing the gap between how you should be seen and positioned, and how you are.",
    programLink:
      "That's exactly what Better Corporate Life is built for. One of the things you'll learn in our program is how to bridge this gap.",
  },
  story_of_work: {
    name: "Story of the Work",
    shortName: "Story of Work",
    summary:
      "Your project is not visible to the people who make decisions, even if the work itself is solid.",
    concept:
      "If what you're working on isn't seen by decision-makers as important, your chances of promotion are slim.",
    programLink:
      "You need to tell the Story of the Work in a language that leadership will understand. Better Corporate Life will teach you how to do this, in simple steps.",
  },
  story_of_contribution: {
    name: "Story of Contribution",
    shortName: "Story of Contribution",
    summary:
      "The work may be visible, but people are not connecting the output specifically to you.",
    concept:
      "So your work is visible, but you're not. The work is happening, and it's good, but you don't get the credit.",
    programLink:
      "What can you do to change the Story of Contribution? Learn to stake your claim. It's not about bragging, or playing politics. Better Corporate Life will teach you how to do this, in simple steps.",
  },
  sponsor_network: {
    name: "Sponsor Network",
    shortName: "Sponsor Network",
    summary:
      "Your sponsor setup is too fragile: either the person backing you is not in the decision room, or you are depending on one path.",
    concept:
      "A single sponsor is a single point of failure. Promotions need multiple stakeholders who understand your value and have enough power to carry your case.",
    programLink:
      "What you need is a network of sponsors. Build relationships with multiple stakeholders who have the power to influence your career. Better Corporate Life will teach you how to do this, in simple steps.",
  },
  communication_framework: {
    name: "Communication Framework",
    shortName: "Communication",
    summary:
      "Your sponsor may have power, but they are not motivated enough to spend political currency on you yet.",
    concept:
      "Sponsors back people when your promotion feels like a win to them too. If they don't see what's in it for them, or they don't feel seen by you, this becomes a communication problem you need to fix.",
    programLink:
      "Better Corporate Life will teach you how to do this, in simple steps.",
  },
  brilliance_image_trap: {
    name: "Brilliance Image Trap",
    shortName: "Next Level Signal",
    summary:
      "You are seen as excellent at your current role, but not yet as someone already operating at the next level.",
    concept:
      "People see what you do today, not what you could do tomorrow. Stop asking for feedback about your current role performance. Instead, ask what you can do to be considered for the next level.",
    programLink:
      "Better Corporate Life will teach you how to do this, in simple steps.",
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
  const targetRole = context.targetRole.trim();

  const summary = skippedContext
    ? `You started with this: ${feeling}. From your diagnostic answers, this looks less like a performance problem and more like a ${doorCopy.shortName.toLowerCase()} problem.`
    : targetRole
      ? `You're working toward "${targetRole}". From your diagnostic answers, this looks less like a performance problem and more like a ${doorCopy.shortName.toLowerCase()} problem.`
      : `You started with this: ${feeling}. From your diagnostic answers, this looks less like a performance problem and more like a ${doorCopy.shortName.toLowerCase()} problem.`;

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
