const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const moment = require("moment");
const siteConfig = require("./data/siteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// eslint-disable-next-line consistent-return
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve("src/templates/blogPostTemplate.jsx");
  const tagTemplate = path.resolve("src/templates/tagTemplate.js");
  const podcastPostTemplate = path.resolve(
    "src/templates/podcastPostTemplate.jsx",
  );
  const blogs = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(blog)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);
  if (blogs.errors) {
    return Promise.reject(blogs.errors);
  }

  blogs.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: { slug: node.fields.slug }, // additional data can be passed via context
    });
  });
  const podcasts = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(podcast)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              category
              date
              shortDescription
              episodeNumber
              audioPath
            }
          }
        }
      }
    }
  `);
  if (podcasts.errors) {
    return Promise.reject(podcasts.errors);
  }

  // podcasts.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   createPage({
  //     path: node.field.slug,
  //     component: podcastPostTemplate,
  //     context: { slug: node.fields.slug },
  //   });
  // });

  const podcastEdges = podcasts.data.allMarkdownRemark.edges;

  podcastEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat,
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat,
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  podcastEdges.forEach((edge, index) => {
    // Create post pages
    const nextID = index + 1 < podcastEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : podcastEdges.length - 1;
    const nextEdge = podcastEdges[nextID];
    const prevEdge = podcastEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: podcastPostTemplate,
      context: {
        audioPath: edge.node.frontmatter.audioPath,
        shortDescription: edge.node.frontmatter.shortDescription,
        episodeNumber: edge.node.frontmatter.episodeNumber,
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });
  });

  // create Tags pages
  // pulled directly from https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/#add-tags-to-your-markdown-files
  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(blogs.data.allMarkdownRemark.edges, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });

  _.each(podcasts.data.allMarkdownRemark.edges, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);
  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};
