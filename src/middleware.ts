import { NextRequest, NextResponse } from 'next/server';

import { baseUrl } from './app/api/baseUrl';
export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const response = NextResponse.next();
  console.log('mid',token)
  if (['/devlog', '/uabwdiauwbdiauywbdiauwybd'].includes(request.nextUrl.pathname)) {
    console.log('mid', request.nextUrl.pathname)
    try {
      console.log('jwt req', `${baseUrl}/validateJWT`)
      const jwtData = await (
        await fetch(`${baseUrl}/validateJWT`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).json();
      console.log('jwt data', jwtData)
      if (!jwtData.valid) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (e) {
      console.log('mid', e)
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return response;
};
