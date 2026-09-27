'use client';
import { useState, useEffect } from 'react';

export default function Dashboard(){
  const [user,setUser]=useState(null);
  const [balance,setBalance]=useState(0);
  const [investments,setInvestments]=useState([]);
  const [withdrawAmount,setWithdrawAmount]=useState('');
  const [withdrawAddress,setWithdrawAddress]=useState('');
  const [msg,setMsg]=useState('');
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem('user')||'null');
    if(!u){ location.href='/auth'; return; }
    setUser(u);
    fetchData(u.id);
  },[]);

  const fetchData = async (userId) => {
    try {
      const res = await fetch(`/api/my-investments?user_id=${userId}`);
      const data = await res.json();
      if(data.balance !== undefined) setBalance(data.balance);
      if(data.investments) setInvestments(data.investments);
      if(data.profile) setBalance(data.profile.balance || 0);
    } catch(e){ console.log(e); }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    const amt = parseFloat(withdrawAmount);
    if(!amt || amt < 10){ setMsg('⚠️ الحد الأدنى للسحب 10$'); return; }
    if(amt > balance){ setMsg('❌ رصيدك غير كافي'); return; }
    if(!withdrawAddress){ setMsg('⚠️ ادخل عنوان USDT'); return; }

    setMsg('⏳ جاري ارسال طلب السحب...');
    const res = await fetch('/api/withdraw',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:user.id, amount:amt, address:withdrawAddress})});
    const d = await res.json();
    if(d.success){
      setMsg('✅ تم ارسال طلب السحب! سيتم الدفع خلال 24 ساعة');
      setBalance(b => b - amt);
      setWithdrawAmount(''); setWithdrawAddress('');
    } else {
      setMsg('❌ '+ (d.error || 'خطأ'));
    }
  };

  if(loading) return <div style={{background:'#07060a',minHeight:'100vh',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>⏳ تحميل...</div>;

  return(
    <div style={{background:'#07060a',minHeight:'100vh',color:'white',padding:'0'}}>
      {/* HEADER */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'Center',padding:'14px 16px',background:'#0f0f14',borderBottom:'1px solid #222'}}>
        <a href="/" style={{color:'#ffcc00',textDecoration:'none',fontWeight:900}}>← الرئيسية</a>
        <h2 style={{margin:0,color:'#ffcc00'}}>CRYPTO GUY</h2>
        <button onClick={()=>{localStorage.removeItem('user'); location.href='/';}} style={{background:'#222',border:'1px solid #333',color:'white',padding:'6px 12px',borderRadius:'8px',fontSize:'12px'}}>خروج</button>
      </div>

      <div style={{maxWidth:'500px',margin:'0 auto',padding:'16px'}}>
        {/* BALANCE CARD */}
        <div style={{background:'#ffcc00',borderRadius:'20px',padding:'20px',textAlign:'center',color:'#000'}}>
          <div style={{fontSize:'13px',opacity:0.7}}>الرصيد</div>
          <div style={{fontSize:'32px',fontWeight:900}}>${balance.toFixed(2)}</div>
          <div style={{fontSize:'12px'}}>{user?.email}</div>
        </div>

        {/* INVESTMENTS */}
        <div style={{background:'#13131a',borderRadius:'16px',padding:'16px',marginTop:'16px',border:'1px solid #222'}}>
          <h3 style={{margin:'0 0 12px',color:'#ffcc00',textAlign:'right'}}>استثماراتي - {investments.length}</h3>
          {investments.length===0 ? <div style={{textAlign:'center',color:'#666',fontSize:'13px',padding:'20px'}}>لا يوجد استثمارات</div> :
            investments.map((inv,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',background:'#0a0a0f',padding:'12px',borderRadius:'10px',marginBottom:'8px',border:'1px solid #1a1a22'}}>
                <span style={{color:'#00ff94',fontSize:'13px'}}>${(inv.amount * (inv.daily_percent||1.5)/100).toFixed(2)}/يوم</span>
                <span style={{fontSize:'13px'}}>{inv.plan_id||'starter'} - ${inv.amount}</span>
              </div>
            ))
          }
          <div style={{fontSize:'10px',color:'#555',marginTop:'8px',textAlign:'center'}}>ID: {user?.id} | لعرض البيانات المباشر افتح: api/my-investments?user_id={user?.id}</div>
        </div>

        {/* WITHDRAW SECTION - هنا المشكلة كانت */}
        <div id="withdraw" style={{background:'linear-gradient(180deg,#1a1a22,#13131a)',border:'2px solid #ff3b30',borderRadius:'20px',padding:'18px',marginTop:'20px',scrollMarginTop:'20px'}}>
          <h3 style={{margin:'0 0 12px',color:'#ff7a7a',display:'flex',gap:'8px',alignItems:'center'}}>💸 قسم السحب <span style={{background:'#ff3b30',color:'white',fontSize:'10px',padding:'3px 8px',borderRadius:'10px'}}>فوري</span></h3>
          
          <div style={{background:'#000',borderRadius:'12px',padding:'12px',marginBottom:'12px'}}>
            <label style={{fontSize:'11px',color:'#888'}}>مبلغ السحب (الحد الأدنى 10$)</label>
            <input type="number" value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="مثال: 50" style={{width:'100%',marginTop:'6px',padding:'12px',borderRadius:'8px',background:'#111',border:'1px solid #333',color:'white',boxSizing:'border-box'}}/>
          </div>

          <div style={{background:'#000',borderRadius:'12px',padding:'12px',marginBottom:'12px'}}>
            <label style={{fontSize:'11px',color:'#888'}}>عنوان USDT TRC20</label>
            <input type="text" value={withdrawAddress} onChange={e=>setWithdrawAddress(e.target.value)} placeholder="T..." style={{width:'100%',marginTop:'6px',padding:'12px',borderRadius:'8px',background:'#111',border:'1px solid #333',color:'white',boxSizing:'border-box'}}/>
          </div>

          <button onClick={handleWithdraw} style={{width:'100%',background:'linear-gradient(135deg,#ff3b30,#ff1100)',color:'white',padding:'14px',borderRadius:'12px',fontWeight:900,border:'none',cursor:'pointer',fontSize:'14px'}}>تأكيد السحب الآن 🚀</button>

          {msg && <div style={{marginTop:'12px',background:'#ffcc0015',border:'1px solid #ffcc0030',padding:'10px',borderRadius:'8px',fontSize:'12px',color:'#ffcc00',textAlign:'center'}}>{msg}</div>}

          <div style={{marginTop:'12px',fontSize:'11px',color:'#666',lineHeight:'1.6'}}>
            • السحب يتم خلال 24 ساعة<br/>
            • رسوم الشبكة 1$<br/>
            • الحد الأدنى 10$
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'16px'}}>
          <a href="/deposit" style={{background:'#00ff9415',border:'1px solid #00ff9440',padding:'14px',borderRadius:'12px',textAlign:'center',textDecoration:'none',color:'#00ff94',fontWeight:800}}>💰 ايداع</a>
          <a href="/" style={{background:'#1e1e28',border:'1px solid #2a2a35',padding:'14px',borderRadius:'12px',textAlign:'center',textDecoration:'none',color:'white',fontWeight:800}}>🏠 الرئيسية</a>
        </div>
      </div>
    </div>
  )
}
