'use client';
import { useState, useEffect } from 'react';

const plans = [
  { id: 'starter', name: 'STARTER', percent: '1.5%', days: 10, min: 50, max: 499, color: '#F0B90B' },
  { id: 'pro', name: 'PRO', percent: '2.5%', days: 30, min: 500, max: 4999, color: '#0ECB81' },
  { id: 'vip', name: 'VIP', percent: '4%', days: 30, min: 5000, max: 50000, color: '#FF6B00' },
];

export default function Home(){
  const [user,setUser]=useState(null);
  const [showInvest,setShowInvest]=useState(null);
  const [amount,setAmount]=useState('');
  const [msg,setMsg]=useState('');

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    setUser(u);
  },[]);

  const handleInvest = async (plan) => {
    if(!user){
      window.location.href='/auth';
      return;
    }
    const amt = parseFloat(amount);
    if(!amt || amt < plan.min || amt > plan.max){
      setMsg(`المبلغ يجب بين $${plan.min} و $${plan.max}`);
      return;
    }
    setMsg('جاري الاستثمار...');
    const res = await fetch('/api/invest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:user.id, plan_id:plan.id, amount:amt})});
    const data=await res.json();
    if(data.success){
      setMsg('✅ تم الاستثمار بنجاح!');
      setTimeout(()=>window.location.href='/dashboard',1000);
    } else setMsg(data.error);
  };

  return(
    <div style={{background:'#05070A',minHeight:'100vh',color:'white'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px',borderBottom:'1px solid #1E212E',position:'sticky',top:0,background:'#05070A',zIndex:10}}>
        <h1 style={{margin:0,fontSize:'20px',fontWeight:'900'}}><span style={{color:'#F0B90B'}}>CRYPTO</span><span style={{color:'white'}}> GUY</span></h1>
        <div style={{display:'flex',gap:'8px'}}>
          {!user ? (
            <>
              <a href="/auth" style={{background:'#F0B90B',color:'black',padding:'8px 16px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold',fontSize:'13px'}}>Register</a>
              <a href="/auth" style={{background:'#1E212E',color:'white',padding:'8px 16px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold',fontSize:'13px'}}>Login</a>
            </>
          ) : (
            <>
              <a href="/deposit" style={{background:'#0ECB81',color:'black',padding:'8px 12px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold',fontSize:'12px'}}>ايداع</a>
              <a href="/dashboard" style={{background:'#F0B90B',color:'black',padding:'8px 12px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold',fontSize:'12px'}}>لوحتي</a>
            </>
          )}
        </div>
      </header>

      <div style={{padding:'20px',maxWidth:'500px',margin:'0 auto'}}>
        {user && <div style={{background:'#11131A',border:'1px solid #1E212E',borderRadius:'12px',padding:'12px',marginBottom:'20px',textAlign:'center',fontSize:'13px'}}>مرحبا {user.name} | رصيدك: <span style={{color:'#0ECB81',fontWeight:'bold'}}>${Number(user.balance||0).toFixed(2)}</span></div>}

        {plans.map(plan=>(
          <div key={plan.id} style={{background:'#11131A',border:`1px solid ${plan.color}33`,borderRadius:'20px',padding:'24px',marginBottom:'20px',textAlign:'center'}}>
            <h2 style={{margin:'0 0 10px 0',fontSize:'18px'}}>{plan.name}</h2>
            <div style={{fontSize:'42px',fontWeight:'900',color:plan.color,margin:'10px 0'}}>{plan.percent} <span style={{fontSize:'16px',color:'#8B8FA3'}}>يومياً</span></div>
            <div style={{color:'white',marginBottom:'8px'}}>${plan.max} - ${plan.min}</div>
            <div style={{color:'#8B8FA3',fontSize:'13px',lineHeight:'1.8'}}>
              <div>✓ سحب فوري 24/7</div>
              <div>✓ تأمين على رأس المال</div>
              <div>✓ مدة {plan.days} يوم</div>
            </div>
            <button onClick={()=>setShowInvest(showInvest===plan.id?null:plan.id)} style={{width:'100%',marginTop:'18px',padding:'14px',borderRadius:'12px',border:'none',background:'#F0B90B',color:'black',fontWeight:'900',fontSize:'15px',cursor:'pointer'}}>استثمر الآن</button>
            
            {showInvest===plan.id && (
              <div style={{marginTop:'16px',background:'#080A0F',borderRadius:'12px',padding:'16px',border:'1px solid #2A2E3F'}}>
                <input type="number" placeholder={`ادخل مبلغ ${plan.min}$ - ${plan.max}$`} value={amount} onChange={e=>setAmount(e.target.value)} style={{width:'100%',padding:'12px',borderRadius:'8px',border:'1px solid #2A2E3F',background:'#11131A',color:'white',boxSizing:'border-box',marginBottom:'12px'}}/>
                <button onClick={()=>handleInvest(plan)} style={{width:'100%',padding:'12px',borderRadius:'8px',border:'none',background:plan.color,color:'black',fontWeight:'bold',cursor:'pointer'}}>تأكيد الاستثمار</button>
                {msg && <p style={{color:'#F0B90B',fontSize:'12px',marginTop:'10px'}}>{msg}</p>}
              </div>
            )}
          </div>
        ))}

        {user && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'10px'}}>
            <a href="/deposit" style={{background:'#0ECB81',color:'black',padding:'14px',borderRadius:'12px',textAlign:'center',textDecoration:'none',fontWeight:'900'}}>💰 ايداع</a>
            <a href="/withdraw" style={{background:'#1E212E',color:'white',padding:'14px',borderRadius:'12px',textAlign:'center',textDecoration:'none',fontWeight:'900',border:'1px solid #2A2E3F'}}>💸 سحب</a>
          </div>
        )}
      </div>
    </div>
  );
          }
