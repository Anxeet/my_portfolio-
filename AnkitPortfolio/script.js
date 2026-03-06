document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Toggle icon
        if (navLinks.classList.contains('nav-active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // --- Theme Toggle ---
    const themeToggleBtn = document.querySelector('.theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
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
            navLinks.classList.remove('nav-active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
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
