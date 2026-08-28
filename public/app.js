const ICONS = {
  barbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 18v-4h16v4M2 14h20M9 6h6v4H9z"/></svg>`,
  dumbbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>`,
  machine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>`,
  bodyweight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="2"/><path d="M7 21l3-7 2 3 2-3 3 7M9 11h6"/></svg>`
};

const MUSCLE_NAMES = {
  chest: "Petto",
  shoulders: "Spalle",
  upper_back: "Schiena Alta / Trapezi",
  lats: "Gran Dorsale",
  lower_back: "Schiena Bassa / Lombari",
  biceps: "Bicipiti",
  triceps: "Tricipiti",
  forearms: "Avambracci",
  abs: "Addome",
  obliques: "Obliqui",
  quads: "Quadricipiti",
  hamstrings: "Femorali",
  glutes: "Glutei",
  calves: "Polpacci"
};

const BODY_SVGS = {
  front: `
    <svg class="body-svg" viewBox="0 0 100 145">
      <circle cx="50" cy="12" r="7" fill="#222834" />
      <path class="muscle" data-muscle="shoulders" d="M28,23 C26,27 26,30 32,32 L34,24 Z" />
      <path class="muscle" data-muscle="shoulders" d="M72,23 C74,27 74,30 68,32 L66,24 Z" />
      <path class="muscle" data-muscle="chest" d="M37,25 C45,24 55,24 63,25 C64,36 36,36 37,25 Z" />
      <rect class="muscle" data-muscle="biceps" x="25" y="33" width="7" height="15" rx="3.5" />
      <rect class="muscle" data-muscle="biceps" x="68" y="33" width="7" height="15" rx="3.5" />
      <rect class="muscle" data-muscle="forearms" x="23" y="50" width="6" height="17" rx="3" />
      <rect class="muscle" data-muscle="forearms" x="71" y="50" width="6" height="17" rx="3" />
      <path class="muscle" data-muscle="abs" d="M43,38 L57,38 L55,54 L45,54 Z" />
      <path class="muscle" data-muscle="obliques" d="M37,38 L42,38 L44,53 L38,50 Z" />
      <path class="muscle" data-muscle="obliques" d="M63,38 L58,38 L56,53 L62,50 Z" />
      <rect class="muscle" data-muscle="quads" x="38" y="58" width="10" height="34" rx="4" />
      <rect class="muscle" data-muscle="quads" x="52" y="58" width="10" height="34" rx="4" />
      <rect class="muscle" data-muscle="calves" x="39" y="95" width="8" height="24" rx="3" />
      <rect class="muscle" data-muscle="calves" x="53" y="95" width="8" height="24" rx="3" />
    </svg>
  `,
  back: `
    <svg class="body-svg" viewBox="0 0 100 145">
      <circle cx="50" cy="12" r="7" fill="#222834" />
      <path class="muscle" data-muscle="upper_back" d="M38,22 L50,28 L62,22 L58,34 L42,34 Z" />
      <circle class="muscle" data-muscle="shoulders" cx="30" cy="27" r="4.5" />
      <circle class="muscle" data-muscle="shoulders" cx="70" cy="27" r="4.5" />
      <path class="muscle" data-muscle="lats" d="M36,35 L44,35 L45,50 L38,47 Z" />
      <path class="muscle" data-muscle="lats" d="M64,35 L56,35 L55,50 L62,47 Z" />
      <rect class="muscle" data-muscle="lower_back" x="45" y="44" width="10" height="11" rx="2" />
      <rect class="muscle" data-muscle="triceps" x="25" y="33" width="7" height="15" rx="3.5" />
      <rect class="muscle" data-muscle="triceps" x="68" y="33" width="7" height="15" rx="3.5" />
      <rect class="muscle" data-muscle="forearms" x="23" y="50" width="6" height="17" rx="3" />
      <rect class="muscle" data-muscle="forearms" x="71" y="50" width="6" height="17" rx="3" />
      <path class="muscle" data-muscle="glutes" d="M38,57 C45,56 49,58 49,68 L38,68 Z" />
      <path class="muscle" data-muscle="glutes" d="M62,57 C55,56 51,58 51,68 L62,68 Z" />
      <rect class="muscle" data-muscle="hamstrings" x="38" y="70" width="10" height="22" rx="3.5" />
      <rect class="muscle" data-muscle="hamstrings" x="52" y="70" width="10" height="22" rx="3.5" />
      <rect class="muscle" data-muscle="calves" x="39" y="95" width="8" height="24" rx="3" />
      <rect class="muscle" data-muscle="calves" x="53" y="95" width="8" height="24" rx="3" />
    </svg>
  `
};

const FALLBACK_EXERCISES = [
  {
    name: "Panca Piana Bilanciere",
    muscle: "chest",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4",
    steps: [
      "Sdraiati sulla panca con gli occhi sotto il bilanciere e i piedi ben saldi a terra.",
      "Impugna il bilanciere a larghezza superiore alle spalle e adduci le scapole.",
      "Abbassa la barra in modo controllato fino a sfiorare la parte media del petto.",
      "Spingi con forza verso l'alto tornando alla posizione di partenza senza rimbalzare."
    ]
  },
  {
    name: "Spinte Manubri Inclinata",
    muscle: "chest",
    icon: "dumbbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-incline-bench-press-front.mp4",
    steps: [
      "Regola la panca tra 30° e 45° e porta i manubri all'altezza del petto.",
      "Mantieni il petto aperto e spingi i manubri verso l'alto senza farli toccare in cima.",
      "Scendi lentamente aprendo i gomiti a circa 45-60 gradi rispetto al busto."
    ]
  },
  {
    name: "Croci ai Cavi",
    muscle: "chest",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-cable-standing-fly-front.mp4",
    steps: [
      "Posiziona le carrucole all'altezza delle spalle, afferra le maniglie e fai un passo avanti.",
      "Con i gomiti leggermente flessi, unisci le mani davanti al petto contraendo i pettorali.",
      "Torna indietro controllando la tensione fino ad avvertire l'allungamento."
    ]
  },
  {
    name: "Military Press",
    muscle: "shoulders",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-overhead-press-front.mp4",
    steps: [
      "In piedi con il bilanciere poggiato sulle clavicole e i gomiti leggermente avanti.",
      "Contrai addome e glutei e spingi il bilanciere sopra la testa in linea retta.",
      "Blocca la posizione in cima e riporta il bilanciere al petto controllando il peso."
    ]
  },
  {
    name: "Alzate Laterali Manubri",
    muscle: "shoulders",
    icon: "dumbbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-lateral-raise-front.mp4",
    steps: [
      "In piedi con manubri ai lati del corpo e busto leggermente inclinato in avanti.",
      "Solleva le braccia lateralmente guidando il movimento con i gomiti fino all'altezza delle spalle.",
      "Mantieni un secondo la contrazione e scendi lentamente."
    ]
  },
  {
    name: "Face Pull al Cavo",
    muscle: "shoulders",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-cable-face-pull-front.mp4",
    steps: [
      "Aggancia la corda al cavo alto e afferrala con presa neutra.",
      "Tira la corda verso il viso aprendo i gomiti e ruotando le mani indietro.",
      "Contrai i deltoidi posteriori e torna lentamente avanti."
    ]
  },
  {
    name: "Scrollate con Manubri (Shrugs)",
    muscle: "upper_back",
    icon: "dumbbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-shrug-front.mp4",
    steps: [
      "In piedi con le braccia distese e i manubri lungo i fianchi.",
      "Solleva le spalle verso le orecchie contraendo al massimo i trapezi.",
      "Mantieni la contrazione in cima e scendi lentamente senza ruotare le spalle."
    ]
  },
  {
    name: "Trazioni alla Sbarra",
    muscle: "lats",
    icon: "bodyweight",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-pullup-front.mp4",
    steps: [
      "Afferra la sbarra con presa prona a una larghezza leggermente superiore alle spalle.",
      "Attiva il dorso deprimendo le scapole e tira il corpo verso l'alto.",
      "Porta il mento oltre la sbarra e scendi fino a distendere completamente le braccia."
    ]
  },
  {
    name: "Lat Machine",
    muscle: "lats",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-cable-lat-pulldown-front.mp4",
    steps: [
      "Siediti regolando il cuscinetto sulle cosce e impugna la sbarra con presa ampia.",
      "Tira la sbarra verso la parte alta del petto aprendo il petto.",
      "Rilascia il carico in modo lento e controllato sentendo l'allungamento del gran dorsale."
    ]
  },
  {
    name: "Rematore con Bilanciere",
    muscle: "lats",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bent-over-row-front.mp4",
    steps: [
      "Busto inclinato a 45 gradi con schiena neutra e ginocchia leggermente piegate.",
      "Tira il bilanciere verso l'ombelico guidando il movimento con i gomiti.",
      "Contrai la schiena in cima e distendi le braccia controllando il carico."
    ]
  },
  {
    name: "Stacco da Terra (Deadlift)",
    muscle: "lower_back",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-deadlift-front.mp4",
    steps: [
      "Piedi a larghezza delle anche sotto il bilanciere con presa salda all'esterno delle tibie.",
      "Mantieni la schiena neutra e spingi sul pavimento estendendo anche e ginocchia insieme.",
      "Raggiungi l'estensione completa dei fianchi e scendi controllando la discesa."
    ]
  },
  {
    name: "Iperestensioni Lombari (Hyperextension)",
    muscle: "lower_back",
    icon: "bodyweight",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-hyperextension-front.mp4",
    steps: [
      "Posizionati sulla panca a 45 gradi con il bacino sul cuscino.",
      "Fletti il busto in avanti e risali contraendo i muscoli lombari fino all'allineamento.",
      "Non iperestendere eccessivamente la schiena in cima."
    ]
  },
  {
    name: "Curl Bicipiti con Manubri",
    muscle: "biceps",
    icon: "dumbbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-curl-front.mp4",
    steps: [
      "Impugna i manubri con le braccia lungo i fianchi e i gomiti fermi vicino al tronco.",
      "Fletti i gomiti ruotando i palmi verso l'alto fino a contrarre al massimo i bicipiti.",
      "Abbassa i manubri lentamente tornando alla distensione completa."
    ]
  },
  {
    name: "Curl a Martello (Hammer Curl)",
    muscle: "biceps",
    icon: "dumbbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-hammer-curl-front.mp4",
    steps: [
      "Impugna i manubri con i palmi rivolti uno verso l'altro (presa neutra).",
      "Solleva i manubri mantenendo i polsi stabili senza ruotarli.",
      "Scendi lentamente fino alla posizione iniziale."
    ]
  },
  {
    name: "Pushdown Tricipiti con Corda",
    muscle: "triceps",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-cable-pushdown-front.mp4",
    steps: [
      "Afferra la corda al cavo alto con i gomiti bloccati lungo i fianchi.",
      "Spingi verso il basso estendendo le braccia e allargando leggermente le estremità della corda in fondo.",
      "Torna su controllando la fase eccentrica senza muovere i gomiti avanti."
    ]
  },
  {
    name: "French Press con Bilanciere",
    muscle: "triceps",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-lying-triceps-extension-front.mp4",
    steps: [
      "Sdraiati sulla panca piana con il bilanciere dritto sopra la fronte.",
      "Fletti i gomiti portando la barra verso la fronte mantenendo i gomiti stabili.",
      "Estendi le braccia contraendo con forza i tricipiti."
    ]
  },
  {
    name: "Wrist Curl Avambracci",
    muscle: "forearms",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-wrist-curl-front.mp4",
    steps: [
      "Seduto sulla panca con gli avambracci poggiati sulle cosce e i polsi oltre le ginocchia.",
      "Fletti i polsi verso l'alto sollevando il bilanciere.",
      "Abbassa la barra aprendo leggermente le dita per allungare gli avambracci."
    ]
  },
  {
    name: "Crunch Addominali",
    muscle: "abs",
    icon: "bodyweight",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-crunch-front.mp4",
    steps: [
      "Sdraiati a terra con le ginocchia piegate e i piedi piatti.",
      "Solleva le spalle da terra contraendo l'addome senza tirare il collo con le mani.",
      "Mantieni la contrazione un istante ed espira, poi torna lentamente a terra."
    ]
  },
  {
    name: "Plank Isometrico",
    muscle: "abs",
    icon: "bodyweight",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-plank-front.mp4",
    steps: [
      "Appoggia gli avambracci a terra sotto le spalle con corpo dritto dalla testa ai talloni.",
      "Contrai addome, glutei e quadricipiti evitando di inarcare la zona lombare.",
      "Mantieni la posizione respirando in modo regolare."
    ]
  },
  {
    name: "Russian Twist Obliqui",
    muscle: "obliques",
    icon: "bodyweight",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-russian-twist-front.mp4",
    steps: [
      "Siediti a terra sollevando i piedi e inclinando il busto all'indietro a circa 45 gradi.",
      "Ruota il busto da un lato all'altro toccando il pavimento con le mani.",
      "Mantieni il core teso durante tutta la rotazione."
    ]
  },
  {
    name: "Squat con Bilanciere",
    muscle: "quads",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-squat-front.mp4",
    steps: [
      "Posiziona il bilanciere sui trapezi, piedi a larghezza spalle con punte leggermente aperte.",
      "Scendi piegando anche e ginocchia mantenendo la schiena dritta fino al parallelo.",
      "Spingi sui talloni e sull'avampiede per risalire in posizione eretta."
    ]
  },
  {
    name: "Leg Extension",
    muscle: "quads",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-extension-front.mp4",
    steps: [
      "Regola il cuscinetto sulla parte inferiore della tibia e schiena contro lo schienale.",
      "Estendi le gambe fino a contrarre al massimo i quadricipiti.",
      "Scendi lentamente senza far cadere il pacco pesi."
    ]
  },
  {
    name: "Leg Curl Femorali",
    muscle: "hamstrings",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-lying-leg-curl-front.mp4",
    steps: [
      "Sdraiati sulla macchina con il cuscinetto dietro i polpacci.",
      "Fletti le ginocchia portando i talloni verso i glutei.",
      "Rilascia il carico in modo controllato sentendo l'allungamento dei femorali."
    ]
  },
  {
    name: "Stacco Rumeno (Romanian Deadlift)",
    muscle: "hamstrings",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-romanian-deadlift-front.mp4",
    steps: [
      "In piedi con il bilanciere, ginocchia leggermente flesse e fisse.",
      "Spingi indietro il bacino facendo scorrere la barra lungo le cosce fino a sentire l'allungamento nei femorali.",
      "Riporta avanti i fianchi contraendo glutei e femorali."
    ]
  },
  {
    name: "Hip Thrust Bilanciere",
    muscle: "glutes",
    icon: "barbell",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-hip-thrust-front.mp4",
    steps: [
      "Schiena appoggiata alla panca e bilanciere posizionato sul bacino con apposita imbottitura.",
      "Spingi attraverso i talloni sollevando i fianchi fino a formare una linea retta con il tronco.",
      "Stringi i glutei in cima per un secondo prima di scendere in modo controllato."
    ]
  },
  {
    name: "Calf Raise in Piedi",
    muscle: "calves",
    icon: "machine",
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-standing-calf-raise-front.mp4",
    steps: [
      "Punte dei piedi sul bordo del gradino e spalle sotto i cuscinetti.",
      "Sollevati sulla punta dei piedi contraendo i polpacci al massimo.",
      "Scendi sotto il livello del gradino per allungare il muscolo."
    ]
  }
];

let apiExercises = [];
let customExercises = JSON.parse(localStorage.getItem('my_gym_custom_exercises')) || [];
let completedExercises = [];
let targetedMuscles = new Set();

let selectedExercise = null;
let currentExploreMuscle = "all";
let exerciseInDetail = null;

let dashOrientation = 'front';
let exploreOrientation = 'front';
let recapOrientation = 'front';

let sessionStartTime = Date.now();
let restInterval = null;

function normalizeMuscleName(apiMuscle) {
  if (!apiMuscle) return "chest";
  const m = apiMuscle.toLowerCase();
  
  if (m.includes("chest") || m.includes("pec") || m.includes("petto")) return "chest";
  if (m.includes("shoulder") || m.includes("delt") || m.includes("spall")) return "shoulders";
  if (m.includes("trap") || m.includes("upper back") || m.includes("schiena alta")) return "upper_back";
  if (m.includes("lat") || m.includes("dors")) return "lats";
  if (m.includes("lower back") || m.includes("lomb") || m.includes("erector")) return "lower_back";
  if (m.includes("bicep") || m.includes("bicipit")) return "biceps";
  if (m.includes("tricep") || m.includes("tricipit")) return "triceps";
  if (m.includes("forearm") || m.includes("avambr")) return "forearms";
  if (m.includes("oblique") || m.includes("obliqu")) return "obliques";
  if (m.includes("ab") || m.includes("core") || m.includes("addom")) return "abs";
  if (m.includes("quad") || m.includes("quadricip")) return "quads";
  if (m.includes("hamstring") || m.includes("femoral") || m.includes("ischiocrur")) return "hamstrings";
  if (m.includes("glute")) return "glutes";
  if (m.includes("calf") || m.includes("calv") || m.includes("polpacc") || m.includes("soleus") || m.includes("gastrocnemius")) return "calves";
  
  return "chest";
}

function getAllExercises() {
  return [...customExercises, ...(apiExercises.length ? apiExercises : FALLBACK_EXERCISES)];
}

async function fetchMuscleWikiExercises() {
  try {
    const res = await fetch('/api/exercises?limit=100');
    if (res.ok) {
      const data = await res.json();
      const rawList = Array.isArray(data) ? data : (data.exercises || data.results || []);
      
      if (Array.isArray(rawList) && rawList.length > 0) {
        apiExercises = rawList.map(item => {
          let videoUrl = "";
          if (Array.isArray(item.videos) && item.videos.length > 0) {
            videoUrl = item.videos[0].url || item.videos[0];
          }

          let steps = [];
          if (Array.isArray(item.steps)) {
            steps = item.steps.map(s => typeof s === 'string' ? s : (s.text || s.step || ""));
          }

          const equip = (item.category || item.equipment || "").toLowerCase();
          const iconKey = equip.includes("barbell") ? "barbell" : equip.includes("dumbbell") ? "dumbbell" : equip.includes("bodyweight") ? "bodyweight" : "machine";

          const target = item.target_muscle || (item.muscles ? item.muscles[0] : "") || item.category || "";

          return {
            name: item.name || item.title,
            muscle: normalizeMuscleName(target),
            icon: iconKey,
            video: videoUrl,
            steps: steps.length ? steps : ["Esegui il movimento controllando la fase eccentrica e concentrica."]
          };
        });
      }
    }
  } catch (err) {
    console.warn("Uso database offline:", err);
  }
  renderExploreList();
}

function renderBodySvg(containerId, orientation, isExplore = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = BODY_SVGS[orientation];
  if (isExplore) container.classList.add('explore-interactive');

  if (!isExplore) {
    container.querySelectorAll('.muscle').forEach(el => {
      if (targetedMuscles.has(el.dataset.muscle)) {
        el.classList.add('active');
      }
    });
  } else {
    container.querySelectorAll('.muscle').forEach(el => {
      if (el.dataset.muscle === currentExploreMuscle) {
        el.classList.add('selected');
      }
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setExploreMuscleFilter(el.dataset.muscle);
      });
    });
  }
}

document.getElementById('tabWorkoutBtn').addEventListener('click', () => {
  document.getElementById('tabWorkoutBtn').classList.add('active');
  document.getElementById('tabExploreBtn').classList.remove('active');
  document.getElementById('viewWorkout').classList.add('active');
  document.getElementById('viewExplore').classList.remove('active');
  document.getElementById('bottomBar').style.display = 'flex';
});

document.getElementById('tabExploreBtn').addEventListener('click', () => {
  document.getElementById('tabExploreBtn').classList.add('active');
  document.getElementById('tabWorkoutBtn').classList.remove('active');
  document.getElementById('viewExplore').classList.add('active');
  document.getElementById('viewWorkout').classList.remove('active');
  document.getElementById('bottomBar').style.display = 'none';
  renderExploreList();
});

document.getElementById('dashFlipBtn').addEventListener('click', () => {
  dashOrientation = dashOrientation === 'front' ? 'back' : 'front';
  renderBodySvg('dashBodyContainer', dashOrientation);
});

document.getElementById('exploreFlipBtn').addEventListener('click', () => {
  exploreOrientation = exploreOrientation === 'front' ? 'back' : 'front';
  renderBodySvg('exploreBodyContainer', exploreOrientation, true);
});

document.getElementById('recapFlipBtn').addEventListener('click', () => {
  recapOrientation = recapOrientation === 'front' ? 'back' : 'front';
  renderBodySvg('recapBodyContainer', recapOrientation);
});

const searchInput = document.getElementById('exerciseSearch');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.classList.remove('open');
    return;
  }

  const matches = getAllExercises().filter(ex => ex.name.toLowerCase().includes(query));
  if (matches.length === 0) {
    searchResults.innerHTML = `<div style="padding:10px; font-size:0.8rem; color:var(--text-muted);">Nessun esercizio trovato</div>`;
  } else {
    searchResults.innerHTML = matches.slice(0, 8).map(ex => `
      <div class="search-item" data-name="${ex.name}" data-muscle="${ex.muscle}" data-icon="${ex.icon}">
        <span>${ex.name}</span>
        <span class="ex-badge">${MUSCLE_NAMES[ex.muscle] || ex.muscle}</span>
      </div>
    `).join('');
  }
  searchResults.classList.add('open');
});

searchResults.addEventListener('click', (e) => {
  const item = e.target.closest('.search-item');
  if (!item) return;

  const found = getAllExercises().find(ex => ex.name === item.dataset.name);
  selectedExercise = found || {
    name: item.dataset.name,
    muscle: item.dataset.muscle,
    icon: item.dataset.icon
  };

  searchInput.value = selectedExercise.name;
  searchResults.classList.remove('open');

  document.getElementById('selectedExIcon').innerHTML = ICONS[selectedExercise.icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = selectedExercise.name;
  document.getElementById('selectedExMuscle').innerText = MUSCLE_NAMES[selectedExercise.muscle] || selectedExercise.muscle;
  document.getElementById('selectedExPreview').style.display = 'flex';
});

document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.classList.remove('open');
  }
});

document.getElementById('btnAddExercise').addEventListener('click', () => {
  const name = searchInput.value.trim();
  if (!name) return;

  if (!selectedExercise || selectedExercise.name !== name) {
    selectedExercise = { name: name, muscle: "chest", icon: "barbell" };
  }

  const sets = parseInt(document.getElementById('sets').value) || 1;
  const reps = parseInt(document.getElementById('reps').value) || 1;
  const weight = parseFloat(document.getElementById('weight').value) || 0;

  completedExercises.push({
    name: selectedExercise.name,
    muscle: selectedExercise.muscle,
    iconKey: selectedExercise.icon,
    sets,
    reps,
    weight
  });

  targetedMuscles.add(selectedExercise.muscle);
  renderBodySvg('dashBodyContainer', dashOrientation);
  renderCompletedList();
  startRestTimer(90);

  searchInput.value = '';
  document.getElementById('selectedExPreview').style.display = 'none';
  selectedExercise = null;
});

function renderCompletedList() {
  document.getElementById('exerciseList').innerHTML = completedExercises.map(ex => `
    <div class="exercise-item">
      <div class="ex-icon-box">${ICONS[ex.iconKey] || ICONS.barbell}</div>
      <div class="ex-details">
        <div class="ex-title">
          <span>${ex.name}</span>
          <span class="ex-badge">${MUSCLE_NAMES[ex.muscle] || ex.muscle}</span>
        </div>
        <div class="ex-meta">${ex.sets} set × ${ex.reps} reps • ${ex.weight} kg</div>
      </div>
    </div>
  `).join('');
}

const exploreSearchInput = document.getElementById('exploreSearchInput');
exploreSearchInput.addEventListener('input', () => {
  renderExploreList();
});

function setExploreMuscleFilter(muscle) {
  currentExploreMuscle = muscle;
  
  document.querySelectorAll('.pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.muscle === muscle);
  });

  renderBodySvg('exploreBodyContainer', exploreOrientation, true);
  renderExploreList();
}

document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => setExploreMuscleFilter(btn.dataset.muscle));
});

function renderExploreList() {
  const all = getAllExercises();
  const searchFilter = (exploreSearchInput.value || '').trim().toLowerCase();

  const filtered = all.filter(ex => {
    const matchesMuscle = (currentExploreMuscle === "all" || ex.muscle === currentExploreMuscle);
    const muscleLabel = (MUSCLE_NAMES[ex.muscle] || '').toLowerCase();
    const matchesQuery = !searchFilter || 
      ex.name.toLowerCase().includes(searchFilter) || 
      ex.muscle.toLowerCase().includes(searchFilter) ||
      muscleLabel.includes(searchFilter);
    return matchesMuscle && matchesQuery;
  });

  document.getElementById('exploreCountLabel').innerText = `Esercizi (${filtered.length})`;

  if (filtered.length === 0) {
    document.getElementById('exploreExerciseList').innerHTML = `
      <div style="text-align:center; padding: 24px 0; color: var(--text-muted); font-size: 0.85rem;">
        Nessun esercizio trovato per i filtri selezionati.
      </div>
    `;
    return;
  }

  document.getElementById('exploreExerciseList').innerHTML = filtered.map(ex => `
    <div class="exercise-item">
      <div class="ex-icon-box">${ICONS[ex.icon] || ICONS.barbell}</div>
      <div class="ex-details">
        <div class="ex-title">
          <span>${ex.name}</span>
          <span class="ex-badge">${MUSCLE_NAMES[ex.muscle] || ex.muscle}</span>
        </div>
      </div>
      <button class="btn-discover" onclick="openExerciseDetail('${encodeURIComponent(JSON.stringify(ex))}')">Scopri esecuzione</button>
    </div>
  `).join('');
}

window.openExerciseDetail = function(encodedEx) {
  const ex = JSON.parse(decodeURIComponent(encodedEx));
  exerciseInDetail = ex;

  document.getElementById('detailExName').innerText = ex.name;
  document.getElementById('detailExMuscle').innerText = MUSCLE_NAMES[ex.muscle] || ex.muscle;
  document.getElementById('detailExEquip').innerText = ex.icon === 'barbell' ? 'Bilanciere' : ex.icon === 'dumbbell' ? 'Manubri' : ex.icon === 'bodyweight' ? 'Corpo Libero' : 'Macchinario';

  const videoEl = document.getElementById('detailVideo');
  const placeholderEl = document.getElementById('videoPlaceholder');

  if (ex.video) {
    videoEl.src = ex.video;
    videoEl.style.display = 'block';
    placeholderEl.style.display = 'none';
    videoEl.load();
    videoEl.play().catch(() => {});
  } else {
    videoEl.pause();
    videoEl.style.display = 'none';
    placeholderEl.style.display = 'flex';
  }

  const stepsList = document.getElementById('detailStepsList');
  if (Array.isArray(ex.steps) && ex.steps.length > 0) {
    stepsList.innerHTML = ex.steps.map(step => `<li>${step}</li>`).join('');
  } else {
    stepsList.innerHTML = `<li>Esegui il movimento in modo controllato mantenendo una corretta postura.</li>`;
  }

  document.getElementById('detailModal').classList.add('open');
};

document.getElementById('btnCloseDetailModal').addEventListener('click', () => {
  const videoEl = document.getElementById('detailVideo');
  videoEl.pause();
  document.getElementById('detailModal').classList.remove('open');
});

document.getElementById('btnUseFromDetail').addEventListener('click', () => {
  if (!exerciseInDetail) return;
  selectedExercise = exerciseInDetail;
  searchInput.value = exerciseInDetail.name;

  document.getElementById('selectedExIcon').innerHTML = ICONS[exerciseInDetail.icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = exerciseInDetail.name;
  document.getElementById('selectedExMuscle').innerText = MUSCLE_NAMES[exerciseInDetail.muscle] || exerciseInDetail.muscle;
  document.getElementById('selectedExPreview').style.display = 'flex';

  document.getElementById('detailModal').classList.remove('open');
  document.getElementById('tabWorkoutBtn').click();
});

function startRestTimer(seconds) {
  clearInterval(restInterval);
  let remain = seconds;
  updateRestDisplay(remain);
  
  restInterval = setInterval(() => {
    remain--;
    if (remain <= 0) {
      clearInterval(restInterval);
      updateRestDisplay(0);
      if (navigator.vibrate) navigator.vibrate([150, 80, 150]);
    } else {
      updateRestDisplay(remain);
    }
  }, 1000);
}

function stopRestTimer() {
  clearInterval(restInterval);
  updateRestDisplay(0);
}

function updateRestDisplay(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  document.getElementById('restDisplay').innerText = `${m}:${s}`;
}

document.getElementById('btnRest60').addEventListener('click', () => startRestTimer(60));
document.getElementById('btnRest90').addEventListener('click', () => startRestTimer(90));
document.getElementById('btnRestStop').addEventListener('click', stopRestTimer);

setInterval(() => {
  const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
  const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const s = String(elapsed % 60).padStart(2, '0');
  document.getElementById('sessionTimer').innerText = `${m}:${s}`;
}, 1000);

document.getElementById('btnShowRecap').addEventListener('click', () => {
  const totalVolume = completedExercises.reduce((acc, curr) => acc + (curr.sets * curr.reps * curr.weight), 0);
  
  document.getElementById('recapSessionName').innerText = document.getElementById('customTitle').value || 'Workout';
  document.getElementById('recapTotalWeight').innerText = `${totalVolume.toLocaleString()} kg`;
  document.getElementById('recapCount').innerText = completedExercises.length;
  document.getElementById('recapDuration').innerText = document.getElementById('sessionTimer').innerText;

  renderBodySvg('recapBodyContainer', recapOrientation);

  document.getElementById('recapExerciseList').innerHTML = completedExercises.map(ex => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 0.82rem;">
      <div style="display:flex; align-items:center; gap:8px;">
        <div style="width: 18px; height: 18px; stroke: var(--green);">${ICONS[ex.iconKey] || ICONS.barbell}</div>
        <span>${ex.name}</span>
      </div>
      <span style="font-family: 'JetBrains Mono'; color: var(--text-muted);">${ex.sets}×${ex.reps} @ ${ex.weight}kg</span>
    </div>
  `).join('');

  document.getElementById('recapModal').classList.add('open');
});

document.getElementById('btnResetSession').addEventListener('click', () => {
  document.getElementById('recapModal').classList.remove('open');
  completedExercises = [];
  targetedMuscles.clear();
  renderBodySvg('dashBodyContainer', dashOrientation);
  renderCompletedList();
  sessionStartTime = Date.now();
});

document.getElementById('btnOpenModal').addEventListener('click', () => {
  document.getElementById('newExName').value = '';
  document.getElementById('newExModal').classList.add('open');
});
document.getElementById('btnCloseModal').addEventListener('click', () => {
  document.getElementById('newExModal').classList.remove('open');
});
document.getElementById('btnSaveCustomEx').addEventListener('click', () => {
  const name = document.getElementById('newExName').value.trim();
  const muscle = document.getElementById('newExMuscle').value;
  const icon = document.getElementById('newExIcon').value;
  if (!name) return;

  const newEx = {
    name,
    muscle,
    icon,
    video: "",
    steps: ["Esegui l'esercizio con movimento controllato e carichi idonei."]
  };
  customExercises.push(newEx);
  localStorage.setItem('my_gym_custom_exercises', JSON.stringify(customExercises));
  
  selectedExercise = newEx;
  searchInput.value = name;
  document.getElementById('selectedExIcon').innerHTML = ICONS[icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = name;
  document.getElementById('selectedExMuscle').innerText = MUSCLE_NAMES[muscle] || muscle;
  document.getElementById('selectedExPreview').style.display = 'flex';

  document.getElementById('newExModal').classList.remove('open');
  renderExploreList();
});

renderBodySvg('dashBodyContainer', 'front');
renderBodySvg('exploreBodyContainer', 'front', true);
fetchMuscleWikiExercises();