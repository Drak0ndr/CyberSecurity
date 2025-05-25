import { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';
import { publicKey } from '../keys';
import jwt from 'jwt-simple';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  console.log('api', token);

  try {
    if (token) {
      const jwtData = jwt.decode(token, publicKey);
      console.log('api', jwtData);
      // jwt.verify(token, publicKey);
      return new Response(JSON.stringify({ valid: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  } catch {}

  return new Response(JSON.stringify({ valid: false }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
