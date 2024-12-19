// UI Component Module
(function() {
    'use strict';

    // Ensure namespace exists
    window.RedditUIOverhaul = window.RedditUIOverhaul || {
        config: { debug: true, version: '0.2' },
        UI: {}
    };

    // UI Module
    window.RedditUIOverhaul.UI = {
        init: function() {
            this.setupEventListeners();
            this.enhanceHeader();
            this.enhancePostCards();
            this.enhanceSidebar();
        },

        setupEventListeners: function() {
            document.addEventListener('click', (e) => {
                const dropdown = document.querySelector('.communities-dropdown-content');
                const button = document.querySelector('.communities-button');
                if (dropdown && button && !button.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
        },

        enhanceHeader: function() {
            this.waitForHeader().then(headerDiv => {
                if (headerDiv && !headerDiv.querySelector('.communities-dropdown')) {
                    this.initializeCommunities(headerDiv);
                }
            });
        },

        waitForHeader: function() {
            return new Promise((resolve) => {
                const headerSelector = "body > shreddit-app > reddit-header-large > reddit-header-action-items > header > nav > div.h-\\[40px\\].flex-1.py-xs.flex.justify-stretch";
                const headerDiv = document.querySelector(headerSelector);

                if (headerDiv) {
                    resolve(headerDiv);
                    return;
                }

                const observer = new MutationObserver((mutations, obs) => {
                    const headerDiv = document.querySelector(headerSelector);
                    if (headerDiv) {
                        obs.disconnect();
                        resolve(headerDiv);
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });

                setTimeout(() => {
                    observer.disconnect();
                    resolve(null);
                }, 10000);
            });
        },

        initializeCommunities: function(headerDiv) {
            RedditUIOverhaul.RedditAPI.getCommunities()
                .then(communities => {
                    this.insertCommunitiesDropdown(headerDiv, communities);
                })
                .catch(error => {
                    RedditUIOverhaul.Helpers.log('Failed to initialize communities: ' + error.message, 'error');
                    this.insertCommunitiesDropdown(headerDiv, []);
                });
        },

        insertCommunitiesDropdown: function(headerDiv, communities) {
            const dropdownContainer = RedditUIOverhaul.Helpers.createElement('div', { class: 'communities-dropdown' });

            // Create button
            const button = RedditUIOverhaul.Helpers.createElement('button', { class: 'communities-button' });
            button.innerHTML = `
                <span style="display: flex; align-items: center;">
                    <span>Communities</span>
                    <span style="margin-left: 4px; display: flex; align-items: center;">
                        <svg fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                        </svg>
                    </span>
                </span>
            `;

            // Create dropdown content
            const dropdownContent = RedditUIOverhaul.Helpers.createElement('div', { class: 'communities-dropdown-content' });

            if (!communities || communities.length === 0) {
                const noCommunitiesMsg = RedditUIOverhaul.Helpers.createElement('div', {
                    style: 'padding: 12px; text-align: center; color: var(--ruo-primary-color);'
                });
                noCommunitiesMsg.textContent = 'No communities found';
                dropdownContent.appendChild(noCommunitiesMsg);
            } else {
                communities.forEach(community => {
                    const item = this.createCommunityItem(community);
                    dropdownContent.appendChild(item);
                });
            }

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
            });

            dropdownContainer.appendChild(button);
            dropdownContainer.appendChild(dropdownContent);
            headerDiv.appendChild(dropdownContainer);
        },

        createCommunityItem: function(community) {
            const item = RedditUIOverhaul.Helpers.createElement('a', {
                class: 'community-item',
                href: `https://www.reddit.com/${community.prefixedName}`
            });

            const iconContainer = RedditUIOverhaul.Helpers.createElement('div', { class: 'community-icon' });

            if (community.styles?.icon) {
                const icon = RedditUIOverhaul.Helpers.createElement('img', {
                    src: community.styles.icon,
                    alt: community.prefixedName,
                    style: 'width: 100%; height: 100%; object-fit: cover;'
                });
                iconContainer.appendChild(icon);
            } else {
                iconContainer.style.backgroundColor = '#e9e9e9';
                iconContainer.innerHTML = `
                    <svg style="width: 100%; height: 100%; padding: 4px;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#818384" d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"/>
                    </svg>
                `;
            }

            const name = RedditUIOverhaul.Helpers.createElement('span', {
                style: 'font-weight: 500;'
            });
            name.textContent = community.prefixedName.replace('r/', '');

            item.appendChild(iconContainer);
            item.appendChild(name);

            return item;
        },

        enhancePostCards: function() {
            // Post cards enhancement logic will go here
        },

        enhanceSidebar: function() {
            // Sidebar enhancement logic will go here
        }
    };
})();