import axios from "axios";

import React from "react";
import HomeHeader from "../components/HomeHeader";
import HomeLatestPosts from "../components/HomeLatestPosts";

function Home({ posts }) {
  return (
    <>
      <HomeHeader />
      <HomeLatestPosts posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const postsRes = await axios.get("https://slava-photo-blog-strapi.herokuapp.com/posts");

  return {
    props: {
      posts: postsRes.data,
    },
  };
}

export default Home;
