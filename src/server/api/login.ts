import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers';
type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    console.log('in app',req.body);
    const email =  req.body;

    res.setHeader('Set-cookie', `currUser=${email}; path=/`)
    res.status(200).json({ message: 'Hello from Next.js!' })
}