import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from '@mui/material';
import { amber } from '@mui/material/colors';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    media: {
        height: 250,
        width: 250,
    },
});

export default function ProjectCard({
   title, description, github, status, image, url,  
}) 
{
    const classes = useStyles();
    return(
    <Card className={classes.root} variant="outlined">
        <CardHeader
            title={title}
            subheader={ status}
            />
        <CardMedia
        className={classes.media}
        component="img"
        src=
        { image}
        />
        <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
        </CardContent>
        <CardActions>
            <a href={github}><Button size="medium">Github</Button></a>
           <a href={url}> <Button size="medium">Visit Site</Button></a>
        </CardActions>

    </Card>)
}