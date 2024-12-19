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

            /* Communities Dropdown */
            .communities-dropdown {
                position: relative;
                margin-left: 12px;
                height: 100%;
                display: flex;
                align-items: center;
            }

            .communities-button {
                height: 32px;
                padding: 0 12px;
                border-radius: 4px;
                background-color: transparent;
                border: 1px solid var(--ruo-border-color);
                color: inherit;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-top: 2px;
            }

            .communities-dropdown-content {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background-color: var(--ruo-secondary-color);
                border: 1px solid var(--ruo-border-color);
                border-radius: 4px;
                min-width: 240px;
                max-height: 400px;
                overflow-y: auto;
                z-index: 1000;
                margin-top: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .communities-dropdown-content.show {
                display: block;
            }

            .community-item {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                text-decoration: none;
                color: var(--ruo-primary-color);
                gap: 12px;
            }

            .community-item:hover {
                background-color: var(--ruo-background-color);
            }

            .community-icon {
                width: 24px;
                height: 24px;
                flex-shrink: 0;
                border-radius: 4px;
                overflow: hidden;
            }
        `
    };
})();