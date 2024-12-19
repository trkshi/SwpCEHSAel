(function() {
    'use strict';

    window.RedditUIOverhaul = window.RedditUIOverhaul || {};
    window.RedditUIOverhaul.Styles = window.RedditUIOverhaul.Styles || {};

    window.RedditUIOverhaul.Styles.main = `
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
            --font-sans: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;
        }

        .communities-dropdown {
            position: relative;
            margin-left: 12px;
            height: 100%;
            display: flex;
            align-items: center;
            font-family: var(--font-sans);
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
            font-family: var(--font-sans);
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .communities-button:hover {
            background-color: var(--color-neutral-background-hover);
        }

        .community-icon-small {
            width: 20px;
            height: 20px;
            min-width: 20px;
            min-height: 20px;
            flex-shrink: 0;
            border-radius: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            margin: 0;
            padding: 0;
        }

        .community-icon-small img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 100%;
            margin: 0;
            padding: 0;
        }

        .community-icon-small svg {
            width: 16px;
            height: 16px;
            padding: 0;
            display: block;
            margin: 0;
        }

        .button-text {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 20px;
            margin: 0;
            padding: 0;
        }

        .communities-dropdown-content {
            display: none;
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            min-width: 270px;
            max-height: 480px;
            background-color: var(--color-neutral-background-strong);
            border: 1px solid var(--color-neutral-border-weak);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            overflow-y: auto;
            padding: 8px 0;
            scrollbar-width: thin;
            scrollbar-color: var(--color-neutral-content-weak) transparent;
        }

        .communities-dropdown-content::-webkit-scrollbar {
            width: 6px;
        }

        .communities-dropdown-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .communities-dropdown-content::-webkit-scrollbar-thumb {
            background-color: var(--color-neutral-content-weak);
            border-radius: 3px;
        }

        .communities-dropdown-content.show {
            display: block;
        }

        .community-item {
            display: flex;
            align-items: center;
            padding: 6px 16px;
            text-decoration: none;
            color: var(--color-neutral-content-strong);
            gap: 8px;
            transition: all 0.2s ease;
            min-height: 40px;
            box-sizing: border-box;
            position: relative;
            border-bottom: 1px solid var(--color-neutral-border-weak);
        }

        .community-item:last-child {
            border-bottom: none;
        }

        .community-item:hover {
            background-color: var(--color-neutral-background-hover);
        }

        .community-item:hover .community-name {
            color: var(--ruo-accent-color);
        }

        .community-icon {
            width: 24px;
            height: 24px;
            min-width: 24px;
            min-height: 24px;
            flex-shrink: 0;
            border-radius: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            margin: 0;
            padding: 0;
        }

        .community-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 100%;
            margin: 0;
            padding: 0;
        }

        .community-icon svg {
            width: 20px;
            height: 20px;
            padding: 0;
            display: block;
            margin: 0;
        }

        .community-name {
            font-size: 14px;
            font-weight: 500;
            color: var(--color-neutral-content-strong);
            line-height: 18px;
            font-family: var(--font-sans);
        }

        /* Subreddit Header Styles */
        .subreddit-header {
            width: 100%;
            position: relative;
            margin-bottom: 16px;
            background: transparent;
        }

        .subreddit-banner {
            width: 100%;
            height: 228px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
        }

        .banner-content-container {
            width: 100%;
            height: 35%;
            background-color: #1b1a1d;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .community-info-section {
            position: absolute;
            left: 108px;
            bottom: 12%;
            display: flex;
            flex-direction: column;
            z-index: 3;
            gap: 4px;
        }

        .community-header-icon {
            position: absolute;
            left: 24px;
            bottom: 8%;
            width: 72px;
            height: 72px;
            border-radius: 100%;
            border: 4px solid var(--ruo-secondary-color);
            background-color: var(--ruo-background-color);
            overflow: hidden;
            flex-shrink: 0;
            box-sizing: border-box;
            z-index: 3;
        }

        .community-header-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .community-title-section {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .community-title {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            color: var(--ruo-secondary-color);
            line-height: 32px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            font-family: var(--font-sans);
        }

        .community-subtitle {
            font-size: 14px;
            color: var(--ruo-secondary-color);
            opacity: 0.8;
            margin: 0;
            line-height: 18px;
            font-weight: 500;
            font-family: var(--font-sans);
        }
    `;
})();