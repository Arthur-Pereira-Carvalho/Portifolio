const revealElements = document.querySelectorAll('.reveal');

function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach((item) => observer.observe(item));
}

function getProjects() {
  const urlGitHub = 'https://api.github.com/users/Arthur-Pereira-Carvalho/repos';
  const loadingElement = document.getElementById('loading');

  fetch(urlGitHub)
    .then((response) => response.json())
    .then((data) => {
      if (loadingElement) loadingElement.style.display = 'none';
      showProjects(data || []);
    })
    .catch((error) => {
      console.error('Erro ao carregar projetos:', error);
      if (loadingElement) {
        loadingElement.textContent = 'Não foi possível carregar projetos no momento.';
      }
    });
}

function showProjects(data) {
  const listElement = document.getElementById('my-projects-list');
  if (!listElement || !Array.isArray(data)) return;
  listElement.innerHTML = '';
  data.slice(0, 8).forEach((repo) => {
    const a = document.createElement('a');
    a.href = repo.clone_url || '#';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = repo.name || 'Projeto';
    listElement.appendChild(a);
  });
}

observeReveal();
getProjects();
