document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const isHome = document.body.classList.contains('home');

    // Scroll Logic
    function handleScroll() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
            header.classList.remove('transparent');
        } else {
            if (isHome && !mobileMenu.classList.contains('active')) {
                header.classList.add('transparent');
                header.classList.remove('scrolled');
            } else {
                header.classList.add('scrolled');
            }
        }
    }

    // Mobile Menu Toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isOpened);
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-opened');

            // Force filled header when menu is open
            if (!isOpened) {
                header.classList.add('scrolled');
                header.classList.remove('transparent');
            } else {
                handleScroll();
            }
        });
    }

    // Initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});
