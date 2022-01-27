import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { Post } from '../../Typings';
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../sanity';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../components/Header';

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data: any) => {
        setSubmitted(true);
      })
      .catch((error: any) => {
        setSubmitted(false), console.log(error);
      });
  };
  return (
    <main>
      <Header />
      <img
        className="w-2/3 h-64 object-cover m-auto"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl text-gray-500 mb-2">{post.description}</h2>
        <div className="flex items-center space-x-2">
          <figure>
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(post.author.image).url()!}
              alt=""
            />
          </figure>
          <p className="font-extralight text-sm ">
            <span className="block">Blog post by </span>
            <span className="font-thin text-green-600">
              {post.author.name}{' '}
            </span>{' '}
            -Published at {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold " {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5 " {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc " {...children}></li>
              ),
              link: ({ children, href }: any) => (
                <a
                  href={href}
                  className="text-blue-500 hover:underline "
                  {...children}
                />
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-yellow-400" />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold">
            Thanks for submitting the comment!
          </h1>
          <p> Once it has been appreved, it will below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10 "
        >
          <h3 className="text-sm text-yellow-500 "> Enjoy this article?</h3>
          <h4 className="text-3xl font-bold"> Live a comment below!</h4>
          <hr className="py-3 mt-2" />
          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label htmlFor="name" className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="text "
              placeholder="Name"
            />
          </label>
          <label htmlFor="email" className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="email "
              placeholder="email"
            />
          </label>{' '}
          <label htmlFor="comment" className="block mb-5">
            <span className="text-gray-700">Comment </span>
            <textarea
              {...register('comment', { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              placeholder="comment"
              rows={8}
            />
          </label>
          <div className="flex flex-col p-5">
            {errors.name && (
              <p className="text-red-500">- The name is required! </p>
            )}
            {errors.email && (
              <p className="text-red-500">- The email is required! </p>
            )}
            {errors.comment && (
              <p className="text-red-500">- The comment is required! </p>
            )}
          </div>
          <input
            type="submit"
            className="shodow bg-yellow-500 hover:bg-yellow-400 focus:shodow-outline 
          focus:outline-none text-white font-bold py-2 px-4 roudned cursor-pointer"
          />
        </form>
      )}
      {/* comments */}
      <div className="flext flex-col p-10 max-w-3xl mx-auto shadow-yellow-400 shadow space-y-2 mb-9">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id} className="py-2 px-3   ">
            <p className="">
              <span className="text-yellow-500 relative right-3">
                {comment.name}
              </span>
              :<span>{comment.comment}</span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
    _id,
    slug{current}
   }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
       _id,
       _createdAt,
     title,
     author-> {
       name,
       image
     },
     'comments': *[
       _type == "comment" &&
       post._ref == ^._id &&
       approved == true],
     description,
     mainImage,
     slug,
     body
   }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
    revalidate: 60,
  };
};
