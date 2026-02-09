const formLinks = [
    'https://muhaddil.github.io/simple-form-sender/form1.html',
    'https://muhaddil.github.io/simple-form-sender/form2.html',
    'https://muhaddil.github.io/simple-form-sender/form3.html',
    'https://muhaddil.github.io/simple-form-sender/safdform1.html'
];

async function loadRepositories() {
    try {
        const response = await fetch('data/repositories.json');
        const repos = await response.json();
        const container = document.querySelector('.projects-grid');

        const lang = localStorage.getItem('lang') || 'es';

        container.innerHTML = '';

        repos.forEach(repo => {
            const article = document.createElement('article');
            article.className = 'project-card scale-in glow-effect';

            let btnTextKey = 'buttons.viewProject';
            if (repo.icon.includes('github')) btnTextKey = 'buttons.viewGithub';
            if (repo.linkText && repo.linkText.en && repo.linkText.en.includes('Use')) btnTextKey = 'buttons.useTool';
            if (repo.icon.includes('tools') && (!repo.linkText || !repo.linkText.en || !repo.linkText.en.includes('Use'))) btnTextKey = 'buttons.viewTool';

            let href = repo.link;
            if (repo.linkId === 'form-random-link') {
                href = formLinks[Math.floor(Math.random() * formLinks.length)];
            }

            const title = repo.title[lang] || repo.title['es'];
            const description = repo.description[lang] || repo.description['es'];

            article.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="tech-stack">
                    ${repo.stack.map(tech => `<span class="skill-badge">${tech}</span>`).join('')}
                </div>
                <a href="${href}" class="button" target="_blank" rel="noopener noreferrer" ${repo.linkId ? `id="${repo.linkId}"` : ''}>
                    <i class="${repo.icon}"></i>
                    <span data-i18n="${btnTextKey}">Ver Proyecto</span>
                </a>
            `;
            container.appendChild(article);
        });

        if (window.observeElements) {
            window.observeElements();
        }

        if (window.updateTranslations) {
            window.updateTranslations();
        }

    } catch (error) {
        console.error('Error loading repositories:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadRepositories);
window.addEventListener('languageChanged', loadRepositories);
