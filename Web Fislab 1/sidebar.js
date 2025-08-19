// Common sidebar and UI behavior for all pages
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.top-left-header');
    const hamburger = document.getElementById('hamburger');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const modeToggleBtn = document.getElementById('mode-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const navLogout = document.getElementById('nav-logout');

    // Header animation
    if (header) {
        window.requestAnimationFrame(() => header.classList.add('menu-visible'));
    }

    // Sidebar toggle helpers
    function setSidebarOpen(isOpen) {
        document.body.classList.toggle('sidebar-open', isOpen);
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', String(isOpen));
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const willOpen = !document.body.classList.contains('sidebar-open');
            setSidebarOpen(willOpen);
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => setSidebarOpen(false));
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setSidebarOpen(false);
    });

    // Dark mode restore and toggle
    const prefersDark = localStorage.getItem('fislab-theme') === 'dark';
    document.body.classList.toggle('dark', prefersDark);
    if (sunIcon) sunIcon.style.display = prefersDark ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = prefersDark ? 'block' : 'none';

    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('fislab-theme', isDark ? 'dark' : 'light');
            if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
            if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
        });
    }

    // Logout handler
    if (navLogout) {
        navLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('fislab-nrp');
            localStorage.removeItem('fislab-role');
            window.location.href = 'index.html';
        });
    }

    // Role-based navigation visibility
    const role = localStorage.getItem('fislab-role');
    const navNilai = document.getElementById('nav-nilai');
    const navPenilaian = document.getElementById('nav-penilaian');
    const navPenjadwalan = document.getElementById('nav-penjadwalan');

    [navNilai, navPenilaian, navPenjadwalan].forEach((el) => {
        if (el) el.style.display = 'none';
    });

    if (role === 'asisten laboratorium') {
        if (navPenilaian) navPenilaian.style.display = 'flex';
        if (navPenjadwalan) navPenjadwalan.style.display = 'flex';
    } else if (role === 'praktikan') {
        if (navNilai) navNilai.style.display = 'flex';
    }
});


