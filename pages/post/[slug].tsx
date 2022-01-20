import React from 'react';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';

const Post = () => {
  return <main>
    <Header/>
  </main>;
};

export default Post;


export const getStaticPaths = async ()=> {
  const query
}