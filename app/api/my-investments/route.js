import pool from '../../../db.js';
import { NextResponse } from 'next/server';

export async function GET(req){
  try{
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    const res = await pool.query('SELECT * FROM investments WHERE user_id=$1 ORDER BY created_at DESC',[user_id]);
    const investments = res.rows.map(r=>({
      ...r,
      daily_profit: (parseFloat(r.amount)*parseFloat(r.daily_percent)/100).toFixed(2)
    }));
    return NextResponse.json({success:true, investments});
  }catch(e){ return NextResponse.json({success:false,error:e.message},{status:500}); }
}
