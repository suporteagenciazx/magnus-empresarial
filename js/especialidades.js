(function initExpertsCarousel() {
    const wrapper = document.querySelector('#especialidades .experts-wrapper');
    const cards = wrapper ? Array.from(wrapper.querySelectorAll('.expert')) : [];
    let currentIndex = 0;
    let touchStartX = null;

    function getVisibleCount() {
        if (window.matchMedia('(max-width: 720px)').matches) return 1;
        if (window.matchMedia('(max-width: 960px)').matches) return 2;
        return 3;
    }

    function getStepPx() {
        if (!cards.length) return 0;
        return cards[0].offsetWidth + 18;
    }

    function getMaxIndex() {
        const n = cards.length;
        const v = getVisibleCount();
        return Math.max(0, n - v);
    }

    function updateCarouselUI() {
        if (!wrapper || !cards.length) return;
        const step = getStepPx();
        const maxIdx = getMaxIndex();
        currentIndex = Math.min(Math.max(currentIndex, 0), maxIdx);
        wrapper.style.transform = `translateX(-${currentIndex * step}px)`;
    }

    function moveCarousel(direction) {
        if (!wrapper || !cards.length) return;
        const maxIdx = getMaxIndex();
        currentIndex = Math.min(Math.max(currentIndex + direction, 0), maxIdx);
        updateCarouselUI();
    }

    document.querySelectorAll('#especialidades .carousel-btn.left').forEach((btn) => {
        btn.addEventListener('click', () => moveCarousel(-1));
    });
    document.querySelectorAll('#especialidades .carousel-btn.right').forEach((btn) => {
        btn.addEventListener('click', () => moveCarousel(1));
    });

    if (wrapper && cards.length) {
        wrapper.addEventListener(
            'touchstart',
            (e) => {
                touchStartX = e.changedTouches[0].screenX;
            },
            { passive: true }
        );
        wrapper.addEventListener(
            'touchend',
            (e) => {
                if (touchStartX === null) return;
                const dx = e.changedTouches[0].screenX - touchStartX;
                const threshold = 48;
                if (dx > threshold) moveCarousel(-1);
                else if (dx < -threshold) moveCarousel(1);
                touchStartX = null;
            },
            { passive: true }
        );
    }

    window.addEventListener('resize', updateCarouselUI);
    updateCarouselUI();

    document.querySelectorAll('#especialidades .expert').forEach((expert) => {
        expert.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('flipped');
        });
    });
}());
