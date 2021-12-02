import React from "react";
import Link from "next/link";

const PostPreview = ({ post, id }) => {
  console.log('in PostPreviews: ',post);
  return (
    
      <article className="postPreview">
        <a href={`/posts/${id}`}> link lalala</a>
         <p>{id}</p>
         <h3>{post.title}</h3>
         <p>{post.description}</p>
      </article>
      
    
    // <Link href={`/posts/${post.id}`} passHref>
    //   <article className="postPreview">
    //     <h3>{post.title}</h3>
    //     <p>{post.description}</p>
    //   </article>
    // </Link>
  );
};

export default PostPreview;
