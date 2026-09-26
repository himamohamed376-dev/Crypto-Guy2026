import { neon } from '@neondatabase/serverless';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL);
  
  const investments = await sql`SELECT * FROM investments WHERE status='active'`;
  let count = 0;

  for (let inv of investments) {
    const dailyProfit = Number(inv.amount) * Number(inv.daily_percent) / 100;
    await sql`UPDATE users SET balance = balance + ${dailyProfit} WHERE id = ${inv.user_id}`;
    await sql`UPDATE investments SET profit = profit + ${dailyProfit} WHERE id = ${inv.id}`;
    count++;
  }

  return Response.json({ success: true, message: `تم توزيع الأرباح لـ ${count} استثمار` });
}
