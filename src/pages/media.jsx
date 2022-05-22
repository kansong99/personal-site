import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import Card from '@material-ui/core/Card';

const MediaPage  = ({ data }) => (
    <Layout>
       <h2>Media I've Consumed</h2>
       <div className='media-list'>
           {data.allMediaJson.edges.map(media => (
               <Card key={media.node.id}>{media.node.medium}</Card>
           ))}
       </div>

    </Layout>

)

export default MediaPage;

export const mediaQuery = graphql`
query {
    allMediaJson(sort: {order: DESC, fields: [members___dateCompleted] }) {
        edges {
            node {
                id
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
