const form = document.querySelector("#question-form");
const question = document.querySelector("#question");
const status = document.querySelector("#composer-status");
const priceCards = [...document.querySelectorAll(".price-card")];

const placeholderPrompts = [
  "Could Mars sustain life?",
  "Which AI can you trust?",
  "What will AI change?",
];
let promptIndex = 0;
let placeholderIndex = 0;
let deletingPlaceholder = false;
let placeholderTimer;

const stopPlaceholderAnimation = () => {
  window.clearTimeout(placeholderTimer);
  question.placeholder = placeholderPrompts[promptIndex];
};

const startPlaceholderAnimation = () => {
  stopPlaceholderAnimation();
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    question.value
  ) {
    question.placeholder = placeholderPrompts[promptIndex];
    return;
  }

  const initialPrompt = placeholderPrompts[promptIndex];
  placeholderIndex = initialPrompt.length;
  deletingPlaceholder = true;
  question.placeholder = initialPrompt;
  const animatePlaceholder = () => {
    if (question.value || document.activeElement === question) {
      stopPlaceholderAnimation();
      return;
    }

    const prompt = placeholderPrompts[promptIndex];
    if (deletingPlaceholder) {
      placeholderIndex -= 1;
    } else {
      placeholderIndex += 1;
    }

    question.placeholder = prompt.slice(0, placeholderIndex);

    if (!deletingPlaceholder && placeholderIndex >= prompt.length) {
      deletingPlaceholder = true;
      placeholderTimer = window.setTimeout(animatePlaceholder, 1800);
      return;
    }

    if (deletingPlaceholder && placeholderIndex <= 0) {
      deletingPlaceholder = false;
      promptIndex = (promptIndex + 1) % placeholderPrompts.length;
    }

    placeholderTimer = window.setTimeout(
      animatePlaceholder,
      deletingPlaceholder ? 48 : 88,
    );
  };

  placeholderTimer = window.setTimeout(animatePlaceholder, 4200);
};

question.addEventListener("focus", stopPlaceholderAnimation);
question.addEventListener("input", stopPlaceholderAnimation);
question.addEventListener("blur", () => {
  if (!question.value) startPlaceholderAnimation();
});
startPlaceholderAnimation();

priceCards.forEach((card) => {
  const action = card.querySelector("a");
  action.addEventListener("click", (event) => {
    event.preventDefault();
    priceCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    card.setAttribute("aria-selected", "true");
  });
});

const modeToggle = document.querySelector("#mode-toggle");
const modeLabel = document.querySelector("#mode-label");
const modeMenu = document.querySelector("#mode-menu");
const modeOptions = [...document.querySelectorAll(".mode-option")];
const savedMode = localStorage.getItem("deutschtec-mode") || "compare";

const setMode = (mode) => {
  localStorage.setItem("deutschtec-mode", mode);
  modeLabel.textContent = mode === "single" ? "Single" : "Compare";
  modeOptions.forEach((option) => {
    option.setAttribute("aria-checked", String(option.dataset.mode === mode));
  });
  modeMenu.hidden = true;
  modeToggle.setAttribute("aria-expanded", "false");
};

setMode(savedMode);

modeToggle.addEventListener("click", () => {
  const isOpen = !modeMenu.hidden;
  modeMenu.hidden = isOpen;
  modeToggle.setAttribute("aria-expanded", String(!isOpen));
});

modeOptions.forEach((option) => {
  option.addEventListener("click", () => setMode(option.dataset.mode));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".mode-picker")) {
    modeMenu.hidden = true;
    modeToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modeMenu.hidden = true;
    modeToggle.setAttribute("aria-expanded", "false");
  }
});

const comparisonSection = document.querySelector(".comparison-section");
const devicesSection = document.querySelector(".devices-section");
devicesSection.parentNode.insertBefore(comparisonSection, devicesSection);

const languageToggle = document.querySelector("#language-toggle");
const languageMenu = document.querySelector("#language-menu");
const selectedLanguageFlag = document.querySelector("#selected-language-flag");
const languageOptions = [...document.querySelectorAll(".language-option")];
const savedLanguage = localStorage.getItem("deutschtec-language") || "en";

const setLanguage = (language) => {
  document.documentElement.lang = language;
  localStorage.setItem("deutschtec-language", language);
  selectedLanguageFlag.src =
    language === "de" ? "/flag-de.svg" : "/flag-gb.svg";
  selectedLanguageFlag.alt = language === "de" ? "Deutsch" : "English";
  languageOptions.forEach((option) => {
    option.setAttribute(
      "aria-checked",
      String(option.dataset.language === language),
    );
  });
  languageMenu.hidden = true;
  languageToggle.setAttribute("aria-expanded", "false");
  languageToggle.title =
    language === "de" ? "Sprache wählen" : "Choose language";
  languageToggle.setAttribute(
    "aria-label",
    language === "de" ? "Sprache wählen" : "Choose language",
  );
};

setLanguage(savedLanguage);

languageToggle.addEventListener("click", () => {
  const isOpen = !languageMenu.hidden;
  languageMenu.hidden = isOpen;
  languageToggle.setAttribute("aria-expanded", String(!isOpen));
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => setLanguage(option.dataset.language));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".language-picker")) {
    languageMenu.hidden = true;
    languageToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    languageMenu.hidden = true;
    languageToggle.setAttribute("aria-expanded", "false");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = question.value.trim();
  status.textContent = value ? "Ready to compare" : "Auto chat free";
  question.focus();
});

const revealTargets = document.querySelectorAll(
  ".capabilities, .workflow, .platform-section, .devices-section, .comparison-section, .savings-section, .pricing-section, .final-cta, .site-footer",
);

document.body.classList.add("motion-ready");
revealTargets.forEach((target) => target.classList.add("reveal-target"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
