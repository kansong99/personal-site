const path = require("path");
const { siteUrl } = require("./data/SiteConfig");
const config = require("./data/SiteConfig");

module.exports = {
  siteMetadata: {
    title: "ka",
    description: "Kofi Ansong's personal site",
    author: "Kofi Ansong",
    siteUrl: "https://kofiansong.com/",
    rssMetadata: {
      site_url: siteUrl,
      podcast_url: "https://kofiansong.com/podcast/",
      feed_url: "https://kofiansong.com/podcast/rss.xml",
      title: config.siteRssTitle,
      description: config.siteRssDescription,
      copyright: config.copyright,
      image_url: "https://kofiansong.com/images/kofi_dolapo_podcast_art.png",
    },
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 200,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "markdown-pages",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "src", "images"),
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#0BE10B",
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#0BE10B`,
        display: "minimal-ui",
        icon: "src/images/site_photo.jpeg", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
        {
          site {
            siteMetadata {
                rssMetadata{
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }`,
        setup: (options) => ({
          ...options,
          disable_cdata: true,
          custom_namespaces: {
            itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
          },
          site_url: "https://kofiansong.com/podcast",
          custom_elements: [
            { language: "en" },
            { "itunes:author": "Kofi Ansong &amp; Dolapo Adedokun" },
            { "itunes:explicit": "False" },
            {
              "itunes:subtitle":
                "Two Young Black Creatives Figuring Things Out",
            },
            {
              "itunes:summary":
                "Laugh, smile, and think with us as we discuss navigating our cultures, relationships, and young adulthood!",
            },
            {
              "itunes:owner": [
                { "itunes:name": "Kofi Ansong" },
                { "itunes:email": "kaansong1@gmail.com" },
              ],
            },

            {
              "itunes:category": [
                {
                  _attr: {
                    text: "Entrepreneurship",
                  },
                },
              ],
            },

            {
              "itunes:category": [
                {
                  _attr: {
                    text: "Self-Improvement",
                  },
                },
              ],
            },
            {
              "itunes:category": [
                {
                  _attr: {
                    text: "Society &amp; Culture",
                  },
                },
              ],
            },
            {
              "itunes:category": [
                {
                  _attr: {
                    text: "Fashion &amp; Beauty",
                  },
                },
              ],
            },
            { "itunes:type": "episodic" },
            {
              "itunes:image": [
                {
                  _attr: {
                    href: "https://kofiansong.com/kofi_dolapo_podcast_art.png",
                  },
                },
              ],
            },
            {
              image: [
                {
                  url: "https://kofiansong.com/kofi_dolapo_podcast_art.png",
                },
                { title: "The KD Pod" },
                { link: "https://kofiansong.com/podcast" },
              ],
            },
            {
              "itunes:keywords":
                "black, adulthood, life-improvement, kofi, dolapo, careers",
            },
          ],
        }),
        feeds: [
          {
            serialize({ query: { site, allMarkdownRemark } }) {
              return allMarkdownRemark.edges.map((edge) => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.frontmatter.description,
                url: site.siteMetadata.rssMetadata.site_url + edge.node.fields.slug,
                guid: site.siteMetadata.rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [
                  { "content:encoded": edge.node.html },
                  { "itunes:author": "Kofi Ansong & Dolapo Adedokun" },
                  { "itunes:subtitle": edge.node.frontmatter.description },
                  { "itunes:duration": edge.node.frontmatter.showLength },
                  { "itunes:explicit": "False" },
                  {
                    enclosure: [
                      {
                        _attr: {
                          url:
                            config.s3bucket + edge.node.frontmatter.audioPath,
                          length:
                            Number(edge.node.frontmatter.fileSize)
                            * 1000
                            * 1000, // megabytes to bytes
                          type: "audio/mpeg",
                        },
                      },
                    ],
                  },
                ],
              }));
            },
            query: `
            {
              allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(podcast)/" } },
                limit: 1000,
                sort: { order: DESC,  fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      cover
                      date
                      category
                      tags
                      shortDescription
                      episodeNumber
                      audioPath
                      showLength
                      fileSize
                    }
                  }
                }
              }
            }
          `,
            output: "/podcast/rss.xml",
            title: config.siteRssTitle,
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
