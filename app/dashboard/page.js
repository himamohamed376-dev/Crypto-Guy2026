'use client';
import { useState, useEffect } from 'react';

export default function Dashboard(){
  const [user,setUser]=useState(null);
  const [investments,setInvestments]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('user')||'null');
    if(!u){ window.location.href='/auth'; return; }
    setUser(u);
    fetch(`/api/my-investments?user_id=${u.id}`)
      .then(r=>r.json())
      .then(data=>{
        if(data.success) setInvestments(data.investments);
        setLoading(false);
      });
  },[]);

  if(!user) return <div style={{background:'#05070A',minHeight:'100vh',color:'white',padding:'20px'}}>جاري التحميل...</div>;

  const totalProfit = investments.reduce((s,i)=> s + parseFloat(i.amount)*parseFloat(i.daily_percent)/100 * 5, 0);

  return(
    <div style={{background:'#05070A',minHeight:'100vh',color:'white'}}>
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'16px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h1 style={{margin:0,color:'#F0B90B',fontSize:'22px',fontWeight:'900'}}>CRYPTO <span style={{color:'white'}}>GUY</span></h1>
          <button onClick={()=>{localStorage.removeItem('user'); window.location.href='/auth';}} style={{background:'#1E212E',color:'white',border:'1px solid #2A2E3F',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}}>خروج</button>
        </div>

        <div style={{background:'#F0B90B',borderRadius:'20px',padding:'20px',color:'black',marginBottom:'20px'}}>
          <p style={{margin:0,fontSize:'13px'}}>الرصيد</p>
          <h2 style={{margin:'5px 0',fontSize:'32px'}}>${Number(user.balance||0).toFixed(2)}</h2>
          <p style={{margin:0,fontSize:'12px',opacity:0.7}}>{user.email} | {user.name}</p>
          <div style={{display:'flex',gap:'10px',marginTop:'15px'}}>
            <a href="/" style={{flex:1,background:'black',color:'#F0B90B',padding:'10px',borderRadius:'10px',textAlign:'center',textDecoration:'none',fontWeight:'bold',fontSize:'13px'}}>الرئيسية</a>
            <a href="/deposit" style={{flex:1,background:'#0ECB81',color:'black',padding:'10px',borderRadius:'10px',textAlign:'center',textDecoration:'none',fontWeight:'bold',fontSize:'13px'}}>ايداع</a>
            <a href="/withdraw" style={{flex:1,background:'white',color:'black',padding:'10px',borderRadius:'10px',textAlign:'center',textDecoration:'none',fontWeight:'bold',fontSize:'13px'}}>سحب</a>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
          <div style={{background:'#11131A',borderRadius:'16px',padding:'16px',border:'1px solid #1E212E'}}>
            <p style={{margin:0,color:'#8B8FA3',fontSize:'12px'}}>اجمالي الارباح</p>
            <h3 style={{margin:'5px 0',color:'#0ECB81'}}>${totalProfit.toFixed(2)}</h3>
          </div>
          <div style={{background:'#11131A',borderRadius:'16px',padding:'16px',border:'1px solid #1E212E'}}>
            <p style={{margin:0,color:'#8B8FA3',fontSize:'12px'}}>استثمارات نشطة</p>
            <h3 style={{margin:'5px 0'}}>{investments.length}</h3>
          </div>
        </div>

        <div style={{background:'#11131A',borderRadius:'16px',padding:'16px',border:'1px solid #1E212E'}}>
          <h3 style={{color:'#F0B90B',margin:'0 0 12px 0'}}>استثماراتي</h3>
          {loading ? <p style={{color:'#8B8FA3'}}>جاري التحميل...</p> :
           investments.length===0 ? <p style={{color:'#8B8FA3'}}>لا يوجد استثمارات</p> :
           investments.map(inv=>(
            <div key={inv.id} style={{display:'flex',justifyContent:'space-between',background:'#080A0F',padding:'12px',borderRadius:'10px',marginBottom:'8px',border:'1px solid #1E212E'}}>
              <span>{inv.plan_id} - ${inv.amount}</span>
              <span style={{color:'#0ECB81'}}>{inv.daily_profit}$ يوميا</span>
            </div>
          ))}
        </div>
      </div
