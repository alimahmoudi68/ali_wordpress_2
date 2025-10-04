document.addEventListener('DOMContentLoaded', function () {
    initCheckHeaderMenu();
    initHeaderMenuClickHandlers();
    
    // Initialize home menu items if we're on home page
    if (isHomePath(window.location.pathname)) {
        // Initialize home menu items after a short delay to ensure DOM is ready
        setTimeout(function() {
            if (typeof window.initHomeMenuItems === 'function') {
                window.initHomeMenuItems();
            }
        }, 100);
    }
});


// Resolve basePath from PHP (supports subfolder e.g. /portfolio)
var basePath = (window.themeGlobals && window.themeGlobals.basePath) ? window.themeGlobals.basePath.replace(/\/$/, '') : '';

// Store reference to current event handlers to prevent duplicates
var currentHeaderMenuHandlers = [];

// Flag to track if home menu items have been initialized
var homeMenuItemsInitialized = false;

// Flag to prevent multiple header menu updates
var headerMenuUpdating = false;


// Helper: determine if a given path is the "home" (fa or en) under basePath
function isHomePath(pathname) {
    var p = pathname || window.location.pathname;
    if (!/\/$/.test(p)) p += '/';
    var baseFa = (basePath || '') + '/';
    var baseEn = (basePath || '') + '/en/';
    return p === baseFa || p === baseEn;
}


// Update header menu based on current page (for SPA navigation)
function updateHeaderMenuForCurrentPage() {
    // Prevent multiple simultaneous updates
    if (headerMenuUpdating) return;
    
    var currentPath = window.location.pathname;
    var isHomePage = isHomePath(currentPath);
    var headerMenu = document.querySelector('.header-menu');

    if (headerMenu) {
        headerMenuUpdating = true;
        
        if (isHomePage) {
            // Hide header menu on home page with animation
            if (headerMenu.style.display !== 'none') {
                gsap.killTweensOf(headerMenu);
                gsap.to(headerMenu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: function() {
                        headerMenu.style.display = 'none';
                        headerMenu.setAttribute('data-hidden', 'true');
                        headerMenuUpdating = false;
                    }
                });
            } else {
                headerMenu.style.display = 'none';
                headerMenu.setAttribute('data-hidden', 'true');
                headerMenuUpdating = false;
            }
        } else {
            // Show header menu on other pages - only animate if it's not already visible
            if (headerMenu.style.display === 'none' || headerMenu.getAttribute('data-hidden') === 'true') {
                headerMenu.style.display = 'block';
                headerMenu.removeAttribute('data-hidden');
                gsap.killTweensOf(headerMenu);
                gsap.fromTo(headerMenu, 
                    { opacity: 0, y: -20 }, 
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', 
                      onComplete: function() {
                          // Re-add click handlers after animation completes
                          addHeaderMenuClickHandlers();
                          headerMenuUpdating = false;
                      }
                    }
                );
            } else {
                // Already visible, just ensure it's properly set up
                headerMenu.style.display = 'block';
                headerMenu.removeAttribute('data-hidden');
                addHeaderMenuClickHandlers();
                headerMenuUpdating = false;
            }
        }
    }
}


function initCheckHeaderMenu() {
    var isHomePage = isHomePath(window.location.pathname);
    console.log('isHomePage>>' , isHomePage);

    var headerMenu = document.querySelector('.header-menu');
    if (headerMenu) {
        if (isHomePage) {
            // Just hide without animation on initial load
            headerMenu.style.display = 'none';
            headerMenu.setAttribute('data-hidden', 'true');
            gsap.set(headerMenu, { opacity: 0, y: -20 });
        } else {
            // Show with initial animation on other pages
            headerMenu.style.display = 'block';
            headerMenu.removeAttribute('data-hidden');
            gsap.fromTo(headerMenu, 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }
    
    // Reset the flag after initial setup
    headerMenuUpdating = false;
}


// Add click handlers for header menu links
function addHeaderMenuClickHandlers() {
    // Remove existing handlers first
    currentHeaderMenuHandlers.forEach(function(handler) {
        if (handler.element && handler.listener) {
            handler.element.removeEventListener('click', handler.listener);
        }
    });
    currentHeaderMenuHandlers = [];
    
    var headerMenuLinks = document.querySelectorAll('.header-menu a');
    headerMenuLinks.forEach(function(link) {
        var clickHandler = function(e) {
            e.preventDefault();
            var targetUrl = this.getAttribute('href');
            if (targetUrl && targetUrl !== window.location.pathname) {
                // Use global fetchAndShow function with fade out animation
                if (typeof window.fetchAndShow === 'function') {
                    window.fetchAndShow(targetUrl, true, true); // true for withFadeOut
                }
            }
        };
        
        link.addEventListener('click', clickHandler);
        
        // Store reference for later removal
        currentHeaderMenuHandlers.push({
            element: link,
            listener: clickHandler
        });
    });
}


// Initialize header menu click handlers
function initHeaderMenuClickHandlers() {
    addHeaderMenuClickHandlers();
}


// Function to initialize home menu items (moved from index.js)
window.initHomeMenuItems = function initHomeMenuItems() {
    var menuItems = Array.prototype.slice.call(document.querySelectorAll('.home-menu-item'));
    if (!menuItems.length || typeof gsap === 'undefined') return;

    // Only animate on first initialization
    if (!homeMenuItemsInitialized) {
        // Initially set menu items to be ready for animation (without moving them)
        gsap.set('.home-menu-item', { opacity: 0, visibility: 'visible' });
        
        // Animate menu items in all at once (no stagger)
        gsap.to('.home-menu-item', {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            // No stagger - all items animate together
        });
        
        homeMenuItemsInitialized = true;
    } else {
        // Animate menu items in all at once (no stagger)
        gsap.set('.home-menu-item', { opacity: 0, visibility: 'visible' });
        
        gsap.to('.home-menu-item', {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            // No stagger - all items animate together
        });
    }

    function animateHideAllAndLoad(url) {
        menuItems.forEach(function (el) { el.style.pointerEvents = 'none'; });

        gsap.to('.home-menu-item', {
            x: -60,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            // No stagger - all items animate together
            onComplete: function () {
                menuItems.forEach(function (el) { el.style.visibility = 'hidden'; });
                // Reset flag so next time we show animation again
                homeMenuItemsInitialized = false;
                // Wait 500ms after menu items are hidden before showing loading
                setTimeout(function() {
                    if (typeof window.fetchAndShow === 'function') {
                        window.fetchAndShow(url, true, false); // push=true, withFadeOut=false but still animate in
                    }
                }, 500);
            }
        });
    }

    menuItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            if (item.tagName.toLowerCase() === 'a') e.preventDefault();
            var targetUrl = item.getAttribute('href') || '/about';
            // Only animate if URL is different from current page
            if (targetUrl && targetUrl !== window.location.pathname) {
                animateHideAllAndLoad(targetUrl);
            }
        });
    });
}


// Main function for fetching and showing new content with animations
window.fetchAndShow = function fetchAndShow(url, push, withFadeOut) {
    if (typeof push === 'undefined') push = true;
    if (typeof withFadeOut === 'undefined') withFadeOut = false;
    
    var content = document.querySelector('.content');
    if (!content) return;

    if (withFadeOut) {
        // Animate current content out first
        gsap.to(content, {
            y: -60,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: function() {
                loadNewContent();
            }
        });
    } else {
        loadNewContent();
    }

    function loadNewContent() {
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

                    // Set initial state for animation
                    gsap.set(content, { y: -60, opacity: 0 });
                    
                    var tl = gsap.timeline({ onComplete: function () {
                        content.style.width = '';
                        if (push && window.history && typeof history.pushState === 'function') {
                            try { history.pushState({ url: url }, '', url); } catch (e) {}
                        }
                        // Check if we're on home page first
                        var currentPath = window.location.pathname;
                        var isHomePage = isHomePath(currentPath);
                        
                        // Update header menu after animation completes
                        updateHeaderMenuForCurrentPage();
                        
                        // Re-initialize home menu items if we're on home page (with delay to avoid conflict)
                        if (isHomePage && typeof window.initHomeMenuItems === 'function') {
                            setTimeout(function() {
                                window.initHomeMenuItems();
                            }, 400); // Wait for header menu animation to complete
                        }
                    } });
                    tl.to(content, { width: targetWidth, duration: 0.8, ease: 'power2.out' }, 0)
                      .to(content, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0);
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
};



