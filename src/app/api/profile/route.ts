import { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';
import { publicKey } from '../keys';
import jwt from 'jwt-simple';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  console.log('api', token);
  const userInfo = {
    name: 'super duper admin',
    description: 'this is flag!!!',
  };
  try {
    if (token) {
      const jwtData = jwt.decode(token, publicKey);
      console.log('api', jwtData);
      // jwt.verify(token, publicKey);
      if (jwtData.name == 'uabwdiauwbdiauywbdiauwybd') {
        return new Response(JSON.stringify(userInfo), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }
  } catch {}

  return new Response(
    JSON.stringify({ name: userInfo.name, description: 'please login to view description' }),
    {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    }
  );
}
