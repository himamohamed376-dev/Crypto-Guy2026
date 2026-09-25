'use client';
import { useState, useEffect } from 'react';

export default function WithdrawPage(){
  const [user,setUser]=useState(null);
  const [amount,setAmount]=useState('');
  const [address,setAddress]=useState('');
  const [msg,setMsg]=useState('');

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    if(!u) window.location.href='/auth'; else setUser(u);
  },[]);

  const handleWithdraw=async(e)=>{
    e.preventDefault();
    if(parseFloat(amount) > user.balance){ setMsg('رصيدك غير كافي'); return; }
    setMsg('جاري ارسال طلب السحب...');
    const res=await fetch('/api/withdraw',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user_id:user.id, amount: parseFloat(amount), address})});
    const data=await res.json();
    if(data.success){ setMsg('✅ تم ارسال طلب السحب - سيتم التحويل خلال 24 ساعة'); setAmount(''); setAddress(''); }
    else setMsg(data.error);
  };

  if(!user) return null;

  return(
    <div style={{background:'#05070A',minHeight:'100vh',color:'white',padding:'20px'}}>
      <div style={{maxWidth:'420px',margin:'0 auto'}}>
        <h2 style={{color:'#F0B90B'}}>سحب USDT</h2>
        <div style={{background:'#11131A',borderRadius:'16px',padding:'20px',marginBottom:'20px'}}>
          <p style={{fontSize:'13px'}}>الرصيد المتاح: <span style={{color:'#0ECB81'}}>${Number(user.balance).toFixed(2)}</span></p>
        </div>
        <form onSubmit={handleWithdraw} style={{background:'#11131A',borderRadius:'16px',padding:'20px'}}>
          <input type="text" placeholder="عنوان محفظة USDT TRC20" value={address} onChange={e=>setAddress(e.target.value)} required style={{width:'100%',padding:'15px',borderRadius:'12px',border:'1px solid #2A2E3F',background:'#080A0F',color:'white',boxSizing:'border-box',marginBottom:'16px'}}/>
          <input type="number" placeholder="المبلغ" value={amount} onChange={e=>setAmount(e.target.value)} required style={{width:'100%',padding:'15px',borderRadius:'12px',border:'1px solid #2A2E3F',background:'#080A0F',color:'white',boxSizing:'border-box',marginBottom:'16px'}}/>
          <button style={{width:'100%',padding:'15px',borderRadius:'12px',border:'none',background:'#F0B90B',fontWeight:'900',cursor:'pointer'}}>تأكيد السحب</button>
        </form>
        {msg && <p style={{textAlign:'center',marginTop:'15px',color:'#F0B90B'}}>{msg}</p>}
        <div style={{marginTop:'20px',textAlign:'center'}}><a href="/dashboard" style={{color:'#8B8FA3',textDecoration:'none'}}>الرجوع للوحة التحكم</a></div>
      </div>
    </div>
  );
                    }
