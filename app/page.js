'use client';
import { useState, useEffect } from 'react';

const plans = [
  {id:'basic10',price:10,profit:'10%',days:10,total:'100%',color:'#ffcc00',grad:'linear-gradient(135deg,#ffcc00,#ff9900)'},
  {id:'silver100',price:100,profit:'12%',days:12,total:'144%',color:'#00d4ff',grad:'linear-gradient(135deg,#00d4ff,#0066ff)',popular:true},
  {id:'gold200',price:200,profit:'13%',days:12,total:'156%',color:'#ff8a00',grad:'linear-gradient(135deg,#ff8a00,#ff3b00)'},
  {id:'diamond500',price:500,profit:'15%',days:15,total:'225%',color:'#a855f7',grad:'linear-gradient(135deg,#a855f7,#6d28d9)'},
];

export default function Home(){
  const [user,setUser]=useState(null);
  const [menu,setMenu]=useState(false);
  const [loading,setLoading]=useState(null);

  useEffect(()=>{ setUser(JSON.parse(localStorage.getItem('user')||'null')); },[]);

  const invest = async (p)=>{
    if(!user){ location.href='/auth'; return; }
    setLoading(p.id);
    const r=await fetch('/api/invest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:user.id,plan_id:p.id,amount:p.price})});
    const d=await r.json();
    setLoading(null);
    if(d.success) location.href='/dashboard';
    else alert(d.error);
  }

  return(
    <div style={{background:'#060609',minHeight:'100vh',color:'white',fontFamily:'Inter,system-ui'}}>
      {/* HEADER فخم */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'#060609F0',backdropFilter:'blur(20px)',borderBottom:'1px solid #ffffff08',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',background:'linear-gradient(135deg,#ffcc00,#ff9900)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#000'}}>C</div>
          <div style={{fontWeight:900,letterSpacing:'0.5px',fontSize:'15px'}}>CRYPTO <span style={{color:'#ffcc00'}}>GUY</span></div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          {!user ? <a href="/auth" style={{background:'#ffcc00',color:'#000',padding:'8px 16px',borderRadius:'20px',fontWeight:800,fontSize:'13px',textDecoration:'none'}}>دخول</a> : <a href="/dashboard" style={{background:'#ffffff10',border:'1px solid #ffffff15',color:'white',padding:'8px 14px',borderRadius:'20px',fontSize:'13px',textDecoration:'none'}}>لوحتي</a>}
          <button onClick={()=>setMenu(!menu)} style={{width:'36px',height:'36px',background:'#ffffff08',border:'1px solid #ffffff10',borderRadius:'10px',color:'white'}}>☰</button>
        </div>
      </div>

      {/* MENU */}
      {menu && <div style={{position:'fixed',inset:0,zIndex:100,display:'flex',justifyContent:'flex-end'}}>
        <div onClick={()=>setMenu(false)} style={{flex:1,background:'#00000060',backdropFilter:'blur(4px)'}}></div>
        <div style={{width:'300px',background:'#0d0d12',borderLeft:'1px solid #ffffff08',padding:'20px'}}>
          <button onClick={()=>setMenu(false)} style={{float:'left',background:'none',border:'none',color:'#666',fontSize:'20px'}}>✕</button>
          <div style={{marginTop:'40px',display:'flex',flexDirection:'column',gap:'8px'}}>
            <a href="/dashboard" style={mItem}>📊 لوحتي</a>
            <a href="/deposit" style={mItem}>💳 الإيداع</a>
            <a href="/withdraw" style={mItem}>💸 السحب</a>
            <a href="/referral" style={{...mItem,background:'#ffcc0010',border:'1px solid #ffcc0020',color:'#ffcc00'}}>🔗 الإحالة 10%</a>
          </div>
        </div>
      </div>}

      {/* HERO */}
      <div style={{maxWidth:'480px',margin:'0 auto',padding:'32px 16px 16px',textAlign:'center'}}>
        <div style={{display:'inline-block',background:'#ffcc0010',border:'1px solid #ffcc0020',color:'#ffcc00',fontSize:'10px',padding:'6px 12px',borderRadius:'20px',letterSpacing:'1px',fontWeight:700}}>🔥 عائد يومي مضمون</div>
        <h1 style={{fontSize:'28px',fontWeight:900,lineHeight:'1.2',margin:'16px 0 8px'}}>استثمر بذكاء،<br/><span style={{background:'linear-gradient(90deg,#ffcc00,#ff9900)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>اربح يومياً</span></h1>
        <p style={{color:'#666',fontSize:'13px'}}>خطط استثمارية مدروسة بعوائد ثابتة</p>
      </div>

      {/* PLANS فخمة */}
      <div style={{maxWidth:'480px',margin:'0 auto',padding:'0 16px 40px',display:'flex',flexDirection:'column',gap:'14px'}}>
        {plans.map(p=>(
          <div key={p.id} style={{position:'relative',background:'#111116',border:p.popular?'1px solid #ffcc0030':'1px solid #ffffff08',borderRadius:'20px',padding:'18px',overflow:'hidden'}}>
            {p.popular && <div style={{position:'absolute',top:'12px',left:'12px',background:p.grad,color:'#fff',fontSize:'9px',padding:'4px 8px',borderRadius:'20px',fontWeight:800,letterSpacing:'
