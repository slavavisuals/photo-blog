import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';

const PostPreview = ({ post, id }) => {
  const imgPublicId = post.thumbnail.data.attributes.provider_metadata.public_id;
  const cldUrl = buildUrl(imgPublicId, {
    cloud: {
      cloudName: 'slavavisuals',
    },
    transformations: {
      quality: 85,
      resize: {
        type: "scale",
        width: 250,
        height: 250,
        aspectRatio: "1.5",
      },
    },
  })


  console.log(post.thumbnail.data.attributes.provider_metadata.public_id);
  return (
    <Link href={`/posts/${id}`} passHref>
      <article className=" postPreview bg-gray-200 my-3 rounded-2xl p-5">
      <Image src={cldUrl} alt="image"  width="250" height="250" />
      {/* <img className="w-52" src={post.thumbnail.data.attributes.url} alt="#" /> */}
        {/* <a href={`/posts/${id}`}> link lalala</a> */}
         <h3>{post.title}</h3>
         <p>{post.description}</p>
      </article>
    </Link>
      
      
      
    
    // <Link href={`/posts/${post.id}`} passHref>
    //   <article className="postPreview">
    //     <h3>{post.title}</h3>
    //     <p>{post.description}</p>
    //   </article>
    // </Link>
  );
};

export default PostPreview;
