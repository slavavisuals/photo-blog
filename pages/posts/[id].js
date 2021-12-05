import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GET_ALL_POSTS, GET_SINGLE_POST } from "../../graphql/queries";

import React from "react";
import MarkdownIt from "markdown-it";

import { NextSeo } from "next-seo";
import Image from 'next/image';
import { print } from "graphql";

const PostPage = ({ post }) => {

  const {title, description, content, photo} = post;
  
  // Getting SEO for the page
  const SEO = {
    title: `Slava Visuals | ${title} `,
    description: `${description}`,

    openGraph: {
      title: `Slava Visuals | ${title} `,
      description: `${description}`,
    },
  }
  
  // Rendering MD -> HTML
  const md = MarkdownIt();
  const postPrimaryContent = md.render(content);

  //Iterate photos if post has them
  const getPhotos = () => {
    //console.log("I am inside getPhotos() ", photo);
    return (
      <>
        {
          photo.map((singlePhoto) => {
            const photoDescription = md.render(singlePhoto.description);
            return (
              <div className="my-photos grid gap-y-4 my-6">
                {singlePhoto.title && <h1>{singlePhoto.title}</h1>}
                {singlePhoto.photo.data.attributes.url && <img className="rounded-3xl" src={singlePhoto.photo.data.attributes.url}></img>}
                {singlePhoto.description && <div dangerouslySetInnerHTML={{ __html: photoDescription }}></div>}
              </div>
            )
          })
        }
      </>
     )
  }


  return (
    <>
    <NextSeo {...SEO} />
    <article className="grid gap-y-8 mx-auto xl:w-[1200px] 2xl:w-[1400px]">
      <header className="font-nunito grid gap-y-6 items-center  lg:grid-cols-2 lg:gap-x-8 xl:gap-x-5">
        <div className="blog-header-img-container ">
          <Image
            className="blog-header-img rounded-3xl xl:border-2 border-purple-700"
            src="https://res.cloudinary.com/slavavisuals/image/upload/v1637879434/samples/photo-1593642634443-44adaa06623a_zeyp2h.jpg"
            alt="Picture of blogpost"
            layout="fill"
          />
        </div>
        
        <div className="xl:pl-10 grid gap-y-4" >
          {/* tags */}
          <ul className="flex space-x-2">
            <li className="bg-gray-100 rounded-full py-1 px-5 text-gray-800">tag1</li>
            <li className="bg-gray-100 rounded-full py-1 px-5 text-gray-800">tag2</li>
            <li className="bg-gray-100 rounded-full py-1 px-5 text-gray-800">tag3</li>
          </ul>
          <h1 className="text-5xl text-left xl:text-8xl font-extrabold">{title}</h1>
        </div>
        
      </header>

      <main className="justify-self-center font-roboto text-base leading-loose md:text-lg md:leading-loose lg:w-9/12">
        {/* Primary post content */}
        <section className="mb-12" dangerouslySetInnerHTML={{ __html: postPrimaryContent }}></section>
        
        {photo.length ? getPhotos() : false }
        
        {/* 
        <div className="grid gap-y-4">
          {
           photo.map((singlePhoto => {
             const photoDescription = md.render(singlePhoto.description)
             return [
              singlePhoto.title && <h3> {singlePhoto.title} </h3>,
              singlePhoto.photo.data.attributes.url && <img className="rounded-3xl" src={singlePhoto.photo.data.attributes.url}></img>,
              singlePhoto.description && <div dangerouslySetInnerHTML={{ __html: photoDescription }}></div>
             ]
           }))
          }
        </div>
        */}
        
      </main>
    </article>
    </>
  );
};

export default PostPage;

// 2 
export async function getStaticProps({ params }) {
  
  //initiate AppoloClient
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL,
    cache: new InMemoryCache()
  })
  //get array of all posts
  const singlePost = await client.query({ 
    query:GET_SINGLE_POST,
    variables: {
    id: params.id,
  }, });

  //console.log('singlePost', singlePost);

  return {
    props: {
      post: singlePost.data.post.data.attributes,
    }
}
}

//1. we tell NexJS how many posts (path and page) id we need to generate
// params will be matched against his path

//then return statement will send to getStaticProps option to generate the page where id=1,2,3... hence array of ids
// So in other words we need to generate 'paths' array
// in order to do this we need to request all the posts with *Apolo+GraphQL
export async function getStaticPaths() {

  console.log('I am in getStaticPaths');

  //initiate AppoloClient
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL,
    cache: new InMemoryCache()
  })
  //get array of all posts
  const {data} = await client.query({ query: GET_ALL_POSTS });
  console.log('data:', data);
  
   const paths = data.posts.data.map((singlePost) => {
     return {params: {id: singlePost.id} }
   });

   console.log(paths);

  return {
    //paths is array of 
    //multiple objects
    paths,
    fallback: false
  }
}
