import React from 'react';
import PostItem from './PostItem';
import Link from 'next/link';

import { Post } from '../Typings';
import { urlFor } from '../sanity';
interface Props {
  posts: [Post];
}

const PostList = ({ posts }: Props) => {
  return (
    <main>
      
    </main>
  );
};

export default PostList;
