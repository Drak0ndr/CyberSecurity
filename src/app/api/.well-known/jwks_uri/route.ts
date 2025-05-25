import { NextRequest } from 'next/server';
import jwt from 'jwt-simple';
import { publicKey } from '../../keys';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  try {
    if (token) {
      const jwtData = jwt.decode(token, publicKey);
      console.log('api', jwtData);
      // jwt.verify(token, publicKey);
      return new Response(JSON.stringify(publicKey), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {}

  return new Response(JSON.stringify({ message: 'ну это, пакеда' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
