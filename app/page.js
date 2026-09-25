'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [plans, setPlans] = useState([
    { id: 1, name: "STARTER", min_amount: 50, max_amount: 499, daily_roi: 1.5, duration: 30 },
    { id: 2, name: "PROFESSIONAL", min_amount: 500, max_amount: 4999, daily_roi: 2.5, duration: 30 },
    { id: 3, name: "WHALE", min_amount: 5000, max_amount: 50000, daily_roi: 4.0, duration: 30 }
  ]);

  useEffect(() => {
    fetch('/api/test').then(r=>r.json()).then(d=>{ if(d.plans) setPlans(d.plans) }).catch(()=>{});
  }, []);

  return (
    <div style={{ background: '#05070A', color: 'white', minHeight: '100vh', fontFamily: 'system-ui' }}>
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 5%', borderBottom: '1px solid #1A1D26', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, background: 'rgba(5,7,10,0.8)', zIndex: 10 }}>
        <b style={{ fontSize: '24px', letterSpacing: '-1px' }}><span style={{ color: '#F0B90B' }}>CRYPTO</span> GUY</b>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ background: '#1A1D26', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px' }}>Login</button>
          <button style={{ background: '#F0B90B', border: 'none', color: 'black', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>Register</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding: '80px 5%', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ background: 'rgba(240,185,11,0.1)', border: '1px solid rgba(240,185,11,0.3)', display: 'inline-block', padding: '6px 14px', borderRadius: '20px', color: '#F0B90B', fontSize: '12px', marginBottom: '20px' }}>● LIVE TRADING • 12,847 Active Investors</div>
          <h1 style={{ fontSize: '54px', lineHeight: '1', fontWeight: '900', marginBottom: '20px' }}>TRADE SMART.<br/><span style={{ color: '#F0B90B' }}>EARN DAILY.</span></h1>
          <p style={{ color: '#8B8FA3', fontSize: '18px', marginBottom: '30px' }}>منصة استثمار مشفرة مؤمنة بالذكاء الاصطناعي. أرباح يومية مضمونة، سحب فوري، حماية بنكية.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ background: '#F0B90B', color: 'black', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: '900', fontSize: '16px' }}>ابدأ الاستثمار الآن</button>
            <div style={{ color: '#8B8FA3' }}><b style={{ color: 'white', display: 'block', fontSize: '20px' }}>$2.4M+</b> تم سحبها اليوم</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '300px', background: 'linear-gradient(145deg, #11131A, #1A1D26)', borderRadius: '24px', padding: '30px', border: '1px solid #2A2E3F' }}>
          <h3>حاسبة الأرباح</h3>
          <div style={{ background: '#05070A', padding: '20px', borderRadius: '16px', marginTop: '20px' }}>
            <p style={{ color: '#8B8FA3' }}>استثمارك: $1000</p>
            <h2 style={{ fontSize: '36px', color: '#F0B90B', margin: '10px 0' }}>$750 ربح شهري</h2>
            <p style={{ color: '#0ECB81', fontSize: '14px' }}>↑ +2.5% يومياً • سحب فوري</p>
          </div>
        </div>
      </div>

      {/* PLANS */}
      <div style={{ padding: '40px 5%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '900', marginBottom: '40px' }}>خطط الاستثمار</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {plans.map(p => (
            <div key={p.id} style={{ background: p.name === 'PROFESSIONAL' ? 'linear-gradient(180deg, #F0B90B, #C99400)' : '#11131A', color: p.name === 'PROFESSIONAL' ? 'black' : 'white', borderRadius: '20px', padding: '30px', border: '1px solid #2A2E3F', transform: p.name === 'PROFESSIONAL' ? 'scale(1.05)' : 'scale(1)' }}>
              <h3 style={{ fontWeight: '900', letterSpacing: '2px' }}>{p.name}</h3>
              <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '15px 0' }}>{p.daily_roi}% <span style={{ fontSize: '16px', opacity: 0.7 }}>يومياً</span></h1>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>${p.min_amount} - ${p.max_amount}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '25px', lineHeight: '2' }}>
                <li>✓ سحب فوري 24/7</li>
                <li>✓ تأمين على رأس المال</li>
                <li>✓ مدة {p.duration} يوم</li>
              </ul>
              <button style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: p.name === 'PROFESSIONAL' ? 'black' : '#F0B90B', color: p.name === 'PROFESSIONAL' ? 'white' : 'black', fontWeight: 'bold' }}>استثمر الآن</button>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#8B8FA3', borderTop: '1px solid #1A1D26', marginTop: '60px' }}>
        © 2026 Crypto Guy • Secured by Neon & Render • الموقع شغال 100%
      </footer>
    </div>
  );
                      }
