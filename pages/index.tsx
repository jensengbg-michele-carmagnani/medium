import Head from 'next/head';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../Typings';
interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y-2 border-black py-10 lg:py-0 ">
        <div className=" px-10 space-y-5">
          <h1 className=" md:text-4xl text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is place to write, read and connect{' '}
          </h1>
          <h2>
            it's easy and free to post your thinking on any topicc and connect
            with milllions of readers.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-30 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium"
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;
  
  const posts = await sanityClient.fetch(query);
  return {
    props:{posts}
  };
};
