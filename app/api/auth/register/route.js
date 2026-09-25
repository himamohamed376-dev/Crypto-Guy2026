import pool from '../../../db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email ||!password) {
      return NextResponse.json({ success: false, error: 'ادخل البيانات' }, { status: 400 });
    }

    // نتحقق اذا الايميل موجود
    const check = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return NextResponse.json({ success: false, error: 'الايميل مسجل قبل كده' }, { status: 400 });
    }

    const result = await pool.query(
      'INSERT INTO users (email, password, balance) VALUES ($1, $2, 0) RETURNING id, email, balance',
      [email, password]
    );

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
