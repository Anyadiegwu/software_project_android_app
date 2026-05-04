// Simple interaction logic for Aegis Safe Community
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Add a "Premium" feedback effect
            const btn = loginForm.querySelector('button');
            btn.innerHTML = 'AUTHENTICATING...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Access Granted. Welcome to Aegis Network.');
                window.location.href = 'index.html'; // Redirect back for now
            }, 1500);
        });
    }
});