import { neon } from '@neondatabase/serverless';

export async function GET(req){
  const sql = neon(process.env.DATABASE_URL);
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id') || 1;

  const user = await sql`SELECT referral_code FROM users WHERE id=${user_id}`;
  const refs = await sql`SELECT * FROM referrals WHERE referrer_id=${user_id}`;
  const total = await sql`SELECT COALESCE(SUM(bonus),0) as sum FROM referrals WHERE referrer_id=${user_id}`;

  return Response.json({
    my_code: user[0]?.referral_code,
    link: `https://crypto-guy2026.onrender.com/auth?ref=${user[0]?.referral_code}`,
    count: refs.length,
    earnings: total[0].sum
  });
}
