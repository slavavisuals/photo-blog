import React, { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";

const HomeLatestPosts = ({ posts }) => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    setLatestPosts(posts.slice(0, 5));
  }, [posts]);

  function renderPostPreviews() {
    return latestPosts.map((post) => {
      return <PostPreview post={post} key={post.id} />;
    });
  }

  return (
    <>
    <div className="latest-posts">
      <h2 className="text-4xl font-bold">Latest Posts</h2>
      {renderPostPreviews()}
    </div>
      
    </>
  );
};

export default HomeLatestPosts;
