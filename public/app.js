const ICONS = {
  barbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 18v-4h16v4M2 14h20M9 6h6v4H9z"/></svg>`,
  dumbbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>`,
  machine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>`,
  bodyweight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="2"/><path d="M7 21l3-7 2 3 2-3 3 7M9 11h6"/></svg>`
};

const MUSCLE_NAMES = {
  chest: "Petto", shoulders: "Spalle", upper_back: "Schiena Alta", lats: "Gran Dorsale",
  lower_back: "Lombari", biceps: "Bicipiti", triceps: "Tricipiti", forearms: "Avambracci",
  abs: "Addome", obliques: "Obliqui", quads: "Quadricipiti", hamstrings: "Femorali",
  glutes: "Glutei", calves: "Polpacci"
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

const DATASET_URL = "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/data/exercises.json";
const MEDIA_BASE_URL = "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/";
const MAX_HISTORY_ITEMS = 30;

const FALLBACK_EXERCISES = [
  { name: "Barbell Bench Press", muscle: "chest", icon: "barbell", gif: "", steps: { it: ["Abbassa la barra al petto e spingi verso l'alto con forza."], en: ["Lower the bar to your chest and press up explosively."] } },
  { name: "Pull-up", muscle: "lats", icon: "bodyweight", gif: "", steps: { it: ["Tirati su fino a superare la sbarra col mento e scendi con controllo."], en: ["Pull yourself up until your chin clears the bar, then lower with control."] } }
];

const I18N = {
  it: {
    menuTitle: "Menu", tabWorkout: "Allenamento", tabExplore: "Esplora Esercizi", tabHistory: "Cronologia",
    langLabel: "Lingua / Language", titleRenameSub: "Tocca per rinominare", flipBtn: "↻ Gira",
    flipBtnLarge: "↻ Fronte / Retro", restHeader: "Recupero", stopBtn: "Stop", addExerciseBtn: "+ Registra Esercizio",
    logLabel: "Log Esercizi", exploreTitle: "Database Esercizi", exploreSub: "Tocca un muscolo sulla sagoma",
    exploreSearchPlaceholder: "Cerca tra oltre 1.300 esercizi...", exploreCountLabel: "Disponibili",
    discoverBtn: "Esecuzione", historyTitle: "Cronologia", clearBtn: "Svuota", finishBtn: "Termina e Salva",
    noMedia: "Animazione non disponibile", execStepsLabel: "Istruzioni", useInWorkoutBtn: "+ Inserisci",
    newExTitle: "Nuovo Esercizio", targetMuscleLabel: "Muscolo", equipTypeLabel: "Attrezzatura",
    cancelBtn: "Annulla", saveExBtn: "Salva", recapSub: "Salvato in cronologia", statVolume: "Volume",
    statExercises: "Esercizi", statTime: "Tempo", recapDetailLabel: "Dettaglio", newSessionBtn: "Nuova Sessione",
    addSetBtn: "+ Serie", removeSetBtn: "- Rimuovi",
    emptyHistory: "Nessun workout registrato.<br>Inizia ora!",
    emptyExplore: "Nessun esercizio trovato.", equipBarbell: "Bilanciere", equipDumbbell: "Manubri",
    equipMachine: "Macchinario", equipBodyweight: "Corpo Libero",
    startSessionBtn: "Inizia", pauseSessionBtn: "Pausa", resumeSessionBtn: "Riprendi",
    muscles: { all: "Tutti", chest: "Petto", shoulders: "Spalle", upper_back: "Schiena Alta", lats: "Dorsali", lower_back: "Lombari", biceps: "Bicipiti", triceps: "Tricipiti", forearms: "Avambracci", abs: "Addome", obliques: "Obliqui", quads: "Quadricipiti", hamstrings: "Femorali", glutes: "Glutei", calves: "Polpacci" }
  },
  en: {
    menuTitle: "Menu", tabWorkout: "Workout", tabExplore: "Explore", tabHistory: "History",
    langLabel: "Language", titleRenameSub: "Tap to rename", flipBtn: "↻ Flip",
    flipBtnLarge: "↻ Flip", restHeader: "Rest", stopBtn: "Stop", addExerciseBtn: "+ Log Exercise",
    logLabel: "Log", exploreTitle: "Database", exploreSub: "Tap a muscle or search",
    exploreSearchPlaceholder: "Search 1,300+ exercises...", exploreCountLabel: "Available",
    discoverBtn: "View", historyTitle: "History", clearBtn: "Clear", finishBtn: "Save Workout",
    noMedia: "Animation unavailable", execStepsLabel: "Instructions", useInWorkoutBtn: "+ Insert",
    newExTitle: "Custom Exercise", targetMuscleLabel: "Muscle", equipTypeLabel: "Equipment",
    cancelBtn: "Cancel", saveExBtn: "Save", recapSub: "Saved to history", statVolume: "Volume",
    statExercises: "Exercises", statTime: "Time", recapDetailLabel: "Details", newSessionBtn: "New Session",
    addSetBtn: "+ Add Set", removeSetBtn: "- Remove",
    emptyHistory: "No workouts recorded.<br>Start now!",
    emptyExplore: "No exercises found.", equipBarbell: "Barbell", equipDumbbell: "Dumbbells",
    equipMachine: "Machine", equipBodyweight: "Bodyweight",
    startSessionBtn: "Start", pauseSessionBtn: "Pause", resumeSessionBtn: "Resume",
    muscles: { all: "All", chest: "Chest", shoulders: "Shoulders", upper_back: "Upper Back", lats: "Lats", lower_back: "Lower Back", biceps: "Biceps", triceps: "Triceps", forearms: "Forearms", abs: "Abs", obliques: "Obliques", quads: "Quads", hamstrings: "Hamstrings", glutes: "Glutes", calves: "Calves" }
  },
  es: {
    menuTitle: "Menú", tabWorkout: "Rutina", tabExplore: "Explorar", tabHistory: "Historial",
    langLabel: "Idioma", titleRenameSub: "Toca para renombrar", flipBtn: "↻ Girar",
    flipBtnLarge: "↻ Girar", restHeader: "Descanso", stopBtn: "Parar", addExerciseBtn: "+ Registrar",
    logLabel: "Registro", exploreTitle: "Base de Datos", exploreSub: "Toca un músculo",
    exploreSearchPlaceholder: "Buscar 1,300+ ejercicios...", exploreCountLabel: "Disponibles",
    discoverBtn: "Ver", historyTitle: "Historial", clearBtn: "Vaciar", finishBtn: "Guardar",
    noMedia: "Animación no disponible", execStepsLabel: "Instrucciones", useInWorkoutBtn: "+ Añadir",
    newExTitle: "Nuevo Ejercicio", targetMuscleLabel: "Músculo", equipTypeLabel: "Equipamiento",
    cancelBtn: "Cancelar", saveExBtn: "Guardar", recapSub: "Guardado", statVolume: "Volumen",
    statExercises: "Ejercicios", statTime: "Tiempo", recapDetailLabel: "Detalle", newSessionBtn: "Nueva Sesión",
    addSetBtn: "+ Serie", removeSetBtn: "- Eliminar",
    emptyHistory: "No hay entrenamientos.<br>¡Empieza ahora!",
    emptyExplore: "No se encontraron ejercicios.", equipBarbell: "Barra", equipDumbbell: "Mancuernas",
    equipMachine: "Máquina", equipBodyweight: "Peso Corporal",
    startSessionBtn: "Iniciar", pauseSessionBtn: "Pausa", resumeSessionBtn: "Reanudar",
    muscles: { all: "Todos", chest: "Pecho", shoulders: "Hombros", upper_back: "Espalda Alta", lats: "Dorsales", lower_back: "Lombari", biceps: "Bíceps", triceps: "Tríceps", forearms: "Antebrazos", abs: "Abdomen", obliques: "Oblicuos", quads: "Cuádriceps", hamstrings: "Isquios", glutes: "Glúteos", calves: "Gemelos" }
  }
};

let currentLang = localStorage.getItem('my_gym_lang') || 'it';
let apiExercises = [];
let customExercises = JSON.parse(localStorage.getItem('my_gym_custom_exercises')) || [];
let completedExercises = [];
let targetedMuscles = new Set();
let selectedExercise = null;
let currentExploreMuscle = "all";
let exerciseInDetail = null;
let currentFilteredExploreList = [];
let dashOrientation = 'front';
let exploreOrientation = 'front';
let recapOrientation = 'front';

let sessionInterval = null;
let sessionSeconds = 0;
let isSessionRunning = false;
let restInterval = null;

const sessionTimerDisplay = document.getElementById('sessionTimerDisplay');
const sessionStatusDot = document.getElementById('sessionStatusDot');
const btnToggleSession = document.getElementById('btnToggleSession');
const setsContainer = document.getElementById('setsContainer');

function updateSessionTimerUI() {
  const m = String(Math.floor(sessionSeconds / 60)).padStart(2, '0');
  const s = String(sessionSeconds % 60).padStart(2, '0');
  sessionTimerDisplay.innerText = `${m}:${s}`;
}

btnToggleSession.addEventListener('click', () => {
  if (isSessionRunning) {
    clearInterval(sessionInterval);
    isSessionRunning = false;
    btnToggleSession.innerText = t('resumeSessionBtn');
    btnToggleSession.className = "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold px-4 py-2.5 rounded-full text-[0.8rem] active:scale-95 transition-all";
    sessionStatusDot.className = "w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]";
    sessionTimerDisplay.classList.replace('text-green-400', 'text-yellow-400');
    sessionTimerDisplay.classList.replace('drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]', 'drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]');
  } else {
    isSessionRunning = true;
    btnToggleSession.innerText = t('pauseSessionBtn');
    btnToggleSession.className = "bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold px-4 py-2.5 rounded-full text-[0.8rem] active:scale-95 transition-all";
    sessionStatusDot.className = "w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse";
    
    sessionTimerDisplay.classList.remove('text-gray-500', 'text-yellow-400', 'drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]');
    sessionTimerDisplay.classList.add('text-green-400', 'drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]');

    sessionInterval = setInterval(() => {
      sessionSeconds++;
      updateSessionTimerUI();
    }, 1000);
  }
});

function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || (I18N['it'][key]) || key; }
function getMuscleName(m) { return (I18N[currentLang]?.muscles?.[m]) || (I18N['it'].muscles[m]) || m; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key.startsWith('muscle')) {
      const mKey = key.replace('muscle', '').toLowerCase();
      el.innerText = getMuscleName(mKey === 'upperback' ? 'upper_back' : mKey === 'lowerback' ? 'lower_back' : mKey);
    } else { el.innerText = t(key); }
  });
  
  if (!isSessionRunning && sessionSeconds === 0) {
    btnToggleSession.innerText = t('startSessionBtn');
  } else if (!isSessionRunning && sessionSeconds > 0) {
    btnToggleSession.innerText = t('resumeSessionBtn');
  } else {
    btnToggleSession.innerText = t('pauseSessionBtn');
  }

  const searchInp = document.getElementById('exploreSearchInput');
  if (searchInp) searchInp.placeholder = t('exploreSearchPlaceholder');
  document.querySelectorAll('.lang-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
  renderCompletedList(); renderExploreList(); renderHistoryList();
}

function createSetRowHTML(setNum, defaultWeight = '', defaultReps = '') {
  return `
    <div class="set-row flex items-center gap-2 bg-black/20 border border-white/5 rounded-2xl p-2 px-3 transition-all" data-set="${setNum}">
      <span class="font-mono text-xs font-extrabold text-purple-400 w-6 shrink-0">#${setNum}</span>
      <div class="flex-1 flex items-center gap-1.5 min-w-0">
        <input type="number" class="set-weight w-full bg-black/30 border border-white/10 rounded-xl py-2 px-2 text-center text-sm font-semibold text-white outline-none focus:border-purple-500 placeholder-gray-600" placeholder="Kg" min="0" step="0.5" value="${defaultWeight}">
        <span class="text-[0.68rem] text-gray-500 font-bold uppercase shrink-0">kg</span>
      </div>
      <div class="flex-1 flex items-center gap-1.5 min-w-0">
        <input type="number" class="set-reps w-full bg-black/30 border border-white/10 rounded-xl py-2 px-2 text-center text-sm font-semibold text-white outline-none focus:border-purple-500 placeholder-gray-600" placeholder="Reps" min="1" value="${defaultReps}">
        <span class="text-[0.68rem] text-gray-500 font-bold uppercase shrink-0">reps</span>
      </div>
    </div>
  `;
}

function resetSetRows() {
  setsContainer.innerHTML = createSetRowHTML(1);
}

document.getElementById('btnAddSetRow').addEventListener('click', () => {
  const currentRows = setsContainer.querySelectorAll('.set-row');
  const nextSetNum = currentRows.length + 1;
  
  let lastWeight = '';
  let lastReps = '';
  if (currentRows.length > 0) {
    const lastRow = currentRows[currentRows.length - 1];
    lastWeight = lastRow.querySelector('.set-weight').value || '';
    lastReps = lastRow.querySelector('.set-reps').value || '';
  }

  setsContainer.insertAdjacentHTML('beforeend', createSetRowHTML(nextSetNum, lastWeight, lastReps));
});

document.getElementById('btnRemoveSetRow').addEventListener('click', () => {
  const currentRows = setsContainer.querySelectorAll('.set-row');
  if (currentRows.length > 1) {
    currentRows[currentRows.length - 1].remove();
  }
});

function normalizeMuscleName(m) {
  if (!m) return "chest";
  m = m.toLowerCase().trim();
  if (m.includes("chest") || m.includes("pec") || m.includes("petto")) return "chest";
  if (m.includes("shoulder") || m.includes("delt") || m.includes("spall")) return "shoulders";
  if (m.includes("trap") || m.includes("middle back") || m.includes("neck") || m.includes("upper back") || m.includes("schiena alta")) return "upper_back";
  if (m.includes("lat") || m.includes("dors")) return "lats";
  if (m.includes("lower back") || m.includes("lomb") || m.includes("spine") || m.includes("erector")) return "lower_back";
  if (m.includes("bicep") || m.includes("bicipit")) return "biceps";
  if (m.includes("tricep") || m.includes("tricipit")) return "triceps";
  if (m.includes("forearm") || m.includes("avambr") || m.includes("wrist")) return "forearms";
  if (m.includes("oblique") || m.includes("obliqu")) return "obliques";
  if (m.includes("ab") || m.includes("core") || m.includes("waist") || m.includes("addom")) return "abs";
  if (m.includes("quad") || m.includes("quadricip") || m.includes("adductor") || m.includes("abductor") || m.includes("thigh")) return "quads";
  if (m.includes("hamstring") || m.includes("femoral") || m.includes("ischiocrur")) return "hamstrings";
  if (m.includes("glute")) return "glutes";
  if (m.includes("calf") || m.includes("calv") || m.includes("polpacc") || m.includes("soleus")) return "calves";
  return "chest";
}

function normalizeEquipment(eq) {
  if (!eq) return "barbell";
  eq = eq.toLowerCase();
  if (eq.includes("barbell") || eq.includes("ez") || eq.includes("olympic")) return "barbell";
  if (eq.includes("dumbbell") || eq.includes("kettlebell")) return "dumbbell";
  if (eq.includes("body") || eq.includes("none") || eq.includes("assisted")) return "bodyweight";
  return "machine";
}

function getAllExercises() { return [...customExercises, ...(apiExercises.length ? apiExercises : FALLBACK_EXERCISES)]; }

async function loadOpenExerciseDatabase() {
  try {
    const cachedData = localStorage.getItem('my_gym_dataset_hasan_v1');
    if (cachedData) {
      apiExercises = JSON.parse(cachedData);
      renderExploreList();
    }

    const res = await fetch(DATASET_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        apiExercises = data.map(item => {
          const rawGif = item.gif_url || item.gif || "";
          const fullGifUrl = rawGif.startsWith("http") ? rawGif : (rawGif ? MEDIA_BASE_URL + rawGif : "");
          const targetStr = item.target || item.category || item.body_part || "";

          return {
            name: item.name ? (item.name.charAt(0).toUpperCase() + item.name.slice(1)) : "Exercise",
            muscle: normalizeMuscleName(targetStr),
            icon: normalizeEquipment(item.equipment || ""),
            gif: fullGifUrl,
            rawSteps: item.instruction_steps || null,
            rawInstructions: item.instructions || null,
            steps: ["Esegui il movimento controllando la fase eccentrica e concentrica."]
          };
        });

        localStorage.setItem('my_gym_dataset_hasan_v1', JSON.stringify(apiExercises));
        renderExploreList();
      }
    }
  } catch (err) {
    if (!apiExercises.length) apiExercises = FALLBACK_EXERCISES;
    renderExploreList();
  }
}

function getExerciseSteps(ex) {
  if (ex.rawSteps && typeof ex.rawSteps === 'object') {
    if (Array.isArray(ex.rawSteps[currentLang]) && ex.rawSteps[currentLang].length > 0) {
      return ex.rawSteps[currentLang];
    }
    if (Array.isArray(ex.rawSteps['en']) && ex.rawSteps['en'].length > 0) {
      return ex.rawSteps['en'];
    }
  }

  if (ex.rawInstructions && typeof ex.rawInstructions === 'object') {
    const text = ex.rawInstructions[currentLang] || ex.rawInstructions['en'] || "";
    if (text) {
      return text.split(/(?<=\.)\s+/).filter(s => s.trim().length > 0);
    }
  }

  return ex.steps || ["Esegui l'esercizio con movimento controllato e carichi idonei."];
}

function renderBodySvg(containerId, orientation, isExplore = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = BODY_SVGS[orientation];
  if (isExplore) container.classList.add('explore-interactive');

  container.querySelectorAll('.muscle').forEach(el => {
    if (!isExplore && targetedMuscles.has(el.dataset.muscle)) el.classList.add('active');
    if (isExplore) {
      if (el.dataset.muscle === currentExploreMuscle) el.classList.add('selected');
      el.addEventListener('click', (e) => { e.stopPropagation(); setExploreMuscleFilter(el.dataset.muscle); });
    }
  });
}

function setActiveNavTab(viewId, showBottom) {
  document.querySelectorAll('.drawer-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-target="${viewId}"]`)?.classList.add('active');
  document.getElementById(viewId).classList.add('active');
  document.getElementById('bottomBar').style.display = showBottom ? 'flex' : 'none';
}

const burgerBtn = document.getElementById('burgerBtn');
const drawerMenu = document.getElementById('drawerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const btnCloseDrawer = document.getElementById('btnCloseDrawer');

function openDrawer() { drawerMenu.classList.add('open'); menuOverlay.classList.add('open'); }
function closeDrawer() { drawerMenu.classList.remove('open'); menuOverlay.classList.remove('open'); }

burgerBtn.addEventListener('click', openDrawer);
btnCloseDrawer.addEventListener('click', closeDrawer);
menuOverlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    setActiveNavTab(target, target === 'viewWorkout');
    closeDrawer();
    if (target === 'viewExplore') renderExploreList();
    if (target === 'viewHistory') renderHistoryList();
  });
});

document.querySelectorAll('.lang-pill').forEach(btn => {
  btn.addEventListener('click', () => { currentLang = btn.dataset.lang; localStorage.setItem('my_gym_lang', currentLang); applyTranslations(); });
});

document.getElementById('dashFlipBtn').addEventListener('click', () => { dashOrientation = dashOrientation === 'front' ? 'back' : 'front'; renderBodySvg('dashBodyContainer', dashOrientation); });
document.getElementById('exploreFlipBtn').addEventListener('click', () => { exploreOrientation = exploreOrientation === 'front' ? 'back' : 'front'; renderBodySvg('exploreBodyContainer', exploreOrientation, true); });
document.getElementById('recapFlipBtn').addEventListener('click', () => { recapOrientation = recapOrientation === 'front' ? 'back' : 'front'; renderBodySvg('recapBodyContainer', recapOrientation); });

const searchInput = document.getElementById('exerciseSearch');
const searchResults = document.getElementById('searchResults');

function closeSearchDropdown() {
  searchResults.classList.remove('open');
  searchResults.innerHTML = '';
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    closeSearchDropdown();
    return;
  }

  const matches = getAllExercises().filter(ex => ex.name.toLowerCase().includes(query));
  
  if (!matches.length) {
    searchResults.innerHTML = `<div class="p-3 text-[0.8rem] text-gray-400">Nessun esercizio trovato</div>`;
  } else {
    searchResults.innerHTML = matches.slice(0, 8).map((ex, i) => `
      <div class="search-item p-3.5 flex justify-between items-center border-b border-white/10 cursor-pointer text-[0.86rem] text-white active:bg-white/10 hover:bg-white/5" data-index="${i}" data-name="${ex.name}">
        <span class="truncate pr-2">${ex.name}</span>
        <span class="text-[0.65rem] uppercase px-2 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 whitespace-nowrap shrink-0">${getMuscleName(ex.muscle)}</span>
      </div>
    `).join('');
  }
  searchResults.classList.add('open');
});

searchResults.addEventListener('click', (e) => {
  const item = e.target.closest('.search-item');
  if (!item) return;
  selectedExercise = getAllExercises().find(ex => ex.name === item.dataset.name) || { name: item.dataset.name, muscle: "chest", icon: "barbell" };
  searchInput.value = selectedExercise.name;
  
  closeSearchDropdown();

  document.getElementById('selectedExIcon').innerHTML = `<div class="w-6 h-6 stroke-purple-500">${ICONS[selectedExercise.icon]}</div>`;
  document.getElementById('selectedExName').innerText = selectedExercise.name;
  document.getElementById('selectedExMuscle').innerText = getMuscleName(selectedExercise.muscle);
  document.getElementById('selectedExPreview').classList.remove('hidden');
  document.getElementById('selectedExPreview').classList.add('flex');
});

document.addEventListener('click', (e) => { 
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    closeSearchDropdown();
  }
});

document.getElementById('btnAddExercise').addEventListener('click', () => {
  const name = searchInput.value.trim();
  if (!name) return;
  if (!selectedExercise || selectedExercise.name !== name) selectedExercise = { name, muscle: "chest", icon: "barbell" };

  const rows = setsContainer.querySelectorAll('.set-row');
  const setsData = [];
  
  rows.forEach((row, idx) => {
    const weightVal = parseFloat(row.querySelector('.set-weight').value) || 0;
    const repsVal = parseInt(row.querySelector('.set-reps').value) || 1;
    setsData.push({
      setNumber: idx + 1,
      weight: weightVal,
      reps: repsVal
    });
  });

  const exerciseVolume = setsData.reduce((sum, s) => sum + (s.weight * s.reps), 0);

  completedExercises.push({
    name: selectedExercise.name,
    muscle: selectedExercise.muscle,
    iconKey: selectedExercise.icon,
    setsData: setsData,
    sets: setsData.length,
    volume: exerciseVolume
  });

  targetedMuscles.add(selectedExercise.muscle);
  renderBodySvg('dashBodyContainer', dashOrientation);
  renderCompletedList();
  startRestTimer(90);
  
  searchInput.value = '';
  closeSearchDropdown();
  document.getElementById('selectedExPreview').classList.add('hidden');
  document.getElementById('selectedExPreview').classList.remove('flex');
  selectedExercise = null;
  resetSetRows();
});

function renderCompletedList() {
  document.getElementById('exerciseList').innerHTML = completedExercises.map(ex => `
    <div class="flex items-center gap-3 bg-surface backdrop-blur-2xl border border-white/10 rounded-3xl p-3.5 shadow-lg">
      <div class="w-12 h-12 bg-black/30 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 stroke-purple-400">${ICONS[ex.iconKey]}</div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-center mb-1">
          <span class="text-[0.95rem] font-bold text-white truncate pr-2">${ex.name}</span>
          <span class="text-[0.65rem] uppercase px-2.5 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 shrink-0">${getMuscleName(ex.muscle)}</span>
        </div>
        <div class="flex flex-wrap gap-1.5 mt-2">
          ${ex.setsData.map(s => `
            <span class="font-mono text-[0.72rem] bg-black/30 border border-white/5 rounded-lg px-2 py-0.5 text-gray-300 font-semibold">
              <strong class="text-purple-400 font-bold">#${s.setNumber}</strong> ${s.weight}kg × ${s.reps}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

const exploreSearchInput = document.getElementById('exploreSearchInput');
exploreSearchInput.addEventListener('input', renderExploreList);

function setExploreMuscleFilter(m) {
  currentExploreMuscle = m;
  document.querySelectorAll('.pill').forEach(b => b.classList.toggle('active', b.dataset.muscle === m));
  renderBodySvg('exploreBodyContainer', exploreOrientation, true);
  renderExploreList();
}

document.querySelectorAll('.pill').forEach(btn => btn.addEventListener('click', () => setExploreMuscleFilter(btn.dataset.muscle)));

function renderExploreList() {
  const filter = exploreSearchInput.value.trim().toLowerCase();
  currentFilteredExploreList = getAllExercises().filter(ex => {
    const matchesM = currentExploreMuscle === "all" || ex.muscle === currentExploreMuscle;
    const matchesQ = !filter || ex.name.toLowerCase().includes(filter) || getMuscleName(ex.muscle).toLowerCase().includes(filter);
    return matchesM && matchesQ;
  });

  document.getElementById('exploreCountLabel').innerText = `${t('exploreCountLabel')} (${currentFilteredExploreList.length})`;

  if (!currentFilteredExploreList.length) {
    document.getElementById('exploreExerciseList').innerHTML = `<div class="text-center py-6 text-gray-400 text-sm">${t('emptyExplore')}</div>`;
    return;
  }

  document.getElementById('exploreExerciseList').innerHTML = currentFilteredExploreList.slice(0, 60).map((ex, i) => `
    <div class="flex items-center gap-3 bg-surface backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-lg">
      <div class="w-12 h-12 bg-black/30 border border-white/10 rounded-xl flex items-center justify-center shrink-0 stroke-purple-400">${ICONS[ex.icon] || ICONS.barbell}</div>
      <div class="flex-1 min-w-0">
        <div class="text-[0.95rem] font-bold text-white truncate">${ex.name}</div>
        <div class="text-[0.65rem] uppercase font-bold text-purple-300 mt-0.5">${getMuscleName(ex.muscle)}</div>
      </div>
      <button class="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-[0.75rem] font-bold active:bg-purple-500/20 active:border-purple-500 transition-colors shrink-0 btn-discover" data-index="${i}">${t('discoverBtn')}</button>
    </div>
  `).join('');
}

document.getElementById('exploreExerciseList').addEventListener('click', e => {
  const btn = e.target.closest('.btn-discover');
  if (btn) openExerciseDetail(currentFilteredExploreList[parseInt(btn.dataset.index)]);
});

function openExerciseDetail(ex) {
  exerciseInDetail = ex;

  document.getElementById('detailExName').innerText = ex.name;
  document.getElementById('detailExMuscle').innerText = getMuscleName(ex.muscle);
  document.getElementById('detailExEquip').innerText = t(`equip${ex.icon.charAt(0).toUpperCase() + ex.icon.slice(1)}`);

  const imgEl = document.getElementById('detailImg');
  const videoEl = document.getElementById('detailVideo');
  const placeholderEl = document.getElementById('mediaPlaceholder');

  videoEl.pause();
  videoEl.removeAttribute('src');
  videoEl.classList.add('hidden');
  imgEl.classList.add('hidden');
  placeholderEl.classList.add('hidden');
  placeholderEl.classList.remove('flex');

  if (ex.gif && typeof ex.gif === 'string' && ex.gif.trim().length > 0) {
    imgEl.classList.remove('hidden');
    imgEl.src = ex.gif;
  } else {
    placeholderEl.classList.remove('hidden');
    placeholderEl.classList.add('flex');
  }

  const stepsArray = getExerciseSteps(ex);
  document.getElementById('detailStepsList').innerHTML = stepsArray.length
    ? stepsArray.map(s => `<li>${s}</li>`).join('')
    : `<li>Esegui l'esercizio con movimento controllato.</li>`;

  document.getElementById('detailModal').classList.add('open');
}

document.getElementById('btnCloseDetailModal').addEventListener('click', () => {
  const imgEl = document.getElementById('detailImg');
  imgEl.removeAttribute('src');
  document.getElementById('detailModal').classList.remove('open');
});

document.getElementById('btnUseFromDetail').addEventListener('click', () => {
  if (!exerciseInDetail) return;
  selectedExercise = exerciseInDetail;
  searchInput.value = exerciseInDetail.name;
  closeSearchDropdown();
  document.getElementById('selectedExIcon').innerHTML = `<div class="w-6 h-6 stroke-purple-500">${ICONS[selectedExercise.icon]}</div>`;
  document.getElementById('selectedExName').innerText = exerciseInDetail.name;
  document.getElementById('selectedExMuscle').innerText = getMuscleName(exerciseInDetail.muscle);
  document.getElementById('selectedExPreview').classList.remove('hidden');
  document.getElementById('selectedExPreview').classList.add('flex');
  
  document.getElementById('detailModal').classList.remove('open');
  setActiveNavTab('viewWorkout', true);
});

function saveCompletedSessionToHistory(sd) {
  try {
    let hist = JSON.parse(localStorage.getItem('my_gym_history')) || [];
    hist.unshift(sd);
    if (hist.length > MAX_HISTORY_ITEMS) hist = hist.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem('my_gym_history', JSON.stringify(hist));
  } catch (e) {}
}

function renderHistoryList() {
  const listContainer = document.getElementById('historyList');
  if (!listContainer) return;
  const hist = JSON.parse(localStorage.getItem('my_gym_history')) || [];
  
  const countEl = document.getElementById('historyCountLabel');
  if (countEl) countEl.innerText = `${hist.length} / ${MAX_HISTORY_ITEMS}`;

  if (!hist.length) {
    listContainer.innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">${t('emptyHistory')}</div>`;
    return;
  }

  listContainer.innerHTML = hist.map((s, i) => {
    const musclesList = Array.isArray(s.targetedMuscles) ? s.targetedMuscles : [];
    const exList = Array.isArray(s.exercises) ? s.exercises : [];

    return `
      <div class="bg-surface backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex flex-col gap-3 shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <div class="text-white font-extrabold text-[1.05rem]">${s.title}</div>
            <div class="text-gray-400 text-xs font-mono font-semibold mt-0.5">${s.date}</div>
          </div>
          <button class="w-8 h-8 flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400 rounded-full active:bg-red-500/20 transition-colors" onclick="deleteHistorySession(${i})">✕</button>
        </div>
        <div class="grid grid-cols-3 gap-2 bg-black/20 border border-white/5 rounded-2xl p-2.5 text-center">
          <div><div class="font-mono text-[0.95rem] font-bold text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">${(s.totalVolume || 0).toLocaleString()} kg</div><div class="text-[0.65rem] uppercase font-bold text-gray-500 mt-0.5">${t('statVolume')}</div></div>
          <div><div class="font-mono text-[0.95rem] font-bold text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">${s.exerciseCount || exList.length}</div><div class="text-[0.65rem] uppercase font-bold text-gray-500 mt-0.5">${t('statExercises')}</div></div>
          <div><div class="font-mono text-[0.95rem] font-bold text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">${s.duration || '00:00'}</div><div class="text-[0.65rem] uppercase font-bold text-gray-500 mt-0.5">${t('statTime')}</div></div>
        </div>
        ${musclesList.length ? `<div class="flex flex-wrap gap-1.5 mt-0.5">${musclesList.map(m => `<span class="text-[0.65rem] bg-purple-500/20 text-purple-300 rounded-lg px-2.5 py-1 font-bold uppercase">${getMuscleName(m)}</span>`).join('')}</div>` : ''}
        
        ${exList.length ? `
          <div class="flex flex-col gap-2 pt-2 border-t border-white/5 mt-1">
            ${exList.map(ex => {
              const setsArr = Array.isArray(ex.setsData) ? ex.setsData : [];
              return `
                <div class="flex flex-col text-xs text-gray-300">
                  <div class="font-semibold text-white flex items-center justify-between">
                    <span>${ex.name}</span>
                    <span class="text-purple-400 font-mono font-bold">${ex.sets || setsArr.length} set</span>
                  </div>
                  ${setsArr.length ? `
                    <div class="flex flex-wrap gap-1 mt-1">
                      ${setsArr.map(st => `
                        <span class="font-mono text-[0.68rem] bg-black/40 border border-white/5 rounded px-1.5 py-0.5 text-gray-400">
                          #${st.setNumber} ${st.weight}kg × ${st.reps}
                        </span>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

window.deleteHistorySession = (i) => {
  let h = JSON.parse(localStorage.getItem('my_gym_history')) || [];
  h.splice(i, 1); localStorage.setItem('my_gym_history', JSON.stringify(h)); renderHistoryList();
};

document.getElementById('btnClearHistory').addEventListener('click', () => {
  if (confirm("Vuoi cancellare tutta la cronologia?")) { localStorage.removeItem('my_gym_history'); renderHistoryList(); }
});

function startRestTimer(sec) {
  clearInterval(restInterval); let r = sec; updateRestDisplay(r);
  restInterval = setInterval(() => { r--; if (r <= 0) { clearInterval(restInterval); updateRestDisplay(0); if (navigator.vibrate) navigator.vibrate([150, 80, 150]); } else updateRestDisplay(r); }, 1000);
}
function stopRestTimer() { clearInterval(restInterval); updateRestDisplay(0); }
function updateRestDisplay(sec) { document.getElementById('restDisplay').innerText = `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; }
document.getElementById('btnRest60').addEventListener('click', () => startRestTimer(60));
document.getElementById('btnRest90').addEventListener('click', () => startRestTimer(90));
document.getElementById('btnRestStop').addEventListener('click', stopRestTimer);

document.getElementById('btnShowRecap').addEventListener('click', () => {
  const tv = completedExercises.reduce((a, c) => a + (c.volume || 0), 0);
  const st = document.getElementById('customTitle').value || 'Workout';
  const sd = document.getElementById('sessionTimerDisplay').innerText;
  
  document.getElementById('recapSessionName').innerText = st;
  document.getElementById('recapTotalWeight').innerText = `${tv.toLocaleString()} kg`;
  document.getElementById('recapCount').innerText = completedExercises.length;
  document.getElementById('recapDuration').innerText = sd;

  renderBodySvg('recapBodyContainer', recapOrientation);

  document.getElementById('recapExerciseList').innerHTML = completedExercises.map(ex => `
    <div class="flex flex-col py-2 border-b border-white/5 text-[0.85rem] text-white gap-1">
      <div class="flex items-center justify-between font-semibold">
        <div class="flex items-center gap-2"><div class="w-5 h-5 stroke-purple-400">${ICONS[ex.iconKey]}</div><span class="truncate">${ex.name}</span></div>
        <span class="font-mono text-purple-300 font-bold">${ex.sets} set</span>
      </div>
      <div class="flex flex-wrap gap-1 pl-7">
        ${ex.setsData.map(s => `
          <span class="font-mono text-[0.68rem] bg-black/40 border border-white/5 rounded px-1.5 py-0.5 text-gray-300">
            #${s.setNumber} ${s.weight}kg × ${s.reps}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  if (completedExercises.length) {
    const n = new Date();
    saveCompletedSessionToHistory({
      title: st,
      date: `${String(n.getDate()).padStart(2,'0')}/${String(n.getMonth()+1).padStart(2,'0')}/${n.getFullYear()} ${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`,
      duration: sd,
      totalVolume: tv,
      exerciseCount: completedExercises.length,
      targetedMuscles: Array.from(targetedMuscles),
      exercises: completedExercises
    });
  }
  document.getElementById('recapModal').classList.add('open');
});

function resetSessionUI() {
  clearInterval(sessionInterval);
  isSessionRunning = false;
  sessionSeconds = 0;
  updateSessionTimerUI();
  btnToggleSession.innerText = t('startSessionBtn');
  btnToggleSession.className = "bg-green-500/15 border border-green-500/30 text-green-400 font-bold px-4 py-2.5 rounded-full text-[0.8rem] active:scale-95 transition-all";
  sessionStatusDot.className = "w-3 h-3 rounded-full bg-gray-600 shadow-none";
  sessionTimerDisplay.className = "font-mono text-2xl font-extrabold text-gray-500 drop-shadow-md transition-colors";
}

document.getElementById('btnResetSession').addEventListener('click', () => {
  document.getElementById('recapModal').classList.remove('open');
  completedExercises = []; targetedMuscles.clear(); renderBodySvg('dashBodyContainer', dashOrientation); renderCompletedList(); 
  resetSessionUI();
  resetSetRows();
});

document.getElementById('btnOpenModal').addEventListener('click', () => { document.getElementById('newExName').value = ''; document.getElementById('newExModal').classList.add('open'); });
document.getElementById('btnCloseModal').addEventListener('click', () => document.getElementById('newExModal').classList.remove('open'));
document.getElementById('btnSaveCustomEx').addEventListener('click', () => {
  const n = document.getElementById('newExName').value.trim(), m = document.getElementById('newExMuscle').value, i = document.getElementById('newExIcon').value;
  if (!n) return;
  const nx = { name: n, muscle: m, icon: i, images: [], video: "", steps: ["Esegui con controllo."] };
  customExercises.push(nx); localStorage.setItem('my_gym_custom_exercises', JSON.stringify(customExercises));
  selectedExercise = nx; searchInput.value = n;
  closeSearchDropdown();
  document.getElementById('selectedExIcon').innerHTML = `<div class="w-6 h-6 stroke-purple-500">${ICONS[i]}</div>`;
  document.getElementById('selectedExName').innerText = n; document.getElementById('selectedExMuscle').innerText = getMuscleName(m);
  document.getElementById('selectedExPreview').classList.remove('hidden'); document.getElementById('selectedExPreview').classList.add('flex');
  document.getElementById('newExModal').classList.remove('open'); renderExploreList();
});

resetSetRows();
renderBodySvg('dashBodyContainer', 'front'); renderBodySvg('exploreBodyContainer', 'front', true);
loadOpenExerciseDatabase(); applyTranslations();

if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(()=>{})); }