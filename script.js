/* ============================================
   ALAN LIFTING — Interactive Behavior
   ============================================ */

// ===== IndexedDB HELPERS (same as admin.js) =====
const _DB_NAME = 'AlanLiftingDB';
const _DB_VERSION = 1;
const _DB_STORE = 'content';

function _openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(_DB_NAME, _DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(_DB_STORE)) {
                db.createObjectStore(_DB_STORE);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function _idbGet(key) {
    return _openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(_DB_STORE, 'readonly');
            const store = tx.objectStore(_DB_STORE);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    });
}

// ===== CONTENT LOADER FROM ADMIN PANEL =====
function loadAdminContent() {
    // First load from localStorage (fast, synchronous) for text content
    try {
        const saved = localStorage.getItem('alanlifting_content');
        if (saved) {
            applyContent(JSON.parse(saved));
        }
    } catch (e) { console.error('Error loading from localStorage:', e); }

    // Then load from IndexedDB (async, has full image data) to overlay images
    _idbGet('alanlifting_content').then(idbData => {
        if (idbData) {
            applyContent(idbData);
        }
    }).catch(e => console.error('Error loading from IndexedDB:', e));
}

function applyContent(c) {
    if (!c) return;
    try {

        // --- HERO ---
        if (c.hero) {
            if (c.hero.bgImage) {
                const heroBg = document.querySelector('.hero-bg');
                if (heroBg) heroBg.style.backgroundImage = `url(${c.hero.bgImage})`;
            }
            if (c.hero.badgeText) {
                const badge = document.querySelector('.badge-text');
                if (badge) badge.textContent = c.hero.badgeText;
            }
            if (c.hero.titleLine1 || c.hero.titleLine2) {
                const title = document.querySelector('.hero-title');
                if (title) {
                    const accent = title.querySelector('.hero-title-accent');
                    title.innerHTML = '';
                    title.appendChild(document.createTextNode((c.hero.titleLine1 || 'Transform Your Body.') + '\n'));
                    title.appendChild(document.createElement('br'));
                    const span = document.createElement('span');
                    span.className = 'hero-title-accent';
                    span.textContent = c.hero.titleLine2 || 'Elevate Your Life.';
                    title.appendChild(span);
                }
            }
            if (c.hero.subtitle) {
                const sub = document.querySelector('.hero-subtitle');
                if (sub) sub.textContent = c.hero.subtitle;
            }
            if (c.hero.btn1Text) {
                const btn1 = document.querySelector('.hero-buttons .btn-primary span');
                if (btn1) btn1.textContent = c.hero.btn1Text;
            }
            if (c.hero.btn2Text) {
                const btn2 = document.querySelector('.hero-buttons .btn-secondary span');
                if (btn2) btn2.textContent = c.hero.btn2Text;
            }
        }

        // --- ABOUT ---
        if (c.about) {
            if (c.about.photo) {
                const img = document.querySelector('.about-image-frame img');
                if (img) img.src = c.about.photo;
            }
            if (c.about.sectionLabel) {
                const label = document.querySelector('#about .section-label');
                if (label) label.textContent = c.about.sectionLabel;
            }
            if (c.about.title) {
                const title = document.querySelector('#about .section-title');
                if (title) title.textContent = c.about.title;
            }
            if (c.about.bio1) {
                const bio1 = document.querySelectorAll('.about-text')[0];
                if (bio1) bio1.innerHTML = c.about.bio1;
            }
            if (c.about.bio2) {
                const bio2 = document.querySelectorAll('.about-text')[1];
                if (bio2) bio2.innerHTML = c.about.bio2;
            }
            // Stats
            const statItems = document.querySelectorAll('.about-stats .stat-item');
            if (statItems[0]) {
                const num = statItems[0].querySelector('.stat-number');
                const suf = statItems[0].querySelector('.stat-suffix');
                const lab = statItems[0].querySelector('.stat-label');
                if (num && c.about.stat1Number) { num.dataset.target = c.about.stat1Number; num.textContent = '0'; }
                if (suf && c.about.stat1Suffix) suf.textContent = c.about.stat1Suffix;
                if (lab && c.about.stat1Label) lab.textContent = c.about.stat1Label;
            }
            if (statItems[1]) {
                const icon = statItems[1].querySelector('.stat-icon');
                const text = statItems[1].querySelector('.stat-text-label');
                const lab = statItems[1].querySelector('.stat-label');
                if (icon && c.about.stat2Icon) icon.textContent = c.about.stat2Icon;
                if (text && c.about.stat2Text) text.textContent = c.about.stat2Text;
                if (lab && c.about.stat2Label) lab.textContent = c.about.stat2Label;
            }
            if (statItems[2]) {
                const num = statItems[2].querySelector('.stat-number');
                const suf = statItems[2].querySelector('.stat-suffix');
                const lab = statItems[2].querySelector('.stat-label');
                if (num && c.about.stat3Number) { num.dataset.target = c.about.stat3Number; num.textContent = '0'; }
                if (suf && c.about.stat3Suffix) suf.textContent = c.about.stat3Suffix;
                if (lab && c.about.stat3Label) lab.textContent = c.about.stat3Label;
            }
            if (statItems[3]) {
                const num = statItems[3].querySelector('.stat-number');
                const suf = statItems[3].querySelector('.stat-suffix');
                const lab = statItems[3].querySelector('.stat-label');
                if (num && c.about.stat4Number) { num.dataset.target = c.about.stat4Number; num.textContent = '0'; }
                if (suf && c.about.stat4Suffix) suf.textContent = c.about.stat4Suffix;
                if (lab && c.about.stat4Label) lab.textContent = c.about.stat4Label;
            }
            // Experience badge
            const expNum = document.querySelector('.exp-number');
            if (expNum && c.about.stat1Number) expNum.textContent = c.about.stat1Number + (c.about.stat1Suffix || '+');
        }

        // --- PROGRAMS ---
        if (c.programs) {
            if (c.programs.sectionLabel) {
                const el = document.querySelector('#programs .section-label');
                if (el) el.textContent = c.programs.sectionLabel;
            }
            if (c.programs.title) {
                const el = document.querySelector('#programs .section-title');
                if (el) el.textContent = c.programs.title;
            }
            if (c.programs.desc) {
                const el = document.querySelector('#programs .section-desc');
                if (el) el.textContent = c.programs.desc;
            }
            if (c.programs.cards) {
                const programCards = document.querySelectorAll('.program-card');
                c.programs.cards.forEach((card, i) => {
                    if (!programCards[i]) return;
                    const el = programCards[i];
                    const title = el.querySelector('.program-title');
                    const desc = el.querySelector('.program-desc');
                    const features = el.querySelector('.program-features');
                    const badge = el.querySelector('.program-badge');
                    if (title) title.textContent = card.title;
                    if (desc) desc.textContent = card.desc;
                    if (features && card.features) {
                        features.innerHTML = card.features.map(f => `<li>${f}</li>`).join('');
                    }
                    if (badge) {
                        if (card.badge) { badge.textContent = card.badge; badge.style.display = ''; }
                        else { badge.style.display = 'none'; }
                    }
                });
            }
        }

        // --- TRANSFORMATIONS ---
        if (c.transformations) {
            if (c.transformations.sectionLabel) {
                const el = document.querySelector('#results .section-label');
                if (el) el.textContent = c.transformations.sectionLabel;
            }
            if (c.transformations.title) {
                const el = document.querySelector('#results .section-title');
                if (el) el.textContent = c.transformations.title;
            }
            if (c.transformations.desc) {
                const el = document.querySelector('#results .section-desc');
                if (el) el.textContent = c.transformations.desc;
            }
            if (c.transformations.cards) {
                const grid = document.querySelector('.results-grid');
                if (grid) {
                    grid.innerHTML = c.transformations.cards.map(card => `
                        <div class="result-card animate-on-scroll">
                            <div class="result-visual">
                                <div class="result-before">
                                    <img src="${card.beforeImg || 'images/gallery-4.png'}" alt="Before transformation" loading="lazy">
                                    <span class="result-tag">Before</span>
                                </div>
                                <div class="result-after">
                                    <img src="${card.afterImg || 'images/gallery-2.png'}" alt="After transformation" loading="lazy">
                                    <span class="result-tag">After</span>
                                </div>
                            </div>
                            <div class="result-info">
                                <h3>${card.name}</h3>
                                <span class="result-duration">${card.duration}</span>
                                <p class="result-quote">${card.quote}</p>
                            </div>
                        </div>
                    `).join('');
                    
                    // Observe new elements
                    if (window._observer) {
                        grid.querySelectorAll('.animate-on-scroll').forEach(el => {
                            window._observer.observe(el);
                        });
                    }
                }
            }
        }

        // --- TESTIMONIALS ---
        if (c.testimonials) {
            if (c.testimonials.sectionLabel) {
                const labels = document.querySelectorAll('.testimonials .section-label');
                labels.forEach(el => el.textContent = c.testimonials.sectionLabel);
            }
            if (c.testimonials.title) {
                const titles = document.querySelectorAll('.testimonials .section-title');
                titles.forEach(el => el.textContent = c.testimonials.title);
            }
            if (c.testimonials.cards) {
                const track = document.getElementById('testimonial-track');
                if (track) {
                    track.innerHTML = c.testimonials.cards.map(card => `
                        <div class="testimonial-card">
                            <div class="testimonial-stars">${'★'.repeat(card.stars || 5)}${'☆'.repeat(5 - (card.stars || 5))}</div>
                            <p class="testimonial-quote">${card.quote}</p>
                            <div class="testimonial-author">
                                <div class="testimonial-avatar">${(card.name || 'A')[0]}</div>
                                <div>
                                    <h4>${card.name}</h4>
                                    <span>${card.role}</span>
                                </div>
                            </div>
                        </div>
                    `).join('');
                    // Reinitialize carousel after replacing cards
                    if (window._reinitTestimonialCarousel) {
                        window._reinitTestimonialCarousel();
                    }
                }
            }
        }

        // --- ACHIEVEMENTS ---
        if (c.achievements) {
            if (c.achievements.sectionLabel) {
                const el = document.querySelector('#achievements .section-label');
                if (el) el.textContent = c.achievements.sectionLabel;
            }
            if (c.achievements.title) {
                const el = document.querySelector('#achievements .section-title');
                if (el) el.textContent = c.achievements.title;
            }
            if (c.achievements.desc) {
                const el = document.querySelector('#achievements .section-desc');
                if (el) el.textContent = c.achievements.desc;
            }
            if (c.achievements.cards) {
                const grid = document.querySelector('.achievements-grid');
                if (grid) {
                    grid.innerHTML = c.achievements.cards.map(card => `
                        <div class="achievement-card animate-on-scroll">
                            <div class="achievement-icon-wrapper">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                            </div>
                            <h3>${card.title}</h3>
                            <p>${card.desc}</p>
                            <span class="achievement-tag">${card.tag}</span>
                        </div>
                    `).join('');
                    
                    // Observe new elements
                    if (window._observer) {
                        grid.querySelectorAll('.animate-on-scroll').forEach(el => {
                            window._observer.observe(el);
                        });
                    }
                }
            }
        }

        // --- GALLERY ---
        if (c.gallery) {
            if (c.gallery.sectionLabel) {
                const el = document.querySelector('#gallery .section-label');
                if (el) el.textContent = c.gallery.sectionLabel;
            }
            if (c.gallery.title) {
                const el = document.querySelector('#gallery .section-title');
                if (el) el.textContent = c.gallery.title;
            }
            if (c.gallery.desc) {
                const el = document.querySelector('#gallery .section-desc');
                if (el) el.textContent = c.gallery.desc;
            }
            if (c.gallery.images) {
                const items = document.querySelectorAll('.gallery-item img');
                c.gallery.images.forEach((img, i) => {
                    if (img && items[i]) items[i].src = img;
                });
            }
            if (c.gallery.instagramUrl) {
                document.querySelectorAll('.btn-instagram, .gallery-item, .contact-detail-item[href*="instagram"], .social-icon[aria-label="Instagram"], .footer-social-link[href*="instagram"]').forEach(el => {
                    if (el.tagName === 'A') el.href = c.gallery.instagramUrl;
                });
            }
            if (c.gallery.tiktokUrl) {
                document.querySelectorAll('.btn-tiktok, .contact-detail-item[href*="tiktok"], .social-icon[aria-label="TikTok"], .footer-social-link[href*="tiktok"]').forEach(el => {
                    if (el.tagName === 'A') el.href = c.gallery.tiktokUrl;
                });
            }
        }

        // --- CONTACT ---
        if (c.contact) {
            if (c.contact.sectionLabel) {
                const el = document.querySelector('#contact .section-label');
                if (el) el.textContent = c.contact.sectionLabel;
            }
            if (c.contact.title) {
                const el = document.querySelector('#contact .section-title');
                if (el) el.textContent = c.contact.title;
            }
            if (c.contact.desc) {
                const el = document.querySelector('#contact .section-desc');
                if (el) el.textContent = c.contact.desc;
            }
            if (c.contact.phone) {
                document.querySelectorAll('.contact-detail-value').forEach(el => {
                    if (el.textContent.includes('+964')) el.textContent = c.contact.phone;
                });
            }
            if (c.contact.location) {
                document.querySelectorAll('.contact-detail-value').forEach(el => {
                    if (el.textContent.includes('Erbil')) el.textContent = c.contact.location;
                });
            }
            if (c.contact.instagram) {
                // Update contact details text
                document.querySelectorAll('.contact-detail-value').forEach(el => {
                    const parent = el.closest('.contact-detail-item');
                    if (parent && parent.textContent.includes('Instagram')) {
                        el.textContent = c.contact.instagram;
                    }
                });
                // Update button text
                document.querySelectorAll('.btn-instagram').forEach(el => {
                    if (el.innerHTML.includes('Follow on Instagram')) {
                        el.innerHTML = el.innerHTML.replace(/@[a-zA-Z0-9_.]+/, c.contact.instagram);
                    }
                });
            }
            if (c.contact.tiktok) {
                // Update contact details text
                document.querySelectorAll('.contact-detail-value').forEach(el => {
                    const parent = el.closest('.contact-detail-item');
                    if (parent && parent.textContent.includes('TikTok')) {
                        el.textContent = c.contact.tiktok;
                    }
                });
                // Update button text
                document.querySelectorAll('.btn-tiktok').forEach(el => {
                    if (el.innerHTML.includes('Follow on TikTok')) {
                        el.innerHTML = el.innerHTML.replace(/@[a-zA-Z0-9_.]+/, c.contact.tiktok);
                    }
                });
            }
            if (c.contact.whatsappNumber) {
                // Update WhatsApp floating button
                const waBtn = document.querySelector('.floating-whatsapp');
                if (waBtn) waBtn.href = `https://wa.me/${c.contact.whatsappNumber}?text=${encodeURIComponent("Hi Alan, I'm interested in your coaching programs!")}`;
                // Update footer WhatsApp
                document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
                    a.href = `https://wa.me/${c.contact.whatsappNumber}?text=${encodeURIComponent("Hi Alan, I'm interested in your coaching programs!")}`;
                });
            }
            if (c.contact.services) {
                const select = document.getElementById('form-service');
                if (select) {
                    select.innerHTML = '<option value="" disabled selected>Choose your program...</option>';
                    c.contact.services.forEach(svc => {
                        const opt = document.createElement('option');
                        opt.value = svc.toLowerCase().replace(/\s+/g, '-');
                        opt.textContent = svc;
                        select.appendChild(opt);
                    });
                }
            }
        }

        // --- SEO ---
        if (c.seo) {
            if (c.seo.metaTitle) document.title = c.seo.metaTitle;
            if (c.seo.metaDesc) {
                const meta = document.querySelector('meta[name="description"]');
                if (meta) meta.content = c.seo.metaDesc;
            }
            if (c.seo.copyright) {
                const cp = document.querySelector('.footer-bottom p');
                if (cp) cp.textContent = c.seo.copyright;
            }
            if (c.seo.footerTagline) {
                const ft = document.querySelector('.footer-tagline');
                if (ft) ft.innerHTML = c.seo.footerTagline.replace(/\n/g, '<br>');
            }
        }

    } catch (e) {
        console.error('Error loading admin content:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Load admin content immediately
    loadAdminContent();

    // ===== LOADING SCREEN =====
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            // Trigger hero animations
            document.querySelectorAll('.hero .animate-on-scroll').forEach((el, i) => {
                setTimeout(() => el.classList.add('animated'), i * 150);
            });
        }, 2200);
    });
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Back to top button
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===== PARALLAX HERO =====
    const heroBg = document.querySelector('.hero-bg');

    function handleParallax() {
        if (window.innerWidth > 768) {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            if (scrollY <= heroHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
            }
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Expose for dynamic content
    window._observer = observer;

    animateElements.forEach(el => {
        // Don't re-observe hero elements (handled by loader)
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 2000;
        const startTime = performance.now();
        const startVal = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startVal + (target - startVal) * eased);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // ===== TESTIMONIAL CAROUSEL =====
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');

    let currentSlide = 0;
    let slidesPerView = 3;
    let autoplayInterval;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    // Always query cards fresh from the DOM (they may be replaced by admin content)
    function getCards() {
        return track.querySelectorAll('.testimonial-card');
    }

    function updateSlidesPerView() {
        if (window.innerWidth <= 768) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 1024) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }

    function getTotalSlides() {
        const cards = getCards();
        return Math.max(cards.length - slidesPerView + 1, 1);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const total = getTotalSlides();
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        const cards = getCards();
        const totalSlides = getTotalSlides();
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));

        if (cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 24; // gap
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

        // Update dots
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        const totalSlides = getTotalSlides();
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        const totalSlides = getTotalSlides();
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Expose a reinit function so it can be called after content updates
    function reinitCarousel() {
        updateSlidesPerView();
        currentSlide = 0;
        createDots();
        goToSlide(0);
        stopAutoplay();
        startAutoplay();
    }

    // Make reinitCarousel globally accessible for applyContent to call
    window._reinitTestimonialCarousel = reinitCarousel;

    // Initialize
    updateSlidesPerView();
    createDots();
    startAutoplay();

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    // Touch/swipe support
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoplay();
    });

    // Mouse drag support
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.cursor = 'grabbing';
        stopAutoplay();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = '';
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoplay();
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlidesPerView();
            createDots();
            goToSlide(Math.min(currentSlide, getTotalSlides() - 1));
        }, 200);
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate submission
        const submitBtn = document.getElementById('form-submit');
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success message
            contactForm.querySelectorAll('.form-group, .form-row, .btn-submit').forEach(el => {
                el.style.display = 'none';
            });
            formSuccess.style.display = 'block';

            // Build WhatsApp message with form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const service = formData.get('service');
            const message = formData.get('message');

            const waMessage = encodeURIComponent(
                `Hi Alan! I'm ${name}. I'm interested in ${service || 'your coaching programs'}. ${message || ''}`
            );

            // Optional: redirect to WhatsApp after showing success
            setTimeout(() => {
                const openWhatsApp = confirm('Would you like to also message Alan directly on WhatsApp?');
                if (openWhatsApp) {
                    window.open(`https://wa.me/9647502638582?text=${waMessage}`, '_blank');
                }
            }, 1500);
        }, 1500);
    });

    // ===== GALLERY OVERLAY CLICKS =====
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            window.open('https://instagram.com/alangardiiii', '_blank');
        });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PARALLAX ON MOUSE MOVE (subtle) =====
    const heroContent = document.querySelector('.hero-content');

    document.querySelector('.hero').addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        heroContent.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });

    document.querySelector('.hero').addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translate(0, 0)';
        heroContent.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            heroContent.style.transition = '';
        }, 500);
    });

});
