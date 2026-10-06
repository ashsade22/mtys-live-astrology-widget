import * as Astronomy from 'astronomy-engine';

export const PACIFIC_TIME_ZONE = 'America/Los_Angeles';

export const SIGNS = [
  ['aries', 'Aries'],
  ['taurus', 'Taurus'],
  ['gemini', 'Gemini'],
  ['cancer', 'Cancer'],
  ['leo', 'Leo'],
  ['virgo', 'Virgo'],
  ['libra', 'Libra'],
  ['scorpio', 'Scorpio'],
  ['sagittarius', 'Sagittarius'],
  ['capricorn', 'Capricorn'],
  ['aquarius', 'Aquarius'],
  ['pisces', 'Pisces'],
];

export const PLANETS = [
  'Sun',
  'Moon',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
];

const BODY_BY_PLANET = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mercury: Astronomy.Body.Mercury,
  Venus: Astronomy.Body.Venus,
  Mars: Astronomy.Body.Mars,
  Jupiter: Astronomy.Body.Jupiter,
  Saturn: Astronomy.Body.Saturn,
  Uranus: Astronomy.Body.Uranus,
  Neptune: Astronomy.Body.Neptune,
  Pluto: Astronomy.Body.Pluto,
};

const ASPECT_ANGLES = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180,
};

const DAILY_ORBS = {
  conjunction: 5,
  sextile: 3,
  square: 4,
  trine: 4,
  opposition: 5,
};

function normalize(angle) {
  return ((angle % 360) + 360) % 360;
}

function signedDelta(after, before) {
  let delta = normalize(after) - normalize(before);
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

function longitude(planet, date) {
  if (planet === 'Moon') return normalize(Astronomy.EclipticGeoMoon(date).lon);
  const body = BODY_BY_PLANET[planet];
  return normalize(Astronomy.Ecliptic(Astronomy.GeoVector(body, date, true)).elon);
}

function speed(planet, date) {
  const offset = 6 * 60 * 60 * 1000;
  const before = longitude(planet, new Date(date.getTime() - offset));
  const after = longitude(planet, new Date(date.getTime() + offset));
  return signedDelta(after, before) * 2;
}

export function position(planet, date) {
  const lon = longitude(planet, date);
  const dailySpeed = speed(planet, date);
  const signIndex = Math.floor(lon / 30);
  return {
    planet,
    sign: SIGNS[signIndex][1],
    signIndex,
    degree: Number((lon % 30).toFixed(4)),
    longitude: Number(lon.toFixed(6)),
    speed: Number(dailySpeed.toFixed(6)),
    retrograde: dailySpeed < 0,
  };
}

export function allPositions(date) {
  return PLANETS.map((planet) => position(planet, date));
}

function angularDistance(first, second) {
  const distance = Math.abs(normalize(first - second));
  return distance > 180 ? 360 - distance : distance;
}

function aspectOrb(first, second, angle) {
  return Math.abs(angularDistance(first, second) - angle);
}

function aspectPriority(item) {
  const exactness = 10 - item.orb;
  const planetWeight = item.planets.includes('Sun') || item.planets.includes('Moon') ? 2 : 0;
  const innerWeight = item.planets.some((planet) => ['Mercury', 'Venus', 'Mars'].includes(planet)) ? 1.5 : 0;
  const phaseWeight = item.phase === 'exact' ? 4 : item.phase === 'applying' ? 2 : 0;
  return exactness + planetWeight + innerWeight + phaseWeight;
}

function aspectsAt(date) {
  const positions = allPositions(date);
  const future = allPositions(new Date(date.getTime() + 60 * 60 * 1000));
  const results = [];
  for (let firstIndex = 0; firstIndex < positions.length; firstIndex += 1) {
    const first = positions[firstIndex];
    for (let secondIndex = firstIndex + 1; secondIndex < positions.length; secondIndex += 1) {
      const second = positions[secondIndex];
      for (const [aspect, angle] of Object.entries(ASPECT_ANGLES)) {
        const moonLimit = first.planet === 'Moon' || second.planet === 'Moon' ? 3 : Number.POSITIVE_INFINITY;
        const maximumOrb = Math.min(DAILY_ORBS[aspect], moonLimit);
        const orb = aspectOrb(first.longitude, second.longitude, angle);
        if (orb > maximumOrb) continue;
        const nextOrb = aspectOrb(future[firstIndex].longitude, future[secondIndex].longitude, angle);
        const phase = orb <= 0.08 ? 'exact' : nextOrb < orb ? 'applying' : 'separating';
        results.push({
          kind: 'aspect',
          planets: [first.planet, second.planet],
          aspect,
          angle,
          orb: Number(orb.toFixed(3)),
          phase,
          signs: [first.sign, second.sign],
          signIndexes: [first.signIndex, second.signIndex],
        });
      }
    }
  }
  return results.sort((first, second) => aspectPriority(second) - aspectPriority(first));
}

function sampleRange(start, end, stepHours) {
  const dates = [];
  for (let time = start.getTime(); time <= end.getTime(); time += stepHours * 3_600_000) {
    dates.push(new Date(time));
  }
  if (dates.at(-1)?.getTime() !== end.getTime()) dates.push(end);
  return dates;
}

function eventsInRange(start, end) {
  const samples = sampleRange(start, end, 3);
  const events = [];
  for (const planet of PLANETS) {
    for (let index = 1; index < samples.length; index += 1) {
      const beforeDate = samples[index - 1];
      const afterDate = samples[index];
      const before = position(planet, beforeDate);
      const after = position(planet, afterDate);
      if (before.signIndex !== after.signIndex) {
        events.push({
          kind: 'ingress',
          label: `${planet} enters ${after.sign}`,
          planet,
          sign: after.sign,
          signIndex: after.signIndex,
          exactAt: afterDate.toISOString(),
          priority: 90,
        });
      }
    }
  }
  const unique = new Map();
  for (const event of events) unique.set(`${event.kind}:${event.label}:${event.sign}`, event);
  return [...unique.values()].sort((first, second) => second.priority - first.priority || first.exactAt.localeCompare(second.exactAt));
}

export function rankedDailyTransits(start, end) {
  const midpoint = new Date((start.getTime() + end.getTime()) / 2);
  return [...eventsInRange(start, end), ...aspectsAt(midpoint)].slice(0, 5);
}

export function pacificParts(date = new Date()) {
  const values = {};
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: PACIFIC_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  });
  for (const part of formatter.formatToParts(date)) values[part.type] = part.value;
  return {
    iso: `${values.year}-${values.month}-${values.day}`,
    hour: Number(values.hour),
  };
}

function pacificOffsetMinutes(date) {
  const value = new Intl.DateTimeFormat('en-US', {
    timeZone: PACIFIC_TIME_ZONE,
    timeZoneName: 'longOffset',
  }).formatToParts(date).find((part) => part.type === 'timeZoneName')?.value ?? 'GMT-08:00';
  const match = value.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return -480;
  const direction = match[1] === '-' ? -1 : 1;
  return direction * (Number(match[2]) * 60 + Number(match[3]));
}

export function pacificDateTime(isoDate, hour, minute = 0) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const estimate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(estimate.getTime() - pacificOffsetMinutes(estimate) * 60_000);
}

export function shiftIsoDate(isoDate, days) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12));
  return date.toISOString().slice(0, 10);
}

export function houseFor(signIndex, transitSignIndex) {
  return ((transitSignIndex - signIndex + 12) % 12) + 1;
}

export function transitWithHouses(signIndex, transit) {
  if (transit.kind === 'aspect') {
    return {
      ...transit,
      houses: transit.signIndexes.map((signIndexValue) => houseFor(signIndex, signIndexValue)),
    };
  }
  return {
    ...transit,
    houses: [houseFor(signIndex, transit.signIndex)],
  };
}
