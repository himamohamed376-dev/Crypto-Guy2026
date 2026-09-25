import pool from '../../../db.js';
import { NextResponse } from 'next/server';

export async function POST(req){
  try{
    const { user_id, amount } = await req.json();
    await pool.query('INSERT INTO transactions (user_id, type, amount, status) VALUES ($1,$2,$3,$4)', [user_id,'deposit',amount,'pending']);
    // للتجربة نضيف الرصيد مباشرة - بعدين نخليها يدوي
    await pool.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, user_id]);
    return NextResponse.json({success:true});
  }catch(e){ return NextResponse.json({success:false, error:e.message},{status:500}); }
}
