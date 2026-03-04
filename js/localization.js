const browserLang = navigator.language?.split('-')[0];
const supportedLangs = ['es', 'en'];
const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'es';

let currentLang = localStorage.getItem('lang') || defaultLang;
let translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        translations = await response.json();
        updateTranslations();
        updateActiveLangButton(lang);
        document.documentElement.lang = lang;
        if (typeof loadDocs === 'function' && window.location.pathname.includes('docs.html')) {
            loadDocs();
        }
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

window.updateTranslations = function () {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (Object.keys(translations).length === 0) return;

        const value = getNestedTranslation(translations, key);
        if (!value) return;
        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
            element.placeholder = value;
        } else if (element.hasAttribute('data-i18n-html')) {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });
};

function getNestedTranslation(obj, key) {
    if (!obj || !key) return null;
    return key.split('.').reduce((o, i) => o ? o[i] : null, obj);
}

function setLanguage(lang) {
    if (currentLang === lang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    loadTranslations(lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function updateActiveLangButton(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
});

window.i18n = {
    t(key) {
        if (!translations || Object.keys(translations).length === 0) return key;
        return key.split('.').reduce((o, i) => o?.[i], translations) ?? key;
    },
    get lang() {
        return currentLang;
    }
};
