'use client';
import { useState, useEffect } from 'react';

const plans = [
  { id:'basic10', name:'BASIC', sub:'يبدأ من 10$', p:'10%', pNum:10, d:30, min:10, max:99, color:'#00FF94', shadow:'#00FF9430', badge:'الأكثر شعبية' },
  { id:'silver100', name:'SILVER', sub:'باقة 100$', p:'10%', pNum:10, d:30, min:100, max:199, color:'#00D4FF', shadow:'#00D4FF40', badge:'مستقر' },
  { id:'gold200', name:'GOLD', sub:'باقة 200$', p:'12%', pNum:12, d:30, min:200, max:499, color:'#FFD700', shadow:'#FFD70040', badge:'أرباح أعلى' },
  { id:'diamond500', name:'DIAMOND', sub:'باقة 500$', p:'15%', pNum:15, d:30, min:500, max:50000, color:'#FF8A00', shadow:'#FF8A0040', badge:'VIP 🔥' },
];

export default function Home(){
  const [user,setUser]=useState(null);
  const [ref,setRef]=useState({link:'',count:0,earnings:0});
  const [menu,setMenu]=useState(false);
  const [amount,setAmount]=useState('');
  const [active,setActive]=useState(null);
  const [msg,setMsg]=useState('');

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    setUser(u);
    if(u) fetch(`/api/referral?user_id=${u.id}`).then(r=>r.json()).then(d=>{if(d.link)setRef(d)});
  },[]);

  const invest=async(plan)=>{
    if(!user){ location.href='/auth'; return; }
    const amt=parseFloat(amount);
    if(isNaN(amt)||amt<plan.min||amt>plan.max){ setMsg(`⚠️ المبلغ لازم بين $${plan.min} و $${plan.max}`); return; }
    setMsg('⏳ جاري...');
    const res=await fetch('/api/invest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:user.id,amount:amt,plan_id:plan.id, daily_percent: plan.pNum })});
    const d=await res.json();
    if(d.success){ setMsg(`✅ تم! ربحك اليومي ${plan.pNum}%`); setTimeout(()=>location.href='/dashboard',1200); }
    else setMsg('❌ '+d.error);
  }

  return(
    <div style={{background:'#050508',minHeight:'100vh',color:'white'}}>
      <header style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(20px)',background:'rgba(10,10,15,0.85)',borderBottom:'1px solid #ffffff10',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <button onClick={()=>setMenu(true)} style={{width:'42px',height:'42px',borderRadius:'12px',background:'#1a1a22',border:'1px solid #ffffff15',color:'white',fontSize:'20px',cursor:'pointer'}}>☰</button>
          <h1 style={{margin:0,fontWeight:900}}><span style={{color:'#ffcc00'}}>CRYPTO</span> GUY</h1>
        </div>
        {!user ? <a href="/auth" style={{background:'#ffcc00',color:'#000',padding:'9px 18px',borderRadius:'20px',fontWeight:900,textDecoration:'none',fontSize:'13px'}}>دخول</a> : <a href="/dashboard" style={{background:'#fff',color:'#000',padding:'9px 16px',borderRadius:'20px',fontWeight:900,textDecoration:'none',fontSize:'12px'}}>لوحتي</a>}
      </header>

      {menu && (
        <>
          <div onClick={()=>setMenu(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',backdropFilter:'blur(8px)',zIndex:60}}></div>
          <div style={{position:'fixed',top:0,right:0,width:'320px',maxWidth:'85vw',height:'100vh',background:'#11111a',zIndex:70,borderLeft:'1px solid #ffffff15',padding:'18px',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}><h3 style={{margin:0}}>القائمة</h3><button onClick={()=>setMenu(false)} style={{background:'#222',border:'none',color:'white',fontSize:'18px',width:'32px',height:'32px',borderRadius:'8px'}}>✕</button></div>
            <a href="/dashboard" style={mBtn}>📊 لوحتي</a>
            <a href="/deposit" style={{...mBtn,marginTop:'10px',background:'#00ff9415',border:'1px solid #00ff9440',color:'#00ff94'}}>💰 الايداع</a>
            <a href="/dashboard" style={{...mBtn,marginTop:'10px',background:'#ff3b3015',border:'1px solid #ff3b3040',color:'#ff8a7a'}}>💸 السحب</a>
            <div style={{background:'linear-gradient(135deg,#ffcc0015,#ff990015)',border:'1.5px solid #ffcc00',borderRadius:'14px',padding:'14px',marginTop:'14px'}}>
              <h4 style={{margin:'0 0 8px',color:'#ffcc00',fontSize:'13px'}}>🔗 الإحالة 10%</h4>
              <div style={{background:'#000',padding:'9px',borderRadius:'8px',fontSize:'11px',color:'#00ff94',wordBreak:'break-all',textAlign:'center'}}>{user?(ref.link||'تحميل...'):'سجل دخول'}</div>
              <button onClick={()=>{if(!user){location.href='/auth';return;} navigator.clipboard.writeText(ref.link); alert('تم النسخ!');}} style={{width:'100%',marginTop:'10px',background:'#ffcc00',border:'none',padding:'10px',borderRadius:'8px',fontWeight:900}}>نسخ الرابط</button>
              {user && <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',fontSize:'12px'}}><span>👥 {ref.count}</span><span style={{color:'#00ff94'}}>${ref.earnings}</span></div>}
            </div>
          </div>
        </>
      )}

      <div style={{maxWidth:'500px',margin:'0 auto',padding:'18px'}}>
        <div style={{textAlign:'center',padding:'10px 0 18px'}}>
          <h2 style={{fontSize:'24px',fontWeight:900,margin:0}}>أرباح تبدأ من <span style={{color:'#ffcc00'}}>10$</span></h2>
          <p style={{color:'#888',fontSize:'12px',marginTop:'6px'}}>الحد الأدنى 10$ • عائد يومي يصل 15%</p>
        </div>

        {plans.map(pl=>(
          <div key={pl.id} style={{background:'#13131a',border:`1.5px solid ${pl.color}40`,borderRadius:'20px',padding:'18px',marginBottom:'14px',position:'relative'}}>
            <div style={{position:'absolute',top:'-10px',right:'18px',background:pl.color,color:'#000',fontSize:'10px',padding:'3px 10px',borderRadius:'20px',fontWeight:900}}>{pl.badge}</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><h3 style={{margin:0,fontWeight:900}}>{pl.name}</h3><div style={{fontSize:'11px',color:'#777'}}>{pl.sub}</div></div>
              <div style={{fontSize:'30px',fontWeight:900,color:pl.color}}>{pl.p}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',fontSize:'12px',color:'#aaa'}}>
              <span>💵 من ${pl.min} إلى ${pl.max}</span>
              <span>⏱ {pl.d} يوم</span>
            </div>
            <div style={{background:'#00000080',borderRadius:'10px',padding:'10px',marginTop:'12px',fontSize:'11px',color:'#888'}}>
              مثال: تستثمر ${pl.min} تربح ${ (pl.min * pl.pNum / 100).toFixed(2) }$ يومياً
            </div>
            <button onClick={()=>setActive(active===pl.id?null:pl.id)} style={{width:'100%',marginTop:'12px',background:pl.color,color:'#000',padding:'13px',borderRadius:'12px',fontWeight:900,border:'none',cursor:'pointer'}}>استثمر الآن 🚀</button>
            {active===pl.id && (
              <div style={{marginTop:'12px',background:'#000',padding:'12px',borderRadius:'10px',border:'1px solid #222'}}>
                <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder={`المبلغ ${pl.min} - ${pl.max}`} style={{width:'100%',padding:'12px',borderRadius:'8px',background:'#111',border:'1px solid #333',color:'#fff',boxSizing:'border-box'}}/>
                <button onClick={()=>invest(pl)} style={{width:'100%',marginTop:'8px',background:'#00ff94',color:'#000',padding:'12px',borderRadius:'8px',fontWeight:800,border:'none'}}>تأكيد {pl.p} يومي</button>
                {msg && <div style={{marginTop:'8px',fontSize:'12px',color:'#ffcc00',textAlign:'center'}}>{msg}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
const mBtn={background:'#1e1e28',padding:'12px',borderRadius:'10px',textDecoration:'none',color:'white',display:'flex',gap:'8px',fontSize:'13px',border:'1px solid #2a2a35'};
