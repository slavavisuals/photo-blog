import axios from "axios";
import React from "react";
import MarkdownIt from "markdown-it";

const PostPage = ({ post }) => {
  const md = MarkdownIt();
  const htmlContent = md.render(post.content);

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <h2>{post.description}</h2>
        <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
      </header>
    </article>
  );
};

export default PostPage;

//getting post property belonging to the current path that being rendered
export async function getStaticProps({ params }) {
  //
  const postRes = await axios.get(`http://localhost:1337/posts/${params.id}`);

  return {
    props: {
      post: postRes.data,
    },
  };
}

// retrieve list of id of all posts
//it will get info to Next which post to generate this path for
export async function getStaticPaths() {
  //get all the posts from Strapi
  const postsRes = await axios.get("http://localhost:1337/posts");

  //generate array of objects of paths for each of posts
  const paths = postsRes.data.map((post) => {
    //getting current id of the post from iteration of all posts
    return { params: { id: post.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}
