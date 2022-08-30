/* eslint-disable quotes */
const config = {
  s3bucket:
    'https://ansongadedokunpodcasts.s3.us-west-1.amazonaws.com/',
  siteTitle: 'The KD Podcast', // Site title.
  siteTitleShort: 'The KD Pod', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: 'The KD Podcast', // Alternative site title for SEO.
  siteRssLogo: '/images/kofi_dolapo_podcast_art.png', // Logo used for SEO and manifest.
  siteUrl: 'https://kofiansong.com/', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteRssDescription: "Laugh, smile, and think with us as we discuss navigating our cultures, relationships, and young adulthood!", // Website description used for RSS feeds/meta description tag.
  siteRss: '/rss.xml', // Path to the RSS file.
  siteRssTitle: 'The KD Pod', // Title of the RSS feed
  podcastUrl: 'https://kofiansong.com/podcast/',
  // siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  googleAnalyticsID: "G-YZB60GTNZP",
  // disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
  dateFormat: 'MM/DD/YYYY', // Date format for display.
  postsPerPage: 9999, // Amount of posts displayed per listing page.
  userName: 'Kofi & Dolapo', // Username to display in the author segment.
  userEmail: 'kaansong1@gmail.com', // Email used for RSS feed's author segment
  userLocation: 'California, USA', // User location to display in the author segment.
  userAvatar: 'https://kofiansong.com/images/kofi_dolapo_podcast_art.png', // User avatar to display in the author segment.
  userDescription:
    'Laugh, smile, and think with us as we discuss navigating our societies, relationships, and young adulthood!',
  copyright: 'Copyright © 2020 Kofi & Dolapo', // Copyright string for the footer of the website and RSS feed.
  // themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  // backgroundColor: "#e0e0e0", // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = '';
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') {
  config.siteUrl = config.siteUrl.slice(0, -1);
}

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') {
  config.siteRss = `/${config.siteRss}`;
}

module.exports = config;
