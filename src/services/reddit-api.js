// Reddit API Service Module
(function() {
    'use strict';

    // Reddit API Service
    window.RedditUIOverhaul.RedditAPI = {
        // Cache for API responses
        cache: new Map(),

        // Fetch post data with caching
        async getPostData(postId) {
            if (this.cache.has(postId)) {
                return this.cache.get(postId);
            }

            try {
                const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
                const data = await response.json();
                this.cache.set(postId, data);
                return data;
            } catch (error) {
                RedditUIOverhaul.Helpers.log(error, 'error');
                return null;
            }
        },

        // Get current subreddit info
        async getSubredditInfo(subreddit) {
            const cacheKey = `subreddit_${subreddit}`;

            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }

            try {
                const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
                const data = await response.json();
                this.cache.set(cacheKey, data);
                return data;
            } catch (error) {
                RedditUIOverhaul.Helpers.log(error, 'error');
                return null;
            }
        }
    };
})();