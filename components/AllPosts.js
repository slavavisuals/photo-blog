import React from "react";
import PostPreview from "../components/PostPreview";
import { NextSeo } from "next-seo";

const AllPosts = ({ posts }) => {

  const SEO = {
    title: 'All post page',
    description: 'page that has list of all posts',

    openGraph: {
      title: 'All post page',
      description: 'page that has list of all posts',
    },
  }

  function renderPostPreviews() {
    return posts.map((post) => {
      return <PostPreview post={post} key={post.id} />;
    });
  }

  return (
    <>
    <NextSeo {...SEO} />
      <h2>Posts</h2>
      {renderPostPreviews()}
    </>
  );
};

export default AllPosts;
