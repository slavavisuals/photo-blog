import axios from "axios";
import React from "react";
import MarkdownIt from "markdown-it";
import getStrapiUrl from "../../util/getStrapiUrl";
import { NextSeo } from "next-seo";
import Image from 'next/image';

const PostPage = ({ post }) => {



  const SEO = {
    title: `Slava Visuals | ${post.title} `,
    description: `${post.description}`,

    openGraph: {
      title: `Slava Visuals | ${post.title} `,
      description: `${post.description}`,
    },
  }

  

  const md = MarkdownIt();
  const htmlContent = md.render(post.content);

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
          <h1 className="text-5xl text-left xl:text-8xl font-extrabold">{post.title}</h1>
        </div>
        
      </header>

      <main className="justify-self-center font-roboto text-base leading-loose md:text-lg md:leading-loose lg:w-9/12">
        {/* <h2>description: {post.description}</h2> */}
        <section dangerouslySetInnerHTML={{ __html: htmlContent }} className=""></section>
      </main>

      
        
      
    </article>
    </>
  );
};

export default PostPage;

//getting post property belonging to the current path that being rendered
export async function getStaticProps({ params }) {
  //
  const postRes = await axios.get(getStrapiUrl(`/posts/${params.id}`));
///posts/${params.id}
  return {
    props: {
      post: postRes.data,
    },
  };
}

// retrieve list of id of all posts
//it will get info to Next which post to generate this path for
export async function getStaticPaths() {
  //get all the posts from Strapi
  const postsRes = await axios.get(getStrapiUrl("/posts"));
  

  //generate array of objects of paths for each of posts
  const paths = postsRes.data.map((post) => {
    //getting current id of the post from iteration of all posts
    return { params: { id: post.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}
