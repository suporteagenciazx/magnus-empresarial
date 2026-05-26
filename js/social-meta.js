(function () {
    if (!document.querySelector) return;

    var pageUrl = window.location.href.split('#')[0].split('?')[0];
    var base = pageUrl.replace(/[^/]*$/, '');

    function abs(path) {
        try {
            return new URL(path, base).href;
        } catch (e) {
            return base + path.replace(/^\//, '');
        }
    }

    var ogImage = document.querySelector('meta[property="og:image"]');
    var twitterImage = document.querySelector('meta[name="twitter:image"]');
    var imageUrl = abs('img/og-preview.jpg');

    if (ogImage) ogImage.setAttribute('content', imageUrl);
    if (twitterImage) twitterImage.setAttribute('content', imageUrl);

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = pageUrl;
})();
