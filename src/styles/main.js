// Styles Module
(function() {
    'use strict';

    // Ensure namespace exists
    window.RedditUIOverhaul = window.RedditUIOverhaul || {
        config: { debug: true, version: '0.2' },
        Styles: {}
    };

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
                --color-neutral-background: #ffffff;
                --color-neutral-background-hover: rgba(26,26,27,0.1);
                --color-neutral-background-strong: #ffffff;
                --color-neutral-background-weak: #f6f7f8;
                --color-neutral-border-strong: #edeff1;
                --color-neutral-border-weak: #ccc;
                --color-neutral-content: #1c1c1c;
                --color-neutral-content-strong: #1a1a1b;
            }

            /* Communities Dropdown */
            .communities-dropdown {
                position: relative;
                margin-left: 12px;
                height: 100%;
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }

            .communities-button {
                height: 36px;
                padding: 0 8px;
                border-radius: 4px;
                background-color: transparent;
                border: none;
                color: inherit;
                font-size: 16px;
                font-weight: 700;
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.1s ease;
            }

            .communities-button:hover {
                background-color: var(--color-neutral-background-hover);
            }

            .community-icon-small {
                width: 20px;
                height: 20px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 100%;
                background-color: var(--color-neutral-background-weak);
                overflow: hidden;
            }

            .community-icon-small svg {
                width: 16px;
                height: 16px;
                padding: 2px;
            }

            .button-text {
                max-width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 20px;
            }

            .communities-dropdown-content {
                display: none;
                position: absolute;
                top: calc(100% + 4px);
                left: 0;
                background-color: var(--color-neutral-background-strong);
                border: 1px solid var(--color-neutral-border-weak);
                border-radius: 8px;
                min-width: 270px;
                max-height: 480px;
                overflow-y: auto;
                z-index: 1000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                padding: 8px 0;
            }

            .communities-dropdown-content.show {
                display: block;
            }

            .community-item {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                text-decoration: none;
                color: var(--color-neutral-content-strong);
                gap: 12px;
                transition: background-color 0.1s ease;
                height: 40px;
            }

            .community-item:hover {
                background-color: var(--color-neutral-background-hover);
            }

            .community-icon {
                width: 24px;
                height: 24px;
                flex-shrink: 0;
                border-radius: 100%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--color-neutral-background-weak);
            }

            .community-icon img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .community-name {
                font-size: 14px;
                font-weight: 500;
                color: var(--color-neutral-content-strong);
                line-height: 18px;
            }
        `
    };
})();