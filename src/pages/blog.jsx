// blog.js
import { kebabCase } from "lodash";
import React from "react";
import { graphql, Link } from "gatsby";
import makeStyles from "@mui/styles/makeStyles";
import Layout from "../components/layout";
import Seo from "../components/seo";
// import { GatsbyImage}  from 'gatsby-plugin-image';
const useStyles = makeStyles({
  projectTitle: {
    flexGrow: 1,
    textAlign: "center",
    color: "#ff330082",

  },
});

function BlogPage({ data }) {
  const classes = useStyles();
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Seo
        title="Kofi Ansong - Blog"
        keywords={["app", "blog", "SF", "kofi", "ansong", "software engineering"]}
      />
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.node.id} className={classes.postListItem}>
            {/* <div className="post-list__thumbnail">
                            <Link to={post.node.fields.slug}>
                                <GatsbyImage
                                image={post.node.frontmatter.thumbnail.childImageSharp.gatsbyImageData} alt="a cat"
                                />
                            </Link>
                        </div> */}
            <div>
              <h2 style={{ color: "#ff330082" }}>{post.node.frontmatter.title}</h2>
              {post.node.frontmatter.tags ? (
                <div className="tags-container">
                  {post.node.frontmatter.date}
                  {" "}
                  |
                  <ul className="taglist" style={{ marginBottom: 2, listStyle: "none", display: "inline-block" }}>
                    {post.node.frontmatter.tags.map((tag) => (
                      <li style={{ marginRight: 10, display: "inline-block" }} key={`${tag}tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="post-list__excerpt">
                <p>{post.node.excerpt}</p>
              </div>
              <Link to={post.node.fields.slug}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default BlogPage;

// get all markdown data, in descending order by date, and grab the id, excerpt, slug date and title

export const pageQuery = graphql`
query{
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog)/"}}
        sort: { order: DESC, fields: [frontmatter___date] }) {
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
                   
                    }
                }
            }
        }
    }
`;
