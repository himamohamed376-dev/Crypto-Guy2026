import pool from '../../../../db.js';
import { NextResponse } from 'next/server';

export async function POST(req){
  try{
    const { email, amount } = await req.json();
    const res=await pool.query('UPDATE users SET balance = balance + $1 WHERE email=$2 RETURNING *',[amount,email]);
    if(res.rows.length===0) return NextResponse.json({success:false,error:'المستخدم غير موجود'},{status:404});
    return NextResponse.json({success:true, user:res.rows[0]});
  }catch(e){ return NextResponse.json({success:false,error:e.message},{status:500}); }
}
