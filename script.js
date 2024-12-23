document.addEventListener('DOMContentLoaded', () => {
    const proceedBtn = document.getElementById('proceed-btn');
    const usernameInput = document.getElementById('github-username');
    const greeting = document.getElementById('greeting');
    const welcomeMessage = document.getElementById('welcome-message');
    const callForSessions = document.getElementById('call-for-sessions');
    const communitySpotlight = document.getElementById('community-spotlight');

    // Load config.yaml for title and navigation links
    fetch('config.yaml')
        .then((response) => response.text())
        .then((text) => {
            const config = jsyaml.load(text);
            document.title = config.title;

            const navLinks = document.getElementById('nav-links');
            config.nav.forEach((link) => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${link.href}" target="_blank">${link.label}</a>`;
                navLinks.appendChild(li);
            });
        });

    usernameInput.addEventListener('input', () => {
        proceedBtn.disabled = !usernameInput.value.trim();
    });

    proceedBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (!response.ok) throw new Error('Invalid user');
                return response.json();
            })
            .then((data) => {
                greeting.classList.remove('hidden');
                welcomeMessage.textContent = `Hello ${data.name || username} 👋`;
                callForSessions.classList.remove('disabled');
                communitySpotlight.classList.remove('disabled');
            })
            .catch(() => {
                alert('Invalid GitHub username. Please try again.');
            });
    });
});
