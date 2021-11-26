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
    <article>
      <div className="grid grid-cols-2 items-center bg-red-100 w-9/12 mx-auto">
        <Image
          className="rounded-3xl"
          src="https://res.cloudinary.com/slavavisuals/image/upload/v1637879434/samples/photo-1593642634443-44adaa06623a_zeyp2h.jpg"
          alt="Picture of blogpost"
          width={500}
          height={500}
        />
        <div className="pl-10 grid gap-y-4" >
          {/* tags */}
          <ul className="flex space-x-2">
            <li className="bg-gray-200 rounded-full px-3">tag1</li>
            <li className="bg-gray-200 rounded-full px-3">tag2</li>
            <li className="bg-gray-200 rounded-full px-3">tag3</li>
          </ul>
          <h1 className="text-8xl pl-2 font-nunito">{post.title}</h1>
        </div>
        
      </div>
      <header>
        <h2>description: {post.description}</h2>
        <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
      </header>
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
