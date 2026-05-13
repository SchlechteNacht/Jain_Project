import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const INITIAL_QUESTS = [
  {
    id: "green-heart", title: "The Green Heart", subtitle: "Botanical Gardens", emoji: "🌿",
    difficulty: "Beginner", xp: 150, duration: "90 min", bgColor: "#0B2A14", accent: "#3DDC84", locked: false,
    description: "Trace the roots of Guyana's biodiversity through Georgetown's oldest living museum — home to over 1,500 plant species.",
    checkpoints: [
      { id: "c1", name: "Heritage Palm Avenue", xp: 30, icon: "🌴", done: true,
        ecofact: "The Manicole Palm lining this avenue is native to Guyana's coastal wetlands and provides critical habitat for 47 species of migratory birds along the Atlantic Flyway.",
        conservation: "Coastal palm habitats have declined 34% in Guyana since 1990 due to drainage infrastructure. Each surviving urban grove acts as a seed bank for ecosystem restoration." },
      { id: "c2", name: "Victoria Lily Pond", xp: 35, icon: "🌸", done: false,
        ecofact: "Victoria amazonica — Guyana's national flower — has pads strong enough to support 40 kg. Blooms open for just 48 hours, shifting white to pink to attract scarab beetles for pollination.",
        conservation: "Victoria lilies are threatened by invasive water hyacinth, which outcompetes native aquatic plants in nutrient-rich runoff zones near urban areas." },
      { id: "c3", name: "Orchid Greenhouse", xp: 40, icon: "🌺", done: false,
        ecofact: "Guyana hosts over 800 native orchid species — more per km² than almost any other country. Many evolved hyper-specific pollinator relationships with single bee species.",
        conservation: "Illegal orchid collection for the international horticultural trade is the single greatest threat to wild orchid populations, surpassing even habitat loss in some areas." },
      { id: "c4", name: "Biodiversity Research Hub", xp: 45, icon: "🔬", done: false,
        ecofact: "The Gardens' seed vault preserves over 320 threatened plant varieties. Scientists recently catalogued a new Heliconia species discovered less than 200 km from Georgetown.",
        conservation: "Only 3.7% of Guyana's land area has been formally surveyed for biodiversity. The Hub partners with the University of Guyana to train local conservation scientists." },
    ],
  },
  {
    id: "wild-guardians", title: "Wild Guardians", subtitle: "Georgetown Zoo", emoji: "🦜",
    difficulty: "Intermediate", xp: 200, duration: "2 hrs", bgColor: "#0F1A30", accent: "#FF7043", locked: true,
    description: "Meet the ambassadors of Guyana's wilderness — rescued species representing one of Earth's last great biodiversity frontiers.",
    checkpoints: [
      { id: "c1", name: "Jaguar Sanctuary", xp: 40, icon: "🐆", done: false,
        ecofact: "Guyana has one of South America's healthiest jaguar populations (~3,000–4,000). Jaguars still roam 80% of their historic range — a global conservation success story.",
        conservation: "The Guyana Amazon Conservation Alliance monitors jaguar movement via GPS collars across 4 million hectares of protected forest." },
      { id: "c2", name: "Harpy Eagle Aviary", xp: 40, icon: "🦅", done: false,
        ecofact: "Guyana's most powerful raptor has talons larger than grizzly bear claws. A single breeding pair requires 100+ km² of intact forest territory.",
        conservation: "Gold mining has fragmented harpy eagle territories in eastern Guyana. The zoo participates in a regional captive breeding program to support wild population recovery." },
      { id: "c3", name: "Giant Otter Pool", xp: 40, icon: "🦦", done: false,
        ecofact: "Giant river otters reach 1.8 m and hunt in coordinated family groups using 22 distinct calls for coordination during hunts.",
        conservation: "Mercury from artisanal gold mining is accumulating in river otter tissues throughout the Essequibo system, threatening their reproductive success." },
      { id: "c4", name: "Black Caiman Exhibit", xp: 40, icon: "🐊", done: false,
        ecofact: "Guyana hosts 6 of the world's 23 crocodilian species. The Black Caiman reaches 5 meters and engineers entire wetland habitats as a keystone species.",
        conservation: "Black caimans recovered from near-extinction after widespread hunting in the 1950s–70s. Now a flagship species for Guyana's wetland conservation programs." },
      { id: "c5", name: "Forest Canopy Walk", xp: 40, icon: "🌳", done: false,
        ecofact: "Guyana's forests store 19.5 billion tonnes of carbon — enough to offset all of Germany's emissions for 600 years. The canopy alone hosts 40% of all species.",
        conservation: "Guyana's LCDS 2030 pioneered national forest conservation via international carbon credits, generating $190M+ USD in verified offsets." },
    ],
  },
  {
    id: "mangrove-mysteries", title: "Mangrove Mysteries", subtitle: "Mahaica River Estuary", emoji: "🌊",
    difficulty: "Advanced", xp: 350, duration: "3.5 hrs", bgColor: "#031E1A", accent: "#00BCD4", locked: true,
    description: "Paddle through Guyana's coastal carbon vaults — mangrove forests where land meets sea in one of Earth's most productive ecosystems.",
    checkpoints: [
      { id: "c1", name: "Mangrove Entry Gate", xp: 50, icon: "🚤", done: false,
        ecofact: "Guyana's 430 km of coastal mangroves protect Georgetown — a city 1 meter below sea level — from storm surge, forming one of the last intact mangrove systems on South America's Atlantic coast.",
        conservation: "Sea level rise of 3.7 mm/year threatens to inundate 90% of Guyana's coastal mangrove belt by 2080 under high-emission scenarios." },
      { id: "c2", name: "Aerial Root Forest", xp: 55, icon: "🌱", done: false,
        ecofact: "Red mangrove prop roots trap sediment and build new land. They host nursery habitats for 75% of all commercial fish species in Guyana's coastal waters.",
        conservation: "Shrimp aquaculture has converted 8,000 hectares of mangrove to pond systems since 2000, reducing fish nursery habitat and increasing coastal erosion." },
      { id: "c3", name: "Scarlet Ibis Colony", xp: 60, icon: "🦩", done: false,
        ecofact: "The Mahaica estuary supports Guyana's largest Scarlet Ibis nesting colonies. Their brilliant red plumage comes entirely from carotenoids in the crustaceans they eat.",
        conservation: "Scarlet Ibis numbers declined 22% in Mahaica since 2018 due to mangrove clearance and boat traffic disturbing nesting sites during breeding season (April–July)." },
      { id: "c4", name: "Blue Carbon Station", xp: 65, icon: "🧪", done: false,
        ecofact: "Mangrove forests sequester carbon at 10× the rate of terrestrial forests per hectare. Some Guyanese soil deposits storing this 'blue carbon' are over 4,000 years old.",
        conservation: "Guyana's first blue carbon credit sale in 2024 generated $2.3M USD to fund mangrove restoration across 12,000 hectares of degraded coastal forest." },
      { id: "c5", name: "River Mouth Vista", xp: 60, icon: "🌅", done: false,
        ecofact: "The Mahaica River drains a 1,640 km² catchment, carrying vital nutrients from inland forests to coastal marine ecosystems. Its tidal bore oxygenates the estuary twice daily.",
        conservation: "Agricultural runoff from upstream rice paddies creates seasonal dead zones in the estuary, reducing dissolved oxygen below levels tolerable for fish." },
      { id: "c6", name: "Sea Wall Restoration", xp: 60, icon: "🏗️", done: false,
        ecofact: "Georgetown's historic sea wall (built 1855) would fail without mangrove buffering. Engineers estimate mangroves reduce wave energy by 70–90% before it reaches the wall.",
        conservation: "The Guyana Mangrove Restoration Project has replanted 6.2 million propagules since 2012 with a 68% survival rate using community planting teams." },
    ],
  },
];

const SUS_Q = [
  "I think that I would like to use this app frequently.",
  "I found the app unnecessarily complex.",
  "I thought the app was easy to use.",
  "I think I would need technical support to use this app.",
  "I found the various functions in this app were well integrated.",
  "I thought there was too much inconsistency in this app.",
  "I imagine most people would learn to use this app very quickly.",
  "I found the app very cumbersome to use.",
  "I felt very confident using the app.",
  "I needed to learn a lot of things before I could get going with this app.",
];

const BADGES = [
  { icon: "🌴", name: "First Steps", desc: "Complete first checkpoint", earned: true },
  { icon: "🌿", name: "Nature Seeker", desc: "Complete The Green Heart", earned: false },
  { icon: "🦜", name: "Wildlife Friend", desc: "Complete Wild Guardians", earned: false },
  { icon: "🌊", name: "Coastal Guard", desc: "Complete Mangrove Mysteries", earned: false },
  { icon: "📚", name: "Eco Scholar", desc: "Unlock 10 Eco Facts", earned: false },
  { icon: "🗺️", name: "Explorer", desc: "Complete all 3 quests", earned: false },
  { icon: "⭐", name: "Level 5", desc: "Reach Level 5", earned: false },
  { icon: "📍", name: "Pathfinder", desc: "10 total checkpoints", earned: false },
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [selId, setSelId] = useState(null);
  const [disc, setDisc] = useState(null);
  const [userXP, setUserXP] = useState(120);
  const [susA, setSusA] = useState({});
  const [susScore, setSusScore] = useState(null);
  const [isCtrl, setIsCtrl] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    if (screen === "splash") { const t = setTimeout(() => setScreen("app"), 2600); return () => clearTimeout(t); }
  }, [screen]);
  useEffect(() => {
    let iv; if (timerOn) iv = setInterval(() => setTimer(t => t + 1), 1000); return () => clearInterval(iv);
  }, [timerOn]);

  const level = Math.floor(userXP / 100) + 1;
  const xpInLvl = userXP % 100;
  const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const selQ = quests.find(q => q.id === selId);
  const nextCp = q => q?.checkpoints.find(c => !c.done);
  const prog = q => { const d = q.checkpoints.filter(c => c.done).length; return { d, t: q.checkpoints.length, pct: d / q.checkpoints.length * 100 }; };

  const arrive = (quest, cp) => { setDisc({ quest, cp }); setScreen("disc"); setHint(false); };
  const completeDisc = () => {
    setQuests(prev => prev.map(q => q.id !== disc.quest.id ? q : { ...q, checkpoints: q.checkpoints.map(c => c.id !== disc.cp.id ? c : { ...c, done: true }) }));
    setUserXP(p => p + disc.cp.xp); setDisc(null); setScreen("qdetail");
  };
  const calcSUS = () => { let sc = 0; SUS_Q.forEach((_, i) => { const v = susA[i] ?? 3; sc += i % 2 === 0 ? v - 1 : 5 - v; }); return Math.round(sc * 2.5); };
  const reset = () => { setQuests(INITIAL_QUESTS); setUserXP(120); setSusA({}); setSusScore(null); setTimer(0); setTimerOn(false); setScreen("app"); setTab("home"); setDisc(null); setHint(true); };

  const submitToGoogle = async (score) => {
    const FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
    const formData = new FormData();
    formData.append("entry.111111111", `User_${Math.floor(Math.random()*1000)}`); // ID
    formData.append("entry.222222222", score); // SUS Score
    formData.append("entry.333333333", isCtrl ? "Control" : "Experimental"); // Mode
    formData.append("entry.444444444", fmtTime(timer)); // Time
    try { await fetch(FORM_URL, { method: "POST", body: formData, mode: "no-cors" }); } catch (e) { console.error(e); }
  };

  // ─── SPLASH ──────────────────────────────────────────────────────────────
  if (screen === "splash") return (
    <Wrap><style>{CSS}</style>
      <Phone>
        <div style={{ background: "radial-gradient(ellipse at 50% 40%, #0D2818 0%, #071510 70%)", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative" }}>
          <div style={{ width: 100, height: 100, borderRadius: 28, background: "linear-gradient(135deg, #1B5E20, #3DDC84)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, animation: "glow 2s ease-in-out infinite" }}>🌿</div>
          <div style={{ textAlign: "center" }}>
            <div style={S.splashT}>EcoQuest</div>
            <div style={S.splashT}>Guyana</div>
            <div style={S.splashS}>Urban Ecotourism · Georgetown</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#3DDC84" : "rgba(61,220,132,0.25)", animation: `dot 0.7s ease-in-out ${i * 0.2}s infinite alternate` }} />)}
          </div>
          <div style={{ position: "absolute", bottom: 36, color: "rgba(255,255,255,0.22)", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>JAIN University · Research Prototype v2.0</div>
        </div>
      </Phone>
    </Wrap>
  );

  // ─── DISCOVERY ───────────────────────────────────────────────────────────
  if (screen === "disc" && disc) {
    const { quest: q, cp } = disc;
    return (
      <Wrap><style>{CSS}</style>
        <Phone>
          <div style={{ background: "linear-gradient(160deg, #071510, #0C2018)", height: "100%", overflowY: "auto", padding: "24px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 68, animation: "bounceIn 0.5s ease-out" }}>{cp.icon}</div>
              <div style={{ color: "#3DDC84", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 3, marginTop: 10 }}>📍 LOCATION UNLOCKED</div>
              <div style={S.h2}>{cp.name}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "DM Sans, sans-serif", marginTop: 3 }}>{q.title}</div>
            </div>
            <div style={{ background: "rgba(245,166,35,0.14)", border: "1px solid rgba(245,166,35,0.4)", borderRadius: 50, padding: "10px 24px", margin: "16px 0", color: "#F5A623", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16 }}>⭐ +{cp.xp} XP Earned</div>
            <ICard color="#3DDC84" label="🌿 ECO DISCOVERY" text={cp.ecofact} />
            <ICard color="#29B6F6" label="🛡️ CONSERVATION NOTE" text={cp.conservation} />
            <button onClick={completeDisc} style={{ ...S.btn, marginTop: 6 }}>Continue Quest →</button>
          </div>
        </Phone>
      </Wrap>
    );
  }

  // ─── SUS ─────────────────────────────────────────────────────────────────
  if (screen === "sus") return (
    <Wrap><style>{CSS}</style>
      <Phone>
        <div style={{ padding: "18px 16px 40px", overflowY: "auto", height: "100%", background: "#0A1A0F" }}>
          <div style={S.h1}>📊 Usability Survey</div>
          <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, fontFamily: "DM Sans, sans-serif", marginTop: 4, marginBottom: 20 }}>System Usability Scale (SUS) · 10 Items · Rate 1–5</div>
          {SUS_Q.map((q, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontFamily: "DM Sans, sans-serif", lineHeight: 1.65, marginBottom: 10 }}>
                <span style={{ color: "#3DDC84", fontWeight: 700 }}>{i + 1}. </span>{q}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} onClick={() => setSusA(p => ({ ...p, [i]: v }))}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `2px solid ${susA[i] === v ? "#3DDC84" : "rgba(61,220,132,0.12)"}`, background: susA[i] === v ? "rgba(61,220,132,0.18)" : "rgba(255,255,255,0.02)", color: susA[i] === v ? "#3DDC84" : "rgba(255,255,255,0.35)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{v}</button>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.22)", fontSize: 9, fontFamily: "DM Sans, sans-serif", marginTop: 3 }}>
                <span>Strongly Disagree</span><span>Strongly Agree</span>
              </div>
            </div>
          ))}
          <button disabled={Object.keys(susA).length < 10} onClick={() => { 
            const score = calcSUS(); 
            setSusScore(score); 
            submitToGoogle(score);
            setScreen("sus-r"); 
          }}
            style={{ ...S.btn, opacity: Object.keys(susA).length < 10 ? 0.38 : 1, marginTop: 8 }}>
            Submit Survey ({Object.keys(susA).length}/10 answered)
          </button>
        </div>
      </Phone>
    </Wrap>
  );

  // ─── SUS RESULT ──────────────────────────────────────────────────────────
  if (screen === "sus-r" && susScore !== null) {
    const [grade, gCol] = susScore >= 85 ? ["Excellent", "#3DDC84"] : susScore >= 72 ? ["Good", "#F5A623"] : susScore >= 52 ? ["Acceptable", "#FF9800"] : ["Poor", "#EF5350"];
    return (
      <Wrap><style>{CSS}</style>
        <Phone>
          <div style={{ background: "#0A1A0F", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 12 }}>
            <div style={{ fontSize: 52 }}>📊</div>
            <div style={S.h1}>SUS Score</div>
            <div style={{ fontSize: 82, fontFamily: "Syne, sans-serif", fontWeight: 900, color: gCol, lineHeight: 1 }}>{susScore}</div>
            <div style={{ background: `${gCol}22`, border: `1px solid ${gCol}55`, borderRadius: 50, padding: "8px 26px", color: gCol, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15 }}>{grade}</div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, fontFamily: "DM Sans, sans-serif", textAlign: "center", lineHeight: 1.8 }}>
              Mode: <span style={{ color: isCtrl ? "#F5A623" : "#3DDC84" }}>{isCtrl ? "Control (Directory)" : "Experimental (Quest-Based)"}</span><br />Task Time: {fmtTime(timer)}
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 14, width: "100%" }}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>SUS BENCHMARKS</div>
              {[["≥ 85", "Excellent (A)", "#3DDC84"], ["72–84", "Good (B)", "#F5A623"], ["52–71", "Acceptable (C)", "#FF9800"], ["< 52", "Poor (F)", "#EF5350"]].map(([r, l, c]) => (
                <div key={r} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>{r}</span>
                  <span style={{ color: c, fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>{l}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setScreen("app"); setTab("home"); }} style={{ ...S.btn, marginTop: 4 }}>Back to App</button>
          </div>
        </Phone>
      </Wrap>
    );
  }

  // ─── MAIN APP ─────────────────────────────────────────────────────────────
  const totalDone = quests.reduce((s, q) => s + q.checkpoints.filter(c => c.done).length, 0);

  const renderTab = () => {
    // Quest Detail
    if (screen === "qdetail" && selQ) {
      const q = quests.find(x => x.id === selId);
      const { d, t, pct } = prog(q);
      const next = nextCp(q);
      return (
        <div style={{ padding: "12px 16px 8px" }}>
          <button onClick={() => { setScreen("app"); setTab("quests"); }} style={S.back}>← Quests</button>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ fontSize: 44 }}>{q.emoji}</div>
            <div>
              <div style={S.h2}>{q.title}</div>
              <div style={{ ...S.muted, marginTop: 3 }}>{q.subtitle} · {q.duration}</div>
            </div>
          </div>
          <PBar label={`${d}/${t} checkpoints`} right={`${q.xp} XP`} pct={pct} col={q.accent} />
          {hint && next && (
            <div style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.28)", borderRadius: 12, padding: "10px 14px", marginTop: 8, marginBottom: 4, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>
                Tap <strong style={{ color: "#F5A623" }}>📍 Arrive</strong> on the next checkpoint to simulate GPS arrival
              </span>
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            {q.checkpoints.map((cp, i) => {
              const isNext = next?.id === cp.id;
              return (
                <div key={cp.id} style={{ marginBottom: 9, borderRadius: 14, border: `1px solid ${cp.done ? "rgba(61,220,132,0.28)" : isNext ? "rgba(245,166,35,0.38)" : "rgba(255,255,255,0.05)"}`, background: cp.done ? "rgba(61,220,132,0.05)" : isNext ? "rgba(245,166,35,0.04)" : "rgba(255,255,255,0.02)", padding: "11px 13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ fontSize: 24 }}>{cp.done ? "✅" : isNext ? cp.icon : "🔒"}</div>
                      <div>
                        <div style={{ color: cp.done ? "#3DDC84" : isNext ? "#F5A623" : "rgba(255,255,255,0.3)", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13 }}>{cp.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>+{cp.xp} XP · Stop {i + 1}</div>
                      </div>
                    </div>
                    {cp.done && <span style={{ color: "#3DDC84", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>Done ✓</span>}
                    {isNext && (
                      <button onClick={() => arrive(q, cp)} style={{ background: "linear-gradient(135deg, #E65100, #F5A623)", color: "#050D07", border: "none", borderRadius: 50, padding: "8px 16px", fontSize: 11, fontFamily: "Syne, sans-serif", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                        📍 Arrive
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (tab === "home") {
      const activeQ = quests.find(q => !q.locked && q.checkpoints.some(c => !c.done));
      const next = activeQ ? nextCp(activeQ) : null;
      return (
        <div style={{ padding: "12px 16px" }}>
          <div style={S.muted}>Welcome back, Explorer</div>
          <div style={{ ...S.h1, marginTop: 2, marginBottom: 14 }}>Georgetown Awaits 🌿</div>
          <div style={{ ...S.card, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#3DDC84", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13 }}>Level {level} Explorer</span>
              <span style={{ color: "#F5A623", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13 }}>⭐ {userXP} XP</span>
            </div>
            <div style={{ height: 7, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
              <div style={{ height: "100%", width: `${xpInLvl}%`, borderRadius: 4, background: "linear-gradient(90deg, #E65100, #F5A623)", transition: "width 0.6s" }} />
            </div>
            <div style={{ ...S.muted, fontSize: 10, marginTop: 5 }}>{100 - xpInLvl} XP to Level {level + 1}</div>
          </div>
          {activeQ && next && (
            <div style={{ background: `linear-gradient(135deg, ${activeQ.bgColor}, rgba(61,220,132,0.06))`, border: `1px solid ${activeQ.accent}30`, borderRadius: 18, padding: 16, marginBottom: 12 }}>
              <div style={{ color: activeQ.accent, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>🗺️ ACTIVE QUEST</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={S.h2}>{activeQ.title}</div>
                  <div style={{ ...S.muted, fontSize: 12, marginTop: 3 }}>Next: {next.name}</div>
                </div>
                <div style={{ fontSize: 38 }}>{activeQ.emoji}</div>
              </div>
              <button onClick={() => { setSelId(activeQ.id); setScreen("qdetail"); }} style={{ ...S.btn, marginTop: 12, background: `linear-gradient(135deg, #1B5E20, ${activeQ.accent})` }}>
                Continue Quest →
              </button>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[["🗺️", quests.filter(q => q.checkpoints.every(c => c.done)).length, "Quests"], ["📍", totalDone, "Stops"], ["🌿", totalDone, "Eco Facts"]].map(([icon, val, label], i) => (
              <div key={i} style={{ ...S.card, textAlign: "center", padding: "12px 6px" }}>
                <div style={{ fontSize: 22, marginBottom: 3 }}>{icon}</div>
                <div style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20 }}>{val}</div>
                <div style={{ ...S.muted, fontSize: 10 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(61,220,132,0.05)", border: "1px solid rgba(61,220,132,0.14)", borderRadius: 14, padding: 14 }}>
            <div style={{ color: "#3DDC84", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>💡 LATEST DISCOVERY</div>
            <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, fontFamily: "DM Sans, sans-serif", lineHeight: 1.7 }}>The Manicole Palm provides critical habitat for 47 species of migratory birds along the Atlantic Flyway.</div>
            <div style={{ color: "#3DDC84", fontSize: 11, fontFamily: "DM Sans, sans-serif", marginTop: 6 }}>📍 Heritage Palm Avenue · Botanical Gardens</div>
          </div>
        </div>
      );
    }

    if (tab === "quests") {
      if (isCtrl) return (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.28)", borderRadius: 10, padding: "8px 12px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
            <span>🔬</span><span style={{ color: "#F5A623", fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>CONTROL MODE — Non-Gamified Directory View</span>
          </div>
          <div style={S.h1}>Ecotourism Sites</div>
          <div style={{ ...S.muted, marginBottom: 14 }}>Georgetown, Guyana</div>
          {[{ n: "Botanical Gardens", d: "National collection of tropical plants and trees. Open daily.", e: "🌿", km: "0.8 km" }, { n: "Georgetown Zoo", d: "Local zoological park housing rescued native wildlife.", e: "🦜", km: "1.1 km" }, { n: "Mahaica Mangroves", d: "Coastal mangrove ecosystem on the Mahaica River estuary.", e: "🌊", km: "22 km" }].map((site, i) => (
            <div key={i} style={{ ...S.card, marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 38 }}>{site.e}</div>
              <div>
                <div style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}>{site.n}</div>
                <div style={{ ...S.muted, fontSize: 12, marginTop: 2 }}>{site.d}</div>
                <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontFamily: "DM Sans, sans-serif", marginTop: 4 }}>📍 {site.km} away</div>
              </div>
            </div>
          ))}
        </div>
      );
      return (
        <div style={{ padding: "12px 16px" }}>
          <div style={S.muted}>Georgetown, Guyana</div>
          <div style={{ ...S.h1, marginBottom: 14 }}>Urban Quests</div>
          {quests.map(q => {
            const { d, t, pct } = prog(q);
            return (
              <div key={q.id} style={{ marginBottom: 14, borderRadius: 18, border: `1px solid ${q.locked ? "rgba(255,255,255,0.06)" : q.accent + "30"}`, background: q.locked ? "rgba(255,255,255,0.02)" : `${q.bgColor}CC`, opacity: q.locked ? 0.58 : 1 }}>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 40 }}>{q.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ ...S.h2, display: "flex", gap: 6, alignItems: "center" }}>{q.title}{q.locked && <span style={{ fontSize: 14 }}>🔒</span>}</div>
                      <div style={{ ...S.muted, fontSize: 12 }}>{q.subtitle}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                        <span style={{ background: `${q.accent}20`, color: q.accent, borderRadius: 50, padding: "3px 10px", fontSize: 10, fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{q.difficulty}</span>
                        <span style={{ color: "#F5A623", fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>⭐ {q.xp} XP</span>
                        <span style={{ ...S.muted, fontSize: 11 }}>⏱ {q.duration}</span>
                      </div>
                    </div>
                  </div>
                  {!q.locked && (
                    <>
                      <div style={{ marginTop: 12 }}><PBar label={`${d}/${t} checkpoints`} right={`${Math.round(pct)}%`} pct={pct} col={q.accent} /></div>
                      <button onClick={() => { setSelId(q.id); setScreen("qdetail"); }} style={{ ...S.btn, marginTop: 8, background: `linear-gradient(135deg, ${q.bgColor === "#0B2A14" ? "#1B5E20" : q.bgColor === "#0F1A30" ? "#1A237E" : "#004D40"}, ${q.accent})` }}>
                        {d === 0 ? "Start Quest" : d === t ? "Quest Complete ✓" : "Continue Quest"} →
                      </button>
                    </>
                  )}
                  {q.locked && <div style={{ ...S.muted, fontSize: 12, marginTop: 10 }}>Complete {q.id === "wild-guardians" ? "The Green Heart" : "Wild Guardians"} to unlock</div>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (tab === "map") {
      const pins = [
        { n: "Botanical Gardens", e: "🌿", x: 50, y: 31, active: true, km: "0.8 km · Active" },
        { n: "Georgetown Zoo", e: "🦜", x: 67, y: 23, active: false, km: "1.1 km · Locked" },
        { n: "Stabroek Market", e: "🏛️", x: 42, y: 55, active: false, km: "0.3 km · Heritage" },
        { n: "Mahaica River", e: "🌊", x: 83, y: 64, active: false, km: "22 km · Locked" },
      ];
      return (
        <div style={{ padding: "12px 16px" }}>
          <div style={{ ...S.h1, marginBottom: 12 }}>Quest Map</div>
          <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(61,220,132,0.18)", position: "relative", height: 235, background: "radial-gradient(ellipse at 35% 45%, #0B2A14 0%, #071510 65%)" }}>
            {[25, 50, 75].map(p => <div key={p} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: 1, background: "rgba(61,220,132,0.035)" }} />)}
            {[33, 66].map(p => <div key={p} style={{ position: "absolute", top: `${p}%`, left: 0, right: 0, height: 1, background: "rgba(61,220,132,0.035)" }} />)}
            <div style={{ position: "absolute", bottom: "20%", left: "18%", right: "8%", height: 3, background: "rgba(41,182,246,0.22)", borderRadius: 2, transform: "rotate(-3deg)" }} />
            {pins.map((pin, i) => (
              <div key={i} style={{ position: "absolute", left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%,-50%)", cursor: "pointer", zIndex: pin.active ? 5 : 2 }}
                onClick={() => { if (pin.active) { setSelId("green-heart"); setScreen("qdetail"); } }}>
                {pin.active && <div style={{ position: "absolute", width: 42, height: 42, borderRadius: "50%", border: "2px solid rgba(61,220,132,0.5)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "ping 1.5s ease-out infinite" }} />}
                <div style={{ background: pin.active ? "#3DDC84" : "rgba(255,255,255,0.1)", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid ${pin.active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)"}`, boxShadow: pin.active ? "0 0 16px rgba(61,220,132,0.5)" : "none" }}>{pin.e}</div>
                <div style={{ background: "rgba(4,12,7,0.92)", color: pin.active ? "#3DDC84" : "rgba(255,255,255,0.5)", fontSize: 9, fontFamily: "DM Sans, sans-serif", fontWeight: pin.active ? 700 : 400, padding: "2px 6px", borderRadius: 50, whiteSpace: "nowrap", marginTop: 3, textAlign: "center", border: pin.active ? "1px solid rgba(61,220,132,0.28)" : "none" }}>{pin.n}</div>
              </div>
            ))}
            <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(4,12,7,0.9)", border: "1px solid rgba(61,220,132,0.28)", borderRadius: 8, padding: "5px 10px", display: "flex", gap: 5, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3DDC84" }} />
              <span style={{ color: "#3DDC84", fontSize: 10, fontFamily: "DM Sans, sans-serif" }}>GPS Active</span>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            {pins.map((pin, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 2px", borderBottom: "1px solid rgba(255,255,255,0.045)" }}>
                <div style={{ fontSize: 26 }}>{pin.e}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: pin.active ? "#3DDC84" : "rgba(255,255,255,0.68)", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13 }}>{pin.n}</div>
                  <div style={{ ...S.muted, fontSize: 11 }}>{pin.km}</div>
                </div>
                {pin.active && <span style={{ color: "#3DDC84", fontSize: 10, fontFamily: "DM Sans, sans-serif", border: "1px solid rgba(61,220,132,0.28)", borderRadius: 50, padding: "3px 8px" }}>Active</span>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tab === "profile") return (
      <div style={{ padding: "12px 16px" }}>
        <div style={{ ...S.card, display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg, #1B5E20, #3DDC84)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🌿</div>
          <div>
            <div style={S.h2}>Ryan Wilson</div>
            <div style={{ color: "#3DDC84", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>Level {level} Explorer</div>
            <div style={{ color: "#F5A623", fontSize: 12, fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>⭐ {userXP} XP · Georgetown, GY</div>
          </div>
        </div>
        <PBar label={`Level ${level}`} right={`Level ${level + 1}`} pct={xpInLvl} col="#F5A623" />
        <div style={{ ...S.muted, fontSize: 10, marginBottom: 14 }}>{100 - xpInLvl} XP needed</div>
        <div style={{ background: "rgba(41,182,246,0.06)", border: "1px solid rgba(41,182,246,0.18)", borderRadius: 12, padding: 12, marginBottom: 14 }}>
          <div style={{ color: "#29B6F6", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, marginBottom: 5 }}>🔬 RESEARCH FRAMEWORK</div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "DM Sans, sans-serif", lineHeight: 1.65 }}>
            Gamification anchored in the mGEECO framework — Meaningful Gamification Elements for Ecotourism Behavior (Rosmadi, Zhou & Xu, 2024). JAIN Online University, Sem VI Research Project.
          </div>
        </div>
        <div style={{ ...S.h2, marginBottom: 10 }}>Badges</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {BADGES.map((b, i) => (
            <div key={i} style={{ background: b.earned ? "rgba(61,220,132,0.07)" : "rgba(255,255,255,0.02)", border: `1px solid ${b.earned ? "rgba(61,220,132,0.22)" : "rgba(255,255,255,0.04)"}`, borderRadius: 14, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", opacity: b.earned ? 1 : 0.42 }}>
              <div style={{ fontSize: 26, filter: b.earned ? "none" : "grayscale(100%)" }}>{b.icon}</div>
              <div>
                <div style={{ color: b.earned ? "#fff" : "rgba(255,255,255,0.38)", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12 }}>{b.name}</div>
                <div style={{ ...S.muted, fontSize: 10 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    return null;
  };

  return (
    <Wrap>
      <style>{CSS}</style>
      <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
        {/* Phone */}
        <div style={{ width: 375, height: 812, borderRadius: 44, background: "#000", border: "8px solid #1a1a1a", boxShadow: "0 40px 100px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(255,255,255,0.04)", overflow: "hidden", position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 118, height: 30, background: "#000", borderRadius: "0 0 20px 20px", zIndex: 100 }} />
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0A1A0F" }}>
            <div style={{ height: 34, background: "rgba(0,0,0,0.38)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 18px 6px", flexShrink: 0 }}>
              <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>9:41</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["●●●", "WiFi", "🔋"].map((x, i) => <span key={i} style={{ color: "rgba(255,255,255,0.68)", fontSize: 10 }}>{x}</span>)}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>{renderTab()}</div>
            <div style={{ height: 68, background: "rgba(4,12,7,0.97)", borderTop: "1px solid rgba(61,220,132,0.1)", display: "flex", flexShrink: 0, paddingBottom: 8 }}>
              {[["🏠", "Home", "home"], ["🗺️", "Quests", "quests"], ["📍", "Map", "map"], ["👤", "Profile", "profile"]].map(([icon, label, id]) => (
                <button key={id} onClick={() => { setTab(id); if (screen === "qdetail") setScreen("app"); }}
                  style={{ flex: 1, background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: 0 }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ color: tab === id && screen !== "qdetail" ? "#3DDC84" : "rgba(255,255,255,0.28)", fontSize: 10, fontFamily: "DM Sans, sans-serif", fontWeight: tab === id && screen !== "qdetail" ? 700 : 400 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Research Panel */}
        <div style={{ width: 216, background: "#071510", border: "1px solid rgba(61,220,132,0.18)", borderRadius: 18, padding: 16, flexShrink: 0 }}>
          <div style={{ color: "#3DDC84", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14, marginBottom: 2 }}>🔬 Research Tools</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "DM Sans, sans-serif", marginBottom: 14 }}>Phase 2 — Usability Testing</div>

          <div style={S.panelLabel}>SESSION MODE</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[["Quest", false, "#3DDC84"], ["Directory", true, "#F5A623"]].map(([lbl, val, col]) => (
              <button key={lbl} onClick={() => setIsCtrl(val)} style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: `1.5px solid ${isCtrl === val ? col : "rgba(255,255,255,0.07)"}`, background: isCtrl === val ? `${col}16` : "transparent", color: isCtrl === val ? col : "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "DM Sans, sans-serif", fontWeight: 700, cursor: "pointer" }}>{lbl}</button>
            ))}
          </div>

          <div style={S.panelLabel}>TASK TIMER</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px", color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, textAlign: "center" }}>{fmtTime(timer)}</div>
            <button onClick={() => { if (timerOn) setTimerOn(false); else { setTimer(0); setTimerOn(true); } }} style={{ padding: "10px 12px", borderRadius: 10, border: "none", background: timerOn ? "#C62828" : "#3DDC84", color: timerOn ? "#fff" : "#050D07", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
              {timerOn ? "Stop" : "Start"}
            </button>
          </div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "DM Sans, sans-serif", marginBottom: 16 }}>Records task completion time</div>

          <div style={S.panelLabel}>POST-TASK</div>
          <button onClick={() => { setSusA({}); setSusScore(null); setScreen("sus"); }} style={{ width: "100%", background: "rgba(41,182,246,0.1)", border: "1px solid rgba(41,182,246,0.28)", borderRadius: 12, padding: "11px", color: "#29B6F6", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, cursor: "pointer", marginBottom: 8 }}>
            📊 Launch SUS Survey
          </button>
          <button onClick={reset} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "11px", color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans, sans-serif", fontSize: 11, cursor: "pointer", marginBottom: 16 }}>
            🔄 Reset Session
          </button>

          <div style={S.panelLabel}>TASK SCENARIOS</div>
          {["T1: Navigate to active quest", "T2: Simulate GPS arrival", "T3: Read an Eco Fact", "T4: Check XP & profile"].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid rgba(61,220,132,0.22)", flexShrink: 0, marginTop: 1 }} />
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, fontFamily: "DM Sans, sans-serif", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}

          <div style={{ marginTop: 14, background: "rgba(61,220,132,0.04)", border: "1px solid rgba(61,220,132,0.1)", borderRadius: 10, padding: 10 }}>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, fontFamily: "DM Sans, sans-serif", lineHeight: 1.65 }}>
              Analysis: t-test · Descriptive stats · mGEECO behavioural modelling
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Wrap({ children }) {
  return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #020806 0%, #071510 55%, #050D08 100%)", padding: 20 }}>{children}</div>;
}
function Phone({ children }) {
  return (
    <div style={{ width: 375, height: 812, borderRadius: 44, background: "#000", border: "8px solid #1a1a1a", boxShadow: "0 40px 100px rgba(0,0,0,0.82), inset 0 0 0 1px rgba(255,255,255,0.04)", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 118, height: 30, background: "#000", borderRadius: "0 0 20px 20px", zIndex: 100 }} />
      {children}
    </div>
  );
}
function ICard({ color, label, text }) {
  return (
    <div style={{ background: `${color}0C`, border: `1px solid ${color}28`, borderRadius: 16, padding: 14, marginBottom: 10, width: "100%" }}>
      <div style={{ color, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>{label}</div>
      <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, fontFamily: "DM Sans, sans-serif", lineHeight: 1.72 }}>{text}</div>
    </div>
  );
}
function PBar({ label, right, pct, col }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.38)", fontSize: 11, fontFamily: "DM Sans, sans-serif", marginBottom: 5 }}>
        <span>{label}</span><span>{right}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.07)" }}>
        <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, pct))}%`, borderRadius: 3, background: `linear-gradient(90deg, ${col}88, ${col})`, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  splashT: { color: "#3DDC84", fontSize: 30, fontFamily: "Syne, sans-serif", fontWeight: 900, letterSpacing: -1, lineHeight: 1.1, textAlign: "center" },
  splashS: { color: "rgba(255,255,255,0.38)", fontSize: 13, fontFamily: "DM Sans, sans-serif", marginTop: 10, textAlign: "center" },
  h1: { color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22 },
  h2: { color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16 },
  muted: { color: "rgba(255,255,255,0.4)", fontFamily: "DM Sans, sans-serif", fontSize: 13 },
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 14 },
  btn: { width: "100%", background: "linear-gradient(135deg, #1B5E20, #3DDC84)", color: "#050D07", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14, border: "none", borderRadius: 50, padding: "14px 24px", cursor: "pointer" },
  back: { background: "transparent", border: "none", color: "#3DDC84", fontFamily: "DM Sans, sans-serif", fontSize: 13, cursor: "pointer", padding: "0 0 12px 0" },
  panelLabel: { color: "rgba(255,255,255,0.35)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, marginBottom: 7 },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 0; background: transparent; }
  @keyframes glow { 0%,100% { box-shadow: 0 0 40px rgba(61,220,132,0.28); } 50% { box-shadow: 0 0 70px rgba(61,220,132,0.6); } }
  @keyframes ping { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.8; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }
  @keyframes dot { from { transform: translateY(0); opacity: 0.35; } to { transform: translateY(-7px); opacity: 1; } }
  @keyframes bounceIn { 0% { transform: scale(0.2); opacity: 0; } 60% { transform: scale(1.15); } 80% { transform: scale(0.92); } 100% { transform: scale(1); opacity: 1; } }
`;
