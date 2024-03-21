import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.setHeader('set-cookie','currUser=deleted; Max-Age=0; path=/')
  res.status(200).json({ message: 'Hello from Next.js!' })
}