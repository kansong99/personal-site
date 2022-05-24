import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    media: {
        height: 300,
    },
});

export default function SiteCard({
   mostRecent, medium, members, image 
}) 
{
    const classes = useStyles();
    return(
    <Card className={classes.root} variant="outlined">
        <CardHeader
            avatar={
                <Avatar sx={{bgcolor: green[500]}} aria-label="medium">
                    {medium.charAt(0)}
                </Avatar>
            }
            title={medium}
            subheader={`Most recently completed: ${mostRecent}`}
            />
        <CardMedia
        className={classes.media}
        component="img"
        src=
        { image}
        alt={`Favorite ${medium} as of late`}
        />
        <CardContent>
            {members.map(member =>(
                <Typography key={member.title} variant="body2" color="textSecondary">
                    {member.title}, {member.author}
                </Typography>
            
            ))}
        </CardContent>

    </Card>)
}