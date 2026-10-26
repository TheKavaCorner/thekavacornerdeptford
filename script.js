/* ============================================================
   script.js – The Kava Corner · Bold · Feminine · Premium
   (Carousel removed — index no longer uses product carousel)
   ============================================================ */

(function() {
    'use strict';

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
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    console.log('🌸 The Kava Corner — menu images removed, hours & links updated.');
})();