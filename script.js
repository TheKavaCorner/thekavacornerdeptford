/* ============================================================
   script.js – The Kava Corner · Bold · Feminine · Premium
   Includes touch-swipe support for mobile carousel
   ============================================================ */

(function() {
    'use strict';

    // ===== ENHANCED CAROUSEL WITH TOUCH SUPPORT =====
    const track = document.getElementById('productTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

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
        let isTransitioning = false;
        let cardWidth = 0;
        let gap = 0;

        // ----- TOUCH / SWIPE -----
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;

        function updateDimensions() {
            const firstCard = cards[0];
            if (firstCard) {
                cardWidth = firstCard.offsetWidth;
                gap = parseFloat(getComputedStyle(track).gap) || 20;
            }
        }

        updateDimensions();

        function goToSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            const targetIndex = Math.min(index * cardsPerView, maxIndex);
            currentIndex = targetIndex;
            const offset = currentIndex * (cardWidth + gap);
            track.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
            track.style.transform = `translateX(-${offset}px)`;
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 700);
        }

        function nextSlide() {
            if (isTransitioning) return;
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            if (currentIndex + cardsPerView >= totalCards) {
                goToSlide(0);
            } else {
                goToSlide(Math.floor((currentIndex + cardsPerView) / cardsPerView));
            }
        }

        function prevSlide() {
            if (isTransitioning) return;
            if (currentIndex - cardsPerView < 0) {
                const lastSlide = Math.floor((totalCards - 1) / cardsPerView);
                goToSlide(lastSlide);
            } else {
                goToSlide(Math.floor((currentIndex - cardsPerView) / cardsPerView));
            }
        }

        // ----- DOTS -----
        function createDots() {
            dotsContainer.innerHTML = '';
            const newTotalSlides = Math.ceil(totalCards / cardsPerView);
            for (let i = 0; i < newTotalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-index', i);
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                dot.addEventListener('click', function() {
                    goToSlide(i);
                    resetAutoPlay();
                });
                dotsContainer.appendChild(dot);
            }
        }
        createDots();

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            const activeSlide = Math.floor(currentIndex / cardsPerView);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeSlide);
            });
        }

        // ----- AUTOPLAY -----
        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            startAutoPlay();
        }

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        // ----- ARROWS -----
        if (prevArrow && nextArrow) {
            prevArrow.addEventListener('click', function() { prevSlide(); resetAutoPlay(); });
            nextArrow.addEventListener('click', function() { nextSlide(); resetAutoPlay(); });
        }

        // ----- TOUCH EVENTS (mobile swipe) -----
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
        }, { passive: true });

        track.addEventListener('touchmove', function(e) {
            // prevent vertical scroll while swiping horizontally
            if (isSwiping) {
                e.preventDefault();
            }
        }, { passive: false });

        track.addEventListener('touchend', function(e) {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            // threshold: 50px for a swipe
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // swipe left → next
                    nextSlide();
                } else {
                    // swipe right → prev
                    prevSlide();
                }
                resetAutoPlay();
            }
            isSwiping = false;
        }, { passive: true });

        // ----- RESIZE -----
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = getCardsPerView();
                updateDimensions();
                if (newCardsPerView !== cardsPerView) {
                    cardsPerView = newCardsPerView;
                    const newTotalSlides = Math.ceil(totalCards / cardsPerView);
                    dotsContainer.innerHTML = '';
                    for (let i = 0; i < newTotalSlides; i++) {
                        const dot = document.createElement('button');
                        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                        dot.setAttribute('data-index', i);
                        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
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

        // Pause on hover
        const carouselWrapper = track.closest('.product-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', function() {
                if (autoPlayInterval) {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                }
            });
            carouselWrapper.addEventListener('mouseleave', function() {
                startAutoPlay();
            });
        }

        // Start autoplay
        startAutoPlay();
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

    console.log('🌸 The Kava Corner — Premium redesign with touch-swipe carousel.');
})();