// ==UserScript==
// @name         Reddit UI Overhaul
// @namespace    https://github.com/trkshi/SwpCEHSAel
// @version      0.4.1
// @description  A modular Reddit UI enhancement script
// @author       trkshi
// @run-at       document-start
// @match        https://www.reddit.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/config.js
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/styles/main.js
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/utils/helpers.js
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/services/reddit-api.js
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/components/ui.js
// @updateURL    https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/main.user.js
// @downloadURL  https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/main.user.js
// ==/UserScript==

// Initialize the Reddit UI Overhaul namespace globally
window.RedditUIOverhaul = window.RedditUIOverhaul || {
    Styles: {},
    Helpers: {},
    RedditAPI: {},
    UI: {}
};

(function() {
    'use strict';

    const injectCriticalStyles = () => {
        const criticalStyles = document.createElement('style');
        criticalStyles.textContent = `
            .grid-container.theme-rpl.grid {
                display: none !important;
            }
            reddit-header-large {
                display: block !important;
            }
            header {
                position: sticky !important;
                top: 0 !important;
                z-index: 100 !important;
                background-color: var(--color-neutral-background) !important;
            }
        `;

        document.documentElement.appendChild(document.createElement('head'));
        document.head.appendChild(criticalStyles);
    };

    injectCriticalStyles();

    function init() {
        if (!document.querySelector('body')) return;

        try {
            // Apply custom styles first
            applyCustomStyles();

            // Initialize components
            if (RedditUIOverhaul.UI && RedditUIOverhaul.UI.init) {
                RedditUIOverhaul.UI.init();
            } else {
                console.error('UI module not loaded properly');
            }

            console.log('Reddit UI Overhaul initialized!');
        } catch (error) {
            console.error('Error initializing Reddit UI Overhaul:', error);
        }
    }

    // Apply custom styles
    function applyCustomStyles() {
        const styles = RedditUIOverhaul.Styles;
        if (styles && styles.main) {
            GM_addStyle(styles.main);
        } else {
            console.error('Styles module not loaded properly');
        }
    }

    // Start the script when the page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();