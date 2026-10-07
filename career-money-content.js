export const chartBaseUrl = "https://ashley35031.wixsite.com/more-than-your-sun-4/know-your-chart";

export const pageCopy = {
  hero: {
    eyebrow: "CAREER + MONEY",
    title: "Work takes up too much of your life not to understand why some things fit and others absolutely do not.",
    body: "Your chart can help explain how you work, what keeps you motivated, what success means to you, how you approach money, and what tends to get in your way.",
    cta: "Explore Your Work Style"
  },
  work: {
    eyebrow: "HOW YOU WORK",
    title: "The right environment can change everything.",
    body: "Choose the situation that sounds most like you. Each one points to what may help you do your best work and what can quietly wear you down."
  },
  success: {
    eyebrow: "WHAT SUCCESS MEANS TO YOU",
    title: "The goal only works if it is actually yours.",
    body: "A career can look impressive and still feel wrong. What makes work worth it depends on what you need it to give you."
  },
  money: {
    eyebrow: "YOUR MONEY STYLE",
    title: "Money is practical. It is also personal.",
    body: "The way you spend, save, share, and take chances often says something about what makes you feel safe, free, or in control. This is about recognizing the pattern, not giving financial advice."
  },
  obstacles: {
    eyebrow: "WHAT GETS IN YOUR WAY",
    title: "Sometimes the problem is not effort. It is the pattern underneath it.",
    body: "These habits can look productive or protective at first. Noticing them makes it easier to choose a different response."
  },
  crossroads: {
    eyebrow: "AT A CAREER CROSSROADS?",
    title: "Start with the problem you are actually trying to solve.",
    body: "You do not need to know the perfect next move yet. Choose what feels closest to where you are now."
  },
  editorial: {
    eyebrow: "EXPLORE CAREER + MONEY",
    title: "Go further without turning this into homework.",
    body: "These editorial guides will answer the questions people actually ask about work, ambition, burnout, and money."
  },
  profile: {
    eyebrow: "YOUR WORK + MONEY PROFILE",
    title: "Your chart can tell a bigger story about the way you work.",
    body: "A future personalized profile will bring together what motivates you, what you need from a career, how you handle money, where you get stuck, and what may help you move forward.",
    cta: "Explore Your Full Work Style",
    note: "This personalized experience is in development. Nothing is available for purchase here yet."
  }
};

export const workStyles = [
  {
    id: "ownership",
    label: "I do my best work when I can take ownership.",
    title: "You need room to make the work yours.",
    body: "Constant approval, close supervision, or having every step decided for you can drain your motivation. You are more engaged when the goal is clear and you have some say in how to reach it.",
    prompt: "Notice whether you need more independence, clearer authority, or simply fewer unnecessary check ins.",
    placement: "mars",
    linkLabel: "Explore your Mars"
  },
  {
    id: "structure",
    label: "I work better when expectations are clear.",
    title: "Clarity helps you settle into the work.",
    body: "You may be flexible once you know what matters, but vague priorities and moving targets can make you spend more time guessing than doing. A reliable structure gives your attention somewhere useful to go.",
    prompt: "Look for clear priorities, realistic deadlines, and a manager who says what success actually looks like.",
    placement: "moon",
    linkLabel: "Explore your Moon"
  },
  {
    id: "variety",
    label: "I lose interest when every day feels the same.",
    title: "Your focus needs movement.",
    body: "Repetition can make even a good job feel smaller than it is. You may work best when there are new problems to solve, different people to talk to, or enough variety to keep your mind involved.",
    prompt: "Before assuming you need a completely new career, ask whether the current role has enough challenge and range.",
    placement: "sun",
    linkLabel: "Explore your Sun"
  },
  {
    id: "people",
    label: "The people around me affect how well I work.",
    title: "The environment matters as much as the assignment.",
    body: "You can handle demanding work when the people feel respectful and the communication is clear. A tense culture, constant competition, or feeling disconnected from the team may wear you down faster than the workload itself.",
    prompt: "Pay attention to how a workplace handles feedback, conflict, and appreciation before deciding it is a fit.",
    placement: "venus",
    linkLabel: "Explore your Venus"
  },
  {
    id: "purpose",
    label: "I need to care about what the work is for.",
    title: "Meaning keeps you invested.",
    body: "A title or paycheck may not be enough if the work feels disconnected from anything you value. You are more motivated when you can see who the work helps, what it changes, or why it matters.",
    prompt: "Meaning does not have to come from the industry alone. It can come from the people, the craft, or the life the work supports.",
    placement: "sun",
    linkLabel: "Explore your Sun"
  },
  {
    id: "quiet",
    label: "I need time to think before I can do my best work.",
    title: "Your best thinking may not happen on demand.",
    body: "Back to back meetings, constant messages, or pressure to answer immediately can leave you feeling scattered. You may produce stronger work when you have uninterrupted time to process before responding.",
    prompt: "Protecting focus is not the same as avoiding collaboration. You may simply need a better rhythm between the two.",
    placement: "moon",
    linkLabel: "Explore your Moon"
  }
];

export const successStyles = [
  { id: "security", label: "Security", title: "You want to know the ground will hold.", body: "Reliable income, clear expectations, and a sense of continuity may matter more than a title that looks impressive. Stability gives you room to make thoughtful choices instead of living in constant reaction." },
  { id: "freedom", label: "Freedom", title: "Success means having choices.", body: "Control over your time, methods, or location may matter more than following a traditional path. The work feels worthwhile when it leaves enough room for a life that still feels like yours." },
  { id: "recognition", label: "Recognition", title: "You want your contribution to be seen.", body: "Being acknowledged is not the same as needing attention all the time. You may need clear evidence that your effort matters and that your work is making an impact." },
  { id: "ownership", label: "Ownership", title: "You want to build something that has your name on it.", body: "You may feel most invested when your decisions shape the result. That can mean leading, creating, running something of your own, or having real responsibility inside a larger organization." },
  { id: "meaning", label: "Meaning", title: "You need the work to matter beyond the task.", body: "Success may feel empty if you cannot connect it to a person, purpose, craft, or change you care about. You want to know why the effort is worth making." },
  { id: "growth", label: "Growth", title: "You need to feel that you are still becoming more capable.", body: "Learning, stretching, and seeing progress may matter more than staying comfortable. A role can be secure and well paid, but still feel finished if there is nowhere left to grow." }
];

export const moneyStyles = [
  { id: "buffer", label: "I feel better when I have a cushion.", title: "Money helps you breathe when it creates a buffer.", body: "Saving may be less about restriction and more about knowing that one surprise will not undo everything. You may hold back even when spending would be reasonable because the feeling of security matters so much." },
  { id: "enjoy", label: "I want to enjoy what I work for.", title: "Money feels meaningful when it improves life now.", body: "You may be comfortable spending on experiences, comfort, beauty, or the people you love. The question is not whether enjoyment is wrong. It is whether the choice still feels good after the moment passes." },
  { id: "freedom", label: "Money means options to me.", title: "Choice may matter more than possessions.", body: "You may want money because it lets you leave, change direction, take time off, or say no. Feeling trapped can be more uncomfortable than having less, which may shape both your saving and your risk taking." },
  { id: "care", label: "I spend easily on other people.", title: "Generosity may be one of the ways you show care.", body: "Sharing can feel natural, especially when someone you love needs help or a moment feels worth celebrating. It helps to notice when generosity is freely chosen and when it is carrying a responsibility that is not yours." },
  { id: "chance", label: "I am willing to take a chance if the upside feels worth it.", title: "Possibility can be persuasive.", body: "You may move quickly when an opportunity feels exciting or time sensitive. That confidence can help you act while other people hesitate, but urgency can also make it harder to separate a real opening from the feeling of one." },
  { id: "control", label: "Money conversations make me uncomfortable.", title: "Avoiding the conversation can feel safer than facing the uncertainty.", body: "You may postpone looking at numbers, asking for more, or naming what feels unfair. The discomfort often has as much to do with control, worth, or conflict as it does with the actual amount." }
];

export const obstacles = [
  ["Overwhelmed before you begin", "The task feels so large that planning becomes another way to delay starting."],
  ["Staying because it feels safer", "You keep adapting to a situation that stopped fitting because uncertainty feels harder than dissatisfaction."],
  ["Losing interest once it is familiar", "You can start with enthusiasm and then question the whole path when the challenge becomes routine."],
  ["Taking on too much", "Being capable turns into being responsible for everything, especially when proving yourself feels important."],
  ["Underselling your work", "You make your contribution look easier than it is, then wonder why other people do not value it correctly."],
  ["Avoiding visibility", "You want the opportunity but hesitate when it requires being seen, evaluated, or openly ambitious."],
  ["Working past your limit", "Rest feels unproductive, so you keep going until your body or attention makes the decision for you."],
  ["Avoiding the money conversation", "You wait for someone else to recognize your value instead of naming what you need or asking what is possible."]
];

export const crossroads = [
  { label: "I want to change careers", body: "Start by separating what you want to leave from what you want to move toward.", href: "#how-you-work" },
  { label: "I hate my job but do not know what I want", body: "Look at the environment, pace, pressure, and people before deciding the entire field is wrong.", href: "#how-you-work" },
  { label: "I want to earn more", body: "Begin with how you define value, recognition, and security before choosing the next move.", href: "#money-style" },
  { label: "I am thinking about starting something of my own", body: "Explore how much ownership, uncertainty, and self direction genuinely suit you.", href: "#success" },
  { label: "I feel stuck", body: "Notice whether the real barrier is fear, boredom, overwhelm, or waiting for certainty.", href: "#gets-in-your-way" },
  { label: "I am burned out", body: "Start with what has been draining you and what your work has been asking you to carry.", href: "#gets-in-your-way" }
];

export const articles = [
  ["Why some people need stability and others need freedom at work", "The same job can feel reassuring to one person and limiting to another."],
  ["Being good at something does not mean you want to do it for a living", "Skill, interest, and fulfillment are not always the same thing."],
  ["What motivates you when nobody is managing you", "The difference between outside pressure and the kind of drive that lasts."],
  ["Why some people negotiate easily and others undersell themselves", "What can make asking for more feel natural, uncomfortable, or risky."],
  ["What success actually feels like to different people", "Recognition, security, freedom, and meaning do not carry the same weight for everyone."],
  ["Why burnout looks different for different people", "Overwork is only one version. Boredom, emotional strain, and constant uncertainty count too."],
  ["What your chart can say about your relationship with money", "Security, pleasure, control, generosity, and risk can all shape the way money feels."],
  ["What ambition looks like when it actually fits you", "Wanting more does not have to mean chasing the loudest version of success."]
];
