document.addEventListener('DOMContentLoaded', function () {
    // Initialize home menu items (function is now in master.js)
    if (typeof window.initHomeMenuItems === 'function') {
        window.initHomeMenuItems();
    }

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
        if (typeof window.fetchAndShow === 'function') {
            window.fetchAndShow(url, false);
        }
        // Note: updateHeaderMenuForCurrentPage is already called in fetchAndShow
    });

});

