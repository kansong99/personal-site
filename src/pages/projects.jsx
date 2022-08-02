import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from '@mui/material';
import ProjectCard from '../components/projectCard';


const useStyles = makeStyles({
    projectTitle: {
        flexGrow: 1,
        textAlign: 'center',
        color:  '#ff330082',
        
    },
    gridContainer: {
        paddingLeft: "30px",
        paddingRight: "30px",
    },
})


const ProjectsPage = ({ data }) => {
        const classes = useStyles();
        return (
            <Layout>
            <Seo
            title="Home"
            keywords={['gatsby', 'application', 'react', 'portfolio']}
            />
            <h3 className={classes.projectTitle}>Projects</h3>
            <div className="project-list">
            <Grid justifyContent="center" container className={classes.gridContainer} spacing={4}>
                {data.allProjectsJson.edges.map((project, id) => (
                    <Grid xs={12} item key={id} className={classes.gridItem}>  
                    <ProjectCard
                    title={project.node.title}
                    status={project.node.status}  
                    github={project.node.github} 
                    url={project.node.url} 
                    image={project.node.thumbnailImage.childImageSharp.gatsbyImageData} 
                    description={project.node.description}/> 
                </Grid>))}
                </Grid>
            </div>
        </Layout>
        )
};


export default ProjectsPage;

export const projectsQuery = graphql`
query {
    allProjectsJson(sort: {order: DESC, fields: [date] }) {
        edges {
            node {
                title
                date
                description
                url
                github
                status
                thumbnailImage {
                    childImageSharp {
                        gatsbyImageData(height: 270)
                    
                  } 
                }
            }
        }
    }
}`

/**    {
      "title": "Stylelex",
      "date": "03-2021",
      "description": "A prototype for a tool that applies in-house styleguides to text. Built with Flask and React",
      "url": "https://stylelex-api-heroku.herokuapp.com/",
      "github": "https://github.com/kansong99/stylelex",
      "status": "inactive",
      "thumbnailImage": "../images/projects/stylelex.jpeg"
    } */