'use client';
import { useState, useEffect } from 'react';

export default function ReferralPage(){
  const [user,setUser]=useState(null);
  const [ref,setRef]=useState({link:'',count:0,earnings:0,my_code:''});
  
  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    if(!u){ location.href='/auth'; return; }
    setUser(u);
    fetch(`/api/referral?user_id=${u.id}`).then(r=>r.json()).then(d=>{if(d.link)setRef(d)});
  },[]);

  if(!user) return <div style={{background:'#000',minHeight:'100vh',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>⏳ تحميل...</div>;
  
  return(
    <div style={{background:'#050508',minHeight:'100vh',color:'white'}}>
      <div style={{maxWidth:'420px',margin:'0 auto',padding:'16px'}}>
        <a href="/" style={{color:'#ffcc00',textDecoration:'none',fontSize:'13px'}}>← الرئيسية</a>
        <h2 style={{textAlign:'center',color:'#ffcc00',marginTop:'20px'}}>🔗 نظام الإحالة</h2>
        <div style={{background:'linear-gradient(135deg,#ffcc0020,#ff990020)',border:'1.5px solid #ffcc00',borderRadius:'20px',padding:'20px',marginTop:'20px',textAlign:'center'}}>
          <div style={{fontSize:'14px',marginBottom:'10px'}}>اربح <b style={{color:'#ffcc00'}}>10%</b> من كل ايداع لصديقك!</div>
          <div style={{background:'#000',padding:'12px',borderRadius:'10px',fontSize:'11px',color:'#00ff94',wordBreak:'break-all',border:'1px dashed #ffcc0050'}}>{ref.link||'⏳ تحميل...'}</div>
          <button onClick={()=>{navigator.clipboard.writeText(ref.link); alert('✅ تم النسخ!');}} style={{width:'100%',marginTop:'12px',background:'#ffcc00',color:'#000',padding:'12px',borderRadius:'10px',fontWeight:900,border:'none',cursor:'pointer'}}>📋 نسخ رابط الإحالة</button>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'16px'}}>
            <div style={{background:'#00000080',padding:'14px',borderRadius:'12px'}}><div style={{fontSize:'22px',fontWeight:900}}>{ref.count||0}</div><div style={{fontSize:'11px',color:'#888'}}>صديق مدعو</div></div>
            <div style={{background:'#00000080',padding:'14px',borderRadius:'12px'}}><div style={{fontSize:'22px',fontWeight:900,color:'#00ff94'}}>${ref.earnings||0}</div><div style={{fontSize:'11px',color:'#888'}}>أرباح الإحالة</div></div>
          </div>
          <div style={{marginTop:'16px',fontSize:'11px',color:'#666'}}>كودك: {ref.my_code||'...'}</div>
        </div>
      </div>
    </div>
  )
    }
