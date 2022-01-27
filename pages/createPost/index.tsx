import React, { useState } from 'react';
import Header from '../../components/Header';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  title: string;
  description: string;
  email: string;
  author: string;
  post: string;
}
const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [submitted, setSubmitted] = useState(true);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    fetch('/api/createPost', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => (console.log(response), setSubmitted(true)))
      .catch((error: any) => (console.log(error), setSubmitted(false)));
  };
  return (
    <main className="max-w-7xl  h-screen  mx-auto  ">
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mx-auto h-full justify-center w-1/2 pt-10  "
      >
        <h1 className="text-center text-5xl text-yellow-500">
          Create your new post
        </h1>
        <hr className="max-w-lg my-5 mx-auto border border-yellow-400" />

        <label htmlFor="" className="block mb-5" />
        <span>Title</span>
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="Tilte"
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
        />

        <label htmlFor="" className="block mb-5" />
        <span>Description</span>
        <input
          {...register('description', { required: true })}
          type="text"
          placeholder="Description"
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
        />
        <label htmlFor="" className="block mb-5" />
        <span>Email</span>
        <input
          {...register('email', { required: true })}
          type="text"
          placeholder="Email"
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
        />

        <label htmlFor="" className="block mb-5" />
        <span>Author</span>
        <input
          {...register('author', { required: true })}
          type="text"
          placeholder="Author"
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
        />

        <label htmlFor="" className="block mb-5" />
        <span>Body</span>
        <textarea
          {...register('post', { required: true })}
          rows={10}
          placeholder="Post body"
          className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"'
        />
        <div className="flex flex-col p-5">
          {errors.title && (
            <p className="text-red-500">- The title is required! </p>
          )}
          {errors.email && (
            <p className="text-red-500">- The email is required! </p>
          )}
          {errors.post && (
            <p className="text-red-500">- The body-post is required! </p>
          )}
          {errors.description && (
            <p className="text-red-500">- The description is required! </p>
          )}
          {errors.author && (
            <p className="text-red-500">- The author is required! </p>
          )}
        </div>
        <input
          type="submit"
          className="w-full mt-10 shodow bg-yellow-500 hover:bg-yellow-400 focus:shodow-outline 
          focus:outline-none text-white font-bold py-2 px-4 roudned cursor-pointer "
        />
      </form>
    </main>
  );
};

export default index;
