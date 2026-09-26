'use client';
import { useState, useEffect } from 'react';

export default function Dashboard(){
  const [user,setUser]=useState(null);
  const [investments,setInvestments]=useState([]);

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('user')||'null');
    if(!u){ window.location.href='/auth'; return; }
    setUser(u);
    fetch(`/api/my-investments?user_id=${u.id}`)
      .then(r=>r.json()).then(d=>{
        if(d.success) setInvestments(d.investments);
      });
    // تحديث الرصيد من السيرفر
    fetch(`/api/user-balance?user_id=${u.id}`)
      .then(r=>r.json()).then(d=>{
        if(d.success){ 
          u.balance = d.balance;
          localStorage.setItem('user', JSON.stringify(u));
          setUser({...u});
        }
      });
  },[]);

  if(!user) return <div style={{background:'#05070A',minHeight:'100vh',color:'white',padding:'20px'}}>جاري التحميل...</div>;

  return(
    <div style={{background:'#05070A',minHeight:'100vh',color:'white',padding:'20px'}}>
      <div style={{maxWidth:'500px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
          <h1 style={{color:'#F0B90B'}}>CRYPTO GUY</h1>
          <button onClick={()=>{localStorage.clear(); location.href='/auth'}} style={{background:'#222',color:'white',padding:'8px 16px',borderRadius:'8px'}}>خروج</button>
        </div>

        <div style={{background:'#F0B90B',borderRadius:'20px',padding:'20px',color:'black',textAlign:'center',marginBottom:'20px'}}>
          <div>الرصيد</div>
          <div style={{fontSize:'36px',fontWeight:'900'}}>${Number(user.balance).toFixed(2)}</div>
          <div style={{fontSize:'12px'}}>{user.email}</div>
        </div>

        <div style={{background:'#11131A',borderRadius:'16px',padding:'16px'}}>
          <h3 style={{color:'#F0B90B'}}>استثماراتي - {investments.length}</h3>
          {investments.length===0 ? <p>لا يوجد استثمارات - لكن عندك {investments.length} في قاعدة البيانات، جاري المزامنة...</p> : 
            investments.map((inv,i)=>(
              <div key={i} style={{background:'#080A0F',padding:'12px',borderRadius:'10px',marginTop:'8px',display:'flex',justifyContent:'space-between'}}>
                <span>{inv.plan_id} - ${inv.amount}</span>
                <span style={{color:'#0ECB81'}}>${(inv.amount*inv.daily_percent/100).toFixed(2)}/يوم</span>
              </div>
            ))
          }
          <p style={{fontSize:'11px',color:'#888',marginTop:'10px'}}>ID: {user.id} | لعرض البيانات المباشر افتح: /api/my-investments?user_id={user.id}</p>
        </div>
      </div>
    </div>
  );
    }
