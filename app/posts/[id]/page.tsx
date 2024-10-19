import { comment } from "postcss";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

async function getPosts(postId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function PostsPage({ params }: any) {
  async function getComments(postId: string) {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/?postId=${postId}`
    );
    let data = await response.json();
    return data;
  }

  const post = await getPosts(params.id);
  let comments = await getComments(params.id);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {comments.map((comment: any) => {
        let avatarName;
        avatarName = comment.name;
        return (
          //<div key={comment.id}>
          // <h4>{comment.name}</h4>
          //<h5>{comment.email}</h5>
          // <p>{comment.body}</p>
          //</div>
          <Box sx={{ minWidth: 175 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <Avatar {...stringAvatar(avatarName)} />
                    {comment.email}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {comment.body}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        );
      })}
    </div>
  );
}
function stringToColor(string: any) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: any) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
