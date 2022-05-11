//blog.js
import { kebabCase } from 'lodash';
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import { GatsbyImage}  from 'gatsby-plugin-image';
const BlogPage = ({ data }) => {
    const posts = data.allMarkdownRemark.edges;
    return (
        <Layout>
            <div className="post-list">
                {posts.map(post => (
                    <div key={post.node.id} className="post-list__item">
                        <div className="post-list__thumbnail">
                            <Link to={post.node.fields.slug}>
                                <GatsbyImage
                                image={post.node.frontmatter.thumbnail.childImageSharp.gatsbyImageData} alt="a cat"
                                />
                            </Link>
                        </div>
                        <div className="post-list__content">
                            <h2>{post.node.frontmatter.title}</h2>
                            {post.node.frontmatter.tags? (
                                <div className="tags-container">
                                    <ul className="taglist">
                                        {post.node.frontmatter.tags.map(tag => (
                                            <li key={tag + `tag`}>
                                                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>) : null}
                            <p>{post.node.frontmatter.date}</p>
                            <div className="post-list__excerpt">
                                <p>{post.node.excerpt}</p></div>
                        <Link to={post.node.fields.slug}>Read More</Link>
                    </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default BlogPage;

//get all markdown data, in descending order by date, and grab the id, excerpt, slug, date, and title
export const pageQuery = graphql`
query{
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
            node {
                id
                excerpt(pruneLength: 250)
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    tags
                    thumbnail {
                        childImageSharp { gatsbyImageData(width:90)
                        }
                    }
                }
            }
        }
    }
}
`;