export type Barrier = { id: string; label: string; comfort: string[]; solution: string[]; offer: string };

export const barriers: Barrier[] = [
  { id: "office-politics", label: "Office Politics", comfort: ["Navigating office politics can feel exhausting and overwhelming. Most people feel they can’t play office politics—", "Truth - You don’t have to, but also know no company can exist where people don’t play politics"], solution: ["It’s easy to understand office politics if one understands people will act as per their incentives.", "Art of aligning incentives solves the problem is first step in handling office politics"], offer: "Get promoted without playing office politics." },
  { id: "biased-manager", label: "Biased Manager", comfort: ["Good manager are as rare as Empty inbox on a Monday", "Truth- Humans are biased. Good thing is you don’t have to be victim to them. They can be biased towards you."], solution: ["Managers have to be treated like babies or teenagers. Don’t expect them to give attention and speak smartly.", "See how parents handle kids"], offer: "Don’t just have managers get god fathers who promote you" },
  { id: "invisible-work", label: "My work is not visible", comfort: ["Criticism can be corrected. Invisibility is a career dead end.", "Truth- Most managers don’t invest in understand and appreciating your skill and work"], solution: ["Visibility is tied to quality of one’s work.", "It is tied to How well can you tell the story of the work in way that is interesting for leadership and yet keeps you at centre"], offer: "Build an memorable brand that speaks lounder than your work" },
  { id: "zero-network", label: "Zero Internal Network", comfort: ["Without network one can only run as fast as their own two feet will carry them.", "Truth- You don’t need to be extrovert to have a great network"], solution: ["Most start building network by thinking with whom to connect.", "Network starts when you understand what you can give"], offer: "Not just connect with people but connect with opportunities" },
  { id: "executive-presence", label: "Executive presence", comfort: ["Executive presence is to career what .a uniform is to a captain. It signals your authority and readiness to lead before you even say a word."], solution: ["Presence is not about dressing up or articulation. It is overcoming fight, flight or freeze response when in a tough meeting or conversation"], offer: "Be naturally be seen as next level" },
];

export const reflectionOptions = [
  { id: "change", label: "Changing job", response: "What happens is conditions of your job repeat in next job" },
  { id: "hope", label: "Hoping", response: "Hope is not a strategy" },
  { id: "ownership", label: "Trusting my manager will notice me", response: "You should be in control of your career not your manager" },
] as const;
