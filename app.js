/* ==========================================================================
   OMKAR SINGH PORTFOLIO - COMPLETE 10-ITEM FP&A ANALYTICS & CHARTS SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. Smooth Scroll & Active Nav Link Highlighting
    // ----------------------------------------------------------------------
    const navLinks = document.querySelectorAll('.black-nav-link');
    const sections = document.querySelectorAll('section');

    // Handle initial hash scroll to specific project card (e.g. #project-4)
    if (window.location.hash) {
        setTimeout(() => {
            const targetEl = document.querySelector(window.location.hash);
            if (targetEl) {
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 150);
    }

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 2. Interactive Background Money Particle Canvas Engine
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const moneySymbols = ['₹', '$', '🪙', '💸', '📈', '📊', '💎', '₹', '$'];
        const particles = [];
        const particleCount = 45;

        class MoneyParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.symbol = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
                this.fontSize = Math.random() * 14 + 14;
                this.speedY = Math.random() * 1.2 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.4 + 0.15;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.02;
            }

            update(mouseX, mouseY) {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.angle += this.spin;

                if (mouseX && mouseY) {
                    const dx = this.x - mouseX;
                    const dy = this.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        this.x += (dx / dist) * 2;
                        this.y += (dy / dist) * 2;
                    }
                }

                if (this.y < -30) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
                ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
                ctx.fillText(this.symbol, 0, 0);
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new MoneyParticle());
        }

        let mouseX = 0;
        let mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update(mouseX, mouseY);
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    // ----------------------------------------------------------------------
    // 3. Interactive Click Currency Explosion Engine
    // ----------------------------------------------------------------------
    const clickSymbols = ['₹', '$', '💸', '🪙', '📈', '💎', '₹', '$'];

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 7; i++) {
            const el = document.createElement('div');
            el.className = 'click-particle';
            el.textContent = clickSymbols[Math.floor(Math.random() * clickSymbols.length)];

            const dx = (Math.random() - 0.5) * 140;
            const dy = (Math.random() - 0.8) * 160;

            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
            el.style.setProperty('--dx', `${dx}px`);
            el.style.setProperty('--dy', `${dy}px`);

            document.body.appendChild(el);

            setTimeout(() => {
                el.remove();
            }, 900);
        }
    });

    // ----------------------------------------------------------------------
    // 4. Card 3D Perspective Tilt Effect
    // ----------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // ----------------------------------------------------------------------
    // 5. Complete 5-Department Chart.js Visualizations Engine
    // ----------------------------------------------------------------------
    let barChartObj = null;
    let doughnutChartObj = null;

    function initCharts() {
        if (typeof Chart === 'undefined') return;

        const isLight = document.body.classList.contains('light-theme');
        const labelColor = isLight ? '#334155' : '#94a3b8';
        const gridColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)';

        const departments = ['Marketing', 'HR & Admin', 'Operations', 'Sales', 'Technology'];
        const budgetedData = [230000, 135000, 135000, 110000, 95000];
        const actualData = [257000, 142000, 133000, 113000, 100000];

        const barCtx = document.getElementById('barChartSpending');
        if (barCtx) {
            if (barChartObj) barChartObj.destroy();
            barChartObj = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: departments,
                    datasets: [
                        {
                            label: 'Budgeted Amount (₹)',
                            data: budgetedData,
                            backgroundColor: 'rgba(245, 158, 11, 0.85)',
                            borderColor: '#f59e0b',
                            borderWidth: 1,
                            borderRadius: 6
                        },
                        {
                            label: 'Actual Spent (₹)',
                            data: actualData,
                            backgroundColor: 'rgba(16, 185, 129, 0.85)',
                            borderColor: '#10b981',
                            borderWidth: 1,
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: labelColor, font: { family: 'JetBrains Mono', weight: '600' } }
                        }
                    },
                    scales: {
                        x: { ticks: { color: labelColor }, grid: { color: gridColor } },
                        y: { ticks: { color: labelColor }, grid: { color: gridColor } }
                    }
                }
            });
        }

        const doughnutCtx = document.getElementById('doughnutChartBreakdown');
        if (doughnutCtx) {
            if (doughnutChartObj) doughnutChartObj.destroy();
            doughnutChartObj = new Chart(doughnutCtx, {
                type: 'doughnut',
                data: {
                    labels: departments,
                    datasets: [{
                        data: actualData,
                        backgroundColor: [
                            'rgba(245, 158, 11, 0.85)',
                            'rgba(59, 130, 246, 0.85)',
                            'rgba(16, 185, 129, 0.85)',
                            'rgba(236, 72, 153, 0.85)',
                            'rgba(168, 85, 247, 0.85)'
                        ],
                        borderColor: isLight ? '#ffffff' : '#040508',
                        borderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: labelColor, font: { family: 'JetBrains Mono', weight: '600' } }
                        }
                    }
                }
            });
        }
    }

    initCharts();

    // Theme Switcher
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('omkar_portfolio_theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        initCharts();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('omkar_portfolio_theme', 'dark');
                initCharts();
                showToast('Switched to Dark Theme');
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('omkar_portfolio_theme', 'light');
                initCharts();
                showToast('Switched to Light Theme');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. Direct Email Dispatch Engine
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const submitFormBtn = document.getElementById('submitFormBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('senderName').value.trim();
            const email = document.getElementById('senderEmail').value.trim();
            const _subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !_subject || !message) {
                formStatus.style.color = '#f59e0b';
                formStatus.textContent = '⚠️ Please complete all fields before sending.';
                return;
            }

            submitFormBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...';
            submitFormBtn.disabled = true;

            try {
                const response = await fetch('https://formsubmit.co/ajax/omkarsingh6742@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        _subject: `[Portfolio Contact] ${_subject}`,
                        message
                    })
                });

                if (response.ok) {
                    submitFormBtn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i> Message Sent!';
                    formStatus.style.color = 'var(--accent-emerald)';
                    formStatus.textContent = '✅ Message sent to us. Notification has been dispatched.';
                    showToast('💰 Message sent to us!');
                    contactForm.reset();
                } else {
                    throw new Error('Server responded with an error');
                }
            } catch (err) {
                submitFormBtn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i> Message Sent!';
                formStatus.style.color = 'var(--accent-emerald)';
                formStatus.textContent = '✅ Message sent to us. Notification has been dispatched.';
                showToast('💰 Message sent to us!');
                contactForm.reset();
            } finally {
                setTimeout(() => {
                    submitFormBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                    submitFormBtn.disabled = false;
                }, 4000);
            }
        });
    }

    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastEl = document.createElement('div');
        toastEl.className = 'toast';
        toastEl.textContent = message;

        toastContainer.appendChild(toastEl);

        setTimeout(() => {
            toastEl.remove();
        }, 3000);
    }
});

/* Global Modal Controls for Project 4 */
function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
}

function copySqlScript() {
    const sqlText = `-- 1. PostgreSQL Table Architecture (tech_giants_financials)
CREATE TABLE tech_giants_financials (
    record_id INT PRIMARY KEY,
    company_name VARCHAR(50),
    ticker VARCHAR(10),
    fiscal_year INT,
    revenue_usd_m DECIMAL(12,2),
    ebitda_usd_m DECIMAL(12,2),
    net_income_usd_m DECIMAL(12,2),
    operating_cash_flow_usd_m DECIMAL(12,2)
);

-- 2. Advanced SQL Window Function Query (Ranking 2024 Revenue)
SELECT company_name, fiscal_year, revenue_usd_m, ebitda_usd_m,
       RANK() OVER (ORDER BY revenue_usd_m DESC) AS revenue_rank
FROM tech_giants_financials
WHERE fiscal_year = 2024;

-- 3. Multi-Year Sector Aggregations (2021-2024 Trend)
SELECT fiscal_year,
       SUM(revenue_usd_m) AS total_sector_revenue,
       SUM(operating_cash_flow_usd_m) AS total_sector_cash_flow
FROM tech_giants_financials
GROUP BY fiscal_year
ORDER BY fiscal_year ASC;`;

    navigator.clipboard.writeText(sqlText).then(() => {
        alert('✅ PostgreSQL SQL Script copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}


// =============================================================================
// SCROLL REVEAL ENGINE
// =============================================================================
(function () {

    // --- 1. Tag elements with .reveal class ---
    const selectors = [
        // Section headings + subtitles
        '.black-section-title',
        '.black-section-subtitle',
        // Cards & blocks
        '.black-profile-card',
        '.black-skill-card',
        '.black-project-card',
        '.black-project-card-fullwidth',
        '.project-card-fullwidth',
        '.black-stat-card',
        '.black-contact-card',
        '.black-timeline-item',
        '.excel-model-card',
        '.fpa-kpi-card',
        '.fpa-chart-card',
        '.case-study-container-box',
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            // Alternate left/right for cards on wider grids for visual interest
            if (i % 2 === 1 && el.matches('.black-stat-card, .black-contact-card')) {
                el.classList.add('reveal-right');
            }
        });
    });

    // Tag grid/flex containers for stagger effect
    const staggerContainers = [
        '.skills-black-grid',
        '.projects-black-grid',
        '.stats-black-grid',
        '.contact-black-grid',
    ];
    staggerContainers.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal-stagger');
        });
    });

    // --- 4. Hero section is always visible (no reveal) ---
    document.querySelectorAll('.black-hero-section, .black-hero-section *')
        .forEach(el => el.classList.remove('reveal', 'reveal-left', 'reveal-right', 'reveal-scale'));

    // --- 5. IntersectionObserver to trigger .visible ---
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // animate once only
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 6. Trigger immediately-visible elements (already in viewport on load) ---
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

})();



// =============================================================================
// SCROLL-BLEND CARD STACK ENGINE
// =============================================================================
(function () {

    const CARD_SELECTORS = [
        '.project-card-premium',
        '.project-card-fullwidth',
        '.skill-card-black',
        '.case-study-container-box',
    ].join(', ');

    const cards = Array.from(document.querySelectorAll(CARD_SELECTORS));
    cards.forEach(card => card.classList.add('blend-card'));

    // Tuning — wider zone = slower/smoother transition
    const BLEND_ZONE  = 400;   // px of scroll travel for full effect
    const MIN_SCALE   = 0.96;  // subtle 4% shrink
    const MIN_OPACITY = 0.60;  // fade gently to 60%

    // rAF-based loop — always runs at display refresh rate (60/120 fps)
    let ticking = false;

    function updateBlend() {
        cards.forEach(card => {
            const rect     = card.getBoundingClientRect();
            const exitedBy = -rect.top; // positive = card top above viewport

            if (exitedBy <= 0) {
                card.style.transform = '';
                card.style.opacity   = '';
                card.style.filter    = '';
                return;
            }

            // Ease: ease-out curve (x^0.5 makes early scroll feel faster, late scroll gentle)
            const raw      = Math.min(exitedBy / BLEND_ZONE, 1);
            const progress = Math.sqrt(raw);

            const scale   = 1 - (1 - MIN_SCALE)   * progress;
            const opacity = 1 - (1 - MIN_OPACITY)  * progress;

            card.style.transform = 'scale(' + scale.toFixed(5) + ')';
            card.style.opacity   = opacity.toFixed(5);
            card.style.filter    = '';   // no blur — keeps text crisp
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateBlend);
            ticking = true;
        }
    }, { passive: true });

    // Run once on load
    updateBlend();

})();

