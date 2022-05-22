import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';


const MediaPage  = ({ data }) => (
    <Layout>
        <div>
            hi
        </div>
    </Layout>

)

export default MediaPage;

export const mediaQuery = graphql`
query {
    allMediaJson(sort: {order: DESC, fields: [members___dateCompleted] }) {
        edges {
            node {
                medium
                mostRecent
                description
                thumbnailImage {
                    childImageSharp {
                        gatsbyImageData(width:90)
                      }
                }
                members {
                    title
                    author
                    dateCompleted

                }
            }
        }
    }
}`
