import dbConnect from '@/util/db';
import { Workshop } from '@/util/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, location, start, end, description, ownerId, owner, capacity } = req.body;
      if (!name || !location || !start || !end) {
        return res.status(400).json({ message: 'Title, location, start date and end date are required' });
      }
      await dbConnect()
      
      const newWorkshop = new Workshop({ name, location, start, end, description, ownerId, owner, links: {}, capacity });
      await newWorkshop.save();

      res.status(200).json(newWorkshop);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
