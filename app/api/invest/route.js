import pool from '../../../db.js';
import { NextResponse } from 'next/server';

export async function POST(req){
  try{
    const { user_id, plan_id, amount } = await req.json();

    // جيب رصيد المستخدم
    const userRes = await pool.query('SELECT balance FROM users WHERE id=$1',[user_id]);
    if(userRes.rows.length===0) return NextResponse.json({success:false,error:'المستخدم غير موجود'},{status:404});

    const balance = parseFloat(userRes.rows[0].balance);
    if(balance < amount) return NextResponse.json({success:false,error:`رصيدك غير كافي - رصيدك $${balance}`},{status:400});

    // حدد نسبة الربح
    let daily_percent = 1.5;
    if(plan_id==='pro') daily_percent = 2.5;
    if(plan_id==='vip') daily_percent = 4;
    const days = plan_id==='starter'?10:30;

    // اخصم الرصيد
    await pool.query('UPDATE users SET balance = balance - $1 WHERE id=$2',[amount,user_id]);

    // انشئ جدول investments لو ما موجود
    await pool.query(`
      CREATE TABLE IF NOT EXISTS investments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        plan_id VARCHAR(20),
        amount DECIMAL,
        daily_percent DECIMAL,
        days INTEGER,
        profit DECIMAL DEFAULT 0,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // احفظ الاستثمار
    await pool.query('INSERT INTO investments (user_id, plan_id, amount, daily_percent, days) VALUES ($1,$2,$3,$4,$5)',[user_id,plan_id,amount,daily_percent,days]);

    return NextResponse.json({success:true});
  }catch(e){
    return NextResponse.json({success:false,error:e.message},{status:500});
  }
}
