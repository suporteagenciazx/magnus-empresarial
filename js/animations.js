(function initPageAnimations() {
    function markLoaded() {
        document.body.classList.add('is-loaded');
    }
    document.addEventListener('DOMContentLoaded', markLoaded);
    window.addEventListener('load', markLoaded);

    const revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
}());
