'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (!u) { window.location.href = '/auth'; return; }
    setUser(u);
    fetch('/api/plans').then(r=>r.json()).then(d=> setPlans(d.plans || d));
    fetch(`/api/my-investments?user_id=${u.id}`).then(r=>r.json()).then(d=> setInvestments(d.investments || []));
  }, []);

  if (!user) return <div style={{ background: '#05070A', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>جاري التحميل...</div>;

  return (
    <div style={{ background: '#05070A', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '22px' }}><span style={{ color: '#F0B90B' }}>CRYPTO</span> GUY</h1>
          <button onClick={()=>{ localStorage.removeItem('user'); window.location.href='/'; }} style={{ background: '#1A1D26', border: '1px solid #2A2E3F', color: '#8B8FA3', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>خروج</button>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F0B90B, #FFD700)', borderRadius: '20px', padding: '28px', color: 'black', marginBottom: '25px' }}>
          <p style={{ opacity: 0.7, fontSize: '13px', margin: 0 }}>الرصيد الحالي</p>
          <h2 style={{ fontSize: '36px', fontWeight: '900', margin: '5px 0' }}>${Number(user.balance).toFixed(2)}</h2>
          <p style={{ opacity: 0.7, fontSize: '13px', margin: 0 }}>{user.email}</p>
        </div>

        <div style={{ background: '#11131A', border: '1px solid #1E212E', borderRadius: '16px', padding: '20px', marginBottom: '25px' }}>
          <h3 style={{ marginTop: 0, color: '#F0B90B' }}>استثماراتي</h3>
          {investments.length === 0 ? <p style={{ color: '#8B8FA3', fontSize: '14px' }}>لا يوجد استثمارات بعد</p> : 
            investments.map((inv,i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1E212E', fontSize: '14px' }}>
                <span>{inv.plan_name} - ${inv.amount}</span>
                <span style={{ color: '#0ECB81' }}>+${inv.daily_profit}/يوم</span>
              </div
