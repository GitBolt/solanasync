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
  const { email } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'emaily is required as a route parameter' });
  }

  try {
    await dbConnect();

    const workshops = await Workshop.find({ owner: email });

    if (!workshops) {
      return res.status(404).json({ message: 'Workshops not found' });
    }

    res.status(200).json({ workshops });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
