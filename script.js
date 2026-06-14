const saleTarget = new Date("2026-06-30T10:00:00+09:00");
const countdownDays = document.querySelector("#countdownDays");
const countdownHours = document.querySelector("#countdownHours");
const tabs = document.querySelectorAll("[data-day-filter]");
const dayCards = document.querySelectorAll("[data-day]");
const checkboxes = document.querySelectorAll("[data-check-item]");
const checkStorageKey = "setouchi-trip-checklist";

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, saleTarget.getTime() - now.getTime());
  const totalHours = Math.floor(diff / 1000 / 60 / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  countdownDays.textContent = String(days).padStart(2, "0");
  countdownHours.textContent = String(hours).padStart(2, "0");
}

function setDayFilter(filter) {
  dayCards.forEach((card) => {
    card.classList.toggle("is-hidden", filter !== "all" && card.dataset.day !== filter);
  });
  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.dayFilter === filter);
  });
}

function readChecklist() {
  try {
    return JSON.parse(localStorage.getItem(checkStorageKey) || "{}");
  } catch {
    return {};
  }
}

function writeChecklist(values) {
  localStorage.setItem(checkStorageKey, JSON.stringify(values));
}

function initChecklist() {
  const saved = readChecklist();
  checkboxes.forEach((checkbox) => {
    checkbox.checked = Boolean(saved[checkbox.dataset.checkItem]);
    checkbox.addEventListener("change", () => {
      const next = readChecklist();
      next[checkbox.dataset.checkItem] = checkbox.checked;
      writeChecklist(next);
    });
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setDayFilter(tab.dataset.dayFilter);
  });
});

updateCountdown();
window.setInterval(updateCountdown, 60 * 1000);
initChecklist();
