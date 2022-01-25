import Head from 'next/head';
import Header from '../components/Header';
import { useSession } from 'next-auth/react';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../Typings';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/outline';
interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const { data: session } = useSession();
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
      {/* <PostList {...posts}/> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-6 p-2 md:p-6 cursor-pointer ">
        <>
          {posts.map((post: Post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group rounded-lg border-solid border-2 border-grey-700 overflow-hidden">
                {post.mainImage && (
                  <img
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out "
                    src={urlFor(post.mainImage).url()!}
                  />
                )}

                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold"> {post.title}</p>
                    <p className="text-xs ">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className="h-12 y-12 rounded-full"
                    src={urlFor(post.mainImage).url()!}
                  />
                </div>
              </div>
            </Link>
          ))}
          {session && (
            <Link href="/create-post">
              <div className="flex items-center justify-center border rounded  bg-slate-200 hover:opacity-60 hover:text-blue-700 transition transform duration-200 ease-out">
                <PlusCircleIcon className="h-28 pointer:cursor" />
              </div>
            </Link>
          )}
        </>
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
    props: { posts },
  };
};
