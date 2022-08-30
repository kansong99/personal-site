import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

function BlogPostTemplate({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Seo
        title="Home"
        keywords={[
          "Kofi",
          "Ansong",
          "blog",
          "projects",
          "media",
          ...frontmatter.tags,
        ]}
      />
      <section>
        <div>
          <h1>{frontmatter.title}</h1>
          <span>{frontmatter.date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
