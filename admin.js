/* ============================================
   ALAN LIFTING — Admin Panel Logic
   ============================================ */

const CONTENT_KEY = 'alanlifting_content';
const PASSWORD_KEY = 'alanlifting_admin_pw';
const DEFAULT_PASSWORD = 'alan#2026';

// ===== IndexedDB STORAGE (unlimited size) =====
const DB_NAME = 'AlanLiftingDB';
const DB_VERSION = 1;
const DB_STORE = 'content';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(DB_STORE)) {
                db.createObjectStore(DB_STORE);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function idbGet(key) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(DB_STORE, 'readonly');
            const store = tx.objectStore(DB_STORE);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    });
}

function idbSet(key, value) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(DB_STORE, 'readwrite');
            const store = tx.objectStore(DB_STORE);
            const req = store.put(value, key);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    });
}

function idbDelete(key) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(DB_STORE, 'readwrite');
            const store = tx.objectStore(DB_STORE);
            const req = store.delete(key);
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    });
}

// ===== DEFAULT CONTENT STRUCTURE =====
const DEFAULT_CONTENT = {
    hero: {
        bgImage: '',
        badgeText: 'Top 3 Bodybuilding – Kurdistan',
        titleLine1: 'Transform Your Body.',
        titleLine2: 'Elevate Your Life.',
        subtitle: 'Personal Lifting & Bodybuilding Coach — Erbil, Kurdistan',
        btn1Text: 'Start Your Journey',
        btn2Text: 'View Programs'
    },
    about: {
        photo: '',
        sectionLabel: 'About Me',
        title: "I'm Alan Yassin Gardi",
        bio1: "I'm a dedicated bodybuilder and personal coach based in Erbil, Kurdistan. With over 5 years of hands-on experience and a <strong>Top 3 ranking in Kurdistan bodybuilding</strong>, I've helped hundreds of clients transform their bodies and build confidence.",
        bio2: "My approach is built on discipline, science-backed training, and personalized attention — because no two bodies are the same. Whether you're just starting your fitness journey or pushing towards competition, I'll design a program that gets you real, lasting results.",
        stat1Number: '5', stat1Suffix: '+', stat1Label: 'Years Experience',
        stat2Icon: '🏆', stat2Text: 'Top 3', stat2Label: 'Kurdistan Bodybuilding',
        stat3Number: '100', stat3Suffix: '+', stat3Label: 'Clients Transformed',
        stat4Number: '1000', stat4Suffix: '+', stat4Label: 'Programs Designed'
    },
    programs: {
        sectionLabel: 'What I Offer',
        title: 'Coaching Programs',
        desc: 'Tailored programs designed to fit your goals, schedule, and lifestyle. No cookie-cutter plans — only results.',
        cards: [
            {
                title: '1-on-1 Personal Training',
                desc: 'In-person sessions in Erbil with customized workout plans, form correction, and direct coaching. The fastest path to your goals.',
                features: ['Customized workout plans', 'Real-time form correction', 'Direct 1-on-1 coaching', 'Progress tracking'],
                badge: ''
            },
            {
                title: 'Online Coaching Program',
                desc: 'Remote coaching with weekly check-ins, personalized workout plans, and progress tracking for clients anywhere in the world.',
                features: ['Weekly video check-ins', 'Personalized workout plans', 'Progress photo reviews', '24/7 messaging support'],
                badge: 'Most Popular'
            },
            {
                title: 'Custom Meal & Workout Plans',
                desc: 'Tailored nutrition and training plans designed for your body type, goals, and lifestyle. Eat right, train smart, see results.',
                features: ['Personalized meal plans', 'Macro & calorie targets', 'Custom training splits', 'Monthly plan updates'],
                badge: ''
            },
            {
                title: 'Group Training Sessions',
                desc: 'High-energy small group sessions for motivation, accountability, and results. Train with others who share your drive.',
                features: ['Small group (4-8 people)', 'High-energy sessions', 'Built-in accountability', 'Community support'],
                badge: ''
            }
        ]
    },
    transformations: {
        sectionLabel: 'Transformations',
        title: 'Real People. Real Results.',
        desc: 'These transformations speak for themselves. Discipline + consistency + the right program = unstoppable results.',
        cards: [
            { name: 'Mohammed K.', duration: '12 Weeks', quote: '"I never thought I could look like this. Alan pushed me to my limits and the results are incredible."', beforeImg: '', afterImg: '' },
            { name: 'Ahmed R.', duration: '16 Weeks', quote: '"Lost 15kg and gained serious muscle. Alan\'s program changed my life completely."', beforeImg: '', afterImg: '' },
            { name: 'Dilan S.', duration: '8 Weeks', quote: '"From zero gym experience to feeling confident and strong. Best decision I ever made."', beforeImg: '', afterImg: '' }
        ]
    },
    testimonials: {
        sectionLabel: 'Testimonials',
        title: 'What My Clients Say',
        cards: [
            { name: 'Haval M.', role: 'Online Coaching Client', quote: '"Alan completely changed my approach to training. I\'ve never felt stronger. His attention to detail and personalized plans are next level."', stars: 5 },
            { name: 'Soran A.', role: '1-on-1 Training Client', quote: '"Best coach in Erbil. He knows exactly what he\'s doing. Professional, motivating, and the results speak for themselves."', stars: 5 },
            { name: 'Karwan J.', role: 'Meal & Workout Plan Client', quote: '"Lost 15kg in 3 months with Alan\'s program. Life changing. I went from being insecure to feeling like a completely new person."', stars: 5 },
            { name: 'Dana F.', role: 'Group Training Client', quote: '"I tried multiple coaches before Alan. None of them gave me the attention and knowledge that he does. My physique has completely transformed."', stars: 5 },
            { name: 'Rebwar T.', role: 'Online Coaching Client', quote: '"As someone who lives abroad, Alan\'s online coaching made it possible for me to get world-class training remotely. Incredible experience."', stars: 5 }
        ]
    },
    achievements: {
        sectionLabel: 'Credentials',
        title: 'Achievements & Credentials',
        desc: 'Proven results, competition-tested discipline, and years of dedication to the craft.',
        cards: [
            { title: '🏆 Top 3 Bodybuilding', desc: 'Kurdistan Region', tag: 'Competition Achievement' },
            { title: '5+ Years', desc: 'Professional Experience', tag: 'Training & Coaching' },
            { title: 'Based in Erbil', desc: 'Training Clients Locally & Worldwide', tag: 'Local & Remote' },
            { title: '100+ Clients', desc: 'Successfully Transformed', tag: 'Proven Results' }
        ]
    },
    gallery: {
        sectionLabel: 'Gallery',
        title: 'Inside the Grind',
        desc: 'Follow the journey on social media. Every rep, every set, every step closer to greatness.',
        images: ['', '', '', '', '', '', '', '', ''],
        instagramUrl: 'https://instagram.com/alangardiiii',
        tiktokUrl: 'https://tiktok.com/@alangardiii'
    },
    contact: {
        sectionLabel: 'Get In Touch',
        title: 'Start Your Transformation',
        desc: 'Ready to take the first step? Fill out the form below and I\'ll get back to you within 24 hours.',
        phone: '+964 750 263 8582',
        whatsappNumber: '9647502638582',
        location: 'Erbil, Rasty, Kurdistan Region, Iraq',
        instagram: '@alangardiiii',
        tiktok: '@alangardiii',
        services: ['1-on-1 Personal Training', 'Online Coaching', 'Meal & Workout Plans', 'Group Training', 'Other']
    },
    seo: {
        metaTitle: 'Alan Lifting | Personal Lifting & Gym Coach in Erbil',
        metaDesc: 'Transform your body with Alan Yassin Gardi — Top 3 bodybuilder in Kurdistan with 5+ years of experience. Personal training, online coaching, and custom plans in Erbil.',
        copyright: '© 2026 Alan Lifting. All rights reserved.',
        footerTagline: 'Discipline. Consistency. Results.\nPersonal Lifting & Bodybuilding Coach — Erbil, Kurdistan.'
    }
};

// ===== STATE =====
let content = {};
let currentTab = 'hero';

// ===== HELPERS =====
function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function getContent() {
    // Synchronous fallback: try localStorage first for initial load
    try {
        const saved = localStorage.getItem(CONTENT_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return deepMerge(deepClone(DEFAULT_CONTENT), parsed);
        }
    } catch (e) { console.error('Error loading content from localStorage:', e); }
    return deepClone(DEFAULT_CONTENT);
}

async function getContentAsync() {
    // Try IndexedDB first (has the full data with images)
    try {
        const saved = await idbGet(CONTENT_KEY);
        if (saved) {
            return deepMerge(deepClone(DEFAULT_CONTENT), saved);
        }
    } catch (e) { console.error('Error loading from IndexedDB:', e); }
    // Fallback to localStorage
    return getContent();
}

async function saveContent(data) {
    try {
        // Save to IndexedDB (unlimited storage — handles large images)
        await idbSet(CONTENT_KEY, JSON.parse(JSON.stringify(data)));
        // Also save a lightweight copy to localStorage (without large images)
        // so the main site can do a fast initial load
        try {
            const lightweight = JSON.parse(JSON.stringify(data));
            stripLargeImages(lightweight);
            localStorage.setItem(CONTENT_KEY, JSON.stringify(lightweight));
        } catch (lsErr) {
            // localStorage might be full — that's OK, IndexedDB has it
            console.warn('localStorage save skipped (quota):', lsErr.message);
        }
        return true;
    } catch (e) {
        showToast('Error saving content: ' + e.message, 'error');
        return false;
    }
}

function stripLargeImages(obj) {
    // Remove base64 image data from a lightweight copy (keeps paths like 'images/...')
    const IMG_THRESHOLD = 500; // strings longer than this that start with data: are images
    for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].length > IMG_THRESHOLD && obj[key].startsWith('data:')) {
            obj[key] = ''; // strip it from the lightweight copy
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item, i) => {
                if (typeof item === 'string' && item.length > IMG_THRESHOLD && item.startsWith('data:')) {
                    obj[key][i] = '';
                } else if (typeof item === 'object' && item !== null) {
                    stripLargeImages(item);
                }
            });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            stripLargeImages(obj[key]);
        }
    }
}

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

function getPassword() {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== IMAGE HANDLING =====
function handleImageUpload(file, callback) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file.', 'error');
        return;
    }
    // No size limit — IndexedDB can handle any image size
    // We still convert to JPEG for reasonable compression, but preserve full resolution
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
            callback(dataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    // Load from IndexedDB (async, has full image data)
    content = await getContentAsync();
    setupLogin();
    setupNavigation();
    setupSave();
    setupImageUploads();
    setupSettings();
    populateAllForms();
    renderDynamicSections();

    // Migrate: if localStorage has data but IndexedDB doesn't, migrate it
    try {
        const idbData = await idbGet(CONTENT_KEY);
        if (!idbData) {
            const lsData = localStorage.getItem(CONTENT_KEY);
            if (lsData) {
                await idbSet(CONTENT_KEY, JSON.parse(lsData));
                console.log('Migrated content from localStorage to IndexedDB');
            }
        }
    } catch (e) { console.warn('Migration check failed:', e); }
});

// ===== LOGIN =====
function setupLogin() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('btn-logout');

    // Check if already logged in
    if (sessionStorage.getItem('alanlifting_logged_in') === 'true') {
        showDashboard();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pw = document.getElementById('login-password').value;
        if (pw === getPassword()) {
            sessionStorage.setItem('alanlifting_logged_in', 'true');
            showDashboard();
            loginError.style.display = 'none';
        } else {
            loginError.style.display = 'block';
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('alanlifting_logged_in');
        location.reload();
    });
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'flex';
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const panels = document.querySelectorAll('.panel');
    const pageTitle = document.getElementById('page-title');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;
            currentTab = tab;

            // Update active nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Update panel
            panels.forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(`panel-${tab}`);
            if (panel) {
                panel.classList.add('active');
                // Re-trigger animation
                panel.style.animation = 'none';
                panel.offsetHeight;
                panel.style.animation = '';
            }

            // Update title
            pageTitle.textContent = item.textContent.trim();

            // Close mobile sidebar
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    });

    // Mobile menu
    mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
}

// ===== POPULATE FORMS =====
function populateAllForms() {
    // Fill all simple fields — only actual form inputs, not wrapper divs
    document.querySelectorAll('input[data-field], textarea[data-field], select[data-field]').forEach(input => {
        const keys = input.dataset.field.split('.');
        let val = content;
        for (const k of keys) {
            val = val ? val[k] : '';
        }
        if (val !== undefined && val !== null) {
            if (input.tagName === 'TEXTAREA') {
                input.value = val;
            } else {
                input.value = val;
            }
        }
    });

    // Fill image previews
    fillImagePreview('hero.bgImage', 'preview-hero-bg');
    fillImagePreview('about.photo', 'preview-about-photo');

    // Gallery images
    renderGalleryUploadGrid();

    // Services list
    renderServicesList();
}

function fillImagePreview(field, previewId) {
    const keys = field.split('.');
    let val = content;
    for (const k of keys) val = val ? val[k] : '';

    const preview = document.getElementById(previewId);
    if (!preview) return;
    const img = preview.querySelector('img');
    const removeBtn = preview.parentElement.querySelector('.btn-remove-img');

    if (val) {
        img.src = val;
        preview.classList.add('has-image');
        if (removeBtn) removeBtn.style.display = 'inline-flex';
    } else {
        img.src = '';
        preview.classList.remove('has-image');
        if (removeBtn) removeBtn.style.display = 'none';
    }
}

// ===== RENDER DYNAMIC SECTIONS =====
function renderDynamicSections() {
    renderProgramCards();
    renderTransformationCards();
    renderTestimonialCards();
    renderAchievementCards();
}

function renderProgramCards() {
    const container = document.getElementById('programs-cards-container');
    container.innerHTML = '';
    content.programs.cards.forEach((card, i) => {
        const div = document.createElement('div');
        div.className = 'panel-section dynamic-card';
        div.innerHTML = `
            <div class="dynamic-card-header">
                <h3>Program ${i + 1}</h3>
                ${content.programs.cards.length > 1 ? `<button class="btn-remove-card" data-type="programs" data-index="${i}">Remove</button>` : ''}
            </div>
            <div class="form-grid">
                <div class="form-group"><label>Title</label><input type="text" data-array="programs.cards.${i}.title" value="${escapeHtml(card.title)}"></div>
                <div class="form-group"><label>Badge (optional)</label><input type="text" data-array="programs.cards.${i}.badge" value="${escapeHtml(card.badge)}" placeholder="e.g. Most Popular"></div>
                <div class="form-group full"><label>Description</label><textarea data-array="programs.cards.${i}.desc" rows="2">${escapeHtml(card.desc)}</textarea></div>
                <div class="form-group full"><label>Features (one per line)</label><textarea data-array="programs.cards.${i}.features" rows="4">${card.features.join('\n')}</textarea></div>
            </div>
        `;
        container.appendChild(div);
    });
    attachRemoveCardListeners();
}

function renderTransformationCards() {
    const container = document.getElementById('transformations-cards-container');
    container.innerHTML = '';
    content.transformations.cards.forEach((card, i) => {
        const div = document.createElement('div');
        div.className = 'panel-section dynamic-card';
        div.innerHTML = `
            <div class="dynamic-card-header">
                <h3>Transformation ${i + 1}</h3>
                ${content.transformations.cards.length > 1 ? `<button class="btn-remove-card" data-type="transformations" data-index="${i}">Remove</button>` : ''}
            </div>
            <div class="form-grid">
                <div class="form-group"><label>Client Name</label><input type="text" data-array="transformations.cards.${i}.name" value="${escapeHtml(card.name)}"></div>
                <div class="form-group"><label>Duration</label><input type="text" data-array="transformations.cards.${i}.duration" value="${escapeHtml(card.duration)}"></div>
                <div class="form-group full"><label>Quote</label><textarea data-array="transformations.cards.${i}.quote" rows="2">${escapeHtml(card.quote)}</textarea></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
                <div>
                    <label style="font-size:0.8rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px;">Before Image</label>
                    <div class="image-preview square trans-img-preview ${card.beforeImg ? 'has-image' : ''}" data-trans-img="transformations.cards.${i}.beforeImg">
                        <img src="${card.beforeImg || ''}" alt="Before">
                        <div class="image-placeholder"><span>Upload Before</span></div>
                    </div>
                    <input type="file" accept="image/*" class="file-input trans-file-input" data-trans-target="transformations.cards.${i}.beforeImg" style="display:none">
                </div>
                <div>
                    <label style="font-size:0.8rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px;">After Image</label>
                    <div class="image-preview square trans-img-preview ${card.afterImg ? 'has-image' : ''}" data-trans-img="transformations.cards.${i}.afterImg">
                        <img src="${card.afterImg || ''}" alt="After">
                        <div class="image-placeholder"><span>Upload After</span></div>
                    </div>
                    <input type="file" accept="image/*" class="file-input trans-file-input" data-trans-target="transformations.cards.${i}.afterImg" style="display:none">
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    attachRemoveCardListeners();
    attachTransformationImageListeners();
}

function renderTestimonialCards() {
    const container = document.getElementById('testimonials-cards-container');
    container.innerHTML = '';
    content.testimonials.cards.forEach((card, i) => {
        const div = document.createElement('div');
        div.className = 'panel-section dynamic-card';
        div.innerHTML = `
            <div class="dynamic-card-header">
                <h3>Testimonial ${i + 1}</h3>
                ${content.testimonials.cards.length > 1 ? `<button class="btn-remove-card" data-type="testimonials" data-index="${i}">Remove</button>` : ''}
            </div>
            <div class="form-grid">
                <div class="form-group"><label>Client Name</label><input type="text" data-array="testimonials.cards.${i}.name" value="${escapeHtml(card.name)}"></div>
                <div class="form-group"><label>Role / Service</label><input type="text" data-array="testimonials.cards.${i}.role" value="${escapeHtml(card.role)}"></div>
                <div class="form-group full"><label>Quote</label><textarea data-array="testimonials.cards.${i}.quote" rows="3">${escapeHtml(card.quote)}</textarea></div>
                <div class="form-group"><label>Stars (1-5)</label><input type="number" min="1" max="5" data-array="testimonials.cards.${i}.stars" value="${card.stars}"></div>
            </div>
        `;
        container.appendChild(div);
    });
    attachRemoveCardListeners();
}

function renderAchievementCards() {
    const container = document.getElementById('achievements-cards-container');
    container.innerHTML = '';
    content.achievements.cards.forEach((card, i) => {
        const div = document.createElement('div');
        div.className = 'panel-section dynamic-card';
        div.innerHTML = `
            <div class="dynamic-card-header">
                <h3>Achievement ${i + 1}</h3>
                ${content.achievements.cards.length > 1 ? `<button class="btn-remove-card" data-type="achievements" data-index="${i}">Remove</button>` : ''}
            </div>
            <div class="form-grid">
                <div class="form-group"><label>Title</label><input type="text" data-array="achievements.cards.${i}.title" value="${escapeHtml(card.title)}"></div>
                <div class="form-group"><label>Description</label><input type="text" data-array="achievements.cards.${i}.desc" value="${escapeHtml(card.desc)}"></div>
                <div class="form-group"><label>Tag</label><input type="text" data-array="achievements.cards.${i}.tag" value="${escapeHtml(card.tag)}"></div>
            </div>
        `;
        container.appendChild(div);
    });
    attachRemoveCardListeners();
}

function renderGalleryUploadGrid() {
    const grid = document.getElementById('gallery-upload-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const imgSrc = content.gallery.images[i] || '';
        const item = document.createElement('div');
        item.className = `gallery-upload-item ${imgSrc ? 'has-image' : ''}`;
        item.dataset.index = i;
        item.innerHTML = `
            <img src="${imgSrc}" alt="Gallery image ${i + 1}">
            <div class="gallery-upload-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>${i + 1}</span>
            </div>
            <button class="btn-remove-gallery-img" data-gallery-index="${i}">&times;</button>
        `;
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove-gallery-img')) return;
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (ev) => {
                handleImageUpload(ev.target.files[0], (dataUrl) => {
                    content.gallery.images[i] = dataUrl;
                    renderGalleryUploadGrid();
                    showToast(`Gallery image ${i + 1} updated`, 'success');
                });
            };
            input.click();
        });
        grid.appendChild(item);
    }

    // Remove buttons
    grid.querySelectorAll('.btn-remove-gallery-img').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.galleryIndex);
            content.gallery.images[idx] = '';
            renderGalleryUploadGrid();
            showToast(`Gallery image ${idx + 1} removed`, 'info');
        });
    });
}

function renderServicesList() {
    const container = document.getElementById('services-list-container');
    container.innerHTML = '';
    (content.contact.services || []).forEach((svc, i) => {
        const div = document.createElement('div');
        div.className = 'service-item';
        div.innerHTML = `
            <input type="text" data-service-index="${i}" value="${escapeHtml(svc)}" placeholder="Service name">
            <button class="btn-remove-service" data-service-index="${i}">&times;</button>
        `;
        container.appendChild(div);
    });

    container.querySelectorAll('.btn-remove-service').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.serviceIndex);
            content.contact.services.splice(idx, 1);
            renderServicesList();
        });
    });

    container.querySelectorAll('input[data-service-index]').forEach(input => {
        input.addEventListener('input', () => {
            content.contact.services[parseInt(input.dataset.serviceIndex)] = input.value;
        });
    });
}

// ===== ADD/REMOVE DYNAMIC ITEMS =====
function attachRemoveCardListeners() {
    document.querySelectorAll('.btn-remove-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const index = parseInt(btn.dataset.index);
            if (confirm(`Remove this ${type.slice(0, -1)}?`)) {
                content[type].cards.splice(index, 1);
                renderDynamicSections();
                showToast(`Item removed`, 'info');
            }
        });
    });
}

// Add transformation
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-add-transformation')?.addEventListener('click', () => {
        content.transformations.cards.push({
            name: 'New Client', duration: '12 Weeks',
            quote: '"Enter testimonial here..."',
            beforeImg: '', afterImg: ''
        });
        renderTransformationCards();
        showToast('Transformation added', 'success');
    });

    document.getElementById('btn-add-testimonial')?.addEventListener('click', () => {
        content.testimonials.cards.push({
            name: 'New Client', role: 'Training Client',
            quote: '"Enter review here..."', stars: 5
        });
        renderTestimonialCards();
        showToast('Testimonial added', 'success');
    });

    document.getElementById('btn-add-achievement')?.addEventListener('click', () => {
        content.achievements.cards.push({
            title: 'New Achievement', desc: 'Description', tag: 'Tag'
        });
        renderAchievementCards();
        showToast('Achievement added', 'success');
    });

    document.getElementById('btn-add-service')?.addEventListener('click', () => {
        if (!content.contact.services) content.contact.services = [];
        content.contact.services.push('New Service');
        renderServicesList();
        showToast('Service option added', 'success');
    });
});

// ===== IMAGE UPLOADS =====
function setupImageUploads() {
    // Hero bg
    setupSingleImageUpload('preview-hero-bg', 'hero.bgImage');
    // About photo
    setupSingleImageUpload('preview-about-photo', 'about.photo');

    // Remove image buttons
    document.querySelectorAll('.btn-remove-img').forEach(btn => {
        btn.addEventListener('click', () => {
            const field = btn.dataset.target;
            setNestedValue(content, field, '');
            const previewId = btn.closest('.image-upload').querySelector('.image-preview').id;
            fillImagePreview(field, previewId);
            showToast('Image removed', 'info');
        });
    });
}

function setupSingleImageUpload(previewId, field) {
    const preview = document.getElementById(previewId);
    if (!preview) return;
    const fileInput = preview.parentElement.querySelector('.file-input');

    preview.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        handleImageUpload(file, (dataUrl) => {
            setNestedValue(content, field, dataUrl);
            fillImagePreview(field, previewId);
            showToast('Image uploaded successfully', 'success');
        });
    });

    // Drag & drop
    preview.addEventListener('dragover', (e) => { e.preventDefault(); preview.style.borderColor = 'var(--gold)'; });
    preview.addEventListener('dragleave', () => { preview.style.borderColor = ''; });
    preview.addEventListener('drop', (e) => {
        e.preventDefault();
        preview.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        if (!file) return;
        handleImageUpload(file, (dataUrl) => {
            setNestedValue(content, field, dataUrl);
            fillImagePreview(field, previewId);
            showToast('Image uploaded successfully', 'success');
        });
    });
}

function attachTransformationImageListeners() {
    document.querySelectorAll('.trans-img-preview').forEach(preview => {
        const field = preview.dataset.transImg;
        const fileInput = preview.parentElement.querySelector('.trans-file-input');

        preview.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            handleImageUpload(file, (dataUrl) => {
                setNestedValue(content, field, dataUrl);
                renderTransformationCards();
                showToast('Image uploaded', 'success');
            });
        });
    });
}

// ===== SAVE =====
function setupSave() {
    document.getElementById('btn-save').addEventListener('click', async () => {
        collectFormData();
        const result = await saveContent(content);
        if (result) {
            showToast('All changes saved successfully!', 'success');
        }
    });

    document.getElementById('btn-reset-section').addEventListener('click', () => {
        if (confirm(`Reset the "${currentTab}" section to defaults?`)) {
            const defaults = deepClone(DEFAULT_CONTENT);
            if (defaults[currentTab]) {
                content[currentTab] = defaults[currentTab];
                populateAllForms();
                renderDynamicSections();
                showToast(`${currentTab} section reset to defaults`, 'info');
            }
        }
    });
}

function collectFormData() {
    // Simple fields — only actual form inputs, not wrapper divs
    document.querySelectorAll('input[data-field], textarea[data-field], select[data-field]').forEach(input => {
        const field = input.dataset.field;
        setNestedValue(content, field, input.value);
    });

    // Array fields (dynamic cards)
    document.querySelectorAll('[data-array]').forEach(input => {
        const path = input.dataset.array;
        let val = input.value;

        // Special handling for features (newline-separated)
        if (path.endsWith('.features')) {
            val = val.split('\n').filter(line => line.trim() !== '');
        }
        // Special handling for stars (number)
        if (path.endsWith('.stars')) {
            val = parseInt(val) || 5;
        }

        setNestedValue(content, path, val);
    });

    // Auto-update social URLs based on handles to keep links in sync
    if (content.contact) {
        if (content.contact.instagram) {
            const username = content.contact.instagram.replace(/^@/, '');
            setNestedValue(content, 'gallery.instagramUrl', `https://instagram.com/${username}`);
            // Also update the input field so the user sees it next time
            const instInput = document.querySelector('input[data-field="gallery.instagramUrl"]');
            if (instInput) instInput.value = content.gallery.instagramUrl;
        }
        if (content.contact.tiktok) {
            const username = content.contact.tiktok.replace(/^@/, '');
            setNestedValue(content, 'gallery.tiktokUrl', `https://tiktok.com/@${username}`);
            // Also update the input field so the user sees it next time
            const tikInput = document.querySelector('input[data-field="gallery.tiktokUrl"]');
            if (tikInput) tikInput.value = content.gallery.tiktokUrl;
        }
    }
}

// ===== SETTINGS =====
function setupSettings() {
    // Change password
    document.getElementById('btn-change-pw')?.addEventListener('click', () => {
        const current = document.getElementById('settings-current-pw').value;
        const newPw = document.getElementById('settings-new-pw').value;

        if (current !== getPassword()) {
            showToast('Current password is incorrect', 'error');
            return;
        }
        if (newPw.length < 4) {
            showToast('New password must be at least 4 characters', 'error');
            return;
        }
        localStorage.setItem(PASSWORD_KEY, newPw);
        document.getElementById('settings-current-pw').value = '';
        document.getElementById('settings-new-pw').value = '';
        showToast('Password updated successfully!', 'success');
    });

    // Export
    document.getElementById('btn-export')?.addEventListener('click', () => {
        collectFormData();
        const dataStr = JSON.stringify(content, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alanlifting-content-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Content exported successfully', 'success');
    });

    // Import
    document.getElementById('import-file')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const imported = JSON.parse(ev.target.result);
                content = deepMerge(deepClone(DEFAULT_CONTENT), imported);
                saveContent(content);
                populateAllForms();
                renderDynamicSections();
                showToast('Content imported successfully!', 'success');
            } catch (err) {
                showToast('Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    // Reset all
    document.getElementById('btn-reset-all')?.addEventListener('click', async () => {
        if (confirm('⚠️ This will reset ALL content to defaults. Are you sure?')) {
            if (confirm('This action CANNOT be undone. Proceed?')) {
                localStorage.removeItem(CONTENT_KEY);
                try { await idbDelete(CONTENT_KEY); } catch(e) {}
                content = deepClone(DEFAULT_CONTENT);
                populateAllForms();
                renderDynamicSections();
                showToast('All content reset to defaults', 'info');
            }
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];
        if (!isNaN(nextKey)) {
            if (!Array.isArray(current[key])) current[key] = [];
        } else {
            if (!current[key] || typeof current[key] !== 'object') current[key] = {};
        }
        current = current[key];
    }
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
}

function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
