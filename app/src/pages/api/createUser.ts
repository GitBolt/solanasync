import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/util/db';
import { User } from '@/util/schema';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  dbConnect()
  if (req.method === 'POST') {
    try {
      const { publicKey } = req.body;
      if (!publicKey) {
        return res.status(400).json({ message: 'Public Key is required' });
      }
      const newUser = new User({ publicKey });
      await newUser.save();

      res.status(200).json({ message: 'Created User' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
