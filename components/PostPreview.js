import React from "react";
import Link from "next/link";

const PostPreview = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} passHref>
      <article className="postPreview">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </article>
    </Link>
  );
};

export default PostPreview;
