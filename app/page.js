'use client';
import { useState, useEffect } from 'react';

const plans = [
  {id:'basic10',name:'$10',profit:'10%',days:10,invest:10,min:10},
  {id:'silver100',name:'$100',profit:'12%',days:12,invest:100,min:100},
  {id:'gold200',name:'$200',profit:'13%',days:12,invest:200,min:200},
  {id:'diamond500',name:'$500',profit:'15%',days:15,invest:500,min:500},
];

export default function Home(){
  const [user,setUser]=useState(null);
  const [menu,setMenu]=useState(false);
  const [investing,setInvesting]=useState(null);

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    setUser(u);
  },[]);

  const invest = async (plan)=>{
    if(!user){ location.href='/auth'; return; }
    setInvesting(plan.id);
    try{
      const res=await fetch('/api/invest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:user.id,plan_id:plan.id,amount:plan.invest})});
      const d=await res.json();
      if(d.success){ alert('✅ تم الاستثمار!'); location.href='/dashboard'; }
      else alert(d.error||'خطأ');
    }catch(e){ alert('خطأ في الاتصال'); }
    setInvesting(null);
  }

  return(
    <div style={{background:'#050508',minHeight:'100vh',color:'white',fontFamily:'system-ui'}}>
      {/* هيدر - فيه بس زر القائمة */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',background:'#0a0a0f',borderBottom:'1px solid #1a1a25',position:'sticky',top:0,zIndex:50}}>
        <div style={{fontWeight:900,color:'#ffcc00'}}>CRYPTO GUY</div>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          {!user && <a href="/auth" style={{background:'#ffcc00',color:'#000',padding:'7px 14px',borderRadius:'8px',textDecoration:'none',fontWeight:800,fontSize:'13px'}}>دخول</a>}
          <button onClick={()=>setMenu(!menu)} style={{background:'#1e1e28',border:'1px solid #2a2a35',color:'white',padding:'7px 12px',borderRadius:'8px',fontSize:'18px'}}>☰</button>
        </div>
      </div>

      {/* القائمة الجانبية - 4 ازرار فقط */}
      {menu && (
        <div style={{position:'fixed',inset:0,zIndex:100,display:'flex',justifyContent:'flex-end'}}>
          <div onClick={()=>setMenu(false)} style={{flex:1,background:'#00000080',backdropFilter:'blur(2px)'}}></div>
          <div style={{width:'280px',background:'#0f0f15',borderLeft:'1px solid #1e1e28',padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
              <b>القائمة</b>
              <button onClick={()=>setMenu(false)} style={{background:'#1e1e28',border:'none',color:'white',padding:'6px 10px',borderRadius:'6px'}}>✕</button>
            </div>
            <a href="/dashboard" style={{background:'#1e1e28',border:'1px solid #2a2a35',padding:'14px',borderRadius:'12px',color:'white',textDecoration:'none',textAlign:'right',fontWeight:700}}>📊 لوحتي الرئيسية</a>
            <a href="/deposit" style={{background:'#00ff9415',border:'1px solid #00ff9440',padding:'14px',borderRadius:'12px',color:'#00ff94',textDecoration:'none',textAlign:'right',fontWeight:700}}>💰 الإيداع</a>
            <a href="/withdraw" style={{background:'#ff3b3015',border:'1px solid #ff3b3040',padding:'14px',borderRadius:'12px',color:'#ff8a7a',textDecoration:'none',textAlign:'right',fontWeight:700}}>💸 السحب</a>
            <a href="/referral" style={{background:'#ffcc0015',border:'1px solid #ffcc0040',padding:'14px',borderRadius:'12px',color:'#ffcc00',textDecoration:'none',textAlign:'right',fontWeight:800}}>🔗 الإحالة - 10%</a>
            {!user && <a href="/auth" style={{marginTop:'10px',background:'#ffcc00',color:'#000',padding:'12px',borderRadius:'10px',textAlign:'center',textDecoration:'none',fontWeight:900}}>تسجيل دخول</a>}
          </div>
        </div>
      )}

      {/* باقات الاستثمار */}
      <div style={{maxWidth:'420px',margin:'0 auto',padding:'16px'}}>
        <h2 style={{textAlign:'center',fontSize:'18px',margin:'18px 0 6px'}}>💎 باقات الاستثمار</h2>
        <p style={{textAlign:'center',color:'#666',fontSize:'12px',marginBottom:'16px'}}>اختر الباقة وابدأ الربح اليومي</p>

        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {plans.map(p=>(
            <div key={p.id} style={{background:'#111119',border:'1px solid #1e1e28',borderRadius:'16px',padding:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:900,fontSize:'18px'}}>{p.name}</div>
                <div style={{fontSize:'12px',color:'#888',marginTop:'4px'}}>{p.profit} يومي لمدة {p.days} يوم</div>
              </div>
              <button onClick={()=>invest(p)} disabled={investing===p.id} style={{background:'#ffcc00',color:'#000',border:'none',padding:'10px 18px',borderRadius:'10px',fontWeight:900,cursor:'pointer'}}>
                {investing===p.id?'⏳':'استثمار'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
            }
