import React from "react";
import axios from "axios";
import AllPosts from "../../components/AllPosts";

const Posts = ({ posts }) => {
  return (
    <div>
      <AllPosts posts={posts} />
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const postsRes = await axios.get("https://slava-photo-blog-strapi.herokuapp.com/posts");

  return {
    props: {
      posts: postsRes.data,
    },
  };
}
