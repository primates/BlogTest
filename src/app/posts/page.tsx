import Link from "next/link";

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
      <h1>Blog Posts</h1>
      {posts.map((post: any) => {
        return (
          <Link href={`/posts/${post.id}`}>
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
