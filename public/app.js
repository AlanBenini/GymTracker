const ICONS = {
  barbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 18v-4h16v4M2 14h20M9 6h6v4H9z"/></svg>`,
  dumbbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>`,
  machine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>`,
  bodyweight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="2"/><path d="M7 21l3-7 2 3 2-3 3 7M9 11h6"/></svg>`
};

// Fallback locale in caso di assenza di rete o quota API
const FALLBACK_EXERCISES = [
  { name: "Panca Piana Bilanciere", muscle: "chest", icon: "barbell" },
  { name: "Spinte con Manubri", muscle: "chest", icon: "dumbbell" },
  { name: "Trazioni alla Sbarra", muscle: "back", icon: "bodyweight" },
  { name: "Lat Machine", muscle: "back", icon: "machine" },
  { name: "Military Press", muscle: "shoulders", icon: "barbell" },
  { name: "Alzate Laterali", muscle: "shoulders", icon: "dumbbell" },
  { name: "Squat con Bilanciere", muscle: "legs", icon: "barbell" },
  { name: "Leg Press", muscle: "legs", icon: "machine" },
  { name: "Curl Bicipiti", muscle: "arms", icon: "dumbbell" },
  { name: "Pushdown Tricipiti", muscle: "arms", icon: "machine" },
  { name: "Crunch Addominali", muscle: "abs", icon: "bodyweight" }
];

let apiExercises = [];
let customExercises = JSON.parse(localStorage.getItem('my_gym_custom_exercises')) || [];
let completedExercises = [];
let targetedMuscles = new Set();
let sessionStartTime = Date.now();
let restInterval = null;

function normalizeMuscleName(apiMuscle) {
  if (!apiMuscle) return "chest";
  const m = apiMuscle.toLowerCase();
  if (m.includes("chest") || m.includes("pec")) return "chest";
  if (m.includes("back") || m.includes("lat") || m.includes("trap")) return "back";
  if (m.includes("shoulder") || m.includes("delt")) return "shoulders";
  if (m.includes("quad") || m.includes("hamstring") || m.includes("calv") || m.includes("glute") || m.includes("leg")) return "legs";
  if (m.includes("bicep") || m.includes("tricep") || m.includes("arm") || m.includes("forearm")) return "arms";
  if (m.includes("ab") || m.includes("core")) return "abs";
  return "chest";
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
      } else {
        apiExercises = FALLBACK_EXERCISES;
      }
    } else {
      apiExercises = FALLBACK_EXERCISES;
    }
  } catch (err) {
    apiExercises = FALLBACK_EXERCISES;
  }
  populateDropdown();
}

function populateDropdown(selectedName = null) {
  const select = document.getElementById('exerciseSelect');
  select.innerHTML = '';

  const all = [...customExercises, ...apiExercises];
  const categories = {
    chest: "Petto",
    back: "Dorso",
    shoulders: "Spalle",
    legs: "Gambe",
    arms: "Braccia",
    abs: "Addome"
  };

  for (const [catKey, catLabel] of Object.entries(categories)) {
    const groupItems = all.filter(item => item.muscle === catKey);
    if (groupItems.length > 0) {
      const optGroup = document.createElement('optgroup');
      optGroup.label = catLabel;
      
      groupItems.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.name;
        opt.innerText = item.name;
        opt.dataset.muscle = item.muscle;
        opt.dataset.icon = item.icon || "barbell";
        if (selectedName && item.name === selectedName) opt.selected = true;
        optGroup.appendChild(opt);
      });
      select.appendChild(optGroup);
    }
  }
}

// Timer Sessione
setInterval(() => {
  const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
  const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const s = String(elapsed % 60).padStart(2, '0');
  document.getElementById('sessionTimer').innerText = `${m}:${s}`;
}, 1000);

// Timer Pausa
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

// Aggiungi Esercizio
function addExercise() {
  const select = document.getElementById('exerciseSelect');
  if (!select.options.length) return;
  
  const option = select.options[select.selectedIndex];
  const muscle = option.dataset.muscle;
  const name = option.value;
  const iconKey = option.dataset.icon || 'barbell';

  const sets = parseInt(document.getElementById('sets').value) || 1;
  const reps = parseInt(document.getElementById('reps').value) || 1;
  const weight = parseFloat(document.getElementById('weight').value) || 0;

  const item = { name, muscle, iconKey, sets, reps, weight };
  completedExercises.push(item);
  targetedMuscles.add(muscle);

  highlightMuscles();
  renderList();
  startRestTimer(90);
}

function highlightMuscles() {
  document.querySelectorAll('#liveBodyMap .muscle').forEach(el => {
    if (targetedMuscles.has(el.dataset.muscle)) {
      el.classList.add('active');
    }
  });
}

function renderList() {
  const container = document.getElementById('exerciseList');
  container.innerHTML = completedExercises.map((ex) => `
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

// Modal Recap Finale
function showRecap() {
  const totalVolume = completedExercises.reduce((acc, curr) => acc + (curr.sets * curr.reps * curr.weight), 0);
  const titleValue = document.getElementById('customTitle').value || 'Workout';
  
  document.getElementById('recapSessionName').innerText = titleValue;
  document.getElementById('recapTotalWeight').innerText = `${totalVolume.toLocaleString()} kg`;
  document.getElementById('recapCount').innerText = completedExercises.length;
  document.getElementById('recapDuration').innerText = document.getElementById('sessionTimer').innerText;

  document.getElementById('recapBodyMap').innerHTML = document.getElementById('liveBodyMap').innerHTML;

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
}

function closeRecapAndReset() {
  document.getElementById('recapModal').classList.remove('open');
  completedExercises = [];
  targetedMuscles.clear();
  document.querySelectorAll('.muscle').forEach(el => el.classList.remove('active'));
  renderList();
  sessionStartTime = Date.now();
}

// Event Listeners
document.getElementById('btnRest60').addEventListener('click', () => startRestTimer(60));
document.getElementById('btnRest90').addEventListener('click', () => startRestTimer(90));
document.getElementById('btnRestStop').addEventListener('click', stopRestTimer);
document.getElementById('btnAddExercise').addEventListener('click', addExercise);
document.getElementById('btnShowRecap').addEventListener('click', showRecap);
document.getElementById('btnResetSession').addEventListener('click', closeRecapAndReset);

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
  customExercises.push({ name, muscle, icon });
  localStorage.setItem('my_gym_custom_exercises', JSON.stringify(customExercises));
  populateDropdown(name);
  document.getElementById('newExModal').classList.remove('open');
});

fetchMuscleWikiExercises();