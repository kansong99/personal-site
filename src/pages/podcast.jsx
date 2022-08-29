import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostListing from "../components/postListing";
import Seo from "../components/seo";
import config from "../../data/siteConfig";
// import Footer from "../components/Footer";

function PodcastPage({ data }) {
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="listing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <Seo />
          {/* <Menu/> */}
          <PostListing postEdges={postEdges} />
          {/* <Footer config={config} /> */}
        </div>
      </div>
    </Layout>
  );
}

export default PodcastPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query{
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(podcast)/"}}
      sort: { order: DESC, fields: [frontmatter___date] }) 
     {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            shortDescription
            episodeNumber
          }
        }
      }
    }
  }
`;
