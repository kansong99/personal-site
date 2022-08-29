const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

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

  const blogPostTemplate = path.resolve("src/templates/blogPostTemplate.js");
  const tagTemplate = path.resolve("src/templates/tagTemplate.js");
  const podcastPostTemplate = path.resolve(
    "src/template/podcastPostTemplate.jsx",
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
  const podcasts = graphql(`
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

  podcasts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.field.slug,
      component: podcastPostTemplate,
      context: { slug: node.fields.slug },
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
