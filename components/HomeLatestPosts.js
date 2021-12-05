import React, { useEffect, useState } from "react";
import PostPreview from "../components/PostPreview";

const HomeLatestPosts = ({ posts }) => {

  //console.log('coming from HomeLatestPosts:', posts);
  
  //Get all posts ids
  const postIds = posts.map((singlePost) => {
    return  singlePost.id;  
  });
  //console.log('ids:', postIds);
  
  const postData = posts.map((singlePost) => {
    return { postdata: {id: singlePost.id, title: singlePost.attributes.title, description: singlePost.attributes.description }};
  })

  //console.log('postdata:', postData[postdata].id];

  //const {id, title, description} = postData;

  //console.log(id);
  

  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    setLatestPosts(posts.slice(0, 3));
  }, [posts]);

  console.log('latestPosts:', latestPosts);

  function renderPostPreviews() {
    
    return latestPosts.map((singlePost) => {
      //console.log('url: ', singlePost.thumbnail.data.attributes.url);
      return <PostPreview post={singlePost.attributes} id={singlePost.id} key={singlePost.id}  /> ;
    });
  }

  // function renderPostPreviews() {
  //   return latestPosts.map((post) => {
  //     return <PostPreview post={post} key={post.id} />;
  //   });
  // }

  return (
    <>
    <div className="latest-posts">
      <h2 className="text-4xl font-bold">Latest Posts:</h2>
      {renderPostPreviews()}
    </div>
      
    </>
  );
};

export default HomeLatestPosts;
