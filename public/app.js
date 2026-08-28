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

const GITHUB_EXERCISES_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const GITHUB_IMAGE_BASE_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
const MAX_HISTORY_ITEMS = 30;

const FALLBACK_EXERCISES = [
  {
    name: "Panca Piana Bilanciere",
    muscle: "chest",
    icon: "barbell",
    images: [],
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
    images: [],
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-incline-bench-press-front.mp4",
    steps: [
      "Regola la panca tra 30° e 45° e porta i manubri all'altezza del petto.",
      "Mantieni il petto aperto e spingi i manubri verso l'alto senza farli toccare in cima.",
      "Scendi lentamente aprendo i gomiti a circa 45-60 gradi rispetto al busto."
    ]
  },
  {
    name: "Military Press",
    muscle: "shoulders",
    icon: "barbell",
    images: [],
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-overhead-press-front.mp4",
    steps: [
      "In piedi con il bilanciere poggiato sulle clavicole e i gomiti leggermente avanti.",
      "Contrai addome e glutei e spingi il bilanciere sopra la testa in linea retta.",
      "Blocca la posizione in cima e riporta il bilanciere al petto controllando il peso."
    ]
  },
  {
    name: "Trazioni alla Sbarra",
    muscle: "lats",
    icon: "bodyweight",
    images: [],
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-pullup-front.mp4",
    steps: [
      "Afferra la sbarra con presa prona a una larghezza leggermente superiore alle spalle.",
      "Attiva il dorso deprimendo le scapole e tira il corpo verso l'alto.",
      "Porta il mento oltre la sbarra e scendi fino a distendere completamente le braccia."
    ]
  },
  {
    name: "Curl Bicipiti con Manubri",
    muscle: "biceps",
    icon: "dumbbell",
    images: [],
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-curl-front.mp4",
    steps: [
      "Impugna i manubri con le braccia lungo i fianchi e i gomiti fermi vicino al tronco.",
      "Fletti i gomiti ruotando i palmi verso l'alto fino a contrarre al massimo i bicipiti.",
      "Abbassa i manubri lentamente tornando alla distensione completa."
    ]
  },
  {
    name: "Squat con Bilanciere",
    muscle: "quads",
    icon: "barbell",
    images: [],
    video: "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-squat-front.mp4",
    steps: [
      "Posiziona il bilanciere sui trapezi, piedi a larghezza spalle con punte leggermente aperte.",
      "Scendi piegando anche e ginocchia mantenendo la schiena dritta fino al parallelo.",
      "Spingi sui talloni e sull'avampiede per risalire in posizione eretta."
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
let currentFilteredExploreList = [];
let imageAnimationInterval = null;

let dashOrientation = 'front';
let exploreOrientation = 'front';
let recapOrientation = 'front';

let sessionStartTime = Date.now();
let restInterval = null;

function normalizeMuscleName(apiMuscle) {
  if (!apiMuscle) return "chest";
  const m = apiMuscle.toLowerCase().trim();
  
  if (m.includes("chest") || m.includes("pec") || m.includes("petto")) return "chest";
  if (m.includes("shoulder") || m.includes("delt") || m.includes("spall")) return "shoulders";
  if (m.includes("trap") || m.includes("middle back") || m.includes("neck") || m.includes("upper back") || m.includes("schiena alta")) return "upper_back";
  if (m.includes("lat") || m.includes("dors")) return "lats";
  if (m.includes("lower back") || m.includes("lomb") || m.includes("erector")) return "lower_back";
  if (m.includes("bicep") || m.includes("bicipit")) return "biceps";
  if (m.includes("tricep") || m.includes("tricipit")) return "triceps";
  if (m.includes("forearm") || m.includes("avambr") || m.includes("wrist")) return "forearms";
  if (m.includes("oblique") || m.includes("obliqu")) return "obliques";
  if (m.includes("ab") || m.includes("core") || m.includes("addom")) return "abs";
  if (m.includes("quad") || m.includes("quadricip") || m.includes("adductor") || m.includes("abductor")) return "quads";
  if (m.includes("hamstring") || m.includes("femoral") || m.includes("ischiocrur")) return "hamstrings";
  if (m.includes("glute")) return "glutes";
  if (m.includes("calf") || m.includes("calv") || m.includes("polpacc") || m.includes("soleus")) return "calves";
  
  return "chest";
}

function normalizeEquipment(equip) {
  if (!equip) return "barbell";
  const eq = equip.toLowerCase();
  if (eq.includes("barbell") || eq.includes("ez") || eq.includes("olympic")) return "barbell";
  if (eq.includes("dumbbell") || eq.includes("kettlebell")) return "dumbbell";
  if (eq.includes("body") || eq.includes("none") || eq.includes("other")) return "bodyweight";
  return "machine";
}

function getAllExercises() {
  return [...customExercises, ...(apiExercises.length ? apiExercises : FALLBACK_EXERCISES)];
}

async function loadOpenExerciseDatabase() {
  try {
    const cachedData = localStorage.getItem('my_gym_cached_exercises_v1');
    if (cachedData) {
      apiExercises = JSON.parse(cachedData);
      renderExploreList();
    }

    const res = await fetch(GITHUB_EXERCISES_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        apiExercises = data.map(item => {
          const muscleKey = item.primaryMuscles && item.primaryMuscles.length > 0
            ? normalizeMuscleName(item.primaryMuscles[0])
            : normalizeMuscleName(item.category || "");

          return {
            name: item.name,
            muscle: muscleKey,
            icon: normalizeEquipment(item.equipment),
            images: Array.isArray(item.images) ? item.images : [],
            video: "",
            steps: Array.isArray(item.instructions) && item.instructions.length > 0
              ? item.instructions
              : ["Esegui il movimento controllando la fase eccentrica e concentrica."]
          };
        });

        localStorage.setItem('my_gym_cached_exercises_v1', JSON.stringify(apiExercises));
        renderExploreList();
      }
    }
  } catch (err) {
    console.warn("Utilizzo database locale di fallback:", err);
    if (apiExercises.length === 0) apiExercises = FALLBACK_EXERCISES;
    renderExploreList();
  }
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

function setActiveNavTab(tabId, viewId, showBottomBar = false) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  document.getElementById(viewId).classList.add('active');
  document.getElementById('bottomBar').style.display = showBottomBar ? 'flex' : 'none';
}

document.getElementById('tabWorkoutBtn').addEventListener('click', () => {
  setActiveNavTab('tabWorkoutBtn', 'viewWorkout', true);
});

document.getElementById('tabExploreBtn').addEventListener('click', () => {
  setActiveNavTab('tabExploreBtn', 'viewExplore', false);
  renderExploreList();
});

document.getElementById('tabHistoryBtn').addEventListener('click', () => {
  setActiveNavTab('tabHistoryBtn', 'viewHistory', false);
  renderHistoryList();
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
    searchResults.innerHTML = matches.slice(0, 8).map((ex, index) => `
      <div class="search-item" data-index="${index}" data-name="${ex.name}">
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
    muscle: "chest",
    icon: "barbell"
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

  currentFilteredExploreList = all.filter(ex => {
    const matchesMuscle = (currentExploreMuscle === "all" || ex.muscle === currentExploreMuscle);
    const muscleLabel = (MUSCLE_NAMES[ex.muscle] || '').toLowerCase();
    const matchesQuery = !searchFilter || 
      ex.name.toLowerCase().includes(searchFilter) || 
      ex.muscle.toLowerCase().includes(searchFilter) ||
      muscleLabel.includes(searchFilter);
    return matchesMuscle && matchesQuery;
  });

  document.getElementById('exploreCountLabel').innerText = `Esercizi (${currentFilteredExploreList.length})`;

  if (currentFilteredExploreList.length === 0) {
    document.getElementById('exploreExerciseList').innerHTML = `
      <div style="text-align:center; padding: 24px 0; color: var(--text-muted); font-size: 0.85rem;">
        Nessun esercizio trovato per i filtri selezionati.
      </div>
    `;
    return;
  }

  document.getElementById('exploreExerciseList').innerHTML = currentFilteredExploreList.slice(0, 60).map((ex, index) => `
    <div class="exercise-item">
      <div class="ex-icon-box">${ICONS[ex.icon] || ICONS.barbell}</div>
      <div class="ex-details">
        <div class="ex-title">
          <span>${ex.name}</span>
          <span class="ex-badge">${MUSCLE_NAMES[ex.muscle] || ex.muscle}</span>
        </div>
      </div>
      <button class="btn-discover" data-index="${index}">Scopri esecuzione</button>
    </div>
  `).join('');
}

document.getElementById('exploreExerciseList').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-discover');
  if (!btn) return;
  const index = parseInt(btn.dataset.index, 10);
  const ex = currentFilteredExploreList[index];
  if (ex) openExerciseDetail(ex);
});

function openExerciseDetail(ex) {
  exerciseInDetail = ex;
  clearInterval(imageAnimationInterval);

  document.getElementById('detailExName').innerText = ex.name;
  document.getElementById('detailExMuscle').innerText = MUSCLE_NAMES[ex.muscle] || ex.muscle;
  document.getElementById('detailExEquip').innerText = ex.icon === 'barbell' ? 'Bilanciere' : ex.icon === 'dumbbell' ? 'Manubri' : ex.icon === 'bodyweight' ? 'Corpo Libero' : 'Macchinario';

  const videoEl = document.getElementById('detailVideo');
  const imgEl = document.getElementById('detailImg');
  const placeholderEl = document.getElementById('mediaPlaceholder');

  videoEl.pause();
  videoEl.removeAttribute('src');
  videoEl.style.display = 'none';
  imgEl.style.display = 'none';
  placeholderEl.style.display = 'none';

  if (Array.isArray(ex.images) && ex.images.length > 0) {
    imgEl.style.display = 'block';
    let currentFrame = 0;
    imgEl.src = GITHUB_IMAGE_BASE_URL + ex.images[0];

    if (ex.images.length > 1) {
      imageAnimationInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % ex.images.length;
        imgEl.src = GITHUB_IMAGE_BASE_URL + ex.images[currentFrame];
      }, 950);
    }
  } else if (ex.video && typeof ex.video === 'string' && ex.video.trim().length > 0) {
    videoEl.style.display = 'block';
    videoEl.src = ex.video.trim();
    videoEl.load();
    videoEl.play().catch(() => {});
  } else {
    placeholderEl.style.display = 'flex';
  }

  const stepsList = document.getElementById('detailStepsList');
  if (Array.isArray(ex.steps) && ex.steps.length > 0) {
    stepsList.innerHTML = ex.steps.map(step => `<li>${step}</li>`).join('');
  } else {
    stepsList.innerHTML = `<li>Esegui il movimento in modo controllato mantenendo una corretta postura.</li>`;
  }

  document.getElementById('detailModal').classList.add('open');
}

document.getElementById('btnCloseDetailModal').addEventListener('click', () => {
  clearInterval(imageAnimationInterval);
  const videoEl = document.getElementById('detailVideo');
  videoEl.pause();
  videoEl.removeAttribute('src');
  document.getElementById('detailModal').classList.remove('open');
});

document.getElementById('btnUseFromDetail').addEventListener('click', () => {
  if (!exerciseInDetail) return;
  clearInterval(imageAnimationInterval);
  selectedExercise = exerciseInDetail;
  searchInput.value = exerciseInDetail.name;

  document.getElementById('selectedExIcon').innerHTML = ICONS[exerciseInDetail.icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = exerciseInDetail.name;
  document.getElementById('selectedExMuscle').innerText = MUSCLE_NAMES[exerciseInDetail.muscle] || exerciseInDetail.muscle;
  document.getElementById('selectedExPreview').style.display = 'flex';

  const videoEl = document.getElementById('detailVideo');
  videoEl.pause();
  videoEl.removeAttribute('src');
  document.getElementById('detailModal').classList.remove('open');
  setActiveNavTab('tabWorkoutBtn', 'viewWorkout', true);
});

function saveCompletedSessionToHistory(sessionData) {
  try {
    let history = JSON.parse(localStorage.getItem('my_gym_history')) || [];
    history.unshift(sessionData);
    
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }
    
    localStorage.setItem('my_gym_history', JSON.stringify(history));
  } catch (err) {
    console.warn("Spazio storage limitato, pulizia automatica cronologia:", err);
    try {
      let history = JSON.parse(localStorage.getItem('my_gym_history')) || [];
      history = history.slice(0, 10);
      localStorage.setItem('my_gym_history', JSON.stringify(history));
    } catch (e) {}
  }
}

function renderHistoryList() {
  const listContainer = document.getElementById('historyList');
  const history = JSON.parse(localStorage.getItem('my_gym_history')) || [];
  
  document.getElementById('historyCountLabel').innerText = `${history.length} sessioni archiviate (max ${MAX_HISTORY_ITEMS})`;

  if (history.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align:center; padding: 36px 0; color: var(--text-muted); font-size: 0.85rem;">
        Nessun workout registrato finora.<br>Completa la tua prima sessione per visualizzarla qui!
      </div>
    `;
    return;
  }

  listContainer.innerHTML = history.map((session, index) => {
    const musclesList = Array.isArray(session.targetedMuscles) ? session.targetedMuscles : [];
    return `
      <div class="history-card">
        <div class="history-card-header">
          <div>
            <div class="history-title">${session.title}</div>
            <div class="history-date">${session.date}</div>
          </div>
          <button class="btn-del-single" onclick="deleteHistorySession(${index})" title="Elimina sessione">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>

        <div class="history-stats-row">
          <div>
            <div class="history-stat-val">${session.totalVolume.toLocaleString()} kg</div>
            <div class="history-stat-lbl">Volume</div>
          </div>
          <div>
            <div class="history-stat-val">${session.exerciseCount}</div>
            <div class="history-stat-lbl">Esercizi</div>
          </div>
          <div>
            <div class="history-stat-val">${session.duration}</div>
            <div class="history-stat-lbl">Tempo</div>
          </div>
        </div>

        ${musclesList.length > 0 ? `
          <div class="history-muscles-tags">
            ${musclesList.map(m => `<span class="history-muscle-tag">${MUSCLE_NAMES[m] || m}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

window.deleteHistorySession = function(index) {
  let history = JSON.parse(localStorage.getItem('my_gym_history')) || [];
  history.splice(index, 1);
  localStorage.setItem('my_gym_history', JSON.stringify(history));
  renderHistoryList();
};

document.getElementById('btnClearHistory').addEventListener('click', () => {
  if (confirm("Vuoi cancellare tutta la cronologia dei workout?")) {
    localStorage.removeItem('my_gym_history');
    renderHistoryList();
  }
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
  const sessionTitle = document.getElementById('customTitle').value || 'Workout';
  const sessionDuration = document.getElementById('sessionTimer').innerText;
  
  document.getElementById('recapSessionName').innerText = sessionTitle;
  document.getElementById('recapTotalWeight').innerText = `${totalVolume.toLocaleString()} kg`;
  document.getElementById('recapCount').innerText = completedExercises.length;
  document.getElementById('recapDuration').innerText = sessionDuration;

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

  if (completedExercises.length > 0) {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    saveCompletedSessionToHistory({
      title: sessionTitle,
      date: formattedDate,
      duration: sessionDuration,
      totalVolume: totalVolume,
      exerciseCount: completedExercises.length,
      targetedMuscles: Array.from(targetedMuscles),
      exercises: completedExercises.map(ex => ({
        name: ex.name,
        muscle: ex.muscle,
        iconKey: ex.iconKey,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight
      }))
    });
  }

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
    images: [],
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
loadOpenExerciseDatabase();