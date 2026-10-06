import { allPositions, PACIFIC_TIME_ZONE, PLANETS, pacificParts } from './astronomy.js';
import { bulkPatch, queryItems } from './wix-client.js';

const COLLECTION = 'CurrentSky';

const SIGN_COPY = {
  Aries: {
    interpretation: 'The current focus is direct and action oriented. Progress comes from being clear about what needs to begin and why it matters.',
    lesson: 'Act with purpose instead of reacting only for speed.',
    watchFor: 'Impatience, unnecessary conflict, or treating hesitation as weakness.',
  },
  Taurus: {
    interpretation: 'The current focus is practical and steady. Questions of value, comfort, and what can be sustained matter more than quick results.',
    lesson: 'Let consistency support you without resisting every adjustment.',
    watchFor: 'Digging in, delaying a needed change, or confusing familiarity with security.',
  },
  Gemini: {
    interpretation: 'The current focus moves through conversation, comparison, and new information. Curiosity helps when it is paired with follow through.',
    lesson: 'Stay curious long enough to separate useful information from noise.',
    watchFor: 'Scattered attention, mixed messages, or changing direction before the facts settle.',
  },
  Cancer: {
    interpretation: 'The current focus is personal and protective. Emotional context matters, especially when people need safety before they can be direct.',
    lesson: 'Name the need directly instead of expecting it to be inferred.',
    watchFor: 'Defensiveness, retreating into old patterns, or taking a neutral response personally.',
  },
  Leo: {
    interpretation: 'The current focus is visible, expressive, and creative. Recognition matters, but substance is what makes the confidence last.',
    lesson: 'Let confidence come from substance, not applause.',
    watchFor: 'Pride, performative conflict, or making recognition the measure of value.',
  },
  Virgo: {
    interpretation: 'The current focus is practical and detail conscious. Small improvements are useful when they support the larger point instead of replacing it.',
    lesson: 'Improve what matters without making perfection the entry requirement.',
    watchFor: 'Overthinking, criticism, or losing the larger point in the details.',
  },
  Libra: {
    interpretation: 'The current focus is relational and concerned with fairness. Balance works best when everyone is honest about what they can actually offer.',
    lesson: 'Consider other viewpoints without abandoning your own.',
    watchFor: 'People pleasing, indecision, or keeping the peace at the expense of clarity.',
  },
  Scorpio: {
    interpretation: 'The current focus is intense and selective. Surface answers may not be enough, but direct questions work better than private tests.',
    lesson: 'Ask directly instead of building certainty from partial information.',
    watchFor: 'Suspicion, testing people, or confusing emotional intensity with truth.',
  },
  Sagittarius: {
    interpretation: 'The current focus is open and future minded. A larger vision becomes more useful when it is connected to one realistic next step.',
    lesson: 'Give the vision a practical next step.',
    watchFor: 'Overpromising, skipping details, or using the next plan to avoid the current problem.',
  },
  Capricorn: {
    interpretation: 'The current focus is strategic and responsible. Long term results matter, but responsibility still needs to be shared fairly.',
    lesson: 'Use structure to support the goal, not to control every variable.',
    watchFor: 'Overwork, rigidity, or carrying responsibility that should be shared.',
  },
  Aquarius: {
    interpretation: 'The current focus is independent and experimental. Change is useful when the people affected by it are included in the process.',
    lesson: 'Make room for change without disconnecting from the people affected by it.',
    watchFor: 'Detachment, contrarian decisions, or prioritizing the idea over the lived impact.',
  },
  Pisces: {
    interpretation: 'The current focus is intuitive and sensitive to what is not being said. A clear boundary helps turn an impression into something usable.',
    lesson: 'Give the feeling or idea a clear boundary and a real world test.',
    watchFor: 'Blurred expectations, avoidance, or treating a hope as a confirmed fact.',
  },
};

function shouldRun(now) {
  if (process.env.GITHUB_EVENT_NAME !== 'schedule') return true;
  return pacificParts(now).hour % 2 === 0;
}

async function main() {
  const now = new Date();
  if (!shouldRun(now)) {
    console.log(JSON.stringify({ skipped: true, reason: 'odd Pacific hour', timezone: PACIFIC_TIME_ZONE }));
    return;
  }

  const existing = await queryItems(COLLECTION, undefined, 20);
  const grouped = new Map();
  for (const item of existing) {
    const planet = String(item.data.planet ?? '');
    if (!grouped.has(planet)) grouped.set(planet, []);
    grouped.get(planet).push(item);
  }

  const invalid = PLANETS.filter((planet) => grouped.get(planet)?.length !== 1);
  if (existing.length !== 10 || invalid.length) {
    throw new Error(`CurrentSky must contain exactly one record per planet. Invalid: ${invalid.join(', ')}`);
  }

  const timestamp = now.toISOString();
  const positions = allPositions(now);
  const patches = positions.map((planet) => {
    const item = grouped.get(planet.planet)[0];
    const placementChanged = item.data.sign !== planet.sign || Boolean(item.data.retrograde) !== planet.retrograde;
    const fields = {
      planet: planet.planet,
      sign: planet.sign,
      degree: planet.degree,
      longitude: planet.longitude,
      retrograde: planet.retrograde,
      speed: planet.speed,
      lastUpdated: timestamp,
    };
    if (placementChanged) Object.assign(fields, SIGN_COPY[planet.sign]);
    return { id: item.id, fields };
  });

  await bulkPatch(COLLECTION, patches);
  const verified = await queryItems(COLLECTION, undefined, 20);
  const failures = verified.filter((item) => item.data.lastUpdated !== timestamp);
  if (verified.length !== 10 || failures.length) {
    throw new Error(`CurrentSky verification failed for ${failures.map((item) => item.data.planet).join(', ')}`);
  }

  console.log(JSON.stringify({
    success: true,
    timezone: PACIFIC_TIME_ZONE,
    pacificDate: pacificParts(now).iso,
    lastUpdated: timestamp,
    planetsUpdated: verified.length,
  }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
