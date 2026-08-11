/* ==========================================================================
   AI NEGOTIATION CHALLENGE - HIGH-SPEED INTERACTIVE STORY ENGINE
   High-performance GSAP transitions, instant preloader, streamlined buttons.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. STATE & APP CONFIG ================= */
    const state = {
        currentScene: 1,
        totalScenes: 4,
        isAnimating: false,
        formSubmitted: false
    };

    // Dummy Audio Stub (Audio Removed as Requested)
    const audio = {
        playClickSFX: () => {},
        playWhooshSFX: () => {},
        playSuccessFanfare: () => {}
    };

    /* ================= 3. AI PARTICLE CANVAS BACKGROUND ================= */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.color = Math.random() > 0.5 ? '#a855f7' : '#06b6d4';
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 50);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = (1 - dist / 110) * 0.2;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ================= 4. CUSTOM CURSOR & MOUSE GLOW ================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorGlow = document.getElementById('cursor-glow');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouse.x = mouseX;
        mouse.y = mouseY;

        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursorGlow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderCursorRing() {
        ringX += (mouseX - ringX) * 0.25;
        ringY += (mouseY - ringY) * 0.25;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover detection
    document.querySelectorAll('button, a, input, select, .poster-card-3d').forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('hovered-link'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('hovered-link'));
    });

    /* ================= 5. HIGH-SPEED PRELOADER ================= */
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');

    if (progressBar) progressBar.style.width = '100%';
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            preloader.style.pointerEvents = 'none';
            preloader.style.display = 'none';
        }
        document.body.classList.remove('loading');
        initScene1();
    }, 150);

    /* ================= 6. 3D POSTER TILT EFFECT ================= */
    const posterCard = document.getElementById('hero-poster-card');
    if (posterCard) {
        posterCard.addEventListener('mousemove', (e) => {
            const rect = posterCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            posterCard.style.transform = `rotateX(${(-y / rect.height) * 15}deg) rotateY(${(x / rect.width) * 15}deg) scale(1.02)`;
        });

        posterCard.addEventListener('mouseleave', () => {
            posterCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    /* ================= 7. SCENE CONTROLLER & HIGH-SPEED GSAP ================= */
    function goToScene(targetScene) {
        if (targetScene === state.currentScene || state.isAnimating) return;
        state.isAnimating = true;
        audio.playWhooshSFX();

        const currentElem = document.getElementById(`scene-${state.currentScene}`);
        const nextElem = document.getElementById(`scene-${targetScene}`);

        // Rapid transition
        gsap.to(currentElem, {
            opacity: 0,
            duration: 0.25,
            ease: 'power1.in',
            onComplete: () => {
                currentElem.classList.remove('active-scene');
                
                nextElem.classList.add('active-scene');
                gsap.fromTo(nextElem, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.25,
                    ease: 'power1.out',
                    onComplete: () => {
                        state.currentScene = targetScene;
                        state.isAnimating = false;
                        triggerSceneEvents(targetScene);
                    }
                });
            }
        });
    }

    function triggerSceneEvents(sceneId) {
        if (sceneId === 1) {
            initScene1();
        } else if (sceneId === 2) {
            initScene2BoyWalk();
        } else if (sceneId === 3) {
            initScene3Briefcase();
        } else if (sceneId === 4) {
            initScene4Form();
        }
    }

    // Direct Action Buttons Navigation
    const startStoryBtn = document.getElementById('start-story-btn');
    if (startStoryBtn) startStoryBtn.addEventListener('click', () => goToScene(2));

    const toScene3Btn = document.getElementById('to-scene-3-btn');
    if (toScene3Btn) toScene3Btn.addEventListener('click', () => goToScene(3));

    const openBriefcaseBtn = document.getElementById('open-briefcase-btn');
    if (openBriefcaseBtn) {
        openBriefcaseBtn.addEventListener('click', () => {
            audio.playClickSFX();
            triggerBriefcaseOpenSequence();
        });
    }

    // Fast Wheel / Keyboard Navigation
    let wheelTimeout;
    window.addEventListener('wheel', (e) => {
        if (state.isAnimating || state.formSubmitted) return;
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 20 && state.currentScene < state.totalScenes) {
                goToScene(state.currentScene + 1);
            } else if (e.deltaY < -20 && state.currentScene > 1) {
                goToScene(state.currentScene - 1);
            }
        }, 50);
    });

    /* ================= SCENE 1 ANIMATION ================= */
    function initScene1() {
        gsap.fromTo('.welcome-header', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.4 });
        gsap.fromTo('.poster-card-wrapper', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 });
        gsap.fromTo('.scene-actions', { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.2 });
    }

    /* ================= SCENE 2: FAST BOY WALKING ANIMATION ================= */
    let walkTimeline = null;
    function initScene2BoyWalk() {
        const charWrapper = document.getElementById('character-wrapper');
        const legLeft = document.getElementById('leg-left');
        const legRight = document.getElementById('leg-right');
        const armLeft = document.getElementById('boy-left-arm');
        const armRight = document.getElementById('boy-right-arm');
        const boyCharacter = document.getElementById('boy-character');

        gsap.set(charWrapper, { x: -350 });
        gsap.set([legLeft, legRight, armLeft, armRight], { rotation: 0, transformOrigin: 'top center' });

        if (walkTimeline) walkTimeline.kill();
        walkTimeline = gsap.timeline();

        // 1. Move character fast to center
        walkTimeline.to(charWrapper, {
            x: 0,
            duration: 1.1,
            ease: 'power2.out'
        }, 0);

        // 2. Leg & Arm Swing Loop
        const walkCycle = gsap.timeline({ repeat: 4, yoyo: true });
        walkCycle.to(legLeft, { rotation: 25, duration: 0.13 }, 0)
                 .to(legRight, { rotation: -25, duration: 0.13 }, 0)
                 .to(armLeft, { rotation: -20, duration: 0.13 }, 0)
                 .to(armRight, { rotation: 20, duration: 0.13 }, 0)
                 .to(boyCharacter, { y: -6, duration: 0.13 }, 0);

        walkTimeline.add(walkCycle, 0);

        // 3. Stop at center
        walkTimeline.to([legLeft, legRight, armLeft, armRight, boyCharacter], {
            rotation: 0,
            y: 0,
            duration: 0.2
        }, 1.1);
    }

    /* ================= SCENE 3: FAST BRIEFCASE UNLOCK & LIGHT BEAM ================= */
    function initScene3Briefcase() {
        const briefcase3D = document.getElementById('briefcase-3d');
        const lightBeam = document.getElementById('light-beam');
        
        briefcase3D.classList.remove('open');
        lightBeam.classList.remove('active');

        gsap.fromTo('.cyber-pedestal', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.fromTo('#pedestal-briefcase-container', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    }

    function triggerBriefcaseOpenSequence() {
        const briefcase3D = document.getElementById('briefcase-3d');
        const lightBeam = document.getElementById('light-beam');
        const beamParticlesContainer = document.getElementById('beam-particles');

        briefcase3D.classList.add('open');
        lightBeam.classList.add('active');
        audio.playWhooshSFX();

        spawnBeamParticles(beamParticlesContainer);

        // Instant auto transition to Scene 4
        setTimeout(() => {
            goToScene(4);
        }, 600);
    }

    function spawnBeamParticles(container) {
        container.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'beam-particle';
            p.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${Math.random() * 100}%;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: ${Math.random() > 0.5 ? '#c084fc' : '#38bdf8'};
                border-radius: 50%;
                opacity: 0.8;
            `;
            container.appendChild(p);

            gsap.to(p, {
                y: -250 - Math.random() * 80,
                x: (Math.random() - 0.5) * 50,
                opacity: 0,
                duration: Math.random() * 0.8 + 0.4,
                ease: 'power1.out'
            });
        }
    }

    /* ================= SCENE 4: FORM EMERGENCE ================= */
    function initScene4Form() {
        const card = document.getElementById('registration-card');
        card.classList.add('visible');
    }

    /* ================= 8. FORM VALIDATION, CAPACITY LIMIT & RIPPLE EFFECT ================= */
    const MAX_CAPACITY = 50;
    const form = document.getElementById('registration-form');
    const inputs = form ? form.querySelectorAll('.form-control-input') : [];
    const seatsCounterText = document.getElementById('seats-left-text');
    const seatsCounterBadge = document.getElementById('seats-counter-badge');
    const seatsFullBanner = document.getElementById('seats-full-banner');
    const submitBtn = document.getElementById('submit-btn');

    function updateSeatAvailability() {
        const currentCount = getRegistrations().length;
        const remaining = Math.max(0, MAX_CAPACITY - currentCount);

        if (seatsCounterText) {
            if (remaining > 0) {
                seatsCounterText.textContent = `Seats Available: ${remaining} / ${MAX_CAPACITY}`;
                if (seatsCounterBadge) seatsCounterBadge.classList.remove('full');
                if (seatsFullBanner) seatsFullBanner.style.display = 'none';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                    submitBtn.querySelector('.btn-content span').textContent = 'Register Now';
                }
            } else {
                seatsCounterText.textContent = `Registration Full (${MAX_CAPACITY} / ${MAX_CAPACITY})`;
                if (seatsCounterBadge) seatsCounterBadge.classList.add('full');
                if (seatsFullBanner) seatsFullBanner.style.display = 'flex';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.5';
                    submitBtn.style.pointerEvents = 'none';
                    submitBtn.querySelector('.btn-content span').textContent = 'Registration Closed (50/50)';
                }
                inputs.forEach(i => i.disabled = true);
            }
        }
    }

    // Initial check on load
    updateSeatAvailability();

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const parent = input.closest('.input-group');
            if (parent) parent.classList.remove('invalid');
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-circle';
            const diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;

            const container = this.querySelector('.btn-ripple-container');
            if (container) {
                container.appendChild(ripple);
                setTimeout(() => ripple.remove(), 400);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check Capacity
            const currentCount = getRegistrations().length;
            if (currentCount >= MAX_CAPACITY) {
                updateSeatAvailability();
                alert('Registration Closed! Maximum limit of 50 participants has been reached.');
                return;
            }

            let isValid = true;

            const fullName = document.getElementById('fullName');
            const division = document.getElementById('division');
            const rbtNumber = document.getElementById('rbtNumber');
            const rollNumber = document.getElementById('rollNumber');
            const collegeEmail = document.getElementById('collegeEmail');
            const phoneNumber = document.getElementById('phoneNumber');

            const fields = [fullName, division, rbtNumber, rollNumber, collegeEmail, phoneNumber];
            fields.forEach(field => {
                const group = field.closest('.input-group');
                if (!field.value || field.value.trim() === '') {
                    group.classList.add('invalid');
                    isValid = false;
                } else {
                    group.classList.remove('invalid');
                }
            });

            if (collegeEmail.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(collegeEmail.value.trim())) {
                collegeEmail.closest('.input-group').classList.add('invalid');
                isValid = false;
            }

            if (phoneNumber.value && !/^[0-9]{10}$/.test(phoneNumber.value.trim())) {
                phoneNumber.closest('.input-group').classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                const regData = {
                    name: fullName.value.trim(),
                    division: division.value,
                    rbt: rbtNumber.value.trim(),
                    roll: rollNumber.value.trim(),
                    email: collegeEmail.value.trim(),
                    phone: phoneNumber.value.trim(),
                    timestamp: new Date().toLocaleString()
                };

                // Save to LocalStorage
                saveRegistration(regData);

                // Update Seat Badge
                updateSeatAvailability();

                triggerSuccessSequence(regData);
            }
        });
    }

    /* ================= 9. DATA STORAGE & GOOGLE SHEETS WEBHOOK ================= */
    // Paste your deployed Google Apps Script Web App URL below to send registrations live to Google Sheets!
    const GOOGLE_SHEET_WEBHOOK_URL = ''; 

    function getRegistrations() {
        try {
            const data = localStorage.getItem('workshop_registrations');
            if (data) return JSON.parse(data);
        } catch (e) {
            console.error(e);
        }
        // Initial sample data if empty
        return [
            { name: 'Aditya Jadhav', division: 'A', rbt: 'RBT9988', roll: '45', email: 'aditya@jspm.edu.in', phone: '9876543210', timestamp: '8/6/2026, 10:05:00 AM' },
            { name: 'Ashutosh Bhakare', division: 'B', rbt: 'RBT1001', roll: '01', email: 'ashutosh@opensource.org', phone: '9988776655', timestamp: '8/6/2026, 10:07:30 AM' }
        ];
    }

    // Auto-sync any previously saved local registrations to Google Sheets when user revisits
    function syncExistingLocalRegistrations() {
        if (!GOOGLE_SHEET_WEBHOOK_URL || GOOGLE_SHEET_WEBHOOK_URL.trim() === '') return;
        
        try {
            const rawData = localStorage.getItem('workshop_registrations');
            if (!rawData) return;
            
            const records = JSON.parse(rawData);
            if (!Array.isArray(records)) return;

            let updated = false;
            records.forEach(entry => {
                // Skip default sample records and already synced records
                if (entry.rbt !== 'RBT9988' && entry.rbt !== 'RBT1001' && !entry.synced) {
                    const formData = new URLSearchParams();
                    formData.append('name', entry.name || '');
                    formData.append('division', entry.division || '');
                    formData.append('rbt', entry.rbt || '');
                    formData.append('roll', entry.roll || '');
                    formData.append('email', entry.email || '');
                    formData.append('phone', entry.phone || '');
                    formData.append('timestamp', entry.timestamp || '');

                    fetch(GOOGLE_SHEET_WEBHOOK_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: formData.toString()
                    }).then(() => {
                        entry.synced = true;
                        localStorage.setItem('workshop_registrations', JSON.stringify(records));
                    }).catch(err => console.error('Sync failed for item:', err));
                    
                    updated = true;
                }
            });
        } catch (e) {
            console.error('Auto-sync error:', e);
        }
    }

    // Trigger auto-sync on load
    setTimeout(syncExistingLocalRegistrations, 1000);

    function saveRegistration(entry) {
        // 1. Save to browser LocalStorage (local fallback)
        entry.synced = false;
        const current = getRegistrations();
        current.push(entry);
        localStorage.setItem('workshop_registrations', JSON.stringify(current));

        // 2. Submit to Google Sheets via Webhook (if URL configured)
        if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
            try {
                const formData = new URLSearchParams();
                formData.append('name', entry.name || '');
                formData.append('division', entry.division || '');
                formData.append('rbt', entry.rbt || '');
                formData.append('roll', entry.roll || '');
                formData.append('email', entry.email || '');
                formData.append('phone', entry.phone || '');
                formData.append('timestamp', entry.timestamp || '');

                fetch(GOOGLE_SHEET_WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                }).then(() => {
                    entry.synced = true;
                    localStorage.setItem('workshop_registrations', JSON.stringify(current));
                    console.log('Registration submitted to Google Sheets successfully.');
                }).catch(err => {
                    console.error('Failed to submit to Google Sheets:', err);
                });
            } catch (err) {
                console.error('Google Sheets submission error:', err);
            }
        }
    }

    function downloadRegistrationsCSV() {
        const records = getRegistrations();
        let csvLines = ['Full Name,Division,RBT Number,Roll Number,College Email,Phone Number,Registration Date'];
        
        records.forEach(r => {
            const cleanName = (r.name || '').replace(/"/g, '""');
            const cleanDiv = (r.division || '').replace(/"/g, '""');
            const cleanRbt = (r.rbt || '').replace(/"/g, '""');
            const cleanRoll = (r.roll || '').replace(/"/g, '""');
            const cleanEmail = (r.email || '').replace(/"/g, '""');
            const cleanPhone = (r.phone || '').replace(/"/g, '""');
            const cleanTime = (r.timestamp || '').replace(/"/g, '""');

            csvLines.push(`"${cleanName}","${cleanDiv}","${cleanRbt}","${cleanRoll}","${cleanEmail}","${cleanPhone}","${cleanTime}"`);
        });

        const csvString = csvLines.join('\r\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'registrations.csv');
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    // CSV Download Button Listeners
    const directExportBtn = document.getElementById('direct-export-csv-btn');
    if (directExportBtn) {
        directExportBtn.addEventListener('click', () => {
            audio.playClickSFX();
            downloadRegistrationsCSV();
        });
    }

    const modalDownloadBtn = document.getElementById('modal-download-csv-btn');
    if (modalDownloadBtn) {
        modalDownloadBtn.addEventListener('click', () => {
            audio.playClickSFX();
            downloadRegistrationsCSV();
        });
    }

    /* ================= 10. SUCCESS & CONFETTI CELEBRATION ================= */
    function triggerSuccessSequence(data) {
        state.formSubmitted = true;
        audio.playSuccessFanfare();

        const briefcase3D = document.getElementById('briefcase-3d');
        const lightBeam = document.getElementById('light-beam');
        if (briefcase3D) briefcase3D.classList.remove('open');
        if (lightBeam) lightBeam.classList.remove('active');

        const normalArm = document.getElementById('boy-left-arm');
        const waveArm = document.getElementById('boy-wave-arm');
        if (normalArm && waveArm) {
            normalArm.style.display = 'none';
            waveArm.style.display = 'block';
            waveArm.style.opacity = '1';

            gsap.to(waveArm, {
                rotation: 20,
                transformOrigin: 'bottom center',
                duration: 0.2,
                yoyo: true,
                repeat: 5
            });
        }

        document.getElementById('pass-name-display').textContent = data.name;
        document.getElementById('pass-div-display').textContent = `Division ${data.division}`;
        document.getElementById('pass-rbt-display').textContent = data.rbt;
        document.getElementById('pass-roll-display').textContent = data.roll;
        document.getElementById('ticket-id-display').textContent = `#AI-2026-${Math.floor(Math.random() * 899 + 100)}`;

        const modal = document.getElementById('success-modal');
        modal.classList.add('active');

        launchConfettiBurst();
    }

    function launchConfettiBurst() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#a855f7', '#38bdf8', '#c084fc', '#ffffff']
            });
        }
    }

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('active');
        audio.playClickSFX();
    });

});

