import {placements,signs} from '../../know-your-chart-content.js';
export {signs};
export const titleCase = key => signs.find(s=>s.toLowerCase()===key) || '';
export function placementContent(placement,sign) {
  const source=placements[placement]; const name=titleCase(sign);
  const lines=source?.signs[name];
  return source && Array.isArray(lines) && lines.length===3 ? {title:source.title,labels:source.labels,lines:[...lines]} : null;
}
export const EXAMPLE = Object.freeze({
  moon:'cancer',mercury:'gemini',mode:'example',version:'approved-fictional-example-1',
  headline:'You may explain the situation before naming the need.',
  explanation:'One way these placements can combine is a wish for familiar care alongside a habit of talking things through. A detailed conversation might help you understand a feeling without making the request underneath it obvious.',
  everyday:'You might describe why a changed plan bothered you when what you want is to know that time together still matters. The other person may answer the scheduling problem and miss that part.',
  option:'Try naming what matters and making a request: “I was looking forward to seeing you. Could we choose another day now?”'
});
// The fictional example is not an approved personal ordered-pair library.
export function applicationContent(s) {
  return s.mode==='example' && s.moon===EXAMPLE.moon && s.mercury===EXAMPLE.mercury && s.moonConfirmed && s.mercuryConfirmed ? EXAMPLE : null;
}
export const COPY = Object.freeze({
  opening:'What you need. How you say it.',
  intro:'Explore your Moon and Mercury signs to see how your emotional needs and communication style may work together in relationships.',
  moonBridgeTitle:'How do you put that need into words?',
  moonBridge:'Your Moon sign offers one view of what helps you feel supported. Mercury adds how you think and communicate. Exploring both can help connect the need with the way you express it.',
  mercuryBridgeTitle:'Now put the two together.',
  mercuryBridge:'What helps you feel supported and how you express it may not look the same. See how your Moon and Mercury signs can work together in everyday conversations.',
  scope:'This connects two placements in one person. It is not a full chart reading or a comparison with someone else.',
  nextTitle:'Next: Explore your relationship patterns',
  nextReason:'You have explored what helps you feel supported and how you put it into words. Next, notice how those patterns can show up in the way you give and receive care.',
  return:'Come back whenever you want to explore another placement. No account needed.'
});
