'use client';
import { useState, useEffect } from 'react';

export default function DepositPage(){
  const [user,setUser]=useState(null);
  const [amount,setAmount]=useState('');
  const [msg,setMsg]=useState('');

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    if(!u) window.location.href='/auth'; else setUser(u);
  },[]);

  const handleDeposit=async(e)=>{
    e.preventDefault();
    setMsg('جاري ارسال طلب الايداع...');
    const res=await fetch('/api/deposit',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user_id:user.id, amount: parseFloat(amount)})});
    const data=await res.json();
    if(data.success){ setMsg('✅ تم ارسال طلب الايداع - سيتم اضافته خلال دقائق'); setAmount(''); }
    else setMsg(data.error);
  };

  if(!user) return null;

  return(
    <div style={{background:'#05070A',minHeight:'100vh',color:'white',padding:'20px'}}>
      <div style={{maxWidth:'420px',margin:'0 auto'}}>
        <h2 style={{color:'#F0B90B'}}>ايداع USDT</h2>
        <div style={{background:'#11131A',border:'1px solid #1E212E',borderRadius:'16px',padding:'20px',marginBottom:'20px'}}>
          <p style={{color:'#8B8FA3',fontSize:'13px'}}>شبكة: TRC20 - USDT</p>
          <div style={{background:'#080A0F',padding:'12px',borderRadius:'10px',wordBreak:'break-all',fontSize:'13px',border:'1px dashed #F0B90B',margin:'10px 0'}}>TQa1f2g3h4j5k6l7m8n9p0q1r2s3t4u5v6</div>
          <p style={{fontSize:'12px',color:'#8B8FA3'}}>حول المبلغ ثم ادخل المبلغ تحت واضغط تأكيد - سيتم اضافة الرصيد يدويا او تلقائيا</p>
        </div>

        <form onSubmit={handleDeposit} style={{background:'#11131A',borderRadius:'16px',padding:'20px'}}>
          <input type="number" placeholder="المبلغ بالدولار" value={amount} onChange={e=>setAmount(e.target.value)} required style={{width:'100%',padding:'15px',borderRadius:'12px',border:'1px solid #2A2E3F',background:'#080A0F',color:'white',boxSizing:'border-box',marginBottom:'16px'}}/>
          <button style={{width:'100%',padding:'15px',borderRadius:'12px',border:'none',background:'#F0B90B',fontWeight:'900',cursor:'pointer'}}>تأكيد الايداع</button>
        </form>
        {msg && <p style={{textAlign:'center',marginTop:'15px',color:'#F0B90B'}}>{msg}</p>}
        <div style={{marginTop:'20px',textAlign:'center'}}><a href="/dashboard" style={{color:'#8B8FA3',textDecoration:'none'}}>الرجوع للوحة التحكم</a></div>
      </div>
    </div>
  );
  }
