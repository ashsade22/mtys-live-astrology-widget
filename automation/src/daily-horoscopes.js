import {
  PACIFIC_TIME_ZONE,
  SIGNS,
  houseFor,
  pacificDateTime,
  pacificParts,
  rankedDailyTransits,
  shiftIsoDate,
  transitWithHouses,
} from './astronomy.js';
import { bulkPatch, bulkSave, queryItems } from './wix-client.js';

const COLLECTION = 'DailyHoroscopes';
const DASH_PATTERN = /[\u002d\u2010\u2011\u2012\u2013\u2014\u2015]/u;

const HOUSE_COPY = {
  1: {
    mood: 'You may be more aware of your own preferences and reactions today. A decision feels personal because it affects how you want to move forward.',
    focus: 'The situation may require you to be clear about your position while still accounting for another practical concern.',
    watch: 'Trying to prove yourself can make a reasonable adjustment harder than it needs to be.',
    move: 'State your preference clearly, then make the one change that has the most practical effect.',
  },
  2: {
    mood: 'A money or effort decision may feel more personal than the numbers suggest. What you accept, spend, or turn down says something about your priorities.',
    focus: 'The immediate choice is connected to another area of life that also needs time, attention, or resources.',
    watch: 'A temporary mood can make an expensive or demanding option look more necessary than it is.',
    move: 'Check the full cost and choose the option that supports your actual priority.',
  },
  3: {
    mood: 'Messages, errands, and quick decisions can make the day feel busier than it is. One conversation may change the order of your plans.',
    focus: 'Useful information is available, but the larger issue will be easier to understand if you slow down and ask a direct question.',
    watch: 'Replying too quickly can create more work than the original message required.',
    move: 'Confirm the facts, handle the most time sensitive task, and leave room for a real answer.',
  },
  4: {
    mood: 'Home or family matters may need more attention than expected. You can still handle the rest of your list, but the private issue comes first.',
    focus: 'A household responsibility or unfinished conversation may affect your ability to focus elsewhere.',
    watch: 'Carrying private frustration into an unrelated conversation will make both situations harder.',
    move: 'Handle one concrete task at home and keep the important conversation focused on the decision at hand.',
  },
  5: {
    mood: 'You may want more room for something enjoyable, creative, or romantic today. Interest is easy to feel, but time and effort still matter.',
    focus: 'A personal interest may compete with another commitment, and the appealing option could require more from you than it first appeared to.',
    watch: 'Excitement can make a loose plan feel more settled than it is.',
    move: 'Make room for what you enjoy, but decide your limit before the plan grows.',
  },
  6: {
    mood: 'The day starts with a manageable list, but one small detail may reveal more work than expected. Your routine needs a realistic adjustment.',
    focus: 'A deadline, health matter, or unfinished task is connected to another responsibility that cannot be ignored.',
    watch: 'Taking over because it feels faster could leave you carrying work that was supposed to be shared.',
    move: 'Fix the most immediate bottleneck, then confirm who is responsible for the next step.',
  },
  7: {
    mood: 'Someone else may need more space in your day than you planned to give. The conversation works better when nobody has to guess what the agreement is.',
    focus: 'A relationship or practical commitment may require clearer expectations, especially if another priority is competing for attention.',
    watch: 'Agreeing only to keep the mood pleasant can create resentment later.',
    move: 'Decide what you can realistically offer, then say it before plans become assumptions.',
  },
  8: {
    mood: 'A practical conversation may reveal a deeper question about trust, fairness, or shared responsibility. The terms matter as much as the outcome.',
    focus: 'Money, access, or an emotional boundary may be tied to another decision that feels more urgent on the surface.',
    watch: 'Pressure for certainty can make unclear terms easier to overlook.',
    move: 'Name what is shared, what remains yours, and what must be confirmed before you commit.',
  },
  9: {
    mood: 'A bigger plan becomes more concrete today. The idea may still be good, but the timing and ordinary logistics need an honest look.',
    focus: 'Travel, study, publishing, or a future plan may depend on another person or responsibility being handled first.',
    watch: 'Enthusiasm will not fix a plan that has no room in the schedule.',
    move: 'Research the next step, check the timing, and give the decision a realistic deadline.',
  },
  10: {
    mood: 'Work or public responsibilities are more visible today. A choice may carry more weight because other people can see the result.',
    focus: 'A professional decision is connected to a private or practical issue that may be affecting your response.',
    watch: 'Defending the larger plan too quickly can make useful feedback harder to hear.',
    move: 'Separate the public decision from the private reaction, then verify the details before making a promise.',
  },
  11: {
    mood: 'A group plan or collaboration may show you who is genuinely invested. Your own preference is becoming clearer, even if it differs from the original plan.',
    focus: 'Your role, contribution, or future involvement may need to be discussed alongside another practical concern.',
    watch: 'Being needed is not the same as having a fair arrangement.',
    move: 'Define your role, name the limit, and make sure shared plans include shared responsibility.',
  },
  12: {
    mood: 'You may need a quieter pace than the people around you expect. A little distance can help you see which concern is real and which one is simply loud.',
    focus: 'An unfinished feeling or private issue may be influencing a decision in another part of your life.',
    watch: 'Exhaustion can make an ordinary request feel like an unreasonable demand.',
    move: 'Finish one private loose end and give yourself time before committing more energy.',
  },
};

const SECONDARY_LINKS = {
  1: 'your own plans and the way you want to handle the situation',
  2: 'money, effort, or what the choice will cost you',
  3: 'a message, schedule change, or decision that needs clarification',
  4: 'home, family, or something that needs attention in private',
  5: 'a romantic interest, creative idea, or personal plan',
  6: 'workload, health, or the routines that keep the day moving',
  7: 'a relationship, agreement, or another person’s expectations',
  8: 'shared money, trust, or a boundary that needs clearer terms',
  9: 'travel, education, or a longer range plan',
  10: 'work, reputation, or a decision other people may notice',
  11: 'a friend, group commitment, or future plan',
  12: 'rest, privacy, or something unfinished behind the scenes',
};

const FOCUS_CONNECTORS = [
  (primary, secondary) => `${primary} That may be tied to ${secondary}.`,
  (primary, secondary) => `Another part of the situation involves ${secondary}. ${primary}`,
  (primary, secondary) => `${primary} At the same time, ${secondary} also needs to be considered.`,
  (primary, secondary) => `The day becomes easier to manage once you connect the immediate issue with ${secondary}. ${primary}`,
];

function shouldRun(now) {
  if (process.env.GITHUB_EVENT_NAME !== 'schedule') return true;
  return pacificParts(now).hour === 22;
}

function primaryHouse(signIndex, transit) {
  if (!transit) return 1;
  const signIndexValue = transit.kind === 'aspect' ? transit.signIndexes[0] : transit.signIndex;
  return houseFor(signIndex, signIndexValue);
}

export function buildRecords(date, transits, generatedAt) {
  return SIGNS.map(([signKey, signName], signIndex) => {
    const mainHouse = primaryHouse(signIndex, transits[0]);
    const secondaryTransit = transits.slice(1).find((transit) => primaryHouse(signIndex, transit) !== mainHouse) ?? transits[1];
    const secondaryHouse = primaryHouse(signIndex, secondaryTransit);
    const copy = HOUSE_COPY[mainHouse];
    const connector = FOCUS_CONNECTORS[signIndex % FOCUS_CONNECTORS.length];
    const whatToExpect = connector(copy.focus, SECONDARY_LINKS[secondaryHouse]);
    return {
      id: `${date}-${signKey}`,
      data: {
        signKey,
        signName,
        date,
        mood: copy.mood,
        whatToExpect,
        whatToWatch: copy.watch,
        whereToPutYourEnergy: copy.move,
        sourceTransits: {
          timezone: PACIFIC_TIME_ZONE,
          date,
          transits: transits.map((transit) => transitWithHouses(signIndex, transit)),
        },
        generatedAt,
        updatedAt: generatedAt,
        status: 'active',
      },
    };
  });
}

export function validateCopy(records) {
  const requiredSigns = new Set(SIGNS.map(([signKey]) => signKey));
  for (const record of records) {
    if (!requiredSigns.delete(record.data.signKey)) throw new Error(`Duplicate or unknown sign: ${record.data.signKey}`);
    for (const field of ['mood', 'whatToExpect', 'whatToWatch', 'whereToPutYourEnergy']) {
      const value = record.data[field];
      if (!value || DASH_PATTERN.test(value)) throw new Error(`Invalid ${field} for ${record.data.signKey}`);
    }
  }
  if (requiredSigns.size) throw new Error(`Missing signs: ${[...requiredSigns].join(', ')}`);
}

async function main() {
  const now = new Date();
  if (!shouldRun(now)) {
    console.log(JSON.stringify({ skipped: true, reason: 'not the 10 PM Pacific generation window', timezone: PACIFIC_TIME_ZONE }));
    return;
  }

  const today = pacificParts(now).iso;
  const targetDate = shiftIsoDate(today, 1);
  const existingTarget = await queryItems(COLLECTION, { date: targetDate }, 100);
  const bySign = new Map();
  for (const item of existingTarget) {
    const signKey = String(item.data.signKey ?? '');
    if (!bySign.has(signKey)) bySign.set(signKey, []);
    bySign.get(signKey).push(item);
  }

  const duplicatePatches = [];
  for (const [, items] of bySign) {
    for (const duplicate of items.slice(1)) duplicatePatches.push({ id: duplicate.id, fields: { status: 'archived', updatedAt: now.toISOString() } });
  }
  await bulkPatch(COLLECTION, duplicatePatches);

  const missingSigns = SIGNS.filter(([signKey]) => (bySign.get(signKey)?.length ?? 0) === 0);
  if (missingSigns.length) {
    const start = pacificDateTime(targetDate, 0);
    const end = pacificDateTime(targetDate, 23, 59);
    const transits = rankedDailyTransits(start, end);
    const records = buildRecords(targetDate, transits, now.toISOString());
    validateCopy(records);
    const missing = records.filter((record) => missingSigns.some(([signKey]) => signKey === record.data.signKey));
    await bulkSave(COLLECTION, missing);
  }

  const expired = await queryItems(COLLECTION, {
    $and: [
      { status: 'active' },
      { date: { $lt: today } },
    ],
  }, 100);
  await bulkPatch(COLLECTION, expired.map((item) => ({
    id: item.id,
    fields: {
      status: 'archived',
      updatedAt: now.toISOString(),
    },
  })));

  const verified = await queryItems(COLLECTION, { date: targetDate }, 100);
  const activeCounts = new Map(SIGNS.map(([signKey]) => [signKey, 0]));
  for (const item of verified) {
    if (item.data.status === 'active' && activeCounts.has(item.data.signKey)) {
      activeCounts.set(item.data.signKey, activeCounts.get(item.data.signKey) + 1);
    }
  }
  const invalid = [...activeCounts].filter(([, count]) => count !== 1);
  if (invalid.length) throw new Error(`Target date verification failed: ${JSON.stringify(invalid)}`);

  console.log(JSON.stringify({
    success: true,
    timezone: PACIFIC_TIME_ZONE,
    generatedAt: now.toISOString(),
    targetDate,
    activeRecords: 12,
    archivedOlderRecords: expired.length,
  }));
}

if (process.env.MTYS_SKIP_MAIN !== '1') {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
