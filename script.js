/* ============================================================
script.js – The Kava Corner · Bold · Feminine · Premium
   ============================================================ */

(function() {
    'use strict';

    // ===== CAROUSEL FUNCTIONALITY =====
    const track = document.getElementById('productTrack');
    const dotsContainer = document.getElementById('carouselDots');

    if (track && dotsContainer) {
        const cards = track.querySelectorAll('.product-card-premium');
        const totalCards = cards.length;

        function getCardsPerView() {
            if (window.innerWidth < 480) return 1;
            if (window.innerWidth < 768) return 2;
            return 3;
        }

        let cardsPerView = getCardsPerView();
        let currentIndex = 0;
        let autoPlayInterval = null;
        const cardWidth = cards[0]?.offsetWidth || 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        // Create dots
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            const activeSlide = Math.floor(currentIndex / cardsPerView);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeSlide);
            });
        }

        function goToSlide(index) {
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            currentIndex = Math.min(index * cardsPerView, maxIndex);
            const offset = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;
            updateDots();
        }

        function nextSlide() {
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            if (currentIndex + cardsPerView >= totalCards) {
                currentIndex = 0;
            } else {
                currentIndex += cardsPerView;
            }
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            const offset = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${offset}px)`;
            updateDots();
        }

        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            startAutoPlay();
        }

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = getCardsPerView();
                if (newCardsPerView !== cardsPerView) {
                    cardsPerView = newCardsPerView;
                    const newTotalSlides = Math.ceil(totalCards / cardsPerView);
                    dotsContainer.innerHTML = '';
                    for (let i = 0; i < newTotalSlides; i++) {
                        const dot = document.createElement('button');
                        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                        dot.setAttribute('data-index', i);
                        dot.addEventListener('click', function() {
                            goToSlide(i);
                            resetAutoPlay();
                        });
                        dotsContainer.appendChild(dot);
                    }
                    currentIndex = 0;
                    goToSlide(0);
                    resetAutoPlay();
                }
            }, 300);
        });

        startAutoPlay();

        // Pause on hover
        track.addEventListener('mouseenter', function() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        });
        track.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
    }

    // ===== TESTIMONIALS =====
    const testimonials = [
        { text: 'The Kava Corner is my daily reset. Smooth, calm, and absolutely authentic.', author: 'Maya R.', stars: 5, verified: true },
        { text: 'Best kava I\'ve ever had. The corner vibe is real — I feel the aloha every time.', author: 'James K.', stars: 5, verified: true },
        { text: 'Love the ready-to-drink cans. Perfect for winding down after work.', author: 'Sarah L.', stars: 4, verified: false },
        { text: 'Noble powder blends so well. This is my new ritual.', author: 'David T.', stars: 5, verified: true }
    ];

    var carousel = document.getElementById('testiCarousel');
    if (carousel) {
        carousel.innerHTML = testimonials.map(function(t) {
            var fullStars = '★'.repeat(t.stars);
            var emptyStars = '☆'.repeat(5 - t.stars);
            return `
                <div class="testi-card">
                    <div class="quote">"</div>
                    <p>${t.text}</p>
                    <div class="stars">${fullStars}${emptyStars}</div>
                    <div class="author">${t.author}</div>
                    <div class="verified">${t.verified ? '✓ Verified Buyer' : ''}</div>
                </div>
            `;
        }).join('');
    }

    // ===== SCROLL REVEAL =====
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach(function(el) { observer.observe(el); });

    // ===== HEADER SCROLL =====
    var header = document.getElementById('mainHeader');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    console.log('🌸 The Kava Corner — Premium redesign loaded.');
})();