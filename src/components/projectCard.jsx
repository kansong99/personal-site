import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Card, CardActions, CardContent, CardHeader, Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { GatsbyImage } from "gatsby-plugin-image";

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
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="elevation">
      <CardHeader
        title={title}
        subheader={status}
      />
      <div style={{ justifyContent: "center", display: "flex" }}><GatsbyImage image={image} alt="project still" /></div>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={github}><Button size="medium">Github</Button></a>
        <a href={url}>
          {" "}
          <Button size="medium">Visit Site</Button>
        </a>
      </CardActions>

    </Card>
  );
}
