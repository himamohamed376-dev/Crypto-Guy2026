import pool from '../../../db.js';
import { NextResponse } from 'next/server';

export async function POST(req){
  try{
    const { user_id, amount, address } = await req.json();
    const u=await pool.query('SELECT balance FROM users WHERE id=$1',[user_id]);
    if(u.rows[0].balance < amount) return NextResponse.json({success:false,error:'رصيد غير كافي'},{status:400});
    await pool.query('UPDATE users SET balance = balance - $1 WHERE id=$2',[amount,user_id]);
    await pool.query('INSERT INTO transactions (user_id, type, amount, address, status) VALUES ($1,$2,$3,$4,$5)',[user_id,'withdraw',amount,address,'pending']);
    return NextResponse.json({success:true});
  }catch(e){ return NextResponse.json({success:false,error:e.message},{status:500}); }
}
