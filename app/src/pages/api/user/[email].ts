import dbConnect from '@/util/db';
import { User } from '@/util/schema';
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

  await dbConnect()
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'email is required as a route parameter' });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
