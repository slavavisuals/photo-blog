import React from "react";
//import axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_POSTS } from '../../graphql/queries';
import AllPosts from "../../components/AllPosts";
//import getStrapiUrl from "../../util/getStrapiUrl";

const Posts = ({ posts }) => {
  //console.log("This is Posts page");
  return (    
    <div className="all-posts">
      <AllPosts posts={posts} />
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL,
    cache: new InMemoryCache()
  })
  const {data} = await client.query({ query: GET_ALL_POSTS });
  //const postsRes = await axios.get(getStrapiUrl("/posts"));  
  return {
    props: {
      posts: data.posts,
    },
  };

  // return {
  //   props: {
  //     posts: postsRes.data,
  //   },
  // };
}