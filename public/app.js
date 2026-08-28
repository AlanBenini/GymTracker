const ICONS = {
  barbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 18v-4h16v4M2 14h20M9 6h6v4H9z"/></svg>`,
  dumbbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>`,
  machine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>`,
  bodyweight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="2"/><path d="M7 21l3-7 2 3 2-3 3 7M9 11h6"/></svg>`
};

const BODY_SVGS = {
  front: `
    <svg class="body-svg" viewBox="0 0 100 140">
      <circle cx="50" cy="12" r="7" fill="#222834" />
      <path class="muscle" data-muscle="chest" d="M40,25 C45,23 55,23 60,25 C62,35 38,35 40,25 Z" />
      <path class="muscle" data-muscle="abs" d="M43,37 C43,37 57,37 57,37 C56,52 44,52 43,37 Z" />
      <circle class="muscle" data-muscle="shoulders" cx="33" cy="26" r="4.5" />
      <circle class="muscle" data-muscle="shoulders" cx="67" cy="26" r="4.5" />
      <rect class="muscle" data-muscle="arms" x="28" y="32" width="6" height="18" rx="3" />
      <rect class="muscle" data-muscle="arms" x="66" y="32" width="6" height="18" rx="3" />
      <rect class="muscle" data-muscle="legs" x="40" y="56" width="8" height="34" rx="4" />
      <rect class="muscle" data-muscle="legs" x="52" y="56" width="8" height="34" rx="4" />
      <rect class="muscle" data-muscle="legs" x="41" y="93" width="6" height="25" rx="3" />
      <rect class="muscle" data-muscle="legs" x="53" y="93" width="6" height="25" rx="3" />
    </svg>
  `,
  back: `
    <svg class="body-svg" viewBox="0 0 100 140">
      <circle cx="50" cy="12" r="7" fill="#222834" />
      <path class="muscle" data-muscle="back" d="M40,23 L50,28 L60,23 L58,35 L42,35 Z" />
      <path class="muscle" data-muscle="back" d="M38,36 L62,36 L57,53 L43,53 Z" />
      <circle class="muscle" data-muscle="shoulders" cx="33" cy="26" r="4.5" />
      <circle class="muscle" data-muscle="shoulders" cx="67" cy="26" r="4.5" />
      <rect class="muscle" data-muscle="arms" x="28" y="32" width="6" height="18" rx="3" />
      <rect class="muscle" data-muscle="arms" x="66" y="32" width="6" height="18" rx="3" />
      <rect class="muscle" data-muscle="legs" x="40" y="56" width="8" height="34" rx="4" />
      <rect class="muscle" data-muscle="legs" x="52" y="56" width="8" height="34" rx="4" />
      <rect class="muscle" data-muscle="legs" x="41" y="93" width="6" height="25" rx="3" />
      <rect class="muscle" data-muscle="legs" x="53" y="93" width="6" height="25" rx="3" />
    </svg>
  `
};

const FALLBACK_EXERCISES = [
  { name: "Panca Piana Bilanciere", muscle: "chest", icon: "barbell" },
  { name: "Spinte Manubri Inclinata", muscle: "chest", icon: "dumbbell" },
  { name: "Croci ai Cavi", muscle: "chest", icon: "machine" },
  { name: "Trazioni alla Sbarra", muscle: "back", icon: "bodyweight" },
  { name: "Lat Machine", muscle: "back", icon: "machine" },
  { name: "Rematore con Bilanciere", muscle: "back", icon: "barbell" },
  { name: "Military Press", muscle: "shoulders", icon: "barbell" },
  { name: "Alzate Laterali Manubri", muscle: "shoulders", icon: "dumbbell" },
  { name: "Squat con Bilanciere", muscle: "legs", icon: "barbell" },
  { name: "Leg Press 45°", muscle: "legs", icon: "machine" },
  { name: "Leg Curl Femorali", muscle: "legs", icon: "machine" },
  { name: "Curl Bicipiti Manubri", muscle: "arms", icon: "dumbbell" },
  { name: "Pushdown Tricipiti", muscle: "arms", icon: "machine" },
  { name: "Crunch Addominali", muscle: "abs", icon: "bodyweight" },
  { name: "Plank", muscle: "abs", icon: "bodyweight" }
];

let apiExercises = [];
let customExercises = JSON.parse(localStorage.getItem('my_gym_custom_exercises')) || [];
let completedExercises = [];
let targetedMuscles = new Set();

let selectedExercise = null;
let currentExploreMuscle = "all";

let dashOrientation = 'front';
let exploreOrientation = 'front';
let recapOrientation = 'front';

let sessionStartTime = Date.now();
let restInterval = null;

function normalizeMuscleName(apiMuscle) {
  if (!apiMuscle) return "chest";
  const m = apiMuscle.toLowerCase();
  if (m.includes("chest") || m.includes("pec")) return "chest";
  if (m.includes("back") || m.includes("lat") || m.includes("trap")) return "back";
  if (m.includes("shoulder") || m.includes("delt")) return "shoulders";
  if (m.includes("quad") || m.includes("hamstring") || m.includes("calv") || m.includes("glute") || m.includes("leg")) return "legs";
  if (m.includes("bicep") || m.includes("tricep") || m.includes("arm")) return "arms";
  if (m.includes("ab") || m.includes("core")) return "abs";
  return "chest";
}

function getAllExercises() {
  return [...customExercises, ...(apiExercises.length ? apiExercises : FALLBACK_EXERCISES)];
}

async function fetchMuscleWikiExercises() {
  try {
    const res = await fetch('/api/exercises');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        apiExercises = data.map(item => ({
          name: item.name || item.title,
          muscle: normalizeMuscleName(item.target_muscle || item.category),
          icon: item.equipment === "barbell" ? "barbell" : item.equipment === "dumbbell" ? "dumbbell" : "machine"
        }));
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
        <span class="ex-badge">${ex.muscle}</span>
      </div>
    `).join('');
  }
  searchResults.classList.add('open');
});

searchResults.addEventListener('click', (e) => {
  const item = e.target.closest('.search-item');
  if (!item) return;

  selectedExercise = {
    name: item.dataset.name,
    muscle: item.dataset.muscle,
    icon: item.dataset.icon
  };

  searchInput.value = selectedExercise.name;
  searchResults.classList.remove('open');

  document.getElementById('selectedExIcon').innerHTML = ICONS[selectedExercise.icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = selectedExercise.name;
  document.getElementById('selectedExMuscle').innerText = selectedExercise.muscle;
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
          <span class="ex-badge">${ex.muscle}</span>
        </div>
        <div class="ex-meta">${ex.sets} set × ${ex.reps} reps • ${ex.weight} kg</div>
      </div>
    </div>
  `).join('');
}

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
  const filtered = currentExploreMuscle === "all" 
    ? all 
    : all.filter(ex => ex.muscle === currentExploreMuscle);

  document.getElementById('exploreCountLabel').innerText = `Esercizi (${filtered.length})`;

  document.getElementById('exploreExerciseList').innerHTML = filtered.map(ex => `
    <div class="exercise-item">
      <div class="ex-icon-box">${ICONS[ex.icon] || ICONS.barbell}</div>
      <div class="ex-details">
        <div class="ex-title">
          <span>${ex.name}</span>
          <span class="ex-badge">${ex.muscle}</span>
        </div>
      </div>
      <button class="btn-add-quick" onclick="pickFromExplore('${encodeURIComponent(JSON.stringify(ex))}')">+ Usa</button>
    </div>
  `).join('');
}

window.pickFromExplore = function(encodedEx) {
  const ex = JSON.parse(decodeURIComponent(encodedEx));
  selectedExercise = ex;
  searchInput.value = ex.name;

  document.getElementById('selectedExIcon').innerHTML = ICONS[ex.icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = ex.name;
  document.getElementById('selectedExMuscle').innerText = ex.muscle;
  document.getElementById('selectedExPreview').style.display = 'flex';

  document.getElementById('tabWorkoutBtn').click();
};

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

  const newEx = { name, muscle, icon };
  customExercises.push(newEx);
  localStorage.setItem('my_gym_custom_exercises', JSON.stringify(customExercises));
  
  selectedExercise = newEx;
  searchInput.value = name;
  document.getElementById('selectedExIcon').innerHTML = ICONS[icon] || ICONS.barbell;
  document.getElementById('selectedExName').innerText = name;
  document.getElementById('selectedExMuscle').innerText = muscle;
  document.getElementById('selectedExPreview').style.display = 'flex';

  document.getElementById('newExModal').classList.remove('open');
  renderExploreList();
});

renderBodySvg('dashBodyContainer', 'front');
renderBodySvg('exploreBodyContainer', 'front', true);
fetchMuscleWikiExercises();