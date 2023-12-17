import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/util/db';
import { User, Workshop } from '@/util/schema';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {
      const { workshopId, presentation, feedback } = req.body;

      if (!workshopId) {
        return res.status(400).json({ message: 'workshopId is required' });
      }
      
      await dbConnect();
      
      const updateData: any = {};
      if (presentation !== undefined) updateData['links.presentation'] = presentation;
      if (feedback !== undefined) updateData['links.feedback'] = feedback;
      
      const w = await Workshop.updateOne(
        { _id: workshopId },
        { $set: updateData }
      );
      
      res.status(200).json({ message: 'Added Link', workshop: w });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
