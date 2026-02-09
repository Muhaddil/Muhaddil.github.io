const formLinks=["https://muhaddil.github.io/simple-form-sender/form1.html","https://muhaddil.github.io/simple-form-sender/form2.html","https://muhaddil.github.io/simple-form-sender/form3.html","https://muhaddil.github.io/simple-form-sender/safdform1.html"];async function loadRepositories(){try{const a=await(await fetch("data/repositories.json")).json(),s=document.querySelector(".projects-grid"),o=localStorage.getItem("lang")||"es";s.innerHTML="",a.forEach(t=>{const n=document.createElement("article");n.className="project-card scale-in glow-effect";let e="buttons.viewProject";t.icon.includes("github")&&(e="buttons.viewGithub"),t.linkText&&t.linkText.en&&t.linkText.en.includes("Use")&&(e="buttons.useTool"),t.icon.includes("tools")&&(!t.linkText||!t.linkText.en||!t.linkText.en.includes("Use"))&&(e="buttons.viewTool");let l=t.link;t.linkId==="form-random-link"&&(l=formLinks[Math.floor(Math.random()*formLinks.length)]);const d=t.title[o]||t.title.es,r=t.description[o]||t.description.es;n.innerHTML=`
                <h3>${d}</h3>
                <p>${r}</p>
                <div class="tech-stack">
                    ${t.stack.map(c=>`<span class="skill-badge">${c}</span>`).join("")}
                </div>
                <a href="${l}" class="button" target="_blank" rel="noopener noreferrer" ${t.linkId?`id="${t.linkId}"`:""}>
                    <i class="${t.icon}"></i>
                    <span data-i18n="${e}">Ver Proyecto</span>
                </a>
            `,s.appendChild(n)}),window.observeElements&&window.observeElements(),window.updateTranslations&&window.updateTranslations()}catch(i){console.error("Error loading repositories:",i)}}document.addEventListener("DOMContentLoaded",loadRepositories),window.addEventListener("languageChanged",loadRepositories);
