// middleware.js

import { NextApiRequest, NextApiResponse } from 'next';

export default function middleware(req: NextApiRequest, res: NextApiResponse) {
  const cookieValue = req.cookies.currUser;

  if (!cookieValue) {
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    return;
  }
}
