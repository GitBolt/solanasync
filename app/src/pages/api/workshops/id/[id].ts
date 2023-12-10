import dbConnect from '@/util/db';
import { Workshop } from '@/util/schema';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  workshops?: any[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  if (!id) {
    return res.status(400).json({ message: 'Id is required as a route parameter' });
  }

  try {
    await dbConnect();

    const workshop = await mongoose.models.Workshop.findOne({ _id: id});

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    res.status(200).json(workshop);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
