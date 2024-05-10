import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey('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');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, title, meet, capacity, end, start, description } = req.body

      const parsedStartDate = new Date(start).toLocaleString();
      const parsedEndDate = new Date(end).toLocaleString();

      const data = {
        to: email,
        from: 'workshop@solanasync.com',
        subject: "You have successfully registered for the workshop!",
        text: "Hey there, you've successfully registered for the workshop! Below are the details:",
        html: `<div style="text-align: center; font-size: 20px; color: #333; background-color: #f0f0f0; padding: 20px;">
        <h1 style="font-size: 28px; color: #007bff;">${title}</h1>
        <p>Description: <span style="color: #666;">${description || "Beginner's Guide to Learning and Earning on Solana. Covering intro to Solana, development and earning opportunities."}</span></p>
        <p>Start Time: <span style="color: #666;">${parsedStartDate}</span></p>
        <p>End Time: <span style="color: #666;">${parsedEndDate}</span></p>
        <p>Capacity: <span style="color: #666;">${capacity}</span></p>
        ${meet ? '<p><a href="${meet}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Meeting Link</a></p>' : ''}
        <p style="font-size: 16px; color: #666; margin-top: 20px;">We look forward to seeing you!</p>
    </div>
    
`,
      };
      console.log(data)
      const res1 = await sgMail.send(data);
      console.log('Email sent successfully');

      return res.status(200).json({ message: res1 })
    } catch (error: any) {
      console.error('Error sending email:', error.response.body);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
