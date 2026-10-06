(()=>{var R=Object.create;var T=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var f=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(o,c)=>(typeof require<"u"?require:o)[c]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var U=(n,o,c,m)=>{if(o&&typeof o=="object"||typeof o=="function")for(let p of E(o))!N.call(n,p)&&p!==c&&T(n,p,{get:()=>o[p],enumerable:!(m=L(o,p))||m.enumerable});return n};var w=(n,o,c)=>(c=n!=null?R(I(n)):{},U(o||!n||!n.__esModule?T(c,"default",{value:n,enumerable:!0}):c,n));(async()=>{let[{createClient:n},{site:o},{items:c}]=await Promise.all([import("https://cdn.jsdelivr.net/npm/@wix/sdk@1.21.16/+esm"),import("https://cdn.jsdelivr.net/npm/@wix/site@1.68.0/+esm"),import("https://cdn.jsdelivr.net/npm/@wix/data@1.0.526/+esm")]),m="9610275f-b58a-4fe8-ab99-ff1da69355c7",p="mtys-live-astrology",x="America/Los_Angeles",y=[["aries","Aries"],["taurus","Taurus"],["gemini","Gemini"],["cancer","Cancer"],["leo","Leo"],["virgo","Virgo"],["libra","Libra"],["scorpio","Scorpio"],["sagittarius","Sagittarius"],["capricorn","Capricorn"],["aquarius","Aquarius"],["pisces","Pisces"]],v=["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"],b=n({auth:o.auth(),host:o.host({applicationId:m}),modules:{items:c}});function s(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function C(r){return r?.data&&typeof r.data=="object"?r.data:r}function k(r=new Date){let e=new Intl.DateTimeFormat("en-CA",{timeZone:x,year:"numeric",month:"2-digit",day:"2-digit",weekday:"short"}).formatToParts(r).reduce((a,t)=>(a[t.type]=t.value,a),{});return{iso:`${e.year}-${e.month}-${e.day}`,year:Number(e.year),month:Number(e.month),day:Number(e.day),weekday:e.weekday}}function P(r=new Date){let e=k(r),a=new Date(Date.UTC(e.year,e.month-1,e.day,12)),i=(a.getUTCDay()+6)%7,d=new Date(a);d.setUTCDate(d.getUTCDate()-i);let h=new Date(d);h.setUTCDate(h.getUTCDate()+6);let S=A=>A.toISOString().slice(0,10);return{start:S(d),end:S(h)}}function l(r){return r?typeof r=="string"?r.slice(0,10):r instanceof Date?r.toISOString().slice(0,10):r.$date?String(r.$date).slice(0,10):String(r).slice(0,10):""}function g(r){if(!r)return"";let e=l(r),[a,t,i]=e.split("-").map(Number);return!a||!t||!i?s(r):new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(a,t-1,i)))}function $(r){let e=new Set(y.map(([h])=>h)),a=(r.getAttribute("sign")||"").toLowerCase();if(e.has(a))return a;let t=new URLSearchParams(window.location.search).get("sign")?.toLowerCase();return e.has(t)?t:window.location.pathname.toLowerCase().split(/[^a-z]+/).filter(Boolean).find(h=>e.has(h))||"aries"}async function u(r,e=100){return((await b.items.query(r).limit(e).find({consistentRead:!0})).items||[]).map(C)}class D extends HTMLElement{static get observedAttributes(){return["sign"]}constructor(){super(),this.accessTokenListener=b.auth.getAccessTokenInjector(),this.attachShadow({mode:"open"}),this.signKey="aries",this.activeView="today",this.data=null,this.lastHref="",this.routeTimer=void 0}connectedCallback(){this.signKey=$(this),this.lastHref=window.location.href,this.renderShell(),this.load(),this.routeTimer=window.setInterval(()=>{let r=window.location.href;if(r!==this.lastHref){this.lastHref=r;let e=$(this);e!==this.signKey&&(this.signKey=e,this.activeView="today",this.render())}},250)}disconnectedCallback(){this.routeTimer!==void 0&&(window.clearInterval(this.routeTimer),this.routeTimer=void 0)}attributeChangedCallback(){this.isConnected&&(this.signKey=$(this),this.render())}async load(){try{let[e,a,t,i,d]=await Promise.all([u("ZodiacSigns",20),u("DailyHoroscopes",100),u("WeeklyHoroscopes",100),u("CurrentSky",20),u("Retrogrades",20)]);this.data={signs:e,daily:a,weekly:t,sky:i,retrogrades:d},this.render()}catch(e){console.error("MTYS live astrology widget failed to load",e),this.renderError()}}renderShell(){this.shadowRoot.innerHTML=`<style>${this.styles()}</style><div class="app"><div class="loading">Reading the current astrology\u2026</div></div>`}bindEvents(){this.shadowRoot.querySelectorAll("[data-view]").forEach(a=>{a.addEventListener("click",()=>{this.activeView=a.dataset.view,this.render()})});let e=this.shadowRoot.querySelector("select");e&&e.addEventListener("change",()=>{this.signKey=e.value;let a=new URL(window.location.href);a.searchParams.set("sign",this.signKey),window.history.replaceState({},"",a),this.render()})}render(){if(!this.data)return;let e=this.shadowRoot.querySelector(".app");e.innerHTML=`${this.header()}${this.activePanel()}`,this.bindEvents()}header(){let e=y.find(([i])=>i===this.signKey)?.[1]||"Aries",a=y.map(([i,d])=>`<option value="${i}" ${i===this.signKey?"selected":""}>${d}</option>`).join(""),t=[["today","Today"],["week","This Week"],["sky","The Sky Right Now"],["retrogrades","Retrogrades"]].map(([i,d])=>`<button type="button" class="tab ${this.activeView===i?"active":""}" data-view="${i}" aria-selected="${this.activeView===i}">${d}</button>`).join("");return`<header>
      <div class="eyebrow">More Than Your Sun</div>
      <div class="title-row"><div><h1>${s(e)}</h1><p>Astrology for who you are and the life you\u2019re living.</p></div>
      <label class="sign-picker"><span>Choose your sign</span><select aria-label="Choose your zodiac sign">${a}</select></label></div>
      <nav aria-label="Horoscope sections">${t}</nav>
    </header>`}activePanel(){return this.activeView==="week"?this.weekPanel():this.activeView==="sky"?this.skyPanel():this.activeView==="retrogrades"?this.retrogradePanel():this.todayPanel()}bestDaily(){let e=k().iso,a=this.data.daily.filter(t=>t.signKey===this.signKey&&String(t.status||"active").toLowerCase()==="active");return a.find(t=>l(t.date)===e)||a.sort((t,i)=>l(i.date).localeCompare(l(t.date)))[0]}bestWeekly(){let e=P(),a=this.data.weekly.filter(t=>t.signKey===this.signKey&&String(t.status||"active").toLowerCase()==="active");return a.find(t=>l(t.weekStart)===e.start)||a.find(t=>l(t.weekStart)<=e.start&&l(t.weekEnd)>=e.end)||a.sort((t,i)=>l(i.weekStart).localeCompare(l(t.weekStart)))[0]}todayPanel(){let e=this.bestDaily();return e?`<main><div class="section-heading"><div><span class="eyebrow">Your day, according to the stars.</span><h2>${s(e.signName||this.signKey)}</h2></div><time>${g(e.date)}</time></div>
      <div class="grid three">
        ${this.card("The Mood",e.mood)}
        ${this.card("Today\u2019s Focus",e.whatToExpect)}
        ${this.card("Your Best Move",e.whereToPutYourEnergy)}
      </div>
    </main>`:this.emptyState("Today\u2019s horoscope is being prepared.")}weekPanel(){let e=this.bestWeekly();return e?`<main><div class="section-heading"><div><span class="eyebrow">This week</span><h2>${s(e.weeklyTheme||e.signName||this.signKey)}</h2></div><time>${g(e.weekStart)} \u2013 ${g(e.weekEnd)}</time></div>
      <div class="grid three">
        ${this.card("The Big Picture",e.whatsShifting)}
        ${this.card("What to Watch",e.whatToWatch)}
        ${this.card("Your Next Move",e.makeItWork)}
      </div>
    </main>`:this.emptyState("This week\u2019s horoscope is being prepared.")}skyPanel(){let e=[...this.data.sky].sort((i,d)=>v.indexOf(i.planet)-v.indexOf(d.planet));if(!e.length)return this.emptyState("The current sky is updating.");let a=e.map(i=>i.lastUpdated).filter(Boolean).sort().at(-1),t=e.map(i=>`<article class="card planet-card">
      <div class="planet-line"><h3>${s(i.planet)} in ${s(i.sign)}</h3><span>${Number(i.degree||0).toFixed(1)}\xB0${i.retrograde?" \u211E":""}</span></div>
      <p>${s(i.interpretation)}</p>
      <h4>The Lesson</h4><p>${s(i.lesson)}</p>
      <h4>Watch For</h4><p>${s(i.watchFor)}</p>
    </article>`).join("");return`<main><div class="section-heading"><div><span class="eyebrow">Current sky</span><h2>The Sky Right Now</h2></div><time>${a?`Updated ${s(new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZone:x,timeZoneName:"short"}).format(new Date(a)))}`:""}</time></div><div class="grid sky">${t}</div></main>`}retrogradePanel(){let e=this.data.retrogrades.filter(t=>["retrograde","station retrograde","station direct","stationing"].includes(String(t.currentStatus||"").toLowerCase()));return e.length?`<main><div class="section-heading"><div><span class="eyebrow">Right now</span><h2>Retrograde Right Now</h2></div></div><div class="grid two">${e.map(t=>`<article class="card retro-card">
      <span class="eyebrow">${s(t.currentStatus)}</span>
      <h3>${s(t.planet)} Retrograde in ${s(t.sign)}</h3>
      <p class="dates">${g(t.startDate)} \u2013 ${g(t.endDate)}</p>
      <h4>What It Brings Up</h4><p>${s(t.whatItBringsUp)}</p>
      <h4>Watch For</h4><p>${s(t.watchFor)}</p>
      <h4>Use It For</h4><p>${s(t.useItFor)}</p>
    </article>`).join("")}</div></main>`:'<main><div class="section-heading"><div><span class="eyebrow">Right now</span><h2>Retrograde Right Now</h2></div></div><div class="quiet"><h3>No inner planets are retrograde right now.</h3><p>This is a cleaner stretch for moving plans forward\u2014without skipping the usual double-checks.</p></div></main>'}card(e,a){return`<article class="card"><h3>${s(e)}</h3><p>${s(a)}</p></article>`}emptyState(e){return`<main><div class="quiet"><h3>${s(e)}</h3><p>Please check back shortly.</p></div></main>`}renderError(){this.shadowRoot.querySelector(".app").innerHTML='<div class="quiet"><h3>The astrology is taking a moment to load.</h3><p>Refresh the page or try again shortly.</p></div>'}styles(){return`
      :host { display:block; width:100%; color:#103f42; font-family:Arial, Helvetica, sans-serif; }
      * { box-sizing:border-box; }
      .app { width:100%; background:#f7f0eb; border-radius:28px; overflow:hidden; }
      header { padding:34px 36px 0; background:#efe1dc; }
      .eyebrow { color:#9b514c; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
      .title-row { display:flex; justify-content:space-between; align-items:end; gap:24px; margin:10px 0 28px; }
      h1, h2, h3 { margin:0; font-family:Georgia, 'Times New Roman', serif; font-weight:500; }
      h1 { font-size:clamp(38px, 6vw, 66px); line-height:.95; }
      h2 { font-size:clamp(29px, 4vw, 45px); line-height:1.05; margin-top:7px; }
      h3 { font-size:24px; line-height:1.15; }
      h4 { margin:22px 0 5px; font-size:11px; letter-spacing:.12em; text-transform:uppercase; }
      p { margin:10px 0 0; font-size:16px; line-height:1.58; }
      .title-row > div > p { max-width:520px; color:#436568; }
      .sign-picker { display:grid; gap:7px; min-width:190px; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
      select { width:100%; padding:12px 36px 12px 14px; border:1px solid rgba(16,63,66,.28); border-radius:999px; background:#fffaf7; color:#103f42; font:600 15px Arial, sans-serif; }
      nav { display:flex; gap:8px; overflow-x:auto; padding:0 0 18px; scrollbar-width:none; }
      nav::-webkit-scrollbar { display:none; }
      .tab { flex:0 0 auto; padding:11px 16px; border:1px solid rgba(16,63,66,.28); border-radius:999px; background:transparent; color:#103f42; font:700 13px Arial, sans-serif; cursor:pointer; text-decoration:none; }
      .tab.active, .tab:hover { background:#103f42; color:#fffaf7; }
      main { padding:36px; }
      .section-heading { display:flex; justify-content:space-between; align-items:end; gap:20px; margin-bottom:24px; }
      time, .dates { color:#6c7f80; font-size:13px; }
      .grid { display:grid; gap:18px; }
      .grid.two { grid-template-columns:repeat(2, minmax(0,1fr)); }
      .grid.three { grid-template-columns:repeat(3, minmax(0,1fr)); }
      .grid.sky { grid-template-columns:repeat(2, minmax(0,1fr)); }
      .card { padding:26px; background:#fffaf7; border:1px solid rgba(16,63,66,.12); border-radius:20px; box-shadow:0 8px 25px rgba(16,63,66,.04); }
      .card p { color:#34585b; }
      .planet-line { display:flex; align-items:start; justify-content:space-between; gap:14px; }
      .planet-line span { flex:0 0 auto; color:#9b514c; font-size:13px; font-weight:700; }
      .quiet { padding:38px; border:1px dashed rgba(16,63,66,.28); border-radius:20px; background:#fffaf7; text-align:center; }
      .loading { padding:64px 28px; text-align:center; color:#567376; }
      a, a:visited, a:hover, a:active { text-decoration:none; }
      @media (max-width:800px) {
        .app { border-radius:20px; }
        header { padding:26px 20px 0; }
        .title-row { align-items:stretch; flex-direction:column; margin-bottom:22px; }
        .sign-picker { min-width:0; }
        main { padding:26px 20px; }
        .section-heading { align-items:start; flex-direction:column; }
        .grid.two, .grid.three, .grid.sky { grid-template-columns:1fr; }
        .card { padding:22px; }
      }
    `}}customElements.get(p)||customElements.define(p,D)})();})();
