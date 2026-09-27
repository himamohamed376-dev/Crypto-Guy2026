'use client';
import { useState, useEffect } from 'react';

const plans = [
  {id:'basic10',price:10,profit:'10%',days:10,total:'100%'},
  {id:'silver100',price:100,profit:'12%',days:12,total:'144%',popular:true},
  {id:'gold200',price:200,profit:'13%',days:12,total:'156%'},
  {id:'diamond500',price:500,profit:'15%',days:15,total:'225%'},
];

export default function Home(){
  const [user,setUser]=useState(null);
  const [menu,setMenu]=useState(false);
  const [loading,setLoading]=useState(null);
  useEffect(()=>{ setUser(JSON.parse(localStorage.getItem('user')||'null')); },[]);
  const invest = async (p)=>{
    if(!user){ location.href='/auth'; return; }
    setLoading(p.id);
    try{
      const r=await fetch('/api/invest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:user.id,plan_id:p.id,amount:p.price})});
      const d=await r.json();
      if(d.success) location.href='/dashboard'; else alert(d.error);
    }catch(e){ alert('خطأ'); }
    setLoading(null);
  }
  return(
    <div style={{background:'#060609',minHeight:'100vh',color:'white'}}>
      <div style={{position:'sticky',top:0,zIndex:50,background:'#060609F0',backdropFilter:'blur(20px)',borderBottom:'1px solid #ffffff10',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'32px',height:'32px',background:'#ffcc00',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#000'}}>C</div>
          <div style={{fontWeight:900,fontSize:'15px'}}>CRYPTO <span style={{color:'#ffcc00'}}>GUY</span></div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          {!user ? <a href="/auth" style={{background:'#ffcc00',color:'#000',padding:'8px 16px',borderRadius:'20px',fontWeight:800,fontSize:'13px',textDecoration:'none'}}>دخول</a> : <a href="/dashboard" style={{background:'#ffffff10',border:'1px solid #ffffff15',color:'white',padding:'8px 14px',borderRadius:'20px',fontSize:'13px',textDecoration:'none'}}>لوحتي</a>}
          <button onClick={()=>setMenu(!menu)} style={{width:'36px',height:'36px',background:'#ffffff08',border:'1px solid #ffffff10',borderRadius:'10px',color:'white'}}>☰</button>
        </div>
      </div>

      {menu && (
        <div style={{position:'fixed',inset:0,zIndex:100,display:'flex',justifyContent:'flex-end'}}>
          <div onClick={()=>setMenu(false)} style={{flex:1,background:'#00000060'}}></div>
          <div style={{width:'280px',background:'#0d0d12',borderLeft:'1px solid #ffffff10',padding:'20px'}}>
            <button onClick={()=>setMenu(false)} style={{background:'none',border:'none',color:'#666',fontSize:'20px'}}>✕</button>
            <div style={{marginTop:'30px',display:'flex',flexDirection:'column',gap:'8px'}}>
              <a href="/dashboard" style={{background:'#ffffff05',border:'1px solid #ffffff08',padding:'14px',borderRadius:'12px',color:'white',textDecoration:'none'}}>📊 لوحتي</a>
              <a href="/deposit" style={{background:'#ffffff05',border:'1px solid #ffffff08',padding:'14px',borderRadius:'12px',color:'white',textDecoration:'none'}}>💳 الإيداع</a>
              <a href="/withdraw" style={{background:'#ffffff05',border:'1px solid #ffffff08',padding:'14px',borderRadius:'12px',color:'white',textDecoration:'none'}}>💸 السحب</a>
              <a href="/referral" style={{background:'#ffcc0010',border:'1px solid #ffcc0030',padding:'14px',borderRadius:'12px',color:'#ffcc00',textDecoration:'none'}}>🔗 الإحالة 10%</a>
            </div>
          </div>
        </div>
      )}

      <div style={{maxWidth:'480px',margin:'0 auto',padding:'32px 16px 16px',textAlign:'center'}}>
        <div style={{display:'inline-block',background:'#ffcc0010',border:'1px solid #ffcc0020',color:'#ffcc00',fontSize:'10px',padding:'6px 12px',borderRadius:'20px',fontWeight:700}}>🔥 عائد يومي مضمون</div>
        <h1 style={{fontSize:'26px',fontWeight:900,margin:'16px 0 8px'}}>استثمر بذكاء، اربح يومياً</h1>
        <p style={{color:'#666',fontSize:'13px'}}>خطط استثمارية مدروسة بعوائد ثابتة</p>
      </div>

      <div style={{maxWidth:'480px',margin:'0 auto',padding:'0 16px 40px',display:'flex',flexDirection:'column',gap:'14px'}}>
        {plans.map(p=>(
          <div key={p.id} style={{position:'relative',background:'#111116',border:p.popular?'1px solid #ffcc0030':'1px solid #ffffff08',borderRadius:'20px',padding:'18px'}}>
            {p.popular && <div style={{position:'absolute',top:'10px',left:'10px',background:'#ffcc00',color:'#000',fontSize:'9px',padding:'4px 8px',borderRadius:'20px',fontWeight:800}}>الأكثر طلباً</div>}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'48px',height:'48px',background:p.popular?'#ffcc00':'#1e1e28',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'16px',color:p.popular?'#000':'#fff'}}>${p.price}</div>
                <div>
                  <div style={{fontWeight:900,fontSize:'18px'}}>${p.price}</div>
                  <div style={{fontSize:'11px',color:'#666',marginTop:'2px'}}>{p.days} يوم • {p.total}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{background:'#ffffff10',border:'1px solid #ffffff15',color:'#ffcc00',padding:'6px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:900}}>{p.profit} يومي</div>
                <button onClick={()=>invest(p)} style={{marginTop:'10px',background:p.popular?'#ffcc00':'#ffffff10',color:p.popular?'#000':'white',border:'none',padding:'10px 20px',borderRadius:'12px',fontWeight:900,fontSize:'13px',cursor:'pointer'}}>{loading===p.id?'...':'استثمار'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
                                                      }
