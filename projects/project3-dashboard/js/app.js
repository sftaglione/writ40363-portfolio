// ==========================================
// PROJECT 3: PERSONAL DATA DASHBOARD
// LAB16: fetch() and JSON Basics
// ==========================================

console.log('Dashboard app loaded!');
console.log('LAB16: Learning fetch() API');

// Function to load weather data
function loadWeather() {
    console.log('🌤️ Loading weather data...');

    fetch('./data/weather.json')
        .then(response => {
            console.log('✅ Got response:', response);
            return response.json();
        })
        .then(data => {
            console.log('✅ Weather data loaded:', data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('❌ Error loading weather:', error);
            displayWeatherError();
        });

        fetch('./data/weather.json')
    .then(response => {
        console.log('1. Got response:', response);
        console.log('2. Response OK?', response.ok);
        return response.json();
    })
    .then(data => {
        console.log('3. Converted to JavaScript:', data);
        console.log('4. Temperature:', data.temperature);
        displayWeather(data);
    });
}

// Function to display weather data in the DOM
function displayWeather(weather) {
    console.log('📊 Displaying weather data...');

    const weatherDisplay = document.getElementById('weather-display');

    weatherDisplay.innerHTML = `
        <div class="weather-current">
            <div class="weather-icon">${weather.icon}</div>
            <div class="weather-temp">${weather.temperature}°F</div>
            <div class="weather-location">${weather.location}</div>
            <div class="weather-condition">${weather.condition}</div>
        </div>
        <div class="weather-details">
            <div class="weather-detail">
                <span>💧 Humidity</span>
                <strong>${weather.humidity}%</strong>
            </div>
            <div class="weather-detail">
                <span>💨 Wind Speed</span>
                <strong>${weather.windSpeed} mph</strong>
            </div>
            <div class="weather-detail">
                <span>🌡️ Feels Like</span>
                <strong>${weather.feelsLike}°F</strong>
            </div>
             </div>
    `;

    console.log('✅ Weather displayed successfully!');
}

// Function to show error message if weather data fails to load
function displayWeatherError() {
    const weatherDisplay = document.getElementById('weather-display');

    weatherDisplay.innerHTML = `
        <div class="error-message">
            <div class="error-icon">⚠️</div>
            <p>Could not load weather data</p>
            <p class="error-hint">Check console for details</p>
        </div>
    `;
}

// Load weather data when page loads
loadWeather();

// Global variable to store all quotes
let allQuotes = [];
let currentQuoteIndex = -1; // Track current quote to avoid repeats

// Function to load quotes from JSON
function loadQuotes() {
  console.log('Loading quotes...');

  fetch('data/quotes.json')
    .then(response => {
      console.log('Got quotes response:', response);
      return response.json();
    })
    .then(data => {
      console.log('Quotes data:', data);
      allQuotes = data; // Store quotes in global variable
      displayRandomQuote(); // Show first quote
    })
    .catch(error => {
      console.error('Error loading quotes:', error);
      displayQuotesError();
    });
}

// Function to display a random quote
function displayRandomQuote() {
  // Make sure we have quotes loaded
  if (allQuotes.length === 0) {
    console.error('No quotes available');
    return;
  }

  // Get random index (different from current)
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * allQuotes.length);
  } while (randomIndex === currentQuoteIndex && allQuotes.length > 1);

  currentQuoteIndex = randomIndex;
  const quote = allQuotes[randomIndex];

  // Display the quote
  const quotesDisplay = document.getElementById('quotes-display');
  quotesDisplay.innerHTML = `
    <div class="quote-card">
      <div class="quote-text">"${quote.text}"</div>
      <div class="quote-author">— ${quote.author}</div>
    </div>
  `;

  console.log('Displayed quote:', quote);
}

// Function to show error message
function displayQuotesError() {
  const quotesDisplay = document.getElementById('quotes-display');
  quotesDisplay.innerHTML = `
    <div class="error-message">
      ⚠️ Could not load quotes
    </div>
  `;
}

// Call loadQuotes when page loads
loadQuotes();

// Set up "New Quote" button
function setupQuotesButton() {
  const newQuoteBtn = document.getElementById('new-quote-btn');

  newQuoteBtn.addEventListener('click', () => {
    console.log('New quote button clicked!');
    displayRandomQuote();
  });
}

// Call setupQuotesButton after DOM is loaded
setupQuotesButton();

// ========================================
// COPY QUOTE TO CLIPBOARD (Enhancement)
// ========================================

function setupCopyQuoteButton() {
  const copyBtn = document.getElementById("copy-quote-btn");

  if (!copyBtn) {
    console.log("Copy Quote button not found");
    return;
  }

  copyBtn.addEventListener("click", () => {
    console.log("Copy Quote clicked!");

    const quoteTextEl = document.querySelector(".quote-text");
    const quoteAuthorEl = document.querySelector(".quote-author");

    if (!quoteTextEl) {
      alert("No quote to copy yet!");
      return;
    }

    const quoteText = quoteTextEl.textContent.trim();
    const quoteAuthor = quoteAuthorEl
      ? quoteAuthorEl.textContent.trim()
      : "";

    const fullQuote = quoteAuthor
      ? `${quoteText}\n${quoteAuthor}`
      : quoteText;

    navigator.clipboard
      .writeText(fullQuote)
      .then(() => {
        alert("Quote copied to clipboard!");
      })
      .catch((err) => {
        console.error("Clipboard error:", err);
        alert("Sorry, unable to copy quote.");
      });
  });
}

// Initialize Copy Quote button
setupCopyQuoteButton();

// Call setupQuotesButton after DOM is loaded
setupQuotesButton();


// ========================================
// COPY QUOTE TO CLIPBOARD (Enhancement)
// ========================================

function setupCopyQuoteButton() {
  const copyBtn = document.getElementById("copy-quote-btn");

  if (!copyBtn) {
    console.log("Copy Quote button not found");
    return;
  }

  copyBtn.addEventListener("click", () => {
    console.log("Copy Quote clicked!");

    const quoteTextEl = document.querySelector(".quote-text");
    const quoteAuthorEl = document.querySelector(".quote-author");

    if (!quoteTextEl) {
      alert("No quote to copy yet!");
      return;
    }

    const quoteText = quoteTextEl.textContent.trim();
    const quoteAuthor = quoteAuthorEl ? quoteAuthorEl.textContent.trim() : "";

    const fullQuote = quoteAuthor
      ? `${quoteText}\n${quoteAuthor}`
      : quoteText;

    navigator.clipboard.writeText(fullQuote)
      .then(() => {
        alert("Quote copied to clipboard!");
      })
      .catch((err) => {
        console.error("Clipboard error:", err);
        alert("Sorry, unable to copy quote.");
      });
  });
}


// Initialize Copy Quote button
setupCopyQuoteButton();

// ========================================
// TASKS WIDGET (from LAB18)
// ========================================

// Load tasks from localStorage
function loadTasks() {
  const tasksJSON = localStorage.getItem("dashboardTasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Save to localStorage
function saveTasks(tasks) {
  localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
  const tasks = loadTasks();
  const tasksList = document.getElementById("tasks-list");

  if (tasks.length === 0) {
    tasksList.innerHTML = `<div class="no-tasks">No tasks yet. Add one above! ✨</div>`;
    updateTaskStats(tasks);
    return;
  }

  tasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

    // --- Top Row: checkbox + text + delete button ---
    const topRow = document.createElement("div");
    topRow.className = "task-top-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    topRow.appendChild(checkbox);
    topRow.appendChild(taskText);
    topRow.appendChild(deleteBtn);

    taskItem.appendChild(topRow);

    // --- Metadata Row: category + due date ---
    const metaRow = document.createElement("div");
    metaRow.className = "task-meta";

    if (task.category) {
      const cat = document.createElement("span");
      cat.className = "task-category";
      cat.textContent = `Category: ${task.category}`;
      metaRow.appendChild(cat);
    }

    // Add meta info (category + due date)
if (task.category || task.dueDate) {
  const meta = document.createElement("div");
  meta.className = "task-meta";

  if (task.category) {
    const cat = document.createElement("span");
    cat.textContent = `Category: ${task.category}`;
    meta.appendChild(cat);
  }

  if (task.dueDate) {
    const due = document.createElement("span");
    due.textContent = `Due: ${task.dueDate}`;
    meta.appendChild(due);
  }

  taskItem.appendChild(meta);
}

    tasksList.appendChild(taskItem);
  });

  updateTaskStats(tasks);
}

// Add task
function addTask(text, category, dueDate) {
  const tasks = loadTasks();

  const newTask = {
    text,
    completed: false,
    category,
    dueDate,
    id: Date.now(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  displayTasks();
}

// Handle form submission
function setupTaskForm() {
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");
  const category = document.getElementById("task-category");
  const date = document.getElementById("task-date");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const textValue = input.value.trim();
    if (!textValue) return;

    addTask(textValue, category.value, date.value);

    input.value = "";
    date.value = "";
    category.value = "personal";
  });
}

// Toggle complete
function toggleTask(index) {
  const tasks = loadTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  displayTasks();
}

// Delete task
function deleteTask(index) {
  const tasks = loadTasks();
  if (confirm(`Delete task: "${tasks[index].text}"?`)) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
  }
}

// Stats
function updateTaskStats(tasks) {
  const statsDiv = document.getElementById("task-stats");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  statsDiv.innerHTML = `
    <div class="stat">Total: <strong>${total}</strong></div>
    <div class="stat">Completed: <strong>${completed}</strong></div>
    <div class="stat">Pending: <strong>${pending}</strong></div>
    <div class="stat">Progress: <strong>${percent}%</strong></div>
  `;
}

// Call these when page loads initializeTheme();
displayTasks();
setupTaskForm();

// ========================================
// PERSONALIZED WELCOME MESSAGE (Enhancement)
// ========================================

function updateWelcomeMessage(name) {
  const subtitle = document.querySelector(".dashboard-subtitle");
  if (!subtitle) return;

  if (name && name.trim() !== "") {
    subtitle.textContent = `Welcome back, ${name}! Here's your day at a glance.`;
  } else {
    subtitle.textContent = `Welcome back! Here's your day at a glance.`;
  }
}

function loadUserName() {
  const savedName = localStorage.getItem("dashboardUserName");
  updateWelcomeMessage(savedName);
}

function changeUserName() {
  const currentName = localStorage.getItem("dashboardUserName") || "";
  const newName = prompt("What name should I use for your dashboard?", currentName);

  // If user clicks Cancel, do nothing
  if (newName === null) return;

  const trimmed = newName.trim();

  // Save name (or clear if empty)
  if (trimmed) {
    localStorage.setItem("dashboardUserName", trimmed);
  } else {
    localStorage.removeItem("dashboardUserName");
  }

  updateWelcomeMessage(trimmed);
}

function setupNameButton() {
  const nameBtn = document.getElementById("change-name-btn");
  if (!nameBtn) return;

  nameBtn.addEventListener("click", () => {
    console.log("Change Name clicked");
    changeUserName();
  });
}

// Theme Management
function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('dashboardTheme');

  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
    updateThemeIcon('dark');
  } else {
    updateThemeIcon('light');
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('theme-dark');

  // Save preference
  localStorage.setItem('dashboardTheme', isDark ? 'dark' : 'light');

  // Update icon
  updateThemeIcon(isDark ? 'dark' : 'light');

  console.log('Theme switched to:', isDark ? 'dark' : 'light');
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');

  if (theme === 'dark') {
    themeIcon.textContent = '☀️'; // Sun for dark mode (to switch to light)
  } else {
    themeIcon.textContent = '🌙'; // Moon for light mode (to switch to dark)
  }
}

function setupThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
}

// Call these when page loads
initializeTheme();
setupThemeToggle();
loadUserName();
setupNameButton();
