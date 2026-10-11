export const chartBaseUrl = "https://ashley35031.wixsite.com/more-than-your-sun-4/know-your-chart";

export const pageCopy = {
  hero: {
    eyebrow: "CAREER + MONEY",
    title: "Your chart does not choose your career. It can show you what you need from work.",
    body: "Different parts of your chart describe motivation, decision making, emotional needs, values, confidence, and the way you approach a challenge. Start with the question you are trying to answer.",
    cta: "Choose a Work Question"
  },
  work: {
    eyebrow: "YOUR WORK STYLE",
    title: "Start with the part of work you want to understand.",
    body: "Each question belongs to a different chart placement. Choose one to see what that placement can explain, then explore your sign for the personal version."
  },
  map: {
    eyebrow: "THE CAREER PARTS OF YOUR CHART",
    title: "No single placement tells the whole story.",
    body: "Career astrology becomes useful when each placement has a clear job. These six placements answer different real life questions."
  },
  money: {
    eyebrow: "MONEY THROUGH YOUR CHART",
    title: "Money can activate more than one need.",
    body: "Security, pleasure, action, judgment, and recognition come from different parts of the chart. Choose the money question that feels most relevant right now."
  },
  crossroads: {
    eyebrow: "AT A CAREER CROSSROADS?",
    title: "Use the situation to find the right place to start.",
    body: "You do not need to read your whole chart at once. Choose what is happening, then look at the placement most connected to that question."
  },
  next: {
    eyebrow: "KEEP EXPLORING",
    title: "Know the placement, then notice the pattern.",
    body: "Your placement reading gives you the astrology. Come back to Career + Money to connect it to the work or money question you are actually living."
  }
};

export const workQuestions = [
  {
    id: "motivation", label: "What gets me moving?", placement: "mars", placementName: "Mars",
    title: "Mars describes how you use drive.",
    body: "Mars can show how you begin, compete, pursue a goal, handle pressure, and react when something blocks you. Your Mars sign helps explain whether momentum comes from urgency, challenge, independence, collaboration, or a steadier pace.",
    prompt: "Use Mars when the question is about motivation, action, frustration, or burnout.",
    linkLabel: "Explore your Mars style"
  },
  {
    id: "thinking", label: "How do I think and communicate at work?", placement: "mercury", placementName: "Mercury",
    title: "Mercury describes how you process and explain.",
    body: "Mercury can show how you gather information, make sense of a problem, speak up, learn, and make decisions. Your Mercury sign helps explain why you may need speed, detail, discussion, quiet, or time before you answer.",
    prompt: "Use Mercury when the question is about communication, decisions, learning, or mental overload.",
    linkLabel: "Explore your Mercury style"
  },
  {
    id: "purpose", label: "What makes work feel meaningful?", placement: "sun", placementName: "Sun",
    title: "The Sun describes what helps you feel fully engaged.",
    body: "The Sun can show the kind of contribution that builds confidence and feels worth claiming. Your Sun sign helps explain whether meaning comes through leadership, mastery, usefulness, creativity, connection, or making a visible difference.",
    prompt: "Use the Sun when the question is about purpose, confidence, recognition, or the direction you want to grow toward.",
    linkLabel: "Explore your Sun style"
  },
  {
    id: "environment", label: "What environment helps me function?", placement: "moon", placementName: "Moon",
    title: "The Moon describes what helps work feel sustainable.",
    body: "The Moon can show what you need to feel settled enough to do good work. Your Moon sign helps explain your relationship with pace, predictability, privacy, belonging, emotional atmosphere, and the way you recover after stress.",
    prompt: "Use the Moon when the question is about workplace fit, emotional strain, safety, or what you need to recharge.",
    linkLabel: "Explore your Moon needs"
  },
  {
    id: "values", label: "What do I value in work?", placement: "venus", placementName: "Venus",
    title: "Venus describes what feels worthwhile.",
    body: "Venus can show what you value, what makes an exchange feel fair, and how you build cooperation. Your Venus sign helps explain the rewards, relationships, surroundings, and quality of life that make work feel worth the effort.",
    prompt: "Use Venus when the question is about values, compensation, collaboration, enjoyment, or what feels worth saying yes to.",
    linkLabel: "Explore your Venus values"
  },
  {
    id: "approach", label: "How do I approach something new?", placement: "rising", placementName: "Rising",
    title: "Your Rising sign describes your first approach.",
    body: "The Rising sign can show how you enter a new environment, meet expectations, and present yourself before people know you well. It can help explain the working style others see first and the conditions that help you find your footing.",
    prompt: "Use your Rising sign when the question is about first impressions, new roles, visibility, or how you meet the outside world.",
    linkLabel: "Explore your Rising style"
  }
];

export const placementMap = [
  ["Mars", "Motivation, action, pressure, and burnout"],
  ["Mercury", "Thinking, communication, and decisions"],
  ["Sun", "Purpose, confidence, and recognition"],
  ["Moon", "Environment, emotional needs, and recovery"],
  ["Venus", "Values, rewards, relationships, and money"],
  ["Rising", "Approach, presentation, and new situations"]
];

export const moneyQuestions = [
  {
    id: "worth", label: "What feels worth spending on?", placement: "venus", placementName: "Venus",
    title: "Start with Venus and what you value.",
    body: "Venus connects money with taste, pleasure, relationships, and the things you consider worth having. Your Venus sign can help explain what you enjoy investing in and what makes an exchange feel satisfying or fair.",
    linkLabel: "Explore your Venus values"
  },
  {
    id: "security", label: "What helps me feel financially safe?", placement: "moon", placementName: "Moon",
    title: "Start with the Moon and your need for security.",
    body: "The Moon can describe the conditions that help you feel protected and settled. Your Moon sign may shape whether security feels like a cushion, consistency, flexibility, support, privacy, or knowing you can handle a surprise.",
    linkLabel: "Explore your Moon needs"
  },
  {
    id: "action", label: "How do I take action around money?", placement: "mars", placementName: "Mars",
    title: "Start with Mars and the way you act.",
    body: "Mars can describe how quickly you move, how you pursue an opportunity, and what happens when risk or competition enters the picture. Your Mars sign can help explain your instinct to push, wait, investigate, commit, or protect your position.",
    linkLabel: "Explore your Mars style"
  },
  {
    id: "decisions", label: "How do I make money decisions?", placement: "mercury", placementName: "Mercury",
    title: "Start with Mercury and how you evaluate information.",
    body: "Mercury can describe how you compare options, ask questions, interpret numbers, and talk about money. Your Mercury sign can help explain whether you decide through speed, research, conversation, instinct, or a clear practical framework.",
    linkLabel: "Explore your Mercury style"
  },
  {
    id: "success", label: "Why does earning more matter to me?", placement: "sun", placementName: "Sun",
    title: "Start with the Sun and what success represents.",
    body: "The Sun can connect achievement with identity, pride, contribution, and recognition. Your Sun sign can help explain what you want greater income to make possible and what kind of success would actually feel like yours.",
    linkLabel: "Explore your Sun style"
  }
];

export const crossroads = [
  { label: "I want to change careers", body: "Start with the Sun to clarify the kind of contribution you want to grow toward.", placement: "sun", linkLabel: "Start with your Sun" },
  { label: "I dislike my job but do not know why", body: "Start with the Moon to examine the environment, pace, and emotional conditions around the work.", placement: "moon", linkLabel: "Start with your Moon" },
  { label: "I want to earn more", body: "Start with Venus to explore value, reward, and what makes an exchange feel fair.", placement: "venus", linkLabel: "Start with your Venus" },
  { label: "I want to start something of my own", body: "Start with Mars to understand how you initiate, pursue, and sustain action.", placement: "mars", linkLabel: "Start with your Mars" },
  { label: "I cannot decide what to do next", body: "Start with Mercury to understand how you process options and reach a decision.", placement: "mercury", linkLabel: "Start with your Mercury" },
  { label: "I feel depleted by work", body: "Start with the Moon to identify what helps you recover and what may be missing from the environment.", placement: "moon", linkLabel: "Start with your Moon" }
];
