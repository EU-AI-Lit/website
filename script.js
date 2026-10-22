const supportedLangs = ['en'];
const defaultLang = 'en';

function getSelectedLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');

  if (requested && supportedLangs.includes(requested)) {
    return requested;
  }

  const stored = localStorage.getItem('esail-lang');
  if (stored && supportedLangs.includes(stored)) {
    return stored;
  }

  const browserLang = navigator.language.split('-')[0];
  return supportedLangs.includes(browserLang) ? browserLang : defaultLang;
}

function setLanguageButtons(activeLang) {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const isActive = button.dataset.lang === activeLang;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function getNestedValue(object, keyPath) {
  return keyPath.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), object);
}

async function applyTranslations(lang) {
  const response = await fetch(`locales/${lang}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load locale ${lang}`);
  }

  const translations = await response.json();

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = getNestedValue(translations, node.dataset.i18n);
    if (typeof value === 'string' && value.trim()) {
      node.textContent = value;
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem('esail-lang', lang);
  setLanguageButtons(lang);
}

function bindLanguageButtons() {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextLang = button.dataset.lang;
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState({}, '', url);
      applyTranslations(nextLang).catch((error) => {
        console.warn('Unable to change language:', error);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  bindLanguageButtons();

  try {
    const selectedLang = getSelectedLanguage();
    await applyTranslations(selectedLang);
  } catch (error) {
    console.warn('Unable to load translations:', error);
  }
});
