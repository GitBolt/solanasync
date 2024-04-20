import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/util/db';
import { User } from '@/util/schema';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  dbConnect()
  if (req.method === 'POST') {
    try {
      const { bio, instagram, twitter, name, email, publicKey } = req.body;
      const newUser = new User({ email, publicKey, bio, instagram, twitter, name });
      await newUser.save();
     
      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
