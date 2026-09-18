export const approaches = [
  { id: "good-work", title: "I keep focusing on doing good work.", detail: "I believe the work should speak for itself." },
  { id: "self-improvement", title: "I keep working on myself.", detail: "Learning, upskilling or becoming better at what I do." },
  { id: "surroundings", title: "I try to change what's around me.", detail: "My team, manager, role or the way things work." },
  { id: "leaving", title: "I start thinking about leaving.", detail: "Maybe the problem is the company, not me." },
  { id: "waiting", title: "I keep hoping things will change.", detail: "Maybe things will get better if I give it more time" },
] as const;

export type ApproachId = typeof approaches[number]["id"];
type Insight = { selected: string; title: string; body: string; gap: [string, string] };

const insights: Record<string, Record<ApproachId, Insight>> = {
  "office-politics": {
    "good-work": {
      "selected": "YOU'VE BEEN COUNTING ON YOUR WORK",
      "title": "YOU'RE USING PERFORMANCE TO SOLVE AN INFLUENCE PROBLEM",
      "body": "Good work gives you evidence that you're capable of more. But if the people influencing your promotion don't clearly see your value, more output alone may not change the decision.",
      "gap": [
        "You're building evidence through your work.",
        "You also need influence around it."
      ]
    },
    "self-improvement": {
      "selected": "YOU'VE BEEN INVESTING IN YOURSELF",
      "title": "Getting better doesn't automatically change how you're positioned.",
      "body": "New skills can strengthen what you bring to the table. But they don't by themselves build the visibility, relationships and support around your next move.",
      "gap": [
        "You're building capability.",
        "You also need visibility and support around it."
      ]
    },
    "surroundings": {
      "selected": "YOU'VE BEEN TRYING TO CHANGE THE SITUATION",
      "title": "The environment may be part of the problem. But you can't control all of it.",
      "body": "Your team, manager or role may genuinely be part of the problem. But changing the environment doesn't automatically change how your value is understood by the people who influence your promotion.",
      "gap": [
        "You're trying to change the conditions.",
        "You also need a strategy that works within them."
      ]
    },
    "leaving": {
      "selected": "YOU'VE BEEN LOOKING FOR A WAY OUT",
      "title": "Changing companies changes the environment. It doesn't automatically change your promotion strategy.",
      "body": "A new company may give you a fresh start. But the way you build visibility, relationships and support still matters.",
      "gap": [
        "A new environment can change your circumstances.",
        "It doesn't build your promotion case for you."
      ]
    },
    "waiting": {
      "selected": "YOU'RE WAITING FOR THE PROMOTION DYNAMIC TO CHANGE",
      "title": "Maybe the next review will be different. Maybe your manager will finally notice. Maybe someone senior will recognise what you've been doing.",
      "body": "Waiting makes sense when you don't know what else to change. But it also leaves your promotion largely in other people's hands.",
      "gap": [
        "You're waiting for the conditions to improve.",
        "You need to identify what you can influence."
      ]
    }
  },
  "biased-manager": {
    "good-work": {
      "selected": "YOU'VE BEEN COUNTING ON YOUR WORK",
      "title": "You're using performance to earn your manager’s support.",
      "body": "Good work gives you evidence. But your manager's view is still only one part of how a promotion case gets built.",
      "gap": [
        "You're creating evidence.",
        "You need to make that evidence easier to champion."
      ]
    },
    "self-improvement": {
      "selected": "YOU'VE BEEN INVESTING IN YOURSELF",
      "title": "You are trying to become ready enough to be seen as ready.",
      "body": "Learning and improving can strengthen your capabilities. But promotion also depends on how your readiness is perceived and supported.",
      "gap": [
        "You're building capability.",
        "You need visible evidence of readiness around it."
      ]
    },
    "surroundings": {
      "selected": "YOU'VE BEEN TRYING TO CHANGE THE SITUATION",
      "title": "You are trying to change who you report to.",
      "body": "You can change teams or roles, but a stronger promotion strategy gives you more than one person's perception to rely on.",
      "gap": [
        "You're changing the person making the assessment.",
        "You also need a case that doesn't depend entirely on one person's perception."
      ]
    },
    "leaving": {
      "selected": "YOU'VE BEEN LOOKING FOR A WAY OUT",
      "title": "You are looking for a new manager.",
      "body": "A new company may give you a manager who sees your potential differently. But you'll still need to build visibility, evidence and support around your next move.",
      "gap": [
        "You may be changing who sees you.",
        "You also need to change how you're being seen."
      ]
    },
    "waiting": {
      "selected": "YOU'RE WAITING TO BE NOTICED",
      "title": "Maybe they'll notice your contribution. Maybe they'll bring up the promotion. Maybe the next review will finally be different.",
      "body": "But if nothing changes in how your value is communicated and supported, another review can produce the same conversation.",
      "gap": [
        "You're waiting for their perception to change.",
        "You need to influence the evidence and support around your next move."
      ]
    }
  },
  "invisible-work": {
    "good-work": {
      "selected": "YOU'VE BEEN COUNTING ON YOUR WORK",
      "title": "You're using more output to solve a visibility problem.",
      "body": "You're responding to being overlooked by creating more evidence through your work. But if the right people don't clearly see your contribution and its impact, more work alone may not change the promotion conversation.",
      "gap": [
        "You're creating more value.",
        "You aren't making that value travel far enough."
      ]
    },
    "self-improvement": {
      "selected": "YOU'VE BEEN INVESTING IN YOURSELF",
      "title": "You may be treating visibility as a capability problem.",
      "body": "More skills can make you better at what you do. But if your work is already strong, the missing piece may be how your contribution is seen and remembered.",
      "gap": [
        "The issue may not be what you can do.",
        "It's whether the right people understand what you've already done."
      ]
    },
    "surroundings": {
      "selected": "YOU'VE BEEN TRYING TO CHANGE THE SITUATION",
      "title": "A new team can change who sees your work.",
      "body": "A new team or manager can change your audience. But it doesn't automatically change how your contribution is understood.",
      "gap": [
        "You're changing the audience.",
        "You also need to change how your value reaches them."
      ]
    },
    "leaving": {
      "selected": "YOU'VE BEEN LOOKING FOR A WAY OUT",
      "title": "A new company may give you a new audience.",
      "body": "A new company can give you a fresh start and new people to impress. But if your contribution isn't being turned into a clear promotion story, the same gap can appear again.",
      "gap": [
        "A new audience isn't enough.",
        "Your value needs a story that travels with you."
      ]
    },
    "waiting": {
      "selected": "YOU'RE WAITING TO BE NOTICED",
      "title": "Maybe someone will finally recognise how much you're contributing. Maybe your next review will make the difference.",
      "body": "But invisible work rarely becomes visible simply because you keep doing it.",
      "gap": [
        "You're waiting for recognition to arrive.",
        "You need to make your value easier to see."
      ]
    }
  },
  "zero-network": {
    "good-work": {
      "selected": "YOU'VE BEEN COUNTING ON YOUR WORK",
      "title": "You're expecting your work to build your network.",
      "body": "Good work can open doors. But people need to know what you do, where you create value and what you're ready for next.",
      "gap": [
        "You're creating value.",
        "You aren't giving enough relationships a reason to carry your name forward."
      ]
    },
    "self-improvement": {
      "selected": "YOU'VE BEEN INVESTING IN YOURSELF",
      "title": "You're building your value before building your reach.",
      "body": "Skills and expertise matter. They become more useful for your next move when the right people understand what you bring.",
      "gap": [
        "You're building what you can offer.",
        "You also need to build who knows and trusts that value."
      ]
    },
    "surroundings": {
      "selected": "YOU'VE BEEN TRYING TO CHANGE THE SITUATION",
      "title": "Changing teams or roles can change your network.",
      "body": "Changing teams or roles can introduce you to new people. But a new set of contacts doesn't automatically become a network that supports your next move.",
      "gap": [
        "You're changing who you know.",
        "You need relationships that connect to where you're going."
      ]
    },
    "leaving": {
      "selected": "YOU'VE BEEN LOOKING FOR A WAY OUT",
      "title": "You may be looking for opportunity somewhere else.",
      "body": "A new company can introduce you to new people. But building relationships around your value is useful wherever you work.",
      "gap": [
        "You're waiting for a new environment to create new opportunities.",
        "You need relationships that create opportunities around you."
      ]
    },
    "waiting": {
      "selected": "YOU'RE WAITING TO BE NOTICED",
      "title": "Maybe someone senior will take an interest. Maybe an opportunity will come through your existing network. Maybe someone will recommend you.",
      "body": "But useful networks rarely grow by waiting for the right person to appear.",
      "gap": [
        "You're waiting for opportunity to find you.",
        "You need to become more intentional about who knows your value."
      ]
    }
  },
  "executive-presence": {
    "good-work": {
      "selected": "YOU'VE BEEN COUNTING ON YOUR WORK",
      "title": "You're letting your work carry the whole message.",
      "body": "Strong work demonstrates capability. But people also form views about your judgement, communication and readiness in the moments where you have to show up and lead.",
      "gap": [
        "Your work proves what you've done.",
        "You also need to show what you're ready to do next."
      ]
    },
    "self-improvement": {
      "selected": "YOU'VE BEEN INVESTING IN YOURSELF",
      "title": "You may be waiting to feel ready before you show up as ready.",
      "body": "You can keep building skills and confidence. But readiness is also shaped by how you communicate, respond and make decisions in important moments.",
      "gap": [
        "You're building confidence before showing confidence.",
        "You need to practise showing readiness before you feel completely ready."
      ]
    },
    "surroundings": {
      "selected": "YOU'VE BEEN TRYING TO CHANGE THE SITUATION",
      "title": "A different team or manager won't automatically change how you show up.",
      "body": "A different team or manager may create different opportunities. But your presence is still shaped in the moments when you're challenged, questioned or expected to make a call.",
      "gap": [
        "You're changing the environment.",
        "You also need to change how you show up within it."
      ]
    },
    "leaving": {
      "selected": "YOU'VE BEEN LOOKING FOR A WAY OUT",
      "title": "You are looking for a fresh start.",
      "body": "A new company can give you a different audience and new opportunities. But you'll still need to demonstrate judgement, communication and readiness when the stakes are higher.",
      "gap": [
        "A new environment can change how people know you.",
        "It can't demonstrate your readiness for you."
      ]
    },
    "waiting": {
      "selected": "YOU'RE WAITING TO BE NOTICED",
      "title": "Maybe you'll feel more confident next time. Maybe the right opportunity will give you the chance to step up. Maybe eventually people will start seeing you differently.",
      "body": "But readiness becomes visible through the moments when you choose to step forward.",
      "gap": [
        "You're waiting for the moment to change.",
        "You need to start changing how you show up in the moments you already have."
      ]
    }
  }
};

export function getPromotionInsight(barrierId: string, choiceId?: string): Insight | undefined {
  if (!Object.prototype.hasOwnProperty.call(insights, barrierId) || !approaches.some((item) => item.id === choiceId)) return undefined;
  return insights[barrierId][choiceId as ApproachId];
}
