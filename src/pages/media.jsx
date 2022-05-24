import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import SiteCard from '../components/siteCard'
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

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
       <h2 className={classes.mediaTitle}>Media I've recently consumed</h2>
       <div className='media-list'>
           <Grid justify="center" container className={classes.gridContainer} spacing={4}>
                {data.allMediaJson.edges.map(media => (
                <Grid item className={classes.gridItem}>  
                    <SiteCard key={media.node.medium} 
                    mostRecent={media.node.mostRecent} 
                    medium={media.node.medium} 
                    image={media.node.thumbnailImage} 
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
                thumbnailImage 
                members {
                    title
                    author
                    dateCompleted

                }
            }
        }
    }
}`
