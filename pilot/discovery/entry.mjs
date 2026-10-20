import {mountPilot} from './app.mjs';
import {installChildTransport} from './protocol.mjs';
window.MTYSPilotTransport=installChildTransport();
const root=document.querySelector('[data-pilot-root]');
try{mountPilot(root);}catch{
  root.textContent='This exploration could not load. Please refresh to try again. No birth details are needed.';
  root.setAttribute('role','alert');
}
