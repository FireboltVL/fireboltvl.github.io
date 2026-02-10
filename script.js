document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Version switch interaction (Demo)
    const versionSwitch = document.querySelector('.version-switch');
    if (versionSwitch) {
        const v2Btn = versionSwitch.querySelector('.version.inactive');
        if (v2Btn) {
            v2Btn.addEventListener('click', () => {
                alert('Firebolt-VL V2 is currently under active development. Check back soon for updates!');
            });
            v2Btn.style.cursor = 'pointer';
        }
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
