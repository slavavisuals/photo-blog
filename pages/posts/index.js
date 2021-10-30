import React from "react";
import axios from "axios";
import AllPosts from "../../components/AllPosts";
import getStrapiUrl from "../../util/getStrapiUrl";

const Posts = ({ posts }) => {
  return (
    <div>
      <AllPosts posts={posts} />
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const postsRes = await axios.get(getStrapiUrl("/posts"));

  return {
    props: {
      posts: postsRes.data,
    },
  };
}
