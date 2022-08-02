import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {Avatar, Card, CardContent, CardHeader, Typography} from '@mui/material';
import { GatsbyImage } from "gatsby-plugin-image"

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    media: {
        height: 300,
    },
    avatar: {
        backgroundColor: '#ff330082',
    }
});

export default function SiteCard({
   mostRecent, medium, members, image 
}) 
{
    console.log(image);
    const classes = useStyles();
    return(<>
    <Card className={classes.root} style={{ border: "none", boxShadow: "none" }}>
        <CardHeader
            avatar={
                <Avatar className={classes.avatar} aria-label="medium">
                    {medium.charAt(0)}
                </Avatar>
            }
            title={medium}
            subheader={`Most recently completed: ${mostRecent}`}
            />
        <div style={{ justifyContent: "center", display: "flex" }}><GatsbyImage image={image} alt={"media still"} height={270} /></div>
        <CardContent>
            {members.map(member =>(
                <Typography key={member.title} variant="body2" color="textSecondary">
                    {member.title}, {member.author}
                </Typography>
            
            ))}
        </CardContent>

    </Card></>)
}