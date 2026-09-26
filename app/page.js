'use client';
import { useState, useEffect } from 'react';

const plans = [
  { id: 'starter', name: 'STARTER', percent: '1.5%', days: 10, min: 50, max: 499, color: '#00ff88' },
  { id: 'pro', name: 'PRO', percent: '2.5%', days: 30, min: 500, max: 4999, color: '#00ccff' },
  { id: 'vip', name: 'VIP', percent: '4%', days: 30, min: 5000, max: 50000, color: '#ff6600' },
];

export default function Home(){
  const [user, setUser] = useState(null);
  const [showInvest, setShowInvest] = useState(null);
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');
  const [ref, setRef] = useState({my_code:'', link:'', count:0, earnings:0});

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(u);
    if(u){
      fetch(`/api/referral?user_id=${u.id}`).then(r=>r.json()).then(d=>{
        if(d.my_code) setRef(d);
      });
    }
  },[]);

  const handleInvest = async (plan) => {
    if(!user){
      window.location.href='/auth';
      return;
    }
    const amt = parseFloat(amount);
    if(isNaN(amt) || amt < plan.min || amt > plan.max){
      setMsg(`المبلغ بين ${plan.min} و ${plan.max}`);
      return;
    }
    setMsg('جاري...');
    const res = await fetch('/api/invest', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user_id:user.id, amount:amt, plan_id:plan.id})});
    const data = await res.json();
    if(data.success){
      setMsg('تم الاستثمار بنجاح ✅');
      setTimeout(()=>{window.location.href='/dashboard'},1000);
    } else setMsg(data.error);
  };

  return (
    <div style={{background:'#0a070a', minHeight:'100vh', color:'white'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 20px', borderBottom:'1px solid #222'}}>
        <h1 style={{margin:0, fontSize:'20px', fontWeight:'900'}}><span style={{color:'#ffcc00'}}>CRYPTO</span><span style={{color:'white'}}> GUY</span></h1>
        <div>
          {!user ? (
            <>
              <a href="/auth" style={{background:'#ffcc00', color:'black', padding:'8px 16px', borderRadius:'8px', textDecoration:'none', marginRight:'8px', fontWeight:'bold'}}>Login</a>
              <a href="/auth" style={{background:'#ffcc00', color:'black', padding:'8px 16px', borderRadius:'8px', textDecoration:'none', fontWeight:'bold'}}>Register</a>
            </>
          ) : (
            <>
              <a href="/deposit" style={{background:'#00cc81', color:'black', padding:'8px 12px', borderRadius:'8px', textDecoration:'none', marginRight:'8px'}}>ايداع</a>
              <a href="/dashboard" style={{background:'#ffcc00', color:'black', padding:'8px 12px', borderRadius:'8px', textDecoration:'none'}}>لوحتي</a>
            </>
          )}
        </div>
      </header>

      <div style={{padding:'20px', maxWidth:'500px', margin:'0 auto'}}>
        
        {user && ref.my_code && (
          <div style={{background:'#13131a', border:'1px solid #ffcc00', borderRadius:'12px', padding:'12px', marginBottom:'20px'}}>
            <h3 style={{color:'#ffcc00', textAlign:'center', margin:'5px 0'}}>🔗 رابط الإحالة - تربح 10%</h3>
            <div style={{background:'black', padding:'10px', borderRadius:'8px', margin:'10px 0', wordBreak:'break-all', textAlign:'center', color:'#00ff88', fontSize:'12px'}}>{ref.link}</div>
            <button onClick={()=>{navigator.clipboard.writeText(ref.link); alert('تم نسخ الرابط!')}} style={{width:'100%', background:'#ffcc00', padding:'12px', borderRadius:'8px', fontWeight:'bold', border:'none', cursor:'pointer'}}>نسخ رابط الإحالة</button>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'12px', fontSize:'14px'}}>
              <span>المدعوين: {ref.count}</span>
              <span>الأرباح: ${ref.earnings}</span>
            </div>
          </div>
        )}

        {plans.map((plan)=>(
          <div key={plan.id} style={{background:'#13131a', border:`1px solid ${plan.color}33`, borderRadius:'20px', padding:'20px', marginBottom:'20px', textAlign:'center'}}>
            <h2 style={{margin:'0 0 10px 0', fontSize:'18px'}}>{plan.name}</h2>
            <div style={{fontSize:'18px', fontWeight:'900', color:plan.color}}><span style={{fontSize:'12px', color:'white', marginLeft:'5px'}}>يومياً</span>{plan.percent}</div>
            <div style={{margin:'10px 0', color:'#ccc'}}>${plan.min} - ${plan.max}</div>
            <div style={{color:'#888', fontSize:'13px', lineHeight:'1.8'}}>
              <div>✓ سحب فوري 24/7</div>
              <div>✓ تأمين على رأس المال</div>
              <div>✓ مدة {plan.days} يوم</div>
            </div>
            <button onClick={()=>setShowInvest(showInvest===plan.id?null:plan.id)} style={{width:'100%', marginTop:'15px', background:'#ffcc00', color:'black', padding:'14px', borderRadius:'12px', fontWeight:'900', border:'none', cursor:'pointer'}}>
              استثمر الآن
            </button>

            {showInvest===plan.id && (
              <div style={{marginTop:'15px', background:'#000', border:'1px solid #333', padding:'15px', borderRadius:'12px'}}>
                <input type="number" placeholder={`المبلغ من ${plan.min}`} value={amount} onChange={e=>setAmount(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #333', background:'#111', color:'white', boxSizing:'border-box'}} />
                <button onClick={()=>handleInvest(plan)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'none', background:'#00cc81', fontWeight:'bold', marginTop:'10px', cursor:'pointer'}}>تأكيد الاستثمار</button>
                {msg && <p style={{color:'#ffcc00', fontSize:'12px', marginTop:'10px'}}>{msg}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
