// === Variables DOM ===
const sidebar = document.getElementById('sidebar');
const menuToggleBtn = document.getElementById('toggleSidebar');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const content = document.getElementById('mainContent');
const links = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('section');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = savedTheme || (prefersDark ? 'night' : 'day');

const langToggle = document.getElementById('lang-toggle');

// === TOGGLE MENU MOBILE ===
menuToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');

    menuToggleBtn.classList.add('fade-out');
    setTimeout(() => {
        menuToggleBtn.classList.toggle('fa-bars');
        menuToggleBtn.classList.toggle('fa-xmark');
        menuToggleBtn.classList.remove('fade-out');
    }, 200);
});

// === SCROLL VERS SECTION + LIEN ACTIF ===
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            content.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
    });
});

content.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
        }
    });
});

// === GESTION DU THÈME JOUR/NUIT ===
document.body.classList.add(defaultTheme);
updateThemeIcon(defaultTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('night') ? 'night' : 'day';
    const newTheme = currentTheme === 'night' ? 'day' : 'night';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.classList.add('fade-out');

    setTimeout(() => {
        themeIcon.className = theme === 'night'
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
        themeIcon.classList.remove('fade-out');
    }, 150);
}

document.addEventListener("DOMContentLoaded", () => {
	const elements = document.querySelectorAll('[data-fade]');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target); // une fois visible, on l'arrête
			}
		});
	}, {
		threshold: 0.1
	});

	elements.forEach(el => observer.observe(el));
});

// === GESTION DE LA LANGUE ===
langToggle.addEventListener("click", () => {
	document.body.classList.add('fade-out');

	setTimeout(() => {
		const currentPath = window.location.pathname;
		const isEnglish = currentPath.startsWith("/en");

		const newPath = isEnglish ? "/" : "/en/";
		window.location.href = newPath;
	}, 500);
});