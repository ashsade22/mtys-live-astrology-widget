const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];

export const siteCopy = {
  hero: {
    eyebrow: "KNOW YOUR CHART",
    title: "Your Sun sign is only part of the story.",
    body: "Your chart can explain a lot about how you think, react, connect, communicate, and go after what you want."
  },
  placementIntro: "Start with the part of life you want to understand, then choose a sign to see how it tends to show up in real life.",
  deeper: {
    eyebrow: "GO DEEPER",
    title: "There is more to explore when you are ready.",
    body: "These layers add context to the six placements above. You do not need to learn them all at once.",
    items: [
      {
        title: "Houses",
        kicker: "Where life gets personal",
        body: "The part of life where a placement tends to show up most clearly."
      },
      {
        title: "Elements",
        kicker: "Your natural operating style",
        body: "Why some people lead with action, logic, practicality, or feeling."
      },
      {
        title: "Modalities",
        kicker: "How you handle movement and change",
        body: "Whether you tend to start, stabilize, or adapt when life shifts."
      },
      {
        title: "Aspects",
        kicker: "Where different parts of you meet",
        body: "How different parts of you support, challenge, and influence each other."
      }
    ]
  },
  together: {
    eyebrow: "PUTTING IT TOGETHER",
    title: "The chart gets personal when the pieces start talking to each other.",
    body: "Knowing your individual placements gives you useful pieces. Seeing how they work together is what makes the chart personal. Your Moon can need one thing while your Mars wants to act another way. Your Venus may notice attention that your Rising does not know how to ask for. Those differences are often what make the chart sound like your real life."
  },
  product: {
    eyebrow: "WHAT MAKES YOU TICK?",
    title: "Your chart makes more sense together.",
    body: "Knowing your individual placements is useful. Seeing how they interact is what makes the chart personal and shows how you think, feel, relate, react, and make decisions as one whole person.",
    cta: "See how your chart works together",
    note: "What Makes You Tick is in development. For now, start with the six placements above."
  }
};

export const placements = {
  sun: {
    name: "Sun",
    symbol: "☉",
    card: "The part of you that feels most like you.",
    cta: "Explore your Sun",
    title: "Your sense of self, in real life",
    intro: "Your Sun points to what feels true to you, what builds confidence, and the qualities you are here to express more fully.",
    labels: ["What feels true to you", "Where confidence grows", "What you are becoming"],
    signs: {
      Aries: ["Acting on what matters instead of waiting for permission brings you back to yourself.", "Trusting your first instinct and learning from the result builds confidence.", "Growth looks like becoming more direct, brave, and willing to begin."],
      Taurus: ["Steadiness, substance, and room to enjoy what you have built bring you back to yourself.", "Consistency builds your confidence more than speed ever could.", "You are becoming someone who knows what is worth protecting and what is not worth the strain."],
      Gemini: ["A quick mind and an interesting conversation make you feel fully engaged with life.", "Your curiosity becomes a source of confidence when you treat it as a strength.", "You are learning to be more flexible, articulate, and comfortable holding more than one idea."],
      Cancer: ["Caring deeply without pretending that nothing affects you feels honest and natural.", "Trusting your emotional read of a situation builds confidence.", "Your growth makes you more protective of the people and spaces that feel like home."],
      Leo: ["Creating, contributing, and being seen for what you bring feels natural to you.", "Your confidence grows when attention follows honest self expression instead of performance.", "You are growing warmer, bolder, and more generous with your presence."],
      Virgo: ["You feel most like yourself when you can make something clearer, stronger, or more useful.", "Confidence grows when you notice your progress instead of only the next correction.", "Becoming more discerning does not have to turn every improvement into a test of your worth."],
      Libra: ["You feel most like yourself when there is room for beauty, connection, and a fair exchange.", "Confidence grows when you make a choice without waiting for universal agreement.", "You are growing more comfortable naming what you want while still considering other people."],
      Scorpio: ["You feel most like yourself when things are honest enough to matter.", "Confidence grows when you trust your depth without using control as protection.", "Growth means becoming more resilient, perceptive, and willing to let real change happen."],
      Sagittarius: ["You feel most like yourself when life is expanding your perspective instead of shrinking your options.", "Confidence grows through experience and honest exploration.", "You are becoming more candid, hopeful, and committed to a direction that feels meaningful."],
      Capricorn: ["Purposeful effort and a goal that matters help you recognize yourself.", "Confidence grows through earned competence and promises you keep to yourself.", "You are becoming more self directed, capable, and selective about the goals that deserve your time."],
      Aquarius: ["Thinking independently and contributing something original feels true to who you are.", "Confidence grows when you stop editing your perspective to make it easier for everyone else.", "You are growing more inventive, principled, and comfortable standing slightly outside the crowd."],
      Pisces: ["You feel most like yourself when imagination, empathy, and intuition have room to shape what you do.", "Confidence grows when sensitivity becomes information instead of something to hide.", "You are becoming more compassionate and creative while learning where you need clearer limits."]
    }
  },
  moon: {
    name: "Moon",
    symbol: "☽",
    card: "What you need emotionally and what helps you feel okay again.",
    cta: "Find your Moon",
    title: "What you need when feelings get real",
    intro: "Your Moon describes your emotional needs, your instinctive reactions, and the version of you that appears when you feel safe or stretched thin.",
    labels: ["What you need", "When stress hits", "What helps you reset"],
    signs: {
      Aries: ["You need honesty, movement, and the freedom to respond in the moment.", "Frustration can arrive fast, especially when you feel blocked or managed.", "A direct conversation or physical outlet helps the feeling move through instead of getting stuck."],
      Taurus: ["You need steadiness, physical comfort, and time to settle into what you feel.", "Sudden changes can make you dig in, even when part of you knows the plan needs to shift.", "Familiar food, a calm space, and one manageable next step bring you back to yourself."],
      Gemini: ["You need language for what you are feeling and someone who can stay curious with you.", "Stress can scatter your attention or keep your mind talking long after the moment has passed.", "Naming the feeling, changing the scene, or having a low pressure conversation helps you reset."],
      Cancer: ["You need emotional safety, privacy, and people who notice what is happening beneath the surface.", "When overwhelmed, you may retreat or protect yourself before you explain what hurt.", "Home, trusted company, and permission to feel without fixing everything help you soften."],
      Leo: ["You need warmth, loyalty, and affection that feels sincere and visible.", "Feeling ignored or dismissed can hurt more than you let on.", "Creative expression and time with someone who genuinely delights in you restore your warmth."],
      Virgo: ["You need order, usefulness, and a sense that the problem can be handled.", "Stress can turn into overthinking, fixing, or being harder on yourself than the moment requires.", "A simple routine and one practical action help your nervous system believe things are manageable again."],
      Libra: ["You need calm communication, mutual consideration, and a relationship climate that feels fair.", "Conflict can leave you focused on everyone else's reaction before you have named your own.", "Beauty, balance, and a conversation where both people are heard help you come back to center."],
      Scorpio: ["You need trust, privacy, and emotional honesty that does not stop at the polite version.", "Stress can make you watchful, guarded, or determined to regain control.", "Time alone and one deeply trusted person help you process without feeling exposed."],
      Sagittarius: ["You need space, perspective, and something ahead of you that feels hopeful.", "Stress can make you restless or eager to escape a feeling before it has said what it needs to say.", "Movement, humor, and a change in perspective help you feel possible again."],
      Capricorn: ["You need reliability, respect, and enough structure to know where you stand.", "Under pressure, you may become self contained and handle everything before admitting you need support.", "A realistic plan and someone who helps without making you feel incapable let you exhale."],
      Aquarius: ["You need breathing room, mental clarity, and relationships that respect your independence.", "Stress can send you into observation mode when other people want an immediate emotional response.", "Distance, perspective, and a conversation without pressure help you reconnect on your own terms."],
      Pisces: ["You need gentleness, emotional permission, and time away from other people's noise.", "Stress can blur the line between your feelings and everyone else's.", "Music, sleep, water, creativity, and a clear boundary help you return to what is actually yours." ]
    }
  },
  rising: {
    name: "Rising",
    symbol: "↑",
    card: "How you naturally meet the world.",
    cta: "Meet your Rising",
    title: "How you meet the world",
    intro: "Your Rising sign shapes first impressions, your approach to unfamiliar situations, and the way the rest of your chart is organized.",
    labels: ["First impression", "In a new situation", "Your chart lens"],
    signs: {
      Aries: ["People often meet your directness and momentum first.", "You tend to learn by entering the situation and adjusting as you go.", "Your approach to life keeps bringing you back to courage, initiative, and learning when action is truly yours to take."],
      Taurus: ["People often experience you as calm, measured, and difficult to rush.", "You look for solid ground before you commit.", "Stability, values, and a sustainable pace shape the way you approach life."],
      Gemini: ["People often notice your quick mind, curiosity, and responsiveness.", "You gather information, ask questions, and keep your options open until the picture makes sense.", "Communication, variety, and learning how ideas connect shape the way you move through life."],
      Cancer: ["People may experience you as observant, caring, or careful about who gets close.", "You read the emotional temperature before deciding how much of yourself to show.", "Belonging, protection, and creating a secure base shape the way you move through life."],
      Leo: ["People often notice your presence, warmth, or natural sense of occasion.", "You approach new settings by finding where you can contribute and be fully yourself.", "Creative courage, visibility, and heart led self expression shape your path."],
      Virgo: ["People may see you as thoughtful, capable, and tuned into what needs attention.", "You observe the details and work out how to be useful before you fully relax.", "You move through life by noticing what can improve and building practical systems around it."],
      Libra: ["People often meet your social awareness, style, and instinct for creating ease.", "You notice the people involved and look for the most balanced way to enter.", "Relationships and choice are central lessons, especially learning to keep the peace without losing yourself."],
      Scorpio: ["People may experience you as private, focused, and harder to read than you realize.", "You assess trust and motive before you reveal much.", "Trust, transformation, and the line between protection and distance shape your path."],
      Sagittarius: ["People often meet your openness, humor, and forward looking attitude first.", "You look for possibility and prefer to understand the wider context as you go.", "Exploration, meaning, and the freedom to keep growing shape your path."],
      Capricorn: ["People may see you as composed, responsible, and aware of what the moment requires.", "You assess the goal, the expectations, and what will make the effort worthwhile.", "You move through life by building mastery, taking responsibility, and creating something with lasting value."],
      Aquarius: ["People often notice your independence, originality, or slightly unexpected point of view.", "You observe the group before deciding how you want to participate.", "Ideas, community, and making room for a life that fits you matter more than convention."],
      Pisces: ["People may experience you as gentle, receptive, and responsive to the mood around you.", "You feel your way into new situations before deciding what they mean.", "Your path asks you to stay open and imaginative without losing your footing." ]
    }
  },
  mercury: {
    name: "Mercury",
    symbol: "☿",
    card: "How you think, communicate, and make sense of things.",
    cta: "Understand your Mercury",
    title: "How you think, talk, and argue",
    intro: "Mercury shows how you process information, make decisions, explain your point, and respond when a conversation gets frustrating.",
    labels: ["How your mind works", "In conversation", "What gets through to you"],
    signs: {
      Aries: ["Your mind moves quickly toward the point and prefers a clear next step.", "You speak directly and can argue before everyone else has finished framing the issue.", "Be concise, honest, and willing to address the real problem without circling it."],
      Taurus: ["You process at your own pace and trust ideas that hold up in practical life.", "You choose words carefully and may become fixed when someone pushes before you are ready.", "Give you time, concrete details, and a reason a new approach will actually work."],
      Gemini: ["Your mind makes fast connections and stays engaged through variety.", "You think out loud, ask questions, and may change your wording as new information arrives.", "Keep the exchange responsive, specific, and open to more than one angle."],
      Cancer: ["You process through memory, tone, and the emotional context around the facts.", "You hear what is said and how it was said, especially when trust is involved.", "Speak with care, acknowledge the feeling in the room, and do not use vulnerability as leverage."],
      Leo: ["Your mind looks for the central story and the point that deserves attention.", "You communicate with conviction and want your contribution to be taken seriously.", "Be respectful, genuine, and clear about what you appreciate as well as what needs to change."],
      Virgo: ["Your mind sorts, compares, and notices the detail that everyone else skipped.", "You communicate precisely and can become frustrated by vague answers or avoidable confusion.", "Bring useful facts, define the problem, and make room for a practical solution."],
      Libra: ["Your mind compares perspectives and looks for language that people can meet inside.", "You communicate diplomatically, though too many competing considerations can slow a decision.", "Invite your opinion directly, keep the tone fair, and do not mistake thoughtfulness for agreement."],
      Scorpio: ["Your mind looks beneath the obvious answer and remembers what does not add up.", "You speak selectively and prefer a real conversation to polite surface talk.", "Be honest, consistent, and prepared to discuss the motive as well as the facts."],
      Sagittarius: ["Your mind looks for meaning, context, and the larger point.", "You communicate candidly and may prioritize truth over a perfectly softened delivery.", "Lead with the big picture, stay open to questions, and avoid trapping the conversation in tiny details."],
      Capricorn: ["Your mind organizes information around usefulness, responsibility, and results.", "You communicate with purpose and have little patience for a conversation that goes nowhere.", "Bring a clear point, respect the time involved, and show how the idea can become workable."],
      Aquarius: ["Your mind steps back, spots patterns, and reaches conclusions that may surprise people.", "You communicate independently and can detach when an exchange becomes emotionally crowded.", "Offer room to think, respect an unconventional angle, and engage the idea instead of demanding a standard response."],
      Pisces: ["Your mind absorbs impressions, subtext, and possibilities that are difficult to reduce to one fact.", "You communicate through feeling, imagery, and intuition, though details can blur under pressure.", "Use gentle clarity, check what was understood, and allow space for an answer to take shape." ]
    }
  },
  venus: {
    name: "Venus",
    symbol: "♀",
    card: "The attention you notice, the affection that lands, and the chemistry that makes you lean in.",
    cta: "Read your Venus",
    title: "What makes affection feel real",
    intro: "Venus can explain how you show interest, what attracts you, what makes you feel valued, and what quietly turns you off.",
    labels: ["How interest shows", "What feels loving", "What turns you off"],
    signs: {
      Aries: ["Interest is obvious, energized, and willing to make the first move.", "Enthusiasm, honesty, and a little spark of pursuit make you feel wanted.", "Mixed signals, passivity, and affection that feels obligatory cool you down quickly."],
      Taurus: ["Interest grows through presence, consistency, and attention to the senses.", "You feel loved through reliability, touch, comfort, and someone remembering what you enjoy.", "Being rushed, destabilized, or treated as an afterthought makes it hard to stay open."],
      Gemini: ["Interest shows through conversation, teasing, curiosity, and frequent contact.", "Someone who engages your mind and keeps the connection alive gets your attention.", "Repetition without discovery and communication that feels heavy or controlling can flatten attraction."],
      Cancer: ["Interest appears through care, attentiveness, and creating a feeling of familiarity.", "Feeling loved means having someone notice your needs and protect the private bond.", "Emotional carelessness, inconsistency, and making tenderness feel embarrassing are hard stops."],
      Leo: ["Interest is warm, expressive, and hard to miss when you feel safe enough to show it.", "Genuine praise, loyalty, and open affection make the connection feel special.", "Indifference, stinginess, and being taken for granted drain the romance out of the room."],
      Virgo: ["Interest shows through thoughtful help, close attention, and remembering the small details.", "Consideration, dependability, and someone willing to improve everyday life with you are what register as love.", "Sloppiness, empty promises, and avoidable drama make attraction feel like work."],
      Libra: ["Interest appears through charm, shared taste, and making the interaction feel mutually enjoyable.", "You feel loved through consideration, romance, and a partner who treats the relationship as a true exchange.", "Rudeness, imbalance, and conflict handled without care quickly undermine the connection."],
      Scorpio: ["Interest is focused, private, and stronger than the surface may reveal.", "Trust, loyalty, and emotionally present attention matter more than casual affection.", "Dishonesty, emotional games, and intimacy without depth make you pull back."],
      Sagittarius: ["Interest shows through openness, humor, and an invitation into a bigger experience.", "You feel loved when there is honesty, freedom, and room to keep growing together.", "Possessiveness, narrow thinking, and relationships that make life feel smaller weaken attraction."],
      Capricorn: ["Interest develops through respect, consistency, and seeing that someone means what they say.", "Reliable effort and a real place in someone's priorities make love feel solid.", "Flakiness, poor judgment, and promises without follow through make you question the whole connection."],
      Aquarius: ["Interest often begins with friendship, originality, and a meeting of minds.", "You feel loved when your individuality is welcomed and closeness does not require constant sameness.", "Pressure, possessiveness, and rigid ideas about how a relationship should look create distance."],
      Pisces: ["Interest shows through softness, imagination, and an instinct to meet someone in their inner world.", "You feel loved through empathy, romance, and moments that make ordinary life feel more meaningful.", "Cruelty, emotional bluntness, and a connection with no room for tenderness shut you down." ]
    }
  },
  mars: {
    name: "Mars",
    symbol: "♂",
    card: "What gets you moving, what frustrates you, and how you go after what you want.",
    cta: "See your Mars",
    title: "How you act when you really want something",
    intro: "Mars speaks to motivation, desire, frustration, conflict, competition, and the kind of challenge that brings your drive online.",
    labels: ["What motivates you", "When conflict starts", "What keeps your drive alive"],
    signs: {
      Aries: ["A clear goal, immediate challenge, or chance to take initiative gets you moving.", "You respond quickly and directly, then often cool down faster than people expect.", "Momentum, autonomy, and visible progress keep you engaged."],
      Taurus: ["A goal with tangible value and enough time to build it properly earns your effort.", "You tolerate a lot before pushing back, but once a line is crossed you are difficult to move.", "A steady pace, physical stamina, and results you can see keep you committed."],
      Gemini: ["Curiosity, variety, and a problem that gives your mind something to chase energize you.", "You argue with words, questions, and rapid shifts in perspective.", "Fresh input and more than one route forward keep boredom from draining your drive."],
      Cancer: ["You act most decisively when something personal or someone you care about needs protection.", "Conflict can come out sideways if direct anger does not feel emotionally safe.", "A meaningful reason, supportive surroundings, and trust in your instincts sustain your effort."],
      Leo: ["A chance to create, lead, or make a visible impact brings your confidence forward.", "You confront issues with pride and intensity, especially when respect is missing.", "Recognition, creative ownership, and a goal you can care about keep the fire alive."],
      Virgo: ["A useful task, solvable problem, or clear way to improve something activates you.", "Frustration rises when people are careless, vague, or unwilling to do their part.", "Specific goals, strong systems, and evidence that your work matters keep you productive."],
      Libra: ["You are motivated by collaboration, fairness, and a goal that improves the overall balance.", "You may delay open conflict while weighing every side, then become firm when the imbalance is undeniable.", "A capable partner and a clear sense of mutual effort keep you engaged."],
      Scorpio: ["A high stakes goal, emotional truth, or challenge that requires total focus draws out your power.", "You rarely fight halfway and may hold your response until you understand the full situation.", "Privacy, trust, and work that allows real transformation keep your drive concentrated."],
      Sagittarius: ["A meaningful challenge, larger horizon, or chance to test yourself gets you moving.", "You address conflict candidly and can become impatient with evasiveness or small arguments.", "Freedom, growth, and a goal that keeps opening new territory sustain your motivation."],
      Capricorn: ["A serious objective, clear responsibility, or result worth earning brings out your endurance.", "You tend to stay controlled in conflict and focus on what will actually change the outcome.", "Structure, authority over your process, and measurable progress keep you going."],
      Aquarius: ["An original problem, collective cause, or chance to challenge an outdated system energizes you.", "You may detach in conflict and defend the principle before addressing the emotion.", "Independence, experimentation, and work that improves the future keep your drive awake."],
      Pisces: ["You are motivated by compassion, imagination, and work that feels connected to something meaningful.", "Conflict can feel draining, so anger may build quietly or emerge only when someone vulnerable is affected.", "Creative flow, emotional space, and flexible goals help your motivation return." ]
    }
  }
};

export { signs };
