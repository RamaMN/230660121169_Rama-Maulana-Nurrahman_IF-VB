// Loader Animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll to Top
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Counter Animation untuk Statistik
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '');
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + '+';
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target + '+';
        }
    };

    window.addEventListener('scroll', function() {
        const rect = counter.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            updateCount();
            this.removeEventListener('scroll', arguments.callee);
        }
    });
});

// Form Submission Handling
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btnSubmit = document.querySelector('.btn-submit');
    btnSubmit.classList.add('loading');

    // Simulasi pengiriman data (ganti dengan API call jika diperlukan)
    setTimeout(() => {
        btnSubmit.classList.remove('loading');
        document.getElementById('successMessage').classList.add('active');
        this.reset(); // Reset form setelah sukses
    }, 2000);
});

// Restart Form
document.querySelector('.btn-restart').addEventListener('click', function() {
    document.getElementById('successMessage').classList.remove('active');
});

// Current Date and Time Display (Opsional, jika ingin ditambahkan)
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    };
    const dateTimeString = now.toLocaleString('id-ID', options).replace('pukul', 'Jam');
    // Jika ingin menampilkan di suatu elemen, tambahkan elemen dengan ID di HTML, misalnya <div id="dateTime"></div>
    // document.getElementById('dateTime').innerText = dateTimeString;
}
updateDateTime(); // Panggil sekali saat halaman dimuat
setInterval(updateDateTime, 60000); // Perbarui setiap menit

// Fade In Animation
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Counter Animation yang lebih smooth
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Durasi dalam milidetik
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.round(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };

    updateCounter();
}

// Observer untuk Counter
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi fade-in
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);

    // Inisialisasi counter
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Smooth scroll untuk semua link internal
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight Animation
function addHighlightEffect() {
    const cards = document.querySelectorAll('.highlight-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Inisialisasi highlight effect
document.addEventListener('DOMContentLoaded', () => {
    addHighlightEffect();
});

// Tambahkan efek highlight untuk text sections
const textHighlights = document.querySelectorAll('.highlight');
textHighlights.forEach(highlight => {
    highlight.addEventListener('mouseover', () => {
        highlight.style.transition = 'all 0.3s ease';
    });
});

// Tambahkan di SLB.js
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, 100);
}

// Tambahkan di SLB.js
function validateForm() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });

        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

function validateInput(input) {
    const errorElement = input.parentElement.querySelector('.error-message') || 
                        document.createElement('span');
    errorElement.className = 'error-message';
    
    let isValid = true;
    let errorMessage = '';

    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'Field ini wajib diisi';
    } else if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'Format email tidak valid';
        }
    } else if (input.id === 'telpOrtu' && input.value) {
        const phoneRegex = /^([0-9]{10,13})$/;
        if (!phoneRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'Nomor telepon harus 10-13 digit';
        }
    }

    if (!isValid) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorElement);
        }
    } else {
        input.classList.remove('error');
        if (input.parentElement.querySelector('.error-message')) {
            input.parentElement.querySelector('.error-message').remove();
        }
    }

    return isValid;
}

// Tambahkan di SLB.js
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollProgress();
    validateForm();
});

// Tambahkan di SLB.js
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => observer.observe(el));
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

// Tambahkan di SLB.js
function enhancedFormValidation() {
    const form = document.getElementById('registrationForm');
    
    const validationRules = {
        namaAnak: {
            minLength: 3,
            pattern: /^[a-zA-Z\s]*$/,
            message: 'Nama hanya boleh berisi huruf dan spasi'
        },
        telpOrtu: {
            pattern: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
            message: 'Format nomor telepon tidak valid (contoh: 081234567890)'
        },
        emailOrtu: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Format email tidak valid'
        }
    };

    form.addEventListener('input', (e) => {
        const field = e.target;
        const rule = validationRules[field.id];
        
        if (rule) {
            validateField(field, rule);
        }
    });
}

function validateField(field, rule) {
    const errorElement = field.nextElementSibling || document.createElement('span');
    errorElement.className = 'error-message';
    
    if (rule.minLength && field.value.length < rule.minLength) {
        showError(field, errorElement, `Minimal ${rule.minLength} karakter`);
        return false;
    }
    
    if (rule.pattern && !rule.pattern.test(field.value)) {
        showError(field, errorElement, rule.message);
        return false;
    }
    
    hideError(field, errorElement);
    return true;
}

// Tambahkan di SLB.js
function improveAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('button').forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    // Focus trap for modal/menu
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }
}

// Tambahkan di bagian bawah SLB.js
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    enhancedFormValidation();
    improveAccessibility();
    
    // Console message for developers
    console.log('SLB Rahmah Dewi - Website Version 1.0');
});