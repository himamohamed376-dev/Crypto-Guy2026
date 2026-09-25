import pool from '../../../db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const result = await pool.query(
      'SELECT id, email, balance FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'الايميل او كلمة السر غلط' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
