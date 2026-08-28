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

const GITHUB_EXERCISES_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const GITHUB_IMAGE_BASE_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
const MAX_HISTORY_ITEMS = 30;

const FALLBACK_EXERCISES = [
  { name: "Panca Piana Bilanciere", muscle: "chest", icon: "barbell", images: [], video: "", steps: ["Spingi con forza verso l'alto tornando alla posizione di partenza senza rimbalzare."] },
  { name: "Trazioni alla Sbarra", muscle: "lats", icon: "bodyweight", images: [], video: "", steps: ["Porta il mento oltre la sbarra e scendi fino a distendere completamente le braccia."] }
];

const I18N = {
  it: {
    menuTitle: "Menu", tabWorkout: "Allenamento", tabExplore: "Esplora Esercizi", tabHistory: "Cronologia",
    langLabel: "Lingua / Language", titleRenameSub: "Tocca per rinominare sessione", flipBtn: "↻ Gira",
    flipBtnLarge: "↻ Gira Fronte / Retro", restHeader: "Recupero", stopBtn: "Stop", addExerciseBtn: "+ Registra Esercizio",
    logLabel: "Log Esercizi", exploreTitle: "Database & Atlante Muscolare", exploreSub: "Tocca un muscolo sulla sagoma o usa la ricerca",
    exploreSearchPlaceholder: "Cerca tra oltre 800 esercizi...", exploreCountLabel: "Esercizi Disponibili",
    discoverBtn: "Scopri esecuzione", historyTitle: "Cronologia Workout", clearBtn: "Svuota", finishBtn: "Termina e Salva Workout",
    noMedia: "Dimostrazione visiva non disponibile", execStepsLabel: "Esecuzione e Istruzioni", useInWorkoutBtn: "+ Inserisci nel Workout",
    newExTitle: "Nuovo Esercizio", targetMuscleLabel: "Gruppo Muscolare", equipTypeLabel: "Attrezzatura",
    cancelBtn: "Annulla", saveExBtn: "Salva", recapSub: "Sessione salvata in cronologia", statVolume: "Volume",
    statExercises: "Esercizi", statTime: "Tempo", recapDetailLabel: "Dettaglio Esercizi", newSessionBtn: "Nuova Sessione",
    emptyHistory: "Nessun workout registrato finora.<br>Completa la tua prima sessione per visualizzarla qui!",
    emptyExplore: "Nessun esercizio trovato per i filtri selezionati.", equipBarbell: "Bilanciere", equipDumbbell: "Manubri",
    equipMachine: "Macchinario / Cavi", equipBodyweight: "Corpo Libero",
    muscles: { all: "Tutti", chest: "Petto", shoulders: "Spalle", upper_back: "Schiena Alta", lats: "Gran Dorsale", lower_back: "Lombari", biceps: "Bicipiti", triceps: "Tricipiti", forearms: "Avambracci", abs: "Addome", obliques: "Obliqui", quads: "Quadricipiti", hamstrings: "Femorali", glutes: "Glutei", calves: "Polpacci" }
  },
  en: {
    menuTitle: "Menu", tabWorkout: "Workout", tabExplore: "Explore", tabHistory: "History",
    langLabel: "Language", titleRenameSub: "Tap to rename session", flipBtn: "↻ Flip",
    flipBtnLarge: "↻ Flip Front / Back", restHeader: "Rest", stopBtn: "Stop", addExerciseBtn: "+ Add Exercise",
    logLabel: "Log", exploreTitle: "Database & Muscle Map", exploreSub: "Tap a muscle or search",
    exploreSearchPlaceholder: "Search 800+ exercises...", exploreCountLabel: "Available Exercises",
    discoverBtn: "View Execution", historyTitle: "History", clearBtn: "Clear", finishBtn: "Finish & Save",
    noMedia: "Visual demo not available", execStepsLabel: "Instructions", useInWorkoutBtn: "+ Add to Workout",
    newExTitle: "Custom Exercise", targetMuscleLabel: "Target Muscle", equipTypeLabel: "Equipment",
    cancelBtn: "Cancel", saveExBtn: "Save", recapSub: "Session saved to history", statVolume: "Volume",
    statExercises: "Exercises", statTime: "Duration", recapDetailLabel: "Exercise Details", newSessionBtn: "New Session",
    emptyHistory: "No workouts recorded yet.<br>Complete your first session!",
    emptyExplore: "No exercises found.", equipBarbell: "Barbell", equipDumbbell: "Dumbbells",
    equipMachine: "Machine / Cables", equipBodyweight: "Bodyweight",
    muscles: { all: "All", chest: "Chest", shoulders: "Shoulders", upper_back: "Upper Back", lats: "Lats", lower_back: "Lower Back", biceps: "Biceps", triceps: "Triceps", forearms: "Forearms", abs: "Abs", obliques: "Obliques", quads: "Quads", hamstrings: "Hamstrings", glutes: "Glutes", calves: "Calves" }
  },
  es: {
    menuTitle: "Menú", tabWorkout: "Rutina", tabExplore: "Explorar", tabHistory: "Historial",
    langLabel: "Idioma", titleRenameSub: "Toca para renombrar", flipBtn: "↻ Girar",
    flipBtnLarge: "↻ Girar Frente / Dorso", restHeader: "Descanso", stopBtn: "Parar", addExerciseBtn: "+ Añadir Ejercicio",
    logLabel: "Registro", exploreTitle: "Base de Datos", exploreSub: "Toca un músculo o busca",
    exploreSearchPlaceholder: "Buscar 800+ ejercicios...", exploreCountLabel: "Ejercicios Disponibles",
    discoverBtn: "Ver ejecución", historyTitle: "Historial", clearBtn: "Vaciar", finishBtn: "Terminar y Guardar",
    noMedia: "Demo visual no disponible", execStepsLabel: "Instrucciones", useInWorkoutBtn: "+ Añadir a Rutina",
    newExTitle: "Nuevo Ejercicio", targetMuscleLabel: "Músculo", equipTypeLabel: "Equipamiento",
    cancelBtn: "Cancelar", saveExBtn: "Guardar", recapSub: "Sesión guardada", statVolume: "Volumen",
    statExercises: "Ejercicios", statTime: "Tiempo", recapDetailLabel: "Detalle de Ejercicios", newSessionBtn: "Nueva Sesión",
    emptyHistory: "No hay entrenamientos guardados.<br>¡Completa tu primera sesión!",
    emptyExplore: "No se encontraron ejercicios.", equipBarbell: "Barra", equipDumbbell: "Mancuernas",
    equipMachine: "Máquina", equipBodyweight: "Peso Corporal",
    muscles: { all: "Todos", chest: "Pecho", shoulders: "Hombros", upper_back: "Espalda Alta", lats: "Dorsales", lower_back: "Lumbares", biceps: "Bíceps", triceps: "Tríceps", forearms: "Antebrazos", abs: "Abdomen", obliques: "Oblicuos", quads: "Cuádriceps", hamstrings: "Isquios", glutes: "Glúteos", calves: "Gemelos" }
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
let imageAnimationInterval = null;
let dashOrientation = 'front';
let exploreOrientation = 'front';
let recapOrientation = 'front';
let sessionStartTime = Date.now();
let restInterval = null;

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
  const searchInp = document.getElementById('exploreSearchInput');
  if (searchInp) searchInp.placeholder = t('exploreSearchPlaceholder');
  document.querySelectorAll('.lang-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
  renderCompletedList(); renderExploreList(); renderHistoryList();
}

function normalizeMuscleName(m) {
  if (!m) return "chest";
  m = m.toLowerCase().trim();
  if (m.includes("chest") || m.includes("pec")) return "chest";
  if (m.includes("shoulder") || m.includes("delt")) return "shoulders";
  if (m.includes("trap") || m.includes("middle back") || m.includes("upper back")) return "upper_back";
  if (m.includes("lat") || m.includes("dors")) return "lats";
  if (m.includes("lower back") || m.includes("lomb")) return "lower_back";
  if (m.includes("bicep")) return "biceps";
  if (m.includes("tricep")) return "triceps";
  if (m.includes("forearm") || m.includes("wrist")) return "forearms";
  if (m.includes("oblique")) return "obliques";
  if (m.includes("ab") || m.includes("core")) return "abs";
  if (m.includes("quad")) return "quads";
  if (m.includes("hamstring") || m.includes("femoral")) return "hamstrings";
  if (m.includes("glute")) return "glutes";
  if (m.includes("calf") || m.includes("calv")) return "calves";
  return "chest";
}

function normalizeEquipment(eq) {
  if (!eq) return "barbell";
  eq = eq.toLowerCase();
  if (eq.includes("barbell") || eq.includes("ez")) return "barbell";
  if (eq.includes("dumbbell") || eq.includes("kettlebell")) return "dumbbell";
  if (eq.includes("body") || eq.includes("none")) return "bodyweight";
  return "machine";
}

function getAllExercises() { return [...customExercises, ...(apiExercises.length ? apiExercises : FALLBACK_EXERCISES)]; }

async function loadOpenExerciseDatabase() {
  try {
    const cachedData = localStorage.getItem('my_gym_cached_v2');
    if (cachedData) { apiExercises = JSON.parse(cachedData); renderExploreList(); }
    const res = await fetch(GITHUB_EXERCISES_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        apiExercises = data.map(item => ({
          name: item.name,
          muscle: normalizeMuscleName(item.primaryMuscles?.[0] || item.category || ""),
          icon: normalizeEquipment(item.equipment),
          images: item.images || [], video: "",
          steps: item.instructions?.length ? item.instructions : ["Esegui in modo controllato."]
        }));
        localStorage.setItem('my_gym_cached_v2', JSON.stringify(apiExercises));
        renderExploreList();
      }
    }
  } catch (err) {
    if (!apiExercises.length) apiExercises = FALLBACK_EXERCISES;
    renderExploreList();
  }
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

function setActiveNavTab(tabId, viewId, showBottom) {
  document.querySelectorAll('.nav-btn, .drawer-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
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
    setActiveNavTab(target === 'viewWorkout' ? 'tabWorkoutBtn' : target === 'viewExplore' ? 'tabExploreBtn' : 'tabHistoryBtn', target, target === 'viewWorkout');
    closeDrawer();
    if (target === 'viewExplore') renderExploreList();
    if (target === 'viewHistory') renderHistoryList();
  });
});

document.getElementById('tabWorkoutBtn').addEventListener('click', () => setActiveNavTab('tabWorkoutBtn', 'viewWorkout', true));
document.getElementById('tabExploreBtn').addEventListener('click', () => { setActiveNavTab('tabExploreBtn', 'viewExplore', false); renderExploreList(); });
document.getElementById('tabHistoryBtn').addEventListener('click', () => { setActiveNavTab('tabHistoryBtn', 'viewHistory', false); renderHistoryList(); });

document.querySelectorAll('.lang-pill').forEach(btn => {
  btn.addEventListener('click', () => { currentLang = btn.dataset.lang; localStorage.setItem('my_gym_lang', currentLang); applyTranslations(); });
});

document.getElementById('dashFlipBtn').addEventListener('click', () => { dashOrientation = dashOrientation === 'front' ? 'back' : 'front'; renderBodySvg('dashBodyContainer', dashOrientation); });
document.getElementById('exploreFlipBtn').addEventListener('click', () => { exploreOrientation = exploreOrientation === 'front' ? 'back' : 'front'; renderBodySvg('exploreBodyContainer', exploreOrientation, true); });
document.getElementById('recapFlipBtn').addEventListener('click', () => { recapOrientation = recapOrientation === 'front' ? 'back' : 'front'; renderBodySvg('recapBodyContainer', recapOrientation); });

const searchInput = document.getElementById('exerciseSearch');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return searchResults.classList.remove('open');
  const matches = getAllExercises().filter(ex => ex.name.toLowerCase().includes(query));
  
  if (!matches.length) {
    searchResults.innerHTML = `<div class="p-3 text-[0.8rem] text-gray-400">Nessun esercizio trovato</div>`;
  } else {
    searchResults.innerHTML = matches.slice(0, 8).map((ex, i) => `
      <div class="search-item p-3 flex justify-between items-center border-b border-white/10 cursor-pointer text-[0.86rem] text-white hover:bg-white/5" data-index="${i}" data-name="${ex.name}">
        <span>${ex.name}</span>
        <span class="text-[0.65rem] uppercase px-2 py-0.5 rounded-md font-bold bg-purple-500/15 text-purple-300">${getMuscleName(ex.muscle)}</span>
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
  searchResults.classList.remove('open');
  document.getElementById('selectedExIcon').innerHTML = `<div class="w-5 h-5 stroke-purple-500">${ICONS[selectedExercise.icon]}</div>`;
  document.getElementById('selectedExName').innerText = selectedExercise.name;
  document.getElementById('selectedExMuscle').innerText = getMuscleName(selectedExercise.muscle);
  document.getElementById('selectedExPreview').classList.remove('hidden');
  document.getElementById('selectedExPreview').classList.add('flex');
});

document.addEventListener('click', (e) => { if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) searchResults.classList.remove('open'); });

document.getElementById('btnAddExercise').addEventListener('click', () => {
  const name = searchInput.value.trim();
  if (!name) return;
  if (!selectedExercise || selectedExercise.name !== name) selectedExercise = { name, muscle: "chest", icon: "barbell" };

  completedExercises.push({
    name: selectedExercise.name, muscle: selectedExercise.muscle, iconKey: selectedExercise.icon,
    sets: parseInt(document.getElementById('sets').value)||1, reps: parseInt(document.getElementById('reps').value)||1, weight: parseFloat(document.getElementById('weight').value)||0
  });

  targetedMuscles.add(selectedExercise.muscle);
  renderBodySvg('dashBodyContainer', dashOrientation);
  renderCompletedList();
  startRestTimer(90);
  searchInput.value = '';
  document.getElementById('selectedExPreview').classList.add('hidden');
  document.getElementById('selectedExPreview').classList.remove('flex');
  selectedExercise = null;
});

function renderCompletedList() {
  document.getElementById('exerciseList').innerHTML = completedExercises.map(ex => `
    <div class="flex items-center gap-3 bg-surface backdrop-blur-md border border-white/10 rounded-xl p-3">
      <div class="w-10 h-10 bg-black/40 border border-white/10 rounded-lg flex items-center justify-center shrink-0 stroke-purple-500">${ICONS[ex.iconKey]}</div>
      <div class="flex-1">
        <div class="text-[0.9rem] font-semibold text-white flex justify-between items-center">
          <span>${ex.name}</span>
          <span class="text-[0.65rem] uppercase px-2 py-0.5 rounded-md font-bold bg-purple-500/15 text-purple-300">${getMuscleName(ex.muscle)}</span>
        </div>
        <div class="font-mono text-[0.8rem] text-gray-400 mt-1">${ex.sets} set × ${ex.reps} reps • ${ex.weight} kg</div>
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
    <div class="flex items-center gap-3 bg-surface backdrop-blur-md border border-white/10 rounded-xl p-3">
      <div class="w-10 h-10 bg-black/40 border border-white/10 rounded-lg flex items-center justify-center shrink-0 stroke-purple-500">${ICONS[ex.icon] || ICONS.barbell}</div>
      <div class="flex-1 text-[0.9rem] font-semibold text-white flex justify-between items-center">
        <span class="truncate pr-2">${ex.name}</span>
        <span class="text-[0.65rem] uppercase px-2 py-0.5 rounded-md font-bold bg-purple-500/15 text-purple-300 shrink-0">${getMuscleName(ex.muscle)}</span>
      </div>
      <button class="btn-discover px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-semibold hover:bg-purple-500/20 hover:border-purple-500 transition-colors whitespace-nowrap" data-index="${i}">${t('discoverBtn')}</button>
    </div>
  `).join('');
}

document.getElementById('exploreExerciseList').addEventListener('click', e => {
  const btn = e.target.closest('.btn-discover');
  if (btn) openExerciseDetail(currentFilteredExploreList[parseInt(btn.dataset.index)]);
});

function openExerciseDetail(ex) {
  exerciseInDetail = ex;
  clearInterval(imageAnimationInterval);

  document.getElementById('detailExName').innerText = ex.name;
  document.getElementById('detailExMuscle').innerText = getMuscleName(ex.muscle);
  document.getElementById('detailExEquip').innerText = t(`equip${ex.icon.charAt(0).toUpperCase() + ex.icon.slice(1)}`);

  const vEl = document.getElementById('detailVideo'), iEl = document.getElementById('detailImg'), pEl = document.getElementById('mediaPlaceholder');
  vEl.pause(); vEl.removeAttribute('src'); vEl.classList.add('hidden'); iEl.classList.add('hidden'); pEl.classList.add('hidden'); pEl.classList.remove('flex');

  if (ex.images?.length > 0) {
    iEl.classList.remove('hidden');
    let f = 0; iEl.src = GITHUB_IMAGE_BASE_URL + ex.images[0];
    if (ex.images.length > 1) imageAnimationInterval = setInterval(() => { f = (f+1)%ex.images.length; iEl.src = GITHUB_IMAGE_BASE_URL + ex.images[f]; }, 950);
  } else if (ex.video) {
    vEl.classList.remove('hidden'); vEl.src = ex.video; vEl.play().catch(()=>{});
  } else {
    pEl.classList.remove('hidden'); pEl.classList.add('flex');
  }

  document.getElementById('detailStepsList').innerHTML = ex.steps?.length ? ex.steps.map(s => `<li>${s}</li>`).join('') : `<li>Esegui con controllo.</li>`;
  document.getElementById('detailModal').classList.add('open');
}

document.getElementById('btnCloseDetailModal').addEventListener('click', () => {
  clearInterval(imageAnimationInterval); document.getElementById('detailVideo').pause(); document.getElementById('detailModal').classList.remove('open');
});

document.getElementById('btnUseFromDetail').addEventListener('click', () => {
  if (!exerciseInDetail) return;
  clearInterval(imageAnimationInterval);
  selectedExercise = exerciseInDetail;
  searchInput.value = exerciseInDetail.name;
  document.getElementById('selectedExIcon').innerHTML = `<div class="w-5 h-5 stroke-purple-500">${ICONS[selectedExercise.icon]}</div>`;
  document.getElementById('selectedExName').innerText = exerciseInDetail.name;
  document.getElementById('selectedExMuscle').innerText = getMuscleName(exerciseInDetail.muscle);
  document.getElementById('selectedExPreview').classList.remove('hidden'); document.getElementById('selectedExPreview').classList.add('flex');
  
  document.getElementById('detailModal').classList.remove('open');
  setActiveNavTab('tabWorkoutBtn', 'viewWorkout', true);
});

function saveCompletedSessionToHistory(sd) {
  let hist = JSON.parse(localStorage.getItem('my_gym_history')) || [];
  hist.unshift(sd);
  if (hist.length > MAX_HISTORY_ITEMS) hist = hist.slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem('my_gym_history', JSON.stringify(hist));
}

function renderHistoryList() {
  const hist = JSON.parse(localStorage.getItem('my_gym_history')) || [];
  document.getElementById('historyCountLabel').innerText = `${hist.length} / ${MAX_HISTORY_ITEMS}`;
  if (!hist.length) {
    document.getElementById('historyList').innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">${t('emptyHistory')}</div>`;
    return;
  }

  document.getElementById('historyList').innerHTML = hist.map((s, i) => `
    <div class="bg-surface backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex flex-col gap-2.5 shadow-lg">
      <div class="flex justify-between items-start">
        <div>
          <div class="text-white font-bold text-base">${s.title}</div>
          <div class="text-gray-400 text-xs font-mono mt-0.5">${s.date}</div>
        </div>
        <button class="text-gray-400 hover:text-red-500 p-1 transition-colors" onclick="deleteHistorySession(${i})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
      <div class="grid grid-cols-3 gap-2 bg-black/30 border border-white/10 rounded-lg p-2 text-center">
        <div><div class="font-mono text-sm font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">${s.totalVolume.toLocaleString()} kg</div><div class="text-[0.65rem] text-gray-400">${t('statVolume')}</div></div>
        <div><div class="font-mono text-sm font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">${s.exerciseCount}</div><div class="text-[0.65rem] text-gray-400">${t('statExercises')}</div></div>
        <div><div class="font-mono text-sm font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.35)]">${s.duration}</div><div class="text-[0.65rem] text-gray-400">${t('statTime')}</div></div>
      </div>
      ${s.targetedMuscles?.length ? `<div class="flex flex-wrap gap-1.5 mt-1">${s.targetedMuscles.map(m => `<span class="text-[0.65rem] bg-purple-500/15 text-purple-300 rounded-md px-2 py-0.5 font-bold uppercase">${getMuscleName(m)}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');
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

setInterval(() => {
  const e = Math.floor((Date.now() - sessionStartTime) / 1000);
  document.getElementById('sessionTimer').innerText = `${String(Math.floor(e/60)).padStart(2,'0')}:${String(e%60).padStart(2,'0')}`;
}, 1000);

document.getElementById('btnShowRecap').addEventListener('click', () => {
  const tv = completedExercises.reduce((a, c) => a + (c.sets * c.reps * c.weight), 0);
  const st = document.getElementById('customTitle').value || 'Workout';
  const sd = document.getElementById('sessionTimer').innerText;
  
  document.getElementById('recapSessionName').innerText = st;
  document.getElementById('recapTotalWeight').innerText = `${tv.toLocaleString()} kg`;
  document.getElementById('recapCount').innerText = completedExercises.length;
  document.getElementById('recapDuration').innerText = sd;

  renderBodySvg('recapBodyContainer', recapOrientation);

  document.getElementById('recapExerciseList').innerHTML = completedExercises.map(ex => `
    <div class="flex items-center justify-between py-1.5 border-b border-white/10 text-[0.82rem] text-white">
      <div class="flex items-center gap-2"><div class="w-4 h-4 stroke-purple-500">${ICONS[ex.iconKey]}</div><span>${ex.name}</span></div>
      <span class="font-mono text-gray-400">${ex.sets}×${ex.reps} @ ${ex.weight}kg</span>
    </div>
  `).join('');

  if (completedExercises.length) {
    const n = new Date();
    saveCompletedSessionToHistory({
      title: st, date: `${String(n.getDate()).padStart(2,'0')}/${String(n.getMonth()+1).padStart(2,'0')}/${n.getFullYear()} ${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`,
      duration: sd, totalVolume: tv, exerciseCount: completedExercises.length, targetedMuscles: Array.from(targetedMuscles), exercises: completedExercises
    });
  }
  document.getElementById('recapModal').classList.add('open');
});

document.getElementById('btnResetSession').addEventListener('click', () => {
  document.getElementById('recapModal').classList.remove('open');
  completedExercises = []; targetedMuscles.clear(); renderBodySvg('dashBodyContainer', dashOrientation); renderCompletedList(); sessionStartTime = Date.now();
});

document.getElementById('btnOpenModal').addEventListener('click', () => { document.getElementById('newExName').value = ''; document.getElementById('newExModal').classList.add('open'); });
document.getElementById('btnCloseModal').addEventListener('click', () => document.getElementById('newExModal').classList.remove('open'));
document.getElementById('btnSaveCustomEx').addEventListener('click', () => {
  const n = document.getElementById('newExName').value.trim(), m = document.getElementById('newExMuscle').value, i = document.getElementById('newExIcon').value;
  if (!n) return;
  const nx = { name: n, muscle: m, icon: i, images: [], video: "", steps: ["Esegui con controllo."] };
  customExercises.push(nx); localStorage.setItem('my_gym_custom_exercises', JSON.stringify(customExercises));
  selectedExercise = nx; searchInput.value = n;
  document.getElementById('selectedExIcon').innerHTML = `<div class="w-5 h-5 stroke-purple-500">${ICONS[i]}</div>`;
  document.getElementById('selectedExName').innerText = n; document.getElementById('selectedExMuscle').innerText = getMuscleName(m);
  document.getElementById('selectedExPreview').classList.remove('hidden'); document.getElementById('selectedExPreview').classList.add('flex');
  document.getElementById('newExModal').classList.remove('open'); renderExploreList();
});

renderBodySvg('dashBodyContainer', 'front'); renderBodySvg('exploreBodyContainer', 'front', true);
loadOpenExerciseDatabase(); applyTranslations();

if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(()=>{})); }