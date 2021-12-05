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
    
    return posts.map((singlePost) => {
      const {attributes, id } = singlePost;
      //console.log('url: ', url);
      //console.log('singlePost..............................', singlePost.attributes.thumbnail.data.attributes.url );
      return <PostPreview post={singlePost.attributes} id={singlePost.id} key={singlePost.id} />;
    });
  }

  return (
    <>
    <NextSeo {...SEO} />
      
      {renderPostPreviews()}
    
      
    </>
  );
};

export default AllPosts;
