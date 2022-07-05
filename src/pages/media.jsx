import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import SiteCard from '../components/siteCard'
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    mediaTitle: {
        flexGrow: 1,
        textAlign: 'center',
        color:  '#FFD700',
        
    },
    gridContainer: {
        paddingLeft: "30px",
        paddingRight: "30px",
    },
})

const MediaPage  = ({ data }) => {
    const classes = useStyles();
    return (
    <Layout>
       <h3 className={classes.mediaTitle}>Connect and talk to me about this stuff!</h3>
       <div className='media-list'>
           <Grid justifyContent="center" container className={classes.gridContainer} spacing={4}>
                {data.allMediaJson.edges.map((media, id) => (
                <Grid item key={id} className={classes.gridItem}>  
                    <SiteCard key={media.node.medium} 
                    mostRecent={media.node.mostRecent} 
                    medium={media.node.medium} 
                    image={media.node.image.childImageSharp.gatsbyImageData} 
                    members={media.node.members}/> 
                </Grid>))}
           </Grid>
       </div>

    </Layout>

                )}

export default MediaPage;

export const mediaQuery = graphql`
query {
    allMediaJson(sort: {order: DESC, fields: [members___dateCompleted] }) {
        edges {
            node {
                medium
                mostRecent
                description
                image {
                    childImageSharp {
                      gatsbyImageData(height: 270)
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
