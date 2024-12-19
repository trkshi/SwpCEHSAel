// Helpers Utility Module
(function() {
    'use strict';

    window.RedditUIOverhaul = window.RedditUIOverhaul || {
        Helpers: {}
    };

    // Helpers Module
    window.RedditUIOverhaul.Helpers = {
        // DOM manipulation helpers
        createElement: function(tag, attributes = {}, children = []) {
            const element = document.createElement(tag);
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
            children.forEach(child => element.appendChild(child));
            return element;
        },

        // Storage helpers
        saveSettings: function(key, value) {
            GM_setValue(key, value);
        },

        getSettings: function(key, defaultValue = null) {
            return GM_getValue(key, defaultValue);
        },

        // Debug logging
        log: function(message, type = 'info') {
            if (!window.RedditUIOverhaul.config.debug) return;

            const prefix = '[Reddit UI Overhaul]';
            switch(type) {
                case 'error':
                    console.error(prefix, message);
                    break;
                case 'warn':
                    console.warn(prefix, message);
                    break;
                default:
                    console.log(prefix, message);
            }
        }
    };
})();