// ==UserScript==
// @name         Reddit UI Overhaul
// @namespace    https://github.com/trkshi/SwpCEHSAel
// @version      0.1
// @description  A modular Reddit UI enhancement script
// @author       trkshi
// @match        https://www.reddit.com/*
// @match        https://old.reddit.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/components/ui.js
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/utils/helpers.js
// @require      https://raw.githubusercontent.com/trkshi/SwpCEHSAel/main/src/services/reddit-api.js
// ==/UserScript==

(function() {
    'use strict';

    // Initialize the Reddit UI Overhaul namespace
    window.RedditUIOverhaul = {
        config: {
            debug: true,
            version: '0.1'
        }
    };

    // Main initialization function
    function init() {
        if (!document.querySelector('body')) return;

        // Initialize components
        RedditUIOverhaul.UI.init();

        // Apply custom styles
        applyCustomStyles();

        console.log('Reddit UI Overhaul initialized!');
    }

    // Apply custom styles
    function applyCustomStyles() {
        const styles = RedditUIOverhaul.Styles;
        if (styles) {
            GM_addStyle(styles.main);
        }
    }

    // Start the script when the page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();