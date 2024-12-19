// Styles Module
(function() {
    'use strict';

    // Styles Module
    window.RedditUIOverhaul.Styles = {
        // Main styles for the UI overhaul
        main: `
            /* Custom Reddit UI Styles */
            :root {
                --ruo-primary-color: #1a1a1b;
                --ruo-secondary-color: #ffffff;
                --ruo-accent-color: #ff4500;
                --ruo-background-color: #f8f9fa;
                --ruo-border-color: #edeff1;
            }

            /* Enhanced Post Cards */
            .Post {
                border-radius: 8px;
                margin: 12px 0;
                transition: transform 0.2s ease;
            }

            .Post:hover {
                transform: translateY(-2px);
            }

            /* Enhanced Header */
            #header {
                backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--ruo-border-color);
            }

            /* Enhanced Sidebar */
            .side {
                background: var(--ruo-secondary-color);
                border-radius: 8px;
                padding: 15px;
            }
        `
    };
})();