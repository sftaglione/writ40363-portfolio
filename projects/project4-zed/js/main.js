console.log("JS Loaded!");

// ---------- STATE ----------
let options = [];
let history = [];
let historyChart = null; // Chart.js instance

// ---------- ELEMENTS ----------
const form = document.getElementById("option-form");
const optionText = document.getElementById("option-text");
const optionCategory = document.getElementById("option-category");
const errorMessage = document.getElementById("error-message");
const optionsContainer = document.getElementById("options-container");
const pickBtn = document.getElementById("pick-btn");
const result = document.getElementById("result");
const historyContainer = document.getElementById("history-container");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const clearOptionsBtn = document.getElementById("clear-options-btn");
const statsSummary = document.getElementById("stats-summary");
const historyChartCanvas = document.getElementById("history-chart");

// ---------- LOCAL STORAGE HELPERS ----------
const STORAGE_KEYS = {
  OPTIONS: "idkYouPick_options",
  HISTORY: "idkYouPick_history",
};

function saveToStorage() {
  localStorage.setItem(STORAGE_KEYS.OPTIONS, JSON.stringify(options));
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

function loadFromStorage() {
  const storedOptions = localStorage.getItem(STORAGE_KEYS.OPTIONS);
  const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);

  if (storedOptions) {
    options = JSON.parse(storedOptions);
  }
  if (storedHistory) {
    history = JSON.parse(storedHistory);
  }

  renderOptions();
  renderHistory();
  updateStatsAndChart();
}

// ---------- OPTION FORM SUBMIT ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = optionText.value.trim();
  const category = optionCategory.value;

  if (!text || !category) {
    errorMessage.textContent = "Please enter an option and choose a category.";
    return;
  }

  errorMessage.textContent = "";

  const newOption = { id: Date.now(), text, category };
  options.push(newOption);
  saveToStorage();
  renderOptions();

  optionText.value = "";
  optionCategory.value = "";
});

// ---------- RENDER OPTIONS ----------
function renderOptions() {
  optionsContainer.innerHTML = "";

  if (options.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No options yet. Add a few above!";
    optionsContainer.appendChild(empty);
    return;
  }

  options.forEach((opt) => {
    const li = document.createElement("li");
    li.dataset.id = opt.id;
    li.innerHTML = `
      <span>${opt.text} <small>(${opt.category})</small></span>
      <button class="delete-option secondary-btn">Remove</button>
    `;
    optionsContainer.appendChild(li);
  });
}

// ---------- DELETE OPTION (EVENT DELEGATION) ----------
optionsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-option")) {
    const li = event.target.closest("li");
    const id = Number(li.dataset.id);
    options = options.filter((opt) => opt.id !== id);
    saveToStorage();
    renderOptions();
  }
});

// ---------- PICK RANDOM OPTION ----------
pickBtn.addEventListener("click", () => {
  if (options.length === 0) {
    result.textContent = "Add some options first!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * options.length);
  const selection = options[randomIndex];

  // little “animation” reset
  result.classList.remove("bounce");
  void result.offsetWidth; // forces reflow so animation can replay
  result.classList.add("bounce");

  result.textContent = `You should choose: ${selection.text} 🎉`;

  const entry = {
    id: Date.now(),
    text: selection.text,
    category: selection.category,
    pickedAt: new Date().toLocaleString(),
  };

  history.push(entry);
  saveToStorage();
  renderHistory();
  updateStatsAndChart();
});

// ---------- RENDER HISTORY ----------
function renderHistory() {
  historyContainer.innerHTML = "";

  if (history.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No past picks yet.";
    historyContainer.appendChild(empty);
    return;
  }

  history.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    li.innerHTML = `
      <span>${item.text} — ${item.category}</span>
      <small>${item.pickedAt}</small>
    `;
    historyContainer.appendChild(li);
  });
}

// ---------- CLEAR BUTTONS ----------
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  saveToStorage();
  renderHistory();
  updateStatsAndChart();
});

clearOptionsBtn.addEventListener("click", () => {
  options = [];
  saveToStorage();
  renderOptions();
});

// ---------- STATS + CHART ----------
function updateStatsAndChart() {
  if (history.length === 0) {
    statsSummary.textContent = "No picks yet. Start deciding!";
    if (historyChart) {
      historyChart.destroy();
      historyChart = null;
    }
    return;
  }

  // Count picks per category
  const counts = {};
  history.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });

  const categories = Object.keys(counts);
  const values = Object.values(counts);

  // Text summary
  const total = history.length;
  statsSummary.textContent = `You've made ${total} decision${
    total === 1 ? "" : "s"
  }. Top category: ${
    categories[values.indexOf(Math.max(...values))]
  }`;

  // Chart.js bar chart
  if (historyChart) {
    historyChart.destroy();
  }

  historyChart = new Chart(historyChartCanvas, {
    type: "bar",
    data: {
      labels: categories,
      datasets: [
  {
    label: "Picks per category",
    data: values,
    backgroundColor: "#ae00ff",     // bar fill color
    borderColor: "#ff2997",         // bar outline
    borderWidth: 2,
    hoverBackgroundColor: "#e3b4ff" // hover color
  },
],

    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  });
}

// ---------- SIMPLE RESULT ANIMATION CLASS ----------
const style = document.createElement("style");
style.textContent = `
  #result.bounce {
    animation: bounceIn 0.4s ease;
  }

  @keyframes bounceIn {
    0% { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// ---------- INIT ----------
loadFromStorage();