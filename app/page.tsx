import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);



export default async function Home() {
  async function getPosts() {
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=30"
    );
    let data = await response.json();
    return data;
  }

  let posts = await getPosts();

  return (
    <div>
        <h1>Blog Post</h1>
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(posts).map((post: any, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Link href={`/posts/${post.id}`}>
            <React.Fragment>
              <CardContent key={post.id}>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {post.body}
                </Typography>
              </CardContent>
            </React.Fragment>
          </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
    
    </div>
  );
}
