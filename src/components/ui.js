// UI Component Module
(function() {
    'use strict';

    window.RedditUIOverhaul = window.RedditUIOverhaul || {
        UI: {}
    };

    // UI Module
    window.RedditUIOverhaul.UI = {
        init: function() {
            this.setupEventListeners();
            this.enhanceHeader();
            this.createSubredditHeader();
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
            this.waitForHeader().then(({ headerDiv, communityData }) => {
                if (headerDiv && !headerDiv.querySelector('.communities-dropdown')) {
                    this.initializeCommunities(headerDiv, communityData);
                }
            });
        },

        waitForHeader: function() {
            return new Promise((resolve) => {
                const headerSelector = "body > shreddit-app > reddit-header-large > reddit-header-action-items > header > nav > div.h-\\[40px\\].flex-1.py-xs.flex.justify-stretch";
                const recentDataSelector = "body > shreddit-app > shreddit-recent-page-data";

                const checkElements = () => {
                    const headerDiv = document.querySelector(headerSelector);
                    const recentData = document.querySelector(recentDataSelector);

                    if (headerDiv) {
                        let communityData = null;
                        if (recentData) {
                            try {
                                const dataAttr = recentData.getAttribute('data');
                                if (dataAttr) {
                                    communityData = JSON.parse(dataAttr);
                                }
                            } catch (error) {
                                RedditUIOverhaul.Helpers.log('Failed to parse recent page data: ' + error.message, 'error');
                            }
                        }
                        resolve({ headerDiv, communityData });
                        return;
                    }
                };

                // Check initially
                checkElements();

                const observer = new MutationObserver((mutations, obs) => {
                    checkElements();
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });

                setTimeout(() => {
                    observer.disconnect();
                    resolve({ headerDiv: null, communityData: null });
                }, 10000);
            });
        },

        initializeCommunities: function(headerDiv, communityData) {
            const currentPath = window.location.pathname;
            const subredditMatch = currentPath.match(/^\/r\/([^/]+)/);

            const initialCommunities = [];
            if (subredditMatch && communityData) {
                initialCommunities.push({
                    prefixedName: communityData.displayNamePrefixed || `r/${subredditMatch[1]}`,
                    styles: {
                        icon: communityData.communityIcon || null
                    }
                });
            } else if (subredditMatch) {
                initialCommunities.push({
                    prefixedName: `r/${subredditMatch[1]}`,
                    styles: { icon: null }
                });
            }

            this.insertCommunitiesDropdown(headerDiv, initialCommunities);

            this.initialCommunityData = communityData;

            RedditUIOverhaul.RedditAPI.getCommunities()
                .then(communities => {
                    if (this.initialCommunityData && subredditMatch) {
                        const currentSubreddit = subredditMatch[1].toLowerCase();
                        const updatedCommunities = communities.map(community => {
                            if (community.prefixedName?.toLowerCase() === `r/${currentSubreddit}`) {
                                return {
                                    ...community,
                                    styles: {
                                        ...community.styles,
                                        icon: this.initialCommunityData.communityIcon || community.styles?.icon
                                    }
                                };
                            }
                            return community;
                        });
                        this.insertCommunitiesDropdown(headerDiv, updatedCommunities);
                    } else {
                        this.insertCommunitiesDropdown(headerDiv, communities);
                    }
                })
                .catch(error => {
                    RedditUIOverhaul.Helpers.log('Failed to initialize communities: ' + error.message, 'error');
                });
        },

        insertCommunitiesDropdown: function(headerDiv, communities) {
            const existingDropdown = headerDiv.querySelector('.communities-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            }

            const dropdownContainer = RedditUIOverhaul.Helpers.createElement('div', { class: 'communities-dropdown' });

            // Get current subreddit from URL
            const currentPath = window.location.pathname;
            const subredditMatch = currentPath.match(/^\/r\/([^/]+)/);
            const buttonText = subredditMatch ? `r/${subredditMatch[1]}` : 'Communities';

            let currentCommunity = null;
            if (subredditMatch && Array.isArray(communities)) {
                const currentSubreddit = subredditMatch[1].toLowerCase();
                currentCommunity = communities.find(c => c.prefixedName?.toLowerCase() === `r/${currentSubreddit}`);

                if (this.initialCommunityData && (!currentCommunity?.styles?.icon || !currentCommunity)) {
                    currentCommunity = {
                        prefixedName: this.initialCommunityData.displayNamePrefixed || `r/${currentSubreddit}`,
                        styles: {
                            icon: this.initialCommunityData.communityIcon
                        }
                    };
                }
            }

            // Create button
            const button = RedditUIOverhaul.Helpers.createElement('button', { class: 'communities-button' });
            button.innerHTML = `
                <span style="display: flex; align-items: center; gap: 8px;">
                    <span class="community-icon-small">
                        ${currentCommunity?.styles?.icon ?
                            `<img src="${currentCommunity.styles.icon}" alt="${currentCommunity.prefixedName || ''}" style="width: 100%; height: 100%; object-fit: cover; display: block;">` :
                            `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#878A8C" d="M15.8286,15.8998 C15.3466,16.3788 12.6326,15.9598 12.4586,15.9208 C12.2846,15.8808 9.4946,15.9208 6.7986,15.8978 C4.0916,15.8738 3.7386,15.9208 3.5136,15.9598 C3.2886,15.9988 0.6946,16.3788 0.2016,15.8998 C-0.2904,15.4198 0.2016,12.7598 0.2016,12.7598 L0.2016,9.3488 C0.2016,9.3488 -0.2904,6.6888 0.2016,6.2098 C0.6936,5.7308 3.4056,6.1488 3.5796,6.1888 C3.7536,6.2278 6.5446,6.1888 9.2396,6.2108 C11.9466,6.2348 12.2996,6.1888 12.5246,6.1488 C12.7496,6.1088 15.3436,5.7308 15.8366,6.2098 C16.3286,6.6888 15.8366,9.3488 15.8366,9.3488 L15.8366,12.7598 C15.8366,12.7598 16.3286,15.4198 15.8286,15.8998 M10.0726,12.5028 C11.4886,12.5028 12.6396,11.3518 12.6396,9.9358 C12.6396,8.5198 11.4886,7.3688 10.0726,7.3688 C8.6566,7.3688 7.5056,8.5198 7.5056,9.9358 C7.5056,11.3518 8.6566,12.5028 10.0726,12.5028"/>
                            </svg>`
                        }
                    </span>
                    <span class="button-text">${buttonText}</span>
                    <span style="display: flex; align-items: center;">
                        <svg fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
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
        },

        createSubredditHeader: function() {
            const recentData = document.querySelector("shreddit-recent-page-data");
            if (!recentData) return;

            try {
                const data = JSON.parse(recentData.getAttribute('data'));
                if (!data) return;

                const pageTitle = document.querySelector("head > title");
                if (!pageTitle) return;

                const existingHeader = document.querySelector('.subreddit-header');
                if (existingHeader) existingHeader.remove();

                const header = RedditUIOverhaul.Helpers.createElement('div', {
                    class: 'subreddit-header'
                });

                // Create banner
                const banner = RedditUIOverhaul.Helpers.createElement('div', { class: 'subreddit-banner' });
                if (data.headerImage) {
                    banner.style.backgroundImage = `url(${data.headerImage})`;
                }

                // Create banner content container
                const contentContainer = RedditUIOverhaul.Helpers.createElement('div', { class: 'banner-content-container' });

                // Community icon
                const iconContainer = RedditUIOverhaul.Helpers.createElement('div', { class: 'community-header-icon' });
                if (data.communityIcon) {
                    const icon = RedditUIOverhaul.Helpers.createElement('img', {
                        src: data.communityIcon,
                        alt: data.displayNamePrefixed
                    });
                    iconContainer.appendChild(icon);
                } else {
                    iconContainer.innerHTML = `
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#818384" d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"/>
                        </svg>
                    `;
                }

                // Create community info section
                const infoSection = RedditUIOverhaul.Helpers.createElement('div', { class: 'community-info-section' });

                // Community title section
                const titleSection = RedditUIOverhaul.Helpers.createElement('div', { class: 'community-title-section' });

                // Main title from page title
                const title = RedditUIOverhaul.Helpers.createElement('h1', { class: 'community-title' });
                title.textContent = pageTitle.textContent.split(':')[0].trim();

                // Subtitle (community name)
                const subtitle = RedditUIOverhaul.Helpers.createElement('p', { class: 'community-subtitle' });
                subtitle.textContent = data.displayNamePrefixed;

                titleSection.appendChild(title);
                titleSection.appendChild(subtitle);
                infoSection.appendChild(titleSection);

                banner.appendChild(contentContainer);
                banner.appendChild(iconContainer);
                banner.appendChild(infoSection);
                header.appendChild(banner);

                // Insert the header after the main Reddit header
                const mainHeader = document.querySelector('reddit-header-large');
                if (mainHeader) {
                    mainHeader.parentNode.insertBefore(header, mainHeader.nextSibling);
                }

            } catch (error) {
                RedditUIOverhaul.Helpers.log('Failed to create subreddit header: ' + error.message, 'error');
            }
        }
    };
})();