import { privateKey } from '../keys';
import jwt from 'jwt-simple';

export async function GET() {
  const token = jwt.encode({ name: 'test' }, privateKey, 'RS256');
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
