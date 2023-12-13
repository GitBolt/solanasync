import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/util/db';
import { User, Workshop } from '@/util/schema';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {
      const { workshopId, quizAddress } = req.body;
      if (!workshopId || !quizAddress) {
        return res.status(400).json({ message: 'workshopId & quizAddress are required' });
      }
      await dbConnect();

      await Workshop.updateOne(
        { _id: workshopId },
        {
          $set: {
            quizMetadata: {
             quizAddress
            }
          }
        }
      )

      res.status(200).json({ message: 'Added quiz to workshop' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
