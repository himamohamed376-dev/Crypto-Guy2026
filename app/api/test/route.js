import pool from '../../db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM plans');
    return NextResponse.json({ 
      success: true, 
      message: "قاعدة البيانات اتربطت بنجاح!",
      plans: result.rows 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}.
