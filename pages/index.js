import { ApolloClient, InMemoryCache } from "@apollo/client";
//import axios from "axios";
import { GET_ALL_POSTS } from '../graphql/queries';

import React from "react";
import HomeHeader from "../components/HomeHeader";
import HomeLatestPosts from "../components/HomeLatestPosts";
//import getStrapiUrl from "../util/getStrapiUrl";

function Home({ posts }) {
  //console.log("This is Index page");
  //console.log('all posts:', posts);

  //const [id] = posts.data;

  //console.log('ids: ', id);

  

  return (
    <>
      <HomeHeader />
      <HomeLatestPosts posts={posts} />
    </>
  );
}



export async function getStaticProps() {
  
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL,
    cache: new InMemoryCache()
  })

  const {data} = await client.query({ query: GET_ALL_POSTS });
    //console.log('data',data.posts);
  // const paths = data.posts.map((post) => {
  //   return {params: {id: post.id.toString()} }
  // });

  //console.log(paths);
  

  return {
    props: {
      posts: data.posts.data,
    },
  };

  // return {
  //   props: {
  //     posts: postsRes.data,
  //   },
  // };
}

export default Home;
