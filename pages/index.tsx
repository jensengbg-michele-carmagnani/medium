import Head from 'next/head';
import Header from '../components/Header';
import { sanityClient } from '../sanity';
import { Post } from '../Typings';
interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(process.env.NEXT_PUBLIC_SANITY_DATASET );
  
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y-2 border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <div>
            <h1 className="text-6xl max-w-xl font-serif">
              <span className="underline decoration-black decoration-4">
                Medium{' '}
              </span>
              is place to write, read and connect{' '}
            </h1>
          </div>
          <h2>it's easy and free to post your thinking </h2>
        </div>
        <div>
          <img className="hidden md:inline-flex h-32 lg:h-full" src="" alt="" />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const post = await sanityClient.fetch(query);
  return {
    props: { post },
  };
};
