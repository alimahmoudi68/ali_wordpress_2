document.addEventListener('DOMContentLoaded', function () {
    var menuItems = Array.prototype.slice.call(document.querySelectorAll('.home-menu-item'));
    if (!menuItems.length || typeof gsap === 'undefined') return;

    function fetchAndShow(url, push) {
        if (typeof push === 'undefined') push = true;
        var content = document.querySelector('.content');
        if (!content) return;

        var currentWidth = content.offsetWidth;
        content.style.width = currentWidth + 'px';
        content.innerHTML = '<div class="loading-text">در حال بارگذاری...</div>';
        fetch(url, { credentials: 'same-origin' })
            .then(function (res) { return res.text(); })
            .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var newContent = doc.querySelector('.content');
                if (newContent) {
                    content.innerHTML = newContent.innerHTML;
                    // measure target width smoothly: from locked current width to auto width
                    var targetWidth;
                    (function () {
                        var prev = content.style.width;
                        content.style.width = 'auto';
                        targetWidth = content.offsetWidth;
                        content.style.width = prev; // back to locked width (set earlier)
                    })();

                    var tl = gsap.timeline({ onComplete: function () {
                        content.style.width = '';
                        if (push && window.history && typeof history.pushState === 'function') {
                            try { history.pushState({ url: url }, '', url); } catch (e) {}
                        }
                    } });
                    tl.to(content, { width: targetWidth, duration: 0.8, ease: 'power2.out' }, 0)
                      .fromTo(content, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0);
                } else {
                    content.innerHTML = '<div class="loading-text">محتوایی پیدا نشد</div>';
                    content.style.width = '';
                }
            })
            .catch(function () {
                var contentEl = document.querySelector('.content');
                if (contentEl) {
                    contentEl.innerHTML = '<div class="loading-text">خطا در بارگذاری</div>';
                    contentEl.style.width = '';
                }
            });
    }

    function animateHideAllAndLoad(url) {
        menuItems.forEach(function (el) { el.style.pointerEvents = 'none'; });

        gsap.to('.home-menu-item', {
            x: -80,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.05,
            onComplete: function () {
                menuItems.forEach(function (el) { el.style.visibility = 'hidden'; });
                fetchAndShow(url);
            }
        });
    }

    menuItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            if (item.tagName.toLowerCase() === 'a') e.preventDefault();
            var targetUrl = item.getAttribute('href') || '/about';
            animateHideAllAndLoad(targetUrl);
        }, { once: true });
    });

    // Handle back/forward navigation to load content without full refresh
    if (window.history && typeof history.replaceState === 'function') {
        try {
            if (!history.state || !history.state.url) {
                history.replaceState({ url: location.pathname + location.search + location.hash }, '', location.pathname + location.search + location.hash);
            }
        } catch (e) {}
    }

    window.addEventListener('popstate', function (e) {
        var url = (e.state && e.state.url) ? e.state.url : (location.pathname + location.search + location.hash);
        fetchAndShow(url, false);
    });
});

