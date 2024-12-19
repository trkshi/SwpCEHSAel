// Reddit API Service Module
(function() {
    'use strict';

    // Ensure namespace exists
    window.RedditUIOverhaul = window.RedditUIOverhaul || {
        RedditAPI: {}
    };

    // Reddit API Service
    window.RedditUIOverhaul.RedditAPI = {
        // Cache for API responses
        cache: new Map(),

        // Fetch post data with caching
        getPostData: function(postId) {
            if (this.cache.has(postId)) {
                return Promise.resolve(this.cache.get(postId));
            }

            return fetch(`https://www.reddit.com/comments/${postId}.json`)
                .then(response => response.json())
                .then(data => {
                    this.cache.set(postId, data);
                    return data;
                })
                .catch(error => {
                    RedditUIOverhaul.Helpers.log(error, 'error');
                    return null;
                });
        },

        // Get current subreddit info
        getSubredditInfo: function(subreddit) {
            const cacheKey = `subreddit_${subreddit}`;

            if (this.cache.has(cacheKey)) {
                return Promise.resolve(this.cache.get(cacheKey));
            }

            return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
                .then(response => response.json())
                .then(data => {
                    this.cache.set(cacheKey, data);
                    return data;
                })
                .catch(error => {
                    RedditUIOverhaul.Helpers.log(error, 'error');
                    return null;
                });
        },

        // Get user's communities
        getCommunities: function() {
            const cachedData = this.getCachedCommunities();
            if (cachedData) {
                return Promise.resolve(cachedData);
            }

            return fetch('https://www.reddit.com/svc/shreddit/left-nav-communities-section', {
                headers: {
                    'Accept': 'text/html',
                    'Cookie': document.cookie
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch communities');
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const communitiesController = doc.querySelector('left-nav-communities-controller');
                if (!communitiesController) {
                    throw new Error('Communities controller not found');
                }

                const jsonData = communitiesController.getAttribute('initialStateJSON');
                const communities = JSON.parse(jsonData);

                if (communities && communities.length > 0) {
                    this.setCachedCommunities(communities);
                    return communities;
                }

                return [];
            })
            .catch(error => {
                RedditUIOverhaul.Helpers.log('Error fetching communities: ' + error.message, 'error');
                return [];
            });
        },

        // Cache helpers
        setCachedCommunities: function(communities) {
            const cache = {
                timestamp: Date.now(),
                data: communities
            };
            localStorage.setItem('redditCommunities', JSON.stringify(cache));
        },

        getCachedCommunities: function() {
            const cache = localStorage.getItem('redditCommunities');
            if (!cache) return null;

            const { timestamp, data } = JSON.parse(cache);
            const fiveMinutes = 5 * 60 * 1000;

            if (Date.now() - timestamp > fiveMinutes) {
                localStorage.removeItem('redditCommunities');
                return null;
            }

            return data;
        }
    };
})();