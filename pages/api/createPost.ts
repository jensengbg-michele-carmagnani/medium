// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, email, author, post } = JSON.parse(req.body);
  console.log('createPost',JSON.parse(req.body))
  try {
    
    await client.create({
      _type: 'document',
      
      title,
      description,
      author,
      email,
      post,
    });
  } catch (error) {
    res.status(500).json({ message: `We couldn't create a comment'`, error });
  }
  console.log('Comment created');
  res.status(200).json({ message: 'Comment submitted' });
}
