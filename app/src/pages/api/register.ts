import { Attendee, User, Workshop } from '@/util/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { workshopId, userData } = req.body;

      const workshop = await Workshop.findById(workshopId);

      if (!workshop) {
        return res.status(404).json({ message: 'Workshop not found' });
      }

      const newUser = new Attendee(userData);

      await newUser.save();

      workshop.attendees.push(newUser._id);
      await workshop.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
