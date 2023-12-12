import { Workshop } from '@/util/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, location, date, ownerPubKey } = req.body;
      if (!name || !location || !date) {
        return res.status(400).json({ message: 'Name, location, date and ownerPubKey are required' });
      }
      const newWorkshop = new Workshop({ name, location, date, owner: ownerPubKey });
      await newWorkshop.save();

      res.status(200).json({ message: 'Created workshop' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
