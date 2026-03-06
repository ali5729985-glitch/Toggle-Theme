const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const body = document.body;

// Theme icons
const icons = {
    'light-mode': '☀️',
    'dark-mode': '🌙'
};

const labels = {
    'light-mode': 'Light Mode',
    'dark-mode': 'Dark Mode'
};

// Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('preferredTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (systemPrefersDark ? 'dark-mode' : 'light-mode');
    applyTheme(theme);
}

// Apply theme to the page
function applyTheme(theme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(theme);

    // Update icon
    const toggleCircle = themeToggle.querySelector('.toggle-circle');
    toggleCircle.textContent = icons[theme];

    // Update label
    themeLabel.textContent = labels[theme];

    // Save to localStorage
    localStorage.setItem('preferredTheme', theme);
}

// Toggle theme on click
themeToggle.addEventListener('click', function() {
    const currentTheme = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
    applyTheme(newTheme);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('preferredTheme')) {
        const newTheme = e.matches ? 'dark-mode' : 'light-mode';
        applyTheme(newTheme);
    }
});
