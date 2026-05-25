(function initCarrosselDestaques() {
    const carrossel = document.querySelector('.secao-carrossel .carrossel');
    if (!carrossel) return;

    const track = carrossel.querySelector('.carrossel-track');
    const slides = Array.from(track.querySelectorAll('.carrossel-slide'));
    const dots = Array.from(carrossel.querySelectorAll('.carrossel-dot'));
    const INTERVAL_MS = 5500;
    let currentIndex = 0;
    let timerId = null;

    function goTo(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.forEach((slide, i) => {
            const active = i === currentIndex;
            slide.classList.toggle('is-active', active);
            slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === currentIndex);
            dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
        });
    }

    function next() {
        goTo(currentIndex + 1);
    }

    function startAutoplay() {
        stopAutoplay();
        timerId = window.setInterval(next, INTERVAL_MS);
    }

    function stopAutoplay() {
        if (timerId !== null) {
            window.clearInterval(timerId);
            timerId = null;
        }
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            startAutoplay();
        });
    });

    carrossel.addEventListener('mouseenter', stopAutoplay);
    carrossel.addEventListener('mouseleave', startAutoplay);
    carrossel.addEventListener('focusin', stopAutoplay);
    carrossel.addEventListener('focusout', (e) => {
        if (!carrossel.contains(e.relatedTarget)) startAutoplay();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoplay();
        else startAutoplay();
    });

    goTo(0);
    startAutoplay();
}());
