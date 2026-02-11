document.addEventListener('DOMContentLoaded', () => {
    // --- Neural Network Background Animation ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 150;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#FF5722' : '#2c3e50'; // Brand colors
        }

        update() {
            // Speed up based on scroll
            const speedMultiplier = 1 + Math.min(Math.abs(scrollSpeed) * 0.1, 5);

            this.x += this.vx * speedMultiplier;
            this.y += this.vy * speedMultiplier;

            // Wrap around
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update connection distance based on scroll
        const currentConnectionDist = connectionDistance + Math.min(Math.abs(scrollSpeed) * 2, 100);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < currentConnectionDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(200, 200, 200, ${1 - dist / currentConnectionDist})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Decay scroll speed effect
        scrollSpeed *= 0.95;

        requestAnimationFrame(animate);
    }

    animate();

    // Track scroll speed
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollSpeed = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
    });

    // --- Lightbox Modal ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const archImg = document.querySelector('.architecture-diagram img');
    const closeSpan = document.querySelector('.close');

    if (archImg) {
        archImg.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            if (captionText) captionText.innerHTML = this.alt;
        });
    }

    if (closeSpan) {
        closeSpan.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }

    // Close on outside click
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });



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
