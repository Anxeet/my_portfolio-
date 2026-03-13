document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navPanel = document.querySelector('.nav-panel');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const navClose = document.querySelector('.nav-panel-close');
    const links = document.querySelectorAll('.nav-link');

    function openNav() {
        if (!navPanel) return;
        navPanel.classList.add('open');
        navPanel.setAttribute('aria-hidden', 'false');
        navBackdrop.classList.add('open');
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
        // Move focus into the panel for accessibility
        navPanel.focus();
    }

    function closeNav() {
        if (!navPanel) return;
        navPanel.classList.remove('open');
        navPanel.setAttribute('aria-hidden', 'true');
        navBackdrop.classList.remove('open');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
        // Return focus to the toggle
        hamburger.focus();
    }

    hamburger.addEventListener('click', () => {
        if (navPanel.classList.contains('open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeNav);
    }

    if (navClose) {
        navClose.addEventListener('click', closeNav);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navPanel && navPanel.classList.contains('open')) {
            closeNav();
        }
    });

    // Focus trap inside the panel when open
    function trapFocus(e) {
        if (!navPanel || !navPanel.classList.contains('open')) return;

        const focusable = navPanel.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    navPanel.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            trapFocus(e);
        }
    });

    // --- Theme Toggle ---
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-toggle i');

    function syncThemeIcons() {
        const isLight = document.body.classList.contains('light-theme');
        themeIcons.forEach(icon => {
            if (isLight) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    if (themeToggleButtons.length > 0) {
        themeToggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                syncThemeIcons();
            });
        });

        // Ensure icons match initial state
        syncThemeIcons();
    }

    // --- Starry Background Generation ---
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        const numStars = 150; // Adjust for more or less stars
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size (very small glitters)
            const size = Math.random() * 2 + 1; // 1px to 3px
            
            // Random animation duration and delay
            const duration = Math.random() * 3 + 2; // 2s to 5s
            const delay = Math.random() * 5;
            
            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // Close mobile nav when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Typewriter Effect ---
    const texts = [
        "Full Stack Builder",
        "Data Explorer",
        "Analytical Thinker",
        "Solution Architect"
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    let typeSpeed = 100;

    const typewriterElement = document.querySelector('.typewriter');

    function type() {
        if (count === texts.length) {
            count = 0;
        }

        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
            typeSpeed = 50; // Faster when deleting
        } else {
            letter = currentText.slice(0, ++index);
            typeSpeed = 100;
        }

        typewriterElement.textContent = letter;

        if (!isDeleting && letter.length === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typewriter
    if (typewriterElement) {
        setTimeout(type, 1000);
    }


    // --- Intersection Observer for Scroll Animations ---
    const faders = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Form submission handling with FormSubmit AJAX
    const contactForm = document.getElementById('contact-form');
    const successPopup = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            // Fetch request to Formsubmit
            fetch(contactForm.action, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                    btn.style.backgroundColor = '#10b981'; // Green success color
                    btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                    contactForm.reset();
                    
                    if(successPopup) {
                        successPopup.style.display = 'block';
                    }
                } else {
                    btn.innerHTML = 'Error Sending <i class="fas fa-times"></i>';
                    btn.style.backgroundColor = '#ef4444'; // Red error color
                }
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                    if(successPopup) {
                        successPopup.style.display = 'none';
                    }
                }, 4000);
            })
            .catch(error => {
                btn.innerHTML = 'Error Sending <i class="fas fa-times"></i>';
                btn.style.backgroundColor = '#ef4444';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                }, 4000);
            });
        });
    }

});
