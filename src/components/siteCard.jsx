import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {Avatar, Card, CardContent, CardHeader, Typography} from '@mui/material';
import { GatsbyImage } from "gatsby-plugin-image"
import { amber } from '@mui/material/colors';
const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    media: {
        height: 300,
    },
    avatar: {
        backgroundColor: amber[500],
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
        <GatsbyImage image={image} alt={"hello"} height={270} />
        <CardContent>
            {members.map(member =>(
                <Typography key={member.title} variant="body2" color="textSecondary">
                    {member.title}, {member.author}
                </Typography>
            
            ))}
        </CardContent>

    </Card></>)
}