const _ = require('lodash');
const path = require('path');
const media = require('./src/data/media.json');
//const projects = require('./src/data/projects.json');
const {createFilePath} = require('gatsby-source-filesystem');


exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {
  media.forEach((card) => {

    const {medium, mostRecent, description, image, members } = card;

    const {name, ext} = path.parse(image);
    const absolutePath = path.resolve(__dirname, image);

    const data = {
      name,
      ext,
      absolutePath,
      extension: ext.substring(1),
    }

    const imageNode = {
      ...data,
      id: createNodeId(`mediaCard-image-${name}`),
      children: [],
      internal: {
        type: 'MediaCardImage',
        contentDigest: createContentDigest(data),
      }
    };

    actions.createNode(imageNode);
 
    const node = {
      medium, mostRecent, description, members,
      image: imageNode,
       id: createNodeId(`card-${medium}`),
       internal: {
         type: 'MediaCard',
         contentDigest: createContentDigest(card),
       } 
    };

    actions.createNode(node);
  })
};

exports.onCreateNode = ({ node, actions, getNode}) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
}; 


exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('src/templates/postTemplate.js');
  const tagTemplate = path.resolve('src/templates/tagTemplate.js');
  const result = await graphql(`
  {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date] }
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
  `)
    if(result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: {slug: node.fields.slug },  //additional data can be passed via context
      });
    });
    // create Tags pages
    // pulled directly from https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/#add-tags-to-your-markdown-files
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    //Eliminate duplicate tags
    tags = _.uniq(tags);
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });
};

